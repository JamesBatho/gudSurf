import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

export class DataLambda extends Construct {
  public lambda: Function;

  constructor(scope: Construct, id: string, props?: {}) {
    super(scope, id);

    this.lambda = new Function(this, 'dataLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lib/lambda-dataLambda'),
      handler: 'code.handler',
    });
  }
}
