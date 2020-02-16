import { StepResult } from "./StepResult";

export interface DiagnosticStep {
    name: string;
    stepFunction: () => Promise<StepResult>|StepResult;
}
