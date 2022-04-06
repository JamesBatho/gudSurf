import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const storage = new AssetStorage(this, 'Storage');

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'gudsurf',
    });
    // example resource
    // const queue = new sqs.Queue(this, 'InfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
