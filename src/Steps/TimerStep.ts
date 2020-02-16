import { DiagnosticStep } from "../DiagnosticStep";
import { StepResult } from "../StepResult";

export class TimerStep implements DiagnosticStep {
    constructor(private time: number) {

    }

    public get name(): string {
        return `Waiting ${this.time}ms`;
    }

    public async stepFunction(): Promise<StepResult> {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                status: "success",
                msg: "Finished waiting"
            }), this.time);
        })
    }
}