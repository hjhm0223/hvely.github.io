---
template: SinglePost
title: Spring Integration 구조
status: Published
date: '2022-09-15'
featuredImage: >-
  https://t1.daumcdn.net/cfile/tistory/9941A1385B99240D2E
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---

![spring](https://t1.daumcdn.net/cfile/tistory/9941A1385B99240D2E)

# Spring Integration

Spring Integration 은 통합 인터페이스를 위한 프레임워크다. 스프링 기반 애플리케이션에서 경량 메시지를 사용 가능하게 하고 외부 시스템을 선언적 어댑터로 쉽게 통합할 수 있는 기능을 제공한다. 이런 어댑터들은 높은 수준의 추상화 레벨을 제공하기 때문에 어댑터들을 통해서 개발자들이 조금 더 비즈니스 로직에 집중할 수 있도록 도와준다.
구현 방법은 xml, java config, java dsl

## Components
Spring Integration 은 하나 이상의 컴포넌트로 구성되며, 각각 컴포넌트들의 종류는 아래와 같다.

- 채널: 한 요소로부터 다른 요소로 메시지를 전달
- 필터: 조건에 맞는 메시지가 플로우를 통과하게 해줌
- 변환기: 메시지 값을 변경하거나 메시지 페이로드의 타입을 다른 타입으로 변환
- 라우터: 여러 채널 중 하나로 메시지를 전달하며 대개 메시지 헤더를 기반으로 함
- 분배기: 들어오는 메시지를 두 개 이상의 메시지로 분할하며, 분할된 각 메시지는 다른 채널로 전송
- 집적기: 분배기와 상반된 것으로 별개의 채널로부터 전달되는 다수의 메시지를 하나의메시지로 결합함
- 서비스 액티베이터: 메시지를 처리하도록 자바 메서드에 메시지를 넘겨준 후 메서드의 반환값을 출력 채널로 전송
- 채널 어댑터: 외부 시스템에 채널을 연결함. 외부 시스템으로부터 입력을 받거나 쓸 수 있음
- 게이트웨이: 인터페이스를 통해 통합플로우로 데이터를 전달




## Refrences
- [Spring Integration Introduction - Baeldung](https://www.baeldung.com/spring-integration)