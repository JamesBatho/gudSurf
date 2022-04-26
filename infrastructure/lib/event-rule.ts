import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class EventConstruct extends Construct {
  public eventRule: Rule;

  constructor(scope: Construct, id: string, props?: {}) {
    super(scope, id);

    this.eventRule = new Rule(this, 'fiveMinuteRule', {
      schedule: Schedule.cron({ minute: '0/5' }),
    });
  }
}
