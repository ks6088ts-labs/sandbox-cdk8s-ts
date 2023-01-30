import { App } from 'cdk8s'
import { HelloChart } from './lib/hello-chart'
import { HelloPlusChart } from './lib/hello-plus-chart'
import { StaticSiteChart } from './lib/static-site-chart'
import { CronJobChart } from './lib/cron-job-chart'

const app = new App()
new HelloChart(app, 'hello')
new HelloPlusChart(app, 'hello-plus')
new StaticSiteChart(app, 'static-site')
new CronJobChart(app, 'cron-job')

app.synth()
