---
template: SinglePost
title: JPA Specification
status: Published
date: '2020-04-01'
featuredImage: >-
  https://cdn.inflearn.com/public/courses/324109/course_cover/161476f8-f0b7-4b04-b293-ce648c2ea445/kyh_jsp.png
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---


![jpa](https://cdn.inflearn.com/public/courses/324109/course_cover/161476f8-f0b7-4b04-b293-ce648c2ea445/kyh_jsp.png)

## Spring Data JPA의 Specification을 이용한 검색 조건

**Specification**은 DB 쿼리 조건을 스펙으로 작성해 Repository method에 적용하거나 몇가지 스펙을 조합해서 사용할 수 있게 도와준다. 

### 장점

  - 검색 조건을 추상화한 Specification을 사용하여 단순하게 조합할 수 있다.

    Criteria와 같은 실제 구현 기술의 타입을 사용하지 않아도 된다.

  - 검색 조건을 생성할 때 도메인의 용어를 사용할 수 있다.

### 지원 메소드

  - long count(Specification<T> spec)
    
    spec에 명시된 조건을 만족하는 객체의 개수를 리턴한다.
  - List<T> findAll(Specification<T> spec)
  
    spec에 명시된 조건을 만족하는 객체들을 리턴한다.
  - T findOne(Specification<T> spec)
    
    spec에 명시된 조건을 만족하는 객체를 하나 리턴한다.
  - sort
    
    정렬
  - paginate
    
    페이징 처리

### Specification 사용 방법

  1. Specification을 입력 받도록 Repository 인터페이스 정의하기
  2. 검색 조건을 모아놓은 클래스 만들기. JPA의 Criteria API를 사용하여 구현한다.
  3. 검색 조건을 조합한 Specification 인스턴스를 이용해서 검색하기




## References

- JPA Document https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference

- JPA Specification: https://dzone.com/articles/using-spring-data-jpa-specification

- JPA Specification Example: 

  [https://velog.io/@hellozin/JPA-Specification%EC%9C%BC%EB%A1%9C-%EC%BF%BC%EB%A6%AC-%EC%A1%B0%EA%B1%B4-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0](https://velog.io/@hellozin/JPA-Specification으로-쿼리-조건-처리하기)

- https://hojak99.tistory.com/503

- https://javacan.tistory.com/entry/SpringDataJPA-Specifcation-Usage

- Spring Data JPA와 QueryDSL 이해 https://ict-nroo.tistory.com/117

