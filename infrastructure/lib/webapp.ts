import { Construct } from 'constructs';
import { CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import * as cwt from 'cdk-webapp-tools';
import { CfnOutput } from 'aws-cdk-lib';

interface WebAppProps {
  hostingBucket: IBucket;
  relativeWebAppPath: string;
  baseDirectory: string;
}

export class WebApp extends Construct {
  public readonly webDistribution: CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: WebAppProps) {
    super(scope, id);

    const oai = new OriginAccessIdentity(this, 'WebHostingOAI', {});

    const cloudfrontProps: any = {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.hostingBucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCachingMinTtl: 86400,
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCachingMinTtl: 86400,
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    };

    this.webDistribution = new CloudFrontWebDistribution(this, 'AppHostingDistribution', cloudfrontProps);

    props.hostingBucket.grantRead(oai);

    // deploy app

    new cwt.WebAppDeployment(this, 'WebAppDeploy', {
      baseDirectory: props.baseDirectory,
      relativeWebAppPath: props.relativeWebAppPath,
      webDistribution: this.webDistribution,
      webDistributionPaths: ['/*'],
      buildCommand: 'yarn build',
      buildDirectory: 'build',
      bucket: props.hostingBucket,
      prune: true,
    });

    new CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}`,
    });
  }
}
