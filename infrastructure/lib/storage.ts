import { Bucket, BucketEncryption, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AssetStorage extends Construct {
  public readonly hostingBucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.hostingBucket = new Bucket(this, 'WebHostingBucket', {
      encryption: BucketEncryption.S3_MANAGED,
    });
  }
}
