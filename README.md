# **E-COMMERCE WEBSITE WITH MICROSERVICE ARCHITECTURE**



## **2. Overall structure**

```mermaid
graph LR
    subgraph client 
        A["Front-end\n(localhost:3000)"]
    end
    
    subgraph server 
        B["API Gateway\n(localhost:8080)"]-->C["User service\n(localhost:5000)"]-->D[("User DB")]
        B-->E["Auth service\n(localhost:5001)"]
        B-->F["Mail service \n(localhost:5002)"]
    end
    A --> B
```
