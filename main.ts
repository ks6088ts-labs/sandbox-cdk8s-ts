import { App } from "cdk8s";
import { HelloChart } from "./lib/hello-chart";

const app = new App();
new HelloChart(app, "hello");
app.synth();
