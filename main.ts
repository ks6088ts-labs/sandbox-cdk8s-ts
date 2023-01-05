import { App } from "cdk8s";
import { HelloChart } from "./lib/hello-chart";
import { HelloPlusChart } from "./lib/hello-plus-chart";

const app = new App();
new HelloChart(app, "hello");
new HelloPlusChart(app, "hello-plus")
app.synth();
