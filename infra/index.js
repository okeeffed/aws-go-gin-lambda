"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const cdk = require("@aws-cdk/core");
const assets = require("@aws-cdk/aws-s3-assets");
const path = require("path");
require('dotenv').config();
class LambdaCronStack extends cdk.Stack {
    constructor(app, id) {
        super(app, id);
        // The following JavaScript example defines an directory
        // asset which is archived as a .zip file and uploaded to
        // S3 during deployment.
        // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
        const myLambdaAsset = new assets.Asset(
        // @ts-ignore - this expects Construct not cdk.Construct :thinking:
        this, 'HelloGoServerLambdaFnZip', {
            path: path.join(__dirname, '../functions/gin-server'),
        });
        const lambdaFn = new lambda.Function(this, 'HelloGoServerLambdaFn', {
            code: lambda.Code.fromBucket(myLambdaAsset.bucket, myLambdaAsset.s3ObjectKey),
            timeout: cdk.Duration.seconds(300),
            runtime: lambda.Runtime.GO_1_X,
            handler: 'index.handler',
        });
        // API Gateway
        const gateway = new apigw.LambdaRestApi(
        // @ts-ignore - this expects Construct not cdk.Construct :thinking:
        this, 'HelloGoServerLambdaFnEndpoint', {
            handler: lambdaFn,
        });
        console.log(gateway.url);
    }
}
exports.LambdaCronStack = LambdaCronStack;
const app = new cdk.App();
new LambdaCronStack(app, 'HelloGoServerLambdaFn');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUErQztBQUMvQyxpREFBa0Q7QUFDbEQscUNBQXNDO0FBQ3RDLGlEQUFrRDtBQUNsRCw2QkFBOEI7QUFFOUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQWEsZUFBZ0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM1QyxZQUFZLEdBQVksRUFBRSxFQUFVO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFZix3REFBd0Q7UUFDeEQseURBQXlEO1FBQ3pELHdCQUF3QjtRQUN4QixnRkFBZ0Y7UUFDaEYsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNwQyxtRUFBbUU7UUFDbkUsSUFBSSxFQUNKLDBCQUEwQixFQUMxQjtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQztTQUN0RCxDQUNGLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ2xFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDMUIsYUFBYSxDQUFDLE1BQU0sRUFDcEIsYUFBYSxDQUFDLFdBQVcsQ0FDMUI7WUFDRCxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDOUIsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsY0FBYztRQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWE7UUFDckMsbUVBQW1FO1FBQ25FLElBQUksRUFDSiwrQkFBK0IsRUFDL0I7WUFDRSxPQUFPLEVBQUUsUUFBUTtTQUNsQixDQUNGLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUF2Q0QsMENBdUNDO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFDbEQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnKTtcbmltcG9ydCBhcGlndyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5Jyk7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IGFzc2V0cyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1zMy1hc3NldHMnKTtcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuZXhwb3J0IGNsYXNzIExhbWJkYUNyb25TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKGFwcDogY2RrLkFwcCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKGFwcCwgaWQpO1xuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBKYXZhU2NyaXB0IGV4YW1wbGUgZGVmaW5lcyBhbiBkaXJlY3RvcnlcbiAgICAvLyBhc3NldCB3aGljaCBpcyBhcmNoaXZlZCBhcyBhIC56aXAgZmlsZSBhbmQgdXBsb2FkZWQgdG9cbiAgICAvLyBTMyBkdXJpbmcgZGVwbG95bWVudC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2Nkay9hcGkvbGF0ZXN0L2RvY3MvYXdzLXMzLWFzc2V0cy1yZWFkbWUuaHRtbFxuICAgIGNvbnN0IG15TGFtYmRhQXNzZXQgPSBuZXcgYXNzZXRzLkFzc2V0KFxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHRoaXMgZXhwZWN0cyBDb25zdHJ1Y3Qgbm90IGNkay5Db25zdHJ1Y3QgOnRoaW5raW5nOlxuICAgICAgdGhpcyxcbiAgICAgICdIZWxsb0dvU2VydmVyTGFtYmRhRm5aaXAnLFxuICAgICAge1xuICAgICAgICBwYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZnVuY3Rpb25zL2dpbi1zZXJ2ZXInKSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IGxhbWJkYUZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGVsbG9Hb1NlcnZlckxhbWJkYUZuJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUJ1Y2tldChcbiAgICAgICAgbXlMYW1iZGFBc3NldC5idWNrZXQsXG4gICAgICAgIG15TGFtYmRhQXNzZXQuczNPYmplY3RLZXksXG4gICAgICApLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKSxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLkdPXzFfWCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICB9KTtcblxuICAgIC8vIEFQSSBHYXRld2F5XG4gICAgY29uc3QgZ2F0ZXdheSA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKFxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHRoaXMgZXhwZWN0cyBDb25zdHJ1Y3Qgbm90IGNkay5Db25zdHJ1Y3QgOnRoaW5raW5nOlxuICAgICAgdGhpcyxcbiAgICAgICdIZWxsb0dvU2VydmVyTGFtYmRhRm5FbmRwb2ludCcsXG4gICAgICB7XG4gICAgICAgIGhhbmRsZXI6IGxhbWJkYUZuLFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgY29uc29sZS5sb2coZ2F0ZXdheS51cmwpO1xuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTGFtYmRhQ3JvblN0YWNrKGFwcCwgJ0hlbGxvR29TZXJ2ZXJMYW1iZGFGbicpO1xuYXBwLnN5bnRoKCk7XG4iXX0=