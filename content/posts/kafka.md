---
template: SinglePost
title: Kafka
status: Published
date: '2022-04-26'
featuredImage: >-
  https://velog.velcdn.com/images/deogicorgi/post/929e20a7-9618-4aa8-8378-7bc8fbba245b/20201021_Introduction-to-Apache-Kafka_BLOG-FEATURED-IMAGE.jpeg
excerpt: >-
  
categories:
  - category: 
meta:
  description: test meta description
  title: test meta title
---


# Kafka

  Kafka는 이벤트 스트리밍 플랫폼으로 분산환경에 특화되어 있다.  

  ![kafka cluster](https://velog.velcdn.com/images/kidae92/post/a642368e-df63-4d4e-80d3-1b3c3f8d58b9/image.png)

  빠르고 확장 가능한 작업을 위해 데이터 피드의 분산 스트리밍, 파이프 라이닝 및 재생을 위한 실시간 스트리밍 데이터를 처리하기 위한 목적으로 설계된 오픈 소스 분산형 게시-구독 메시징 플랫폼

  Kafka는 서버 클러스터 내에서 데이터 스트림을 레코드로 유지하는 방식으로 작동하는 브로커 기반 솔루션이다. Kafka 서버는 여러 데이터 센터에 분산되어 있을 수 있으며 여러 서버 인스턴스에 걸쳐 레코드 스트림(메시지)을 토픽으로 저장하여 데이터 지속성을 제공할 수 있다. 토픽은 레코드 또는 메시지를 키, 값 및 타임 스탬프로 구성된 일련의 튜플, 변경 불가능한 Python 객체 시퀀스로 저장한다.

  - [Kafka 공식 사이트](https://kafka.apache.org/)
  - [Kafka 공식 문서](https://kafka.apache.org/documentation/)



## Apache Kafka의 사용 사례

  Apache Kafka는 오늘날 시장에서 가장 빠르게 성장하는 오픈 소스 메시징 솔루션 중 하나다. 주로 분산 시스템에 우수한 로깅 메커니즘을 제공하는 아키텍처 기반 설계 패턴 때문이다.

  실시간 로그 스트리밍을 위해 특별히 제작된 Apache Kafka는 다음 사항을 필요로 하는 애플리케이션에 적합하다.
  - 서로 다른 구성 요소 간의 안정적인 데이터 교환
  - 애플리케이션 요구 사항 변경에 따라 메시징 워크로드를 분할하는 기능
  - 데이터 처리를 위한 실시간 스트리밍
  - 데이터/메시지 재생에 대한 기본 지원


## Apache Kafka의 구성요소

  ![Apache Kafka 구성요소](https://miro.medium.com/max/1400/1*DmzwWAyl437Iktk-60RWKQ.png)


  - Event(메시지)
      : kafka에서 Producer와 Consumer가 데이터를 주고 받는 단위

  - Producer
      : kafka에 이벤트를 post하는 클라이언트 어플리케이션. Producer가 전달하는 이벤트는 Topic Partition에 순차적으로 저장된다.

  - Consumer
      : Topic을 구독하고 얻어낸 이벤트를 처리하는 클라이언트 어플리케이션. 여러 Consumer를 하나의 Consumer Group에 지정하면 이벤트를 가져올 때 로드 밸런싱 하거나 공유할 수 있다.

  - Topic
      : 이벤트가 쓰이는 곳(주소). Producer는 Topic에 이벤트를 post하고, Consumer는 Topic으로부터 이벤트를 가져와 처리한다. Topic은 파일시스템의 폴더와 유사하며, 이벤트는 폴더 안의 파일과 유사하다. Topic에 저장된 이벤트는 필요한만큼 다시 읽을 수 있다. Topic은 이벤트를 post 및 구독할 수 있다.

  - Partition
      : Topic은 여러 Broker에 분산되어 저장되며, 이렇게 분산된 Topic은 Partition에 순차적으로 추가된다. 어떤 이벤트가 Partition에 저장될지는 이벤트의 Key에 의해 정해지며, 같은 키를 가지는 이벤트는 항상 같은 Partition에 저장된다.
      Kafka는 Topic의 Partition에 지정된 Consumer가 항상 정확히 동일한 순서로 Partition의 이벤트를 읽을 것을 보장한다. 
      > Offset: 이벤트(메시지 혹은 레코드)를 식별하는데 사용하는 순차 ID
      

## Apache Kafka의 주요 개념

  - Producer와 Consumer의 분리
    
      : Kafka의 Producer와 Consumer는 완전히 별개로 동작한다. Producer는 Broker의 Topic에 메시지를 post하기만 하고, Consumer는 Broker의 특정 메시지를 가져와 처리한다.

      이러한 이유로 높은 확장성을 제공한다. 즉, Producer 또는 Consumer를 필요에 의해 스케일 인 아웃하기에 용이한 구조를 가진다. 만약, Producer와 Consumer가 직접적인 연관을 갖는다면 모두 연결 혹은 해제를 하기 번거로울 것이다.

  - Push와 Pull 모델
    
      : Kafka의 Consumer는 Pull 모델을 기반으로 메시지를 처리한다. 즉, Broker가 Consumer에게 메시지를 전달하는 것이 아니라 Consumer가 Broker로부터 메시지를 가져와 처리한다.

      이러한 형태는 다음의 장점을 갖는다.
      
      1. 소비자의 처리 형태와 속도를 고려하지 않아도 된다.      
        반대의 경우인 Push 모델에서는 Broker가 데이터 전송 속도를 제어하기 때문에 다양한 메시지 스트림의 소비자를 다루기 어렵지만, **Pull 모델은 Consumer가 처리 가능한 때에 메시지를 가져와 처리**하기 때문에 다양한 소비자를 다루기 쉽다.
      
      2. 불필요한 지연없이 일괄처리를 통해 성능을 향상시킨다.  
        Push 모델의 경우에는 요청을 즉시 보내거나 더 많은 메시지를 한번에 처리하기 위해 Buffering을 할 수 있지만 이런 경우 Consumer가 현재 메시지를 처리할 수 있음에도 대기를 해야한다. 그렇다고 전송 지연시간을 최소로 변경하면 한번에 하나의 메시지만 보내도록 하는 것과 같으므로 매우 비효율적이다. Pull 모델의 경우 마지막으로 처리된 메시지 이후의 메시지를 Consumer가 처리가능한 때에 모두 가져오기 때문에 불필요한 지연없이 최적의 일괄처리를 할 수 있다.

  - 소비된 메시지 추적 (Commit과 Offset)

    ![offset](https://miro.medium.com/max/1128/0*dEeuSOb7Z8K7---q.png)
    
    : 메시지는 지정된 Topic에 전달되고 Topic은 다시 여러 Partition으로 나뉠 수 있다. 각 파티션의 한칸을 로그라고 칭하며 메시지는 로그에 순차적으로 append된다. 그리고 메시지의 상대적인 위치를 offset이라고 한다.

    메시징 시스템은 Broker에서 소비된 메시지에 메타데이터를 유지한다. 즉, 메시지가 Consumer에게 전달되면 Broker는 이를 로컬에 저장하거나 소비자의 승인을 기다린다.

    - Commit과 Offset
      - Consumer의 Poll은 이전에 commit한 offset이 존재하면 해당 offset 이후의 메시지를 읽어온다. 그리고 읽어온 마지막 offset을 commit한다. poll이 실행되면 방금 전 commit한 offset 이후의 메시지를 읽어와 처리한다.






# Strimzi


  Strimzi는 Apache Kafka on Kubernetes and Openshift를 목표로 운영되는 오픈소스 프로젝트


## 구성 방법






# References

- [Kafka 공식 사이트](https://kafka.apache.org/)
- [Kafka 공식 문서](https://kafka.apache.org/documentation/)
- [Kafka 개념 및 구성요소](https://galid1.tistory.com/793) 
- [Strimzi 구성 방법](https://chancethecoder.tistory.com/22)