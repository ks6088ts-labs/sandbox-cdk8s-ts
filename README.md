# Set up Kubernetes

## Azure Kubernetes Service

```shell
# Connect to cluster using kubectl
az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME

# verify connection
kubectl get nodes
```

# cdk8s

```shell
# Install dependencies
npm install

# To synthesize the app, run:
npm run compile && cdk8s synth

# Apply the synthesized manifest to a Kubernetes cluster
kubectl apply -f dist/hello.k8s.yaml

# Display services to see external ips to access
kubectl get services

# Delete resources
kubectl delete -f dist/hello.k8s.yaml
```


# References

- [Tutorial: Deploy an Azure Kubernetes Service (AKS) cluster / Connect to cluster using kubectl](https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli#connect-to-cluster-using-kubectl)
- [cdk8s / Getting started](https://cdk8s.io/docs/latest/getting-started/)
- [cdk8s+](https://cdk8s.io/docs/latest/plus/)
