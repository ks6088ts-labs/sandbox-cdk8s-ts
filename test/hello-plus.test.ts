import { HelloPlusChart } from "../lib/hello-plus-chart";
import { Testing } from "cdk8s";

describe("Placeholder", () => {
  test("Empty", () => {
    const app = Testing.app();
    const chart = new HelloPlusChart(app, "test-chart");
    const results = Testing.synth(chart);
    expect(results).toMatchSnapshot();
  });
});
