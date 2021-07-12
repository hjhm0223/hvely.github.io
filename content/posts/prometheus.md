---
template: SinglePost
title: Prometheus
status: Published
date: '2020-04-01'
featuredImage: >-
  https://blog.pridybailo.com/wp-content/uploads/sites/2/2019/08/Blog-Topper.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![prometheus](https://blog.pridybailo.com/wp-content/uploads/sites/2/2019/08/Blog-Topper.png)


`오픈 소스` 기반의 `모니터링` 시스템이다.


### 특징

- ELK 와 같은 로깅이 아니라, 대상 시스템으로 부터 각종 모니터링 지표를 수집하여 `저장`하고 `검색`할 수 있는 시스템
- 구조가 간단해서 운영이 쉽고, 강력한 쿼리 기능을 가지고 있으며, 그라파나(Grafana) 를 통한 `시각화`를 지원
- 무엇보다 넓은 오픈 소스 생태계를 기반으로 해서, 많은 시스템을 모니터링할 수 있는 `다양한 플러그인`을 가지고 있는 것이 가장 큰 장점
- 이러한 간편함 때문에 특히 `쿠버네티스`의 메인 모니터링 시스템으로 요즘 많이 사용됨


## 1. 기본 구조
![img](https://owin2828.github.io/img/etc/etc_5_2.png)

### 1-1. Metric 수집

수집을 하려는 대상 시스템이 Target system이다. MySQL이나, Tomcat 또는 VM 과 같이 여러가지 자원이 모니터링 대상이 될 수 있다. 이 대상 시스템에서 메트릭을 프로메테우스로 전송하기 위해서는 Exporter 라는 것을 사용한다.


### 1-2. pulling 방식

프로메테우스가 Target System에서 메트릭을 수집하는 방식은 `풀링` 방식을 사용한다. 프로메테우스가 주기적으로 Exporter로 부터 메트릭 읽어와서 수집하는 방식이다. 보통 모니터링 시스템의 에이전트 들은 에이전트가 모니터링 시스템으로 메트릭을 보내는 푸쉬 방식을 사용한다. 특히 푸쉬 방식은 서비스가 오토 스켈링등으로 가변적일 경우에 유리하다. 풀링 방식의 경우 모니터링 대상이 가변적으로 변경될 경우, 모니터링 대상의 IP 주소들을 알 수 가 없기 때문에 `어려운` 점이 있다.


이러한 문제를 해결하기 위한 방안이 `서비스 디스커버리`라는 방식인데, 특정 시스템이 현재 기동중인 서비스들의 목록과 IP 주소를 가지고 있으면 된다. 예를 들어 앞에서 VM들을 내부 DNS에 등록해놓고 새로운 VM이 생성될때에도 DNS에 등록을 하도록 하면, DNS에서 현재 기동중인 VM 목록을 얻어와서 그 목록의 IP들로 풀링을 하면 되는 구조이다.


### 1-3. Service Discovery

프로메테우스도 서비스 디스커버리 시스템과 통합을 하도록 되어 있다. 앞에서 언급한 `DNS`나, 서비스 디스커버리 전용 솔루션인 Hashicorp사의 `Consul` 또는 `쿠버네티스`를 통해서, 모니터링해야할 타겟 서비스의 목록을 가지고 올 수 있다.


### 1-4. Exporter

Exporter는 `모니터링 에이전트`로 타겟 시스템에서 메트릭을 읽어서, 프로메테우스가 풀링을 할 수 있도록 한다. 또한, 단순히 `HTTP GET`으로 메트릭을 `텍스트` 형태로 프로메테우스에 리턴한다. 요청 당시의 데이타를 리턴하는 것일뿐, Exporter 자체는 기존값(히스토리)를 저장하는 등의 기능은 없다.


### 1-5. Retrieval

서비스 디스커버리 시스템으로 부터 모니터링 대상 목록을 받아오고, Exporter로 부터 주기적으로 그 대상으로 부터 `메트릭을 수집`하는 모듈이 프로메테우스내의 Retrieval 이라는 컴포넌트이다.


### 1-6. 저장

이렇게 수집된 정보는 프로메테우스 내의 `메모리`와 `로컬 디스크`에 저장된다. 뒷단에 별도의 데이타 베이스등을 사용하지 않고, 그냥 로컬 디스크에 저장하는데, 그로 인해서 설치가 매우 쉽다는 장점이 있지만 반대로 `스케일링이 불가능`하다는 단점을 가지고 있다. 대상 시스템이 늘어날 수록 메트릭 저장 공간이 많이 필요한데, `단순히 디스크를 늘리는 방법` 밖에 없다.


프로메테우스는 구조상 HA를 위한 이중화나 클러스터링등이 `불가능`하다. (클러스터링 대신 샤딩을 사용한다. HA는 복제가 아니라 프로메테우스를 두개를 띄워서 같은 타겟을 동시에 같이 저장 하는 방법을 사용한다. 이 문제에 대한 해결 방법은 Thanos 라는 오픈 소스를 사용하면 된다고 한다.)


### 1-7. 서빙

이렇게 저장된 메트릭은 `PromQL 쿼리` 언어를 이용해서 조회가 가능하고, 이를 외부 API나 프로메테우스 웹콘솔을 이용해서 서빙이 가능하다. 또한 그라파나등과 통합하여 대쉬보드등을 구성하는 것이 가능하다.


이 외에도 메트릭을 수집하기 위한 gateway, 알람을 위한 Alert manager 등의 컴포넌트등이 존재한다.


## 2. 장/단점

위의 내용을 기반으로 확장한 프로메테우스의 장/단점은 다음과 같다.


### 2-1. 장점

* `pull 방식`의 구조를 채택함으로써, 모든 메트릭의 정보를 중앙 서버로 보내지 않아도 됨

  대부분의 모니터링 구조는 push인데, 각 타겟 서버에서 부하가 걸릴 경우 push 방식은 fail point가 될 가능성이 있음
* Kubernetes 환경에서 `설치가 간단`하고, grafana와의 연동을 통한 `운영이 쉽다`.
* 다양한 metric exporter 제공

  Linux, Window등의 OS metric 뿐 아니라 각종 `Third-party`의 exporter를 제공
* 장기간 데이터 유지와 확인

  데이터 저장소가 `시계열 데이터` 저장소로 구성되어있어, `많은` 양의 정보를 `빠르게` 검색 가능

### 2-2. 단점

프로메테우스는 장점이 확실한 만큼 다음과 같이 단점도 확실하다.

![pro3](https://owin2828.github.io/img/etc/etc_5_3.jpg)


* 위의 그림처럼, 각 Region에 프로메테우스를 배치 한 뒤, 이를 Master에 Aggregate하는 방식이 프로메테우스가 공식적으로 권장하는 `다중화` 방식

  즉 Clustering과는 거리가 `멈`
* 싱글 호스트 아키텍처이기 때문에 저장용량이 부족하면 `디스크 용량을 늘리는 것` 밖에 방법이 없음
* 프로메테우스 서버가 다운되거나, 설정 변경 등을 위해서 재시작을 할 경우 그간의 metric은 `유실`됨
* 일정 풀링 주기를 기반으로 metric을 가져오기 때문에 `풀링하는 순간`의 스냅샷 정보만 알 수 있음

  스냅샷의 연속된 모음이기 때문에 `근사값`의 형태


## 3. Hello Prometheus

프로메테우스를 이해하기 위해 간단한 테스트를 https://www.katacoda.com/ 에서 진행하였다.


### 3-1. 설정 파일 정의

프로메테우스의 설정은 prometheus.yml 파일에 다음과 같이 정의한다.


```yml
global:
scrape_interval: 15s
evaluation_interval: 15s

scrape_configs:
- job_name: 'prometheus'

static_configs:
- targets: ['127.0.0.1:9090', '127.0.0.1:9100']

labels:
group: 'prometheus'
```

* `scrape_interval`: 타겟시스템으로부터 메트릭을 읽어오는 주기
* `evaluation_interval`: 읽어온 메트릭을 기반으로 alert를 보낼지 말지 판단하는 주기
* `scrap_configs`: 데이터 수집 대상과 방법을 정의
* `job`: 대상 그룹에서 메트릭을 수집해오는 내용을 정의

  위의 경우, 127.0.0.1:9090과 127.0.0.1:9100으로 부터 메트릭을 수집하도록 job이 정의
  앞 부분은 프로메테우스 시스템 자체의 케트릭, 두 번째는 프로메테우스가 기동괴고 있는 VM의 메트릭을 수집하도록 정의


### 3-2. 프로메테우스 서버와 node exporter 기동

설정이 끝난 후, 다음의 명령을 통해 간단하게 docker로 기동한다.

```bash
$ docker run -d --net=host \
-v /root/prometheus.yml:/etc/prometheus/prometheus.yml \
--name prometheus-server \
prom/prometheus
```


프로메테우스가 기동되면 다음의 명령으로 docker를 통해 node exporter를 설치해서 기동한다.

```bash
$ docker run -d \
-v "/proc:/host/proc" \
-v "/sys:/host/sys" \
-v "/:/rootfs" \
--net="host" \
--name=prometheus \
quay.io/prometheus/node-exporter:v0.13.0 \
-collector.procfs /host/proc \
-collector.sysfs /host/sys \
-collector.filesystem.ignored-mount-points "^/(sys|proc|dev|host|etc)($|/)"
```

node exporter가 제대로 동작하는지 확인하기 위해, 다음의 명령을 통해 메트릭 정보를 얻는다.

```bash
$ curl https://{프로메테우스 서버 IP}:9100/metrics
```


### 3-3. 프로메테우스 Dashboard 접속

프로메테우스와 exporter가 기동이 되었으면, 제대로 메트릭이 수집되는지 확인하기 위해 다음의 주소에 접속하여 대쉬보드를 확인한다.

* http://{프로메테우스 서버 ip}:9090

검색 쿼리 부분에 메트릭 쿼리를 입력하면 그래프등의 형태로 볼 수 있다.



## 프로메테우스 설치 방법

1. binary download

```
https://prometheus.io/download/ 에서 다운로드
```

2. 설치

```sh
tar xvzf prometheus-2.17.0.linux-amd64.tar.gz
```

3. 실행

```sh
./prometheus --config.file=prometheus.yml
nohup ./prometheus --config.file=./prometheus.yml > prometheus.log 2>&1 &
```



## grafana install


1. download
  https://dl.grafana.com/oss/release/grafana-6.7.1.linux-amd64.tar.gz

2. install

```sh
tar xvzf grafana-6.7.1.linux-amd64.tar.gz
```

3. run

```sh
grafana-6.7.1.linux-amd64/bin/grafana-server
nohup ./grafana-server > grafana.log 2>&1 &
```
