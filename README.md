# **E-COMMERCE WEBSITE WITH MICROSERVICE ARCHITECTURE**



## **2. Overall structure**

```mermaid
graph LR
    subgraph client 
        A[Front-end]
    end
    
    subgraph server 
        B["API Gateway\n(http://localhost:8080)"]-->C["User service\n(http://localhost:5000)"]-->D[("User DB")]
        B-->E["Auth service\n(http://localhost:5001)"]
        B-->F["Mail service \n(http://localhost:5002)"]
    end
    A --> B
```
