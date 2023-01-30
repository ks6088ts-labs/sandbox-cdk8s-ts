import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from '../imports/k8s'

export class StaticSiteChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props)

    const label = { app: 'static-site' }

    new KubeService(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(80) }],
        selector: label,
      },
    })

    new KubeDeployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'site',
                image: 'nginx:mainline-alpine-slim',
                ports: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
    })
  }
}
