import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import cdk = require('@aws-cdk/core');
import assets = require('@aws-cdk/aws-s3-assets');
import path = require('path');

export class LambdaCronStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    // The following Golang example defines an directory
    // asset which is archived as a .zip file and uploaded to
    // S3 during deployment.
    // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
    const myLambdaAsset = new assets.Asset(
      // @ts-ignore - this expects Construct not cdk.Construct :thinking:
      this,
      'HelloGoServerLambdaFnZip',
      {
        path: path.join(__dirname, '../functions/gin-server'),
      },
    );

    const lambdaFn = new lambda.Function(this, 'HelloGoServerLambdaFn', {
      code: lambda.Code.fromBucket(
        myLambdaAsset.bucket,
        myLambdaAsset.s3ObjectKey,
      ),
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.GO_1_X,
      handler: 'main',
    });

    // API Gateway
    new apigw.LambdaRestApi(
      // @ts-ignore - this expects Construct not cdk.Construct :thinking:
      this,
      'HelloGoServerLambdaFnEndpoint',
      {
        handler: lambdaFn,
      },
    );
  }
}

const app = new cdk.App();
new LambdaCronStack(app, 'HelloGoServerLambdaFn');
app.synth();
