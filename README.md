# **E-COMMERCE WEBSITE WITH MICROSERVICE ARCHITECTURE**



## **2. Overall structure**

```mermaid
graph LR
    subgraph client 
        A["Front-end\n(localhost:3000)"]
    end
    
    subgraph server 
        B["API Gateway
        (localhost:8080)"]-->C["User service
        (localhost:5000)"]-->D[("User DB")]
        B-->E["Auth service
        (localhost:5001)"]
        B-->F["Mail service
        (localhost:5002)"]
    end
    A --> B
```
