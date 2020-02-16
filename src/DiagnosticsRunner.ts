import { DiagnosticStep } from "./DiagnosticStep";
import ora from "ora";
import { StepResult } from "./StepResult";

export class DiagnosticsRunner {
    constructor(private steps: DiagnosticStep[]) {

    }

    public async run(): Promise<void> {
        const spinner = ora('Starting diagnostics').start();
        for (const step of this.steps) {
            spinner.info();
            spinner.start(step.name);
            let result: StepResult;
            try {
                result = await step.stepFunction();
            } catch (ex) {
                result = {
                    status: "failure",
                    msg: `${ex.toString()} - ${ex.message}`,
                }
            }
            if (result.status === "success") {
                spinner.succeed(`${step.name}: ${result.msg}`);
            } else if (result.status === "warning") {
                spinner.warn(`${step.name}: ${result.msg}`);
                break;
            } else {
                // All other statuses (including unknown) should be treated as a fail.
                spinner.fail(`${step.name} ${result.msg}`);
                spinner.stop();
                return;
            }
        }
        spinner.succeed("Completed all steps");
        spinner.stop();
    }
}