import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { version } from 'os';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class EksCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Look up an existing VPC by VPC_ID
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC',{
      vpcId: 'vpc-0f13e58b7d73e0f1c',
    });

    const publicSubnetSelection: ec2.SubnetSelection = {
      subnetType: ec2.SubnetType.PUBLIC,
    };

    const privateSubnetSelection: ec2.SubnetSelection = {
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, // Use private subnets for the nodegroup
    };

    const cluster = new eks.Cluster(this, 'EksCluster', {
      vpc,
      vpcSubnets: [publicSubnetSelection, privateSubnetSelection], 
      clusterName: 'eks-lab',
      version: eks.KubernetesVersion.V1_31,
      endpointAccess: eks.EndpointAccess.PUBLIC,
      authenticationMode: eks.AuthenticationMode.API_AND_CONFIG_MAP,
      defaultCapacity: 0, // We don't use default capacity as we are adding a managed node group

      // add alb controller to aid in provisioning Ingress
      albController: {
        version: eks.AlbControllerVersion.V2_8_2,
      },
    });
    
    cluster.addNodegroupCapacity('custom-node-group', {
      instanceTypes: [new ec2.InstanceType('m5.large')],
      minSize: 2,
      maxSize: 5,
      desiredSize: 3,
      diskSize: 100,
      subnets: privateSubnetSelection,
      amiType: eks.NodegroupAmiType.AL2_X86_64,
    });

    // Output the cluster name
    new cdk.CfnOutput(this, 'EksClusterName', {
      value: cluster.clusterName,
      description: 'The name of the EKS Cluster',
    });

  }
}
