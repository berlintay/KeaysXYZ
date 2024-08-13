```markdown
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: keays-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: keays.xyz
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: keays-service
            port:
              number: 80

---
apiVersion: v1
kind: Service
metadata:
  name: keays-service
spec:
  selector:
    app: keays-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keays-app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: keays-app
  template:
    metadata:
      labels:
        app: keays-app
    spec:
      containers:
      - name: keays-app
        image: your-dockerhub-username/keays-app:latest
        ports:
        - containerPort: 8080

kubectl apply -f keays-ingress.yaml
kubectl apply -f keays-app-deployment.yaml
kubectl apply -f keays-service.yaml

kubectl get services -o wide -w -n ingress-nginx
```