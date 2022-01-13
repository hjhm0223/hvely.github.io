---
template: SinglePost
title: Kubernetes
status: Published
date: '2020-04-01'
featuredImage: >-
  https://kubernetes.io/images/kubernetes-horizontal-color.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![kuberenetes](https://kubernetes.io/images/kubernetes-horizontal-color.png)




## Index

* kubernetes cluster 오케스트레이션 시스템
* kubernetes의 주요 기능과 개념
* 실습
* 컨테이너화된 application을 cluster에 배포하기
* deployment 스케일링하기
* 컨테이너화된 앱을 새로운 소프트웨어 버전으로 업데이트하기
* 컨테이너화된 앱을 디버그하기

(*Minikube: 로컬에 설치할 수 있는 작은 규모의 kubernetes.)



### Kubernetes

컨테이너화를 통해 소프트웨어 패키지하면 앱 다운타임 없이 쉽고 빠르게 릴리즈 및 업데이트 가능



## 1. Minikube를 사용해서 cluster 생성하기

### kubernetes cluster

* kubernetes는 서로 연결되어 있어 단일 유닛처럼 동작. application 컨테이너를 cluster에 분산시키고 스케줄링하는 일을 보다 효율적으로 자동화.

* kubernetes cluster의 형태

* 마스터: cluster 상호조정 (application 스케줄링, application의 항상성 유지, application 스케일링, 새로운 변경사항을 순서대로 반영하는 일 등 cluster 내 모든 활동을 조율)

* 노드(kubernetes cluster 내 워커 머신으로써 동작하는 VM 또는 물리적인 컴퓨터): 앱 구동, 마스터가 제공하는 kubernetes API를 통해서 마스터와 통신

* Minikube는 로컬 머신에 VM을 만들고 하나의 노드로 구성된 cluster를 배포하는 가벼운 kubernetes 구현체



## 2. kubectl을 사용해서 deployment 생성하기

### kubernetes Deployment

* kubernetes deployment 설정을 만들고, kubernetes cluster를 구동시키면 그 위에 컨테이너화된 application을 배포할 수 있다.

* deployment는 kubernetes가 application의 인스턴스를 어떻게 생성/업데이트해야 하는지 지시한다.

* deployment가 만들어지면 kubernetes master가 해당 app 인스턴스를 클러스터의 개별 노드에 스케줄한다.

* deployment controlor는 인스턴스를 지속적으로 모니터링하고, 구동 중인 노드가 다운되면 다른 노드의 인스턴스로 교체시켜 머신의 장애에 대응할 수 있는 자동 복구 메커니즘을 제공한다.


### kubernetes에 첫 번째 application 배포하기

* Kubectl(kubernetes CLI)를 통해 deployment 생성 및 관리

* Kubectl은 cluster와 상호작용하기 위해 kubernetes API 사용



## kubernetes tutorial

https://kubernetes.io/ko/docs/tutorials/


## example

https://www.katacoda.com/courses/kubernetes


## blog

https://bcho.tistory.com/1256?category=731548



## 실습


### 1. Launch A Single Node Cluster


1. Start Minikube

  ```
  minikube version
  ```

  * minikube로 vm 시작. kubernetes cluster 동작

  ```
  minikube start --wait=false
  ```

2. Cluster Info

  * kuberctl CLI: kubernetes 관리, 앱 구동을 위한 도구

  ```
  kuberctl cluster-info
  ```

  * Status가 Ready인지 확인

  * 앱에서 호스트가 사용할 수 있는 모든 노드를 보여줌

  ```
  kubectl get nodes
  ```

  3. Deploy Containers

  * cluster에서 컨테이너 동작

  ```
  kubectl create deployment first-deployment --image=katacoda/docker-http-server
  ```

  * status 확인

  ```
  kubectl get pods
  ```

  * port 설정

  ```
  kubectl expose deployment first-deployment --port=80 --type=NodePort
  ```

  * port 확인

  ```
  export PORT=$(kubectl get svc first-deployment -o go-template='{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}')

  echo "Accessing host01:$PORT"

  curl host01:$PORT
  ```

4. Dashboard

  * dashboard 활성화

  ```
  minikube addons enable dashboard
  ```

  * katacoda 이용해서 yaml의 정의 실행

  ```
  kubectl apply -f /opt/kubernetes-dashboard.yaml
  ```

  * dashboard 보기 (https://2886795331-30000-cykoria03.environments.katacoda.com/)

  ```
  kubectl get pods -n kubernetes-dashboard -w
  ```



### 2. Launch a multi-node cluster using Kubeadm


1. Initialise Master

  * cluster initialise

  ```
  kubeadm init --token=102952.1a7dd4cc8d1f4cc5 --kubernetes-version $(kubeadm version -o short)
  ```

  * configuration을 home directory로 복사

  ```
  sudo cp /etc/kubernetes/admin.conf $HOME/

  sudo chown $(id -u):$(id -g) $HOME/admin.conf

  export KUBECONFIG=$HOME/admin.conf
  ```

2. Deploy Container Networking Interface(CNI)

  * CNI: 여러 node와 workload가 어떻게 상호작용할지 정의(?)

  * deployment definition 보기 (Weaveworks 사용)

  ```
  cat /opt/weave-kube
  ```

  * kubectl apply를 통해 확인

  ```
  kubectl apply -f /opt/weave-kube
  ```

  * status 확인

  ```
  kubectl get pod -n kube-system
  ```


3. Join Cluster

  * master와 CNI가 초기화되고 token을 가지고 있으면 cluster join이 가능하다. token 확인하기

  ```
  kubeadm token list
  ```

  * 새로운 node에 master node의 ip 주소로 cluster join

  ```
  kubeadm join --discovery-token-unsafe-skip-ca-verification --token=102952.1a7dd4cc8d1f4cc5 172.17.0.39:6443
  ```


4. View Nodes

  * 2개 node(master, node01) ready

  ```
  kubectl get nodes
  ```


5. Deploy Pod

  * pod 생성

  ```
  kubectl create deployment http --image=katacoda/docker-http-server:latest
  ```

  * pod status 확인

  ```
  kubectl get pods
  ```

  * node01에서 Docker Container running

  ```
  docker ps | grep docker-http-server
  ```



### 3. Start Containers using Kubectl


1. Launch Cluster

  * download Kubectl CLI

  ```
  minikube start --wait=false
  ```

  * check node

  ```
  kubectl get nodes
  ```
