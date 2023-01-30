import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'

// imported constructs
import {
  KubeDeployment,
  KubeService,
  IntOrString,
  KubeStatefulSet,
  Quantity,
} from '../imports/k8s'
import * as kplus from 'cdk8s-plus-23'

export class StatefulSetChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props)

    const label = { app: 'stateful-set' }
    const quantity = Quantity.fromString('1G')

    new KubeStatefulSet(this, 'stateful-set', {
      metadata: {
        labels: label,
      },
      spec: {
        serviceName: 'stateful-set',
        replicas: 3,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: {
            labels: label,
          },
          spec: {
            containers: [
              {
                name: 'nginx',
                image: 'nginx:mainline-alpine-slim',
                volumeMounts: [
                  {
                    name: 'www',
                    mountPath: '/usr/share/nginx/html',
                  },
                ],
              },
            ],
          },
        },
        volumeClaimTemplates: [
          {
            metadata: {
              name: 'www',
            },
            spec: {
              accessModes: [kplus.PersistentVolumeAccessMode.READ_WRITE_ONCE],
              resources: {
                requests: { storage: quantity },
              },
            },
          },
        ],
      },
    })

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
