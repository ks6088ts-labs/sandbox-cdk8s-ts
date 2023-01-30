import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'
import { KubeCronJob } from '../imports/k8s'
import { RestartPolicy } from 'cdk8s-plus-23'

export class CronJobChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props)

    new KubeCronJob(this, 'cronjob', {
      metadata: {
        name: 'periodic-task',
      },
      spec: {
        // crontab guru: https://crontab.guru/
        schedule: '*/1 * * * *',
        successfulJobsHistoryLimit: 10,
        jobTemplate: {
          spec: {
            completions: 3,
            parallelism: 1,
            backoffLimit: 0,
            template: {
              spec: {
                containers: [
                  {
                    name: 'hello',
                    image: 'busybox',
                    command: [
                      '/bin/sh',
                      '-c',
                      'date; echo Hello from the Kubernetes cluster',
                    ],
                  },
                ],
                restartPolicy: RestartPolicy.ON_FAILURE,
              },
            },
          },
        },
      },
    })
  }
}
