---
template: SinglePost
title: Apache Spark (2) - RDD
status: Published
date: '2020-04-01'
featuredImage: >-
  https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/1200px-Apache_Spark_logo.svg.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![spark](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/1200px-Apache_Spark_logo.svg.png)



# RDD Programming

## RDD

- Spark 내부에 존재하는 분산 데이터에 대한 모델, 기본 데이터 구조
- 분산된 변경불가 자바 객체 컬렉션
- RDD는 읽기 전용으로 분할된 레코드의 모음
- 병렬로 작동할 수 있는 내결함성 요소의 집합
- 클러스터의 노드들 간에 파티션된 element의 컬렉션들이며 파티션이 분산처리 단위
- RDD는 사용자 정의 클래스를 포함하여 모든 종류의 Python, Java 또는 Scala 객체를 포함
- RDD 만드는 방법
  - 드라이버 프로그램에서 기존 컬렉션을 병렬화
  - 공유 파일 시스템, HDFS, HBase 또는 Hadoop 입력 포맷을 제공하는 데이터 소스와 같은 외부 스토리지 시스템의 데이터셋을 참조
  - `RDD는 변환/액션 두 종류의 처리를 적용`


### RDD Operations

- RDD 개요
  - 단순히 "값"으로 표현되는 데이터만 가리키는 것이 아니라 데이터를 다루는 방법까지 포함하는 일종의 클래스와 같은 개념
  - 스파크에서 내부적으로 연산하는 데이터들은 모두 RDD 타입으로 처리
  - RDD: 성능 최적화 미지원, 타입 기반 연산, Lazy Execution
  - DataFrame: 성능 최적화 기능, 비 타입 기반 연산, Lazy Execution
  - Dataset: 성능 최적화 기능, 타입/비 타입 연산 모두 지원, Lazy Execution
  - Transformation을 적용할 때 Action과는 달리 lazy하게 적용



### RDD 프로그래밍



### Shared Variables
