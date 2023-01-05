import { Construct } from "constructs";
import * as kplus from "cdk8s-plus-23";
import { Chart, ChartProps } from "cdk8s";

export class HelloPlusChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new kplus.Deployment(this, "Deployment", {
      replicas: 3,
      containers: [
        {
          image: "ubuntu",
        },
      ],
    });
  }
}
