import * as targets from '@aws-cdk/aws-events-targets';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';
import { EventConstruct } from './event-rule';
import { DataLambda } from './lambda-construct';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // const storage = new AssetStorage(this, 'Storage');

    // new WebApp(this, 'WebApp', {
    //   hostingBucket: storage.hostingBucket,
    //   baseDirectory: '../',
    //   relativeWebAppPath: 'gudsurf',
    // });
    // example resource
    // const queue = new sqs.Queue(this, 'InfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //EventBridge /  Lambda
    const lambdaConstruct = new DataLambda(this, 'DataLambda');

    const eventRule = new EventConstruct(this, 'EventConstruct');

    eventRule.eventRule.addTarget(
      new LambdaFunction(lambdaConstruct.lambda, {
        event: events.RuleTargetInput.fromObject({ message: 'Hello Lambda' }),
      }),
    );
  }
}
