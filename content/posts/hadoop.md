---
template: SinglePost
title: Hadoop
status: Published
date: '2021-11-25'
featuredImage: >-
  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHx0w8ellJgMCmKY9tys8BWMjZfFtF5ZvLREeYiq65y5yeXld7E0kk9eGrOxp2Yfo83jI&usqp=CAU
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

# Hadoop

Hadoop은 `대용량 데이터를 분산 처리할 수 있는 자바 기반의 오픈소스 프레임워크`다. 분산 저장 기술인 HDFS와 분산처리 기술인 맵리듀스가 큰 장점이며, 오픈소스가 되면서 많은 주목과 인기를 끌고 있다.

- [Hadoop 공식사이트](https://hadoop.apache.org/)

## 구성요소

### HDFS(Hadoop Distributed FileSystem, 하둡 분산형 파일시스템)

여러 디스크로부터 데이터를 한번에 읽는 것을 말한다. 드라이브 저장 용량이 크게 증가하였지만 엑세스 속도는 그에 미치지 못하기 때문에 드라이브를 읽는데 오랜 시간이 걸린다. 하둡은 여러개의 드라이브에 데이터를 나누어 저장하였다가 병렬로 처리하기 때문에 시간이 훨씬 단축된다.

- 하둡의 분산처리 단계
  - 맵리듀스: 하둡에서 분산처리를 위해 사용하는 기술
  - 클러스터에서 데이터 읽기 -> 동작 실행 -> 클러스터에 결과 기록 -> 데이터 업데이트된 내용 읽기 -> 다음 동작 실행 -> 클러스터에 결과 기록
- 하둡을 사용하는 이유

### MapReduce
### Hive

## 특징