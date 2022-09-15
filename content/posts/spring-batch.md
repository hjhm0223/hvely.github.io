---
template: SinglePost
title: Spring Batch
status: Published
date: '2022-03-16'
featuredImage: >-
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

# Spring Batch

**Batch**
- 큰 단위의 작업을 일괄 처리
- 대부분 처리량이 많고 **비 실시간성 처리**에 사용
  - 대용량 데이터 계산, 정산, 통계, 데이터베이스, 변환 등
- 컴퓨터 **자원을 최대로 사용**
  - 컴퓨터 자원 사용이 낮은 시간대에 배치를 처리하거나
  - 배치만 처리하기 위해 사용자가 사용하지 않는 또다른 컴퓨터 자원을 사용
- 사용자 상호작용으로 실행되기 보단, 스케줄러와 같은 시스템에 의해 실행되는 대상
  - 일반 API는 요청/응답이 실시간으로 실행되지만 Batch는 비실시간으로 실행
  - 예) 매일 오전 10시에 배치 실행
  - crontab, jenkins, ...

**Spring Batch**
- Batch 처리를 위한 Spring Framework 기반 기술
  - Spring에서 지원하는 기술 적용 가능
  - DI, AOP, 서비스 추상화
- 스프링 배치의 실행 단위인 Job과 Step
- 비교적 간단한 작업(Tasklet) 단위 처리와 대량 묶음(Chunk) 단위 처리


## Job과 Step

- Job은 Spring Batch의 실행 단위이며, Step은 Job의 실행 단위이다.
- Step은 Tasklet이라는 객체로 task를 실행할 수 있다.

**Job**
- Job은 Spring Batch의 실행 단위

**Step**
- 