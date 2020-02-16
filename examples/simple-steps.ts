import { DiagnosticsRunner } from "../src/index";
import { TimerStep } from "../src/Steps/index";

const runner = new DiagnosticsRunner([new TimerStep(5000)]);

runner.run();