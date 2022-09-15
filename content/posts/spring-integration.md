---
template: SinglePost
title: Spring Integration 구조
status: Published
date: '2022-09-15'
featuredImage: >-
  https://miro.medium.com/max/600/0*4ey919rCEKU867pM.png
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---

![Spring Integration](https://miro.medium.com/max/600/0*4ey919rCEKU867pM.png)

# Spring Integration

Spring Integration 은 통합 인터페이스를 위한 프레임워크다. 스프링 기반 애플리케이션에서 경량 메시지를 사용 가능하게 하고 외부 시스템을 선언적 어댑터로 쉽게 통합할 수 있는 기능을 제공한다. 이런 어댑터들은 높은 수준의 추상화 레벨을 제공하기 때문에 어댑터들을 통해서 개발자들이 조금 더 비즈니스 로직에 집중할 수 있도록 도와준다.
> 구현 방법: xml, java config, java dsl

## Components
Spring Integration 은 하나 이상의 컴포넌트로 구성되며, 각각 컴포넌트들의 종류는 아래와 같다.

- Channel: 한 요소로부터 다른 요소로 메시지를 전달
- Filter: 조건에 맞는 메시지가 플로우를 통과하게 해줌
- Transformer: 메시지 값을 변경하거나 메시지 payload의 타입을 다른 타입으로 변환
- Router: 여러 채널 중 하나로 메시지를 전달하며 대개 메시지 헤더를 기반으로 함
- Splitter: 들어오는 메시지를 두 개 이상의 메시지로 분할하며, 분할된 각 메시지는 다른 채널로 전송
- Aggregator: 분배기와 상반된 것으로 별개의 채널로부터 전달되는 다수의 메시지를 하나의메시지로 결합함
- Service Activator: 메시지를 처리하도록 자바 메서드에 메시지를 넘겨준 후 메서드의 반환값을 출력 채널로 전송
- Channel Adapter: 외부 시스템에 채널을 연결함. 외부 시스템으로부터 입력을 받거나 쓸 수 있음
- Gateway: 인터페이스를 통해 통합플로우로 데이터를 전달

### Message
  ![Message](https://docs.spring.io/spring-integration/docs/current/reference/html/images/message.jpg)

  Spring Integration에서 메시지는 메타데이터와 결합된 모든 Java 객체이며, payload와 헤더로 구성된다. payload는 모든 유형이 될 수 있으며 헤더에는 ID, 타임스탬프, correlation ID 및 반환 주소와 같은 일반적으로 필요한 정보가 들어 있다. 헤더는 연결된 전송 간에 값을 전달하는 데에도 사용되며, 임의의 키-값 쌍을 저장할 수도 있다.
### Message Channel
  ![Message Channel](https://docs.spring.io/spring-integration/docs/current/reference/html/images/channel.jpg)

  메시지 채널은 파이프 및 필터 아키텍처에서 `파이프`를 나타낸다. Producer는 채널에 메시지를 보내고 Consumer는 채널에서 메시지를 받는다. 따라서 메시지 채널은 메시징 구성 요소를 분리하고 메시지 가로채기 및 모니터링을 위한 편리한 지점을 제공한다.

### Message Endpoint

  메시지 Endpoint는 파이프 및 필터 아키텍처에서 `필터`를 나타낸다. Endpoint의 주요 역할은 애플리케이션 코드를 메시징 프레임워크에 분리된 방식으로 연결하는 것이다. 즉, 애플리케이션 코드는 이상적으로는 메시지나 메시지 채널을 인식하지 않아야 한다. MVC 패러다임에서 컨트롤러의 역할과 유사하다.

### Message Router
  ![Message Router](https://docs.spring.io/spring-integration/docs/current/reference/html/images/router.jpg)
  메시지 라우터는 메시지를 수신해야 하는 채널을 결정하는 역할을 한다. 일반적으로 결정은 메시지의 내용이나 메시지 헤더에서 사용할 수 있는 메타데이터를 기반으로 한다. 메시지 라우터는 응답 메시지를 보낼 수 있는 Service Activator 또는 다른 Endpoint에서 정적으로 구성된 출력 채널에 대한 동적 대안으로 종종 사용된다. 마찬가지로, 메시지 라우터는 앞에서 설명한 것처럼 여러 Subscriber가 사용하는 반응 메시지 필터에 대한 사전 대안을 제공한다.

### Splitter
  Splitter는 입력 채널에서 메시지를 수락하고 해당 메시지를 여러 메시지로 분할하고 각 메시지를 출력 채널로 보내는 또 다른 유형의 메시지 Endpoint다. 일반적으로 "복합" payload 개체를 세분화된 payload를 포함하는 메시지 그룹으로 나누는 데 사용된다.

### Aggregator
  기본적으로 Splitter의 미러 이미지인 Aggregator는 여러 메시지를 수신하여 단일 메시지로 결합하는 메시지 Endpoint 유형이다. 사실, Aggregator는 Splitter를 포함하는 파이프라인의 다운스트림 Consumer인 경우가 많다. 기술적으로 Aggregator는 상태(Aggregate 할 메시지)를 유지 관리하고, 전체 메시지 그룹을 사용할 수 있는 시기를 결정하고, 필요한 경우 시간을 초과해야 하기 때문에 Splitter보다 더 복잡하다. 또한 시간이 초과할 경우 Aggregator는 부분 결과를 보낼지, 폐기할지 또는 별도의 채널로 보낼지 알아야 한다. Spring Integration은 시간 초과 시 부분 결과를 보낼지 폐기할지에 대한 CorrelationStrategy, ReleaseStrategy와 구성 가능한 설정을 제공한다.


### Service Activator
  ![Service Activator](https://docs.spring.io/spring-integration/docs/current/reference/html/images/handler-endpoint.jpg)
  Service Activator는 서비스 인스턴스를 메시징 시스템에 연결하기 위한 일반 Endpoint다. 입력 메시지 채널을 구성해야 하며, 호출할 서비스 메서드가 값을 반환할 수 있는 경우 출력 메시지 채널도 제공할 수 있다.
  Service Activator는 일부 서비스 개체에 대한 작업을 호출하여 요청 메시지를 처리하고 요청 메시지의 페이로드를 추출하고 변환한다. 서비스 개체의 메서드가 값을 반환할 때마다 필요한 경우 해당 반환 값도 마찬가지로 응답 메시지로 변환된다. 해당 응답 메시지는 출력 채널로 전송된다. 출력 채널이 구성되지 않은 경우 사용 가능한 경우 메시지의 "반환 주소"에 지정된 채널로 응답이 전송된다.
  요청-응답 Service Activator Endpoint는 대상 개체의 메서드를 입력 및 출력 메시지 채널에 연결한다.

### Channel Adapter
  ![Channel Adapter]()
  Channel Adapter는 메시지 채널을 다른 시스템에 연결하는 Endpoint다. Channel Adapter는 인바운드 또는 아웃바운드일 수 있다. 일반적으로 채널 어댑터는 메시지와 다른 시스템(파일, HTTP 요청, JMS 메시지 등)에서 수신되거나 전송되는 개체 또는 리소스 간에 일부 매핑을 수행한다. 전송에 따라 채널 어댑터가 메시지 헤더 값을 채우거나 추출할 수도 있다. Spring Integration은 많은 Channel Adapter를 제공한다.


## Refrences
- [Spring Integration Docs](https://docs.spring.io/spring-integration/docs/current/reference/html/overview.html#spring-integration-introduction)
- [Spring Integration Introduction - Baeldung](https://www.baeldung.com/spring-integration)