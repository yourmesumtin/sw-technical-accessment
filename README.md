# **Kubernetes Cluster Deployment with AWS CDK, Helm, and Azure Pipelines**

## **Overview**
This repository demonstrates the creation and deployment of a Kubernetes cluster and application using AWS CDK, Helm, and Azure Pipelines.

## **Features**
1. **Kubernetes Cluster with AWS CDK**  
   - Provisioned an Amazon EKS cluster using AWS Cloud Development Kit (CDK).  
   - Configured the cluster for secure and scalable deployments.

2. **Application Deployment with Helm**  
   - Created a custom Helm chart to deploy a basic application.  
   - Used a public container image hosting a simple API for demonstration purposes.  
   - Helm chart includes configurable deployment parameters.

3. **CI/CD with Azure Pipelines**  
   - Designed an Azure Pipeline to automate the deployment of the Kubernetes infrastructure (IaC) and the Helm chart.  
   - Ensures seamless integration and delivery of infrastructure and application updates.

## **Usage**
1. Clone the repository and follow the steps in the documentation to set up AWS credentials, CDK, and Helm.
2. Use the provided Azure Pipeline YAML to automate the infrastructure and application deployment.
