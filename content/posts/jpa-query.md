---
template: SinglePost
title: JPA (1) - Query
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

## JPA Query

### JPA에서 지원하는 쿼리

#### JPQL(Java Persistence Query Language)

엔티티 객체를 대상으로 하는 객체지향 쿼리 언어이다. 

- JPQL을 사용하면 JPA는 이 JPQL을 분석한 다음 적절한 SQL을 만들어 데이터베이스를 조회한다. 그리고 조회한 결과로 엔티티 객체를 생성해서 반환한다.

- 특징
  - 테이블이 아닌 객체를 대상으로 검색하는 객체지향 쿼리이다.
  - SQL을 추상화해서 특정 데이터베이스 SQL에 의존하지 않는다.

#### Criteria Query

JPQL을 편하게 작성하도록 도와주는 API, 빌더 클래스 모음. JPA 2.0에 추가되었다.

- 장점
  - 문자가 아닌 프로그래밍 코드로 JPQL을 작성할 수 있어 컴파일 시점에 오류를 발견할 수 있다.
  - IDE를 사용하면 코드 자동완성을 지원한다.
  - 동적 쿼리를 작성하기 편하다.
  - 변환되는 JPQL을 캐싱하여 성능을 향상시킬 수 있다. https://kohen.tistory.com/4

#### Native SQL

JPA에서 JPQL 대신 직접 SQL을 사용할 수 있다.

- 특정 데이터베이스에 의존하는 기능을 사용할 때 장점을 가지지만, 데이터베이스를 변경하면 Native SQL도 수정해야 한다.

#### QueryDSL

Criteria Query처럼 JPQL을 편하게 작성하도록 도와주는 빌더 클래스 모음, 비표준 오픈소스 프레임워크다. (JPA 표준은 아니고 오픈소스 프로젝트이다.)

- 장점
  - 코드 기반이며 단순하고 사용하기 쉽다.
  - 작성한 코드도 JPQL과 비슷해서 한눈에 파악할 수 있다.





### JPA Query Parameters

#### Statement / Prepared Statement 클래스

SQL을 실행할 수 있는 클래스로, 큰 차이는 캐시 사용여부이다.

##### Statement 클래스

- 단일로 사용될 때 속도가 빠르다.
- 쿼리에 인자를 부여할 수 없다.
- 매번 컴파일을 수행해야 한다.

##### PreparedStatement 클래스

- 쿼리에 인자를 부여할 수 있다.
- 처음 프리 컴파일된 후, 이후에는 컴파일을 수행하지 않는다.
- 여러번 수행될 때 속도가 빠르다.
- 동작 방식
  - 애플리케이션은 특정값은 지정하지 않은 채로 틀을 만들고 DBMS로 보낸다.
  - DBMS는 틀을 컴파일(최적화 및 변환)하며 실행하지 않고 결과만 저장한다.
  - 변수에 값을 지정하면 실행하고, 여러 값으로 원하는 횟수만큼 실행할 수 있다.



#### JPA Query Parameters

- JDBC prepared statement 파라미터와 비슷하게 JPA도 파라미터화한 쿼리를 사용할 수 있다.



##### Positional parameters

- 위치 매개변수를 사용하면 매개 변수를 내장하고 있을 때 JPQL Injection 공격 위험을 피할 수 있다.

```java
TypedQuery<Employee> query = em.createQuery(
  "SELECT e FROM Employee e WHERE e.empNumber = ?1", Employee.class);
String empNumber = "A123";
Employee employee = query.setParameter(1, empNumber).getSingleResult();

// collection-valued
TypedQuery<Employee> query = entityManager.createQuery(
  "SELECT e FROM Employee e WHERE e.empNumber IN (?1)" , Employee.class);
List<String> empNumbers = Arrays.asList("A123", "A124");
List<Employee> employees = query.setParameter(1, empNumbers).getResultList();
```



##### Named parameters

- 위치 매개변수와 비슷하지만 명명된 매개변수를 사용하면 보다 명확하게 쿼리를 읽을 수 있다.

```java
TypedQuery<Employee> query = em.createQuery(
  "SELECT e FROM Employee e WHERE e.empNumber = :number" , Employee.class);
String empNumber = "A123";
Employee employee = query.setParameter("number", empNumber).getSingleResult();

// collection-valued
TypedQuery<Employee> query = entityManager.createQuery(
  "SELECT e FROM Employee e WHERE e.empNumber IN (:numbers)" , Employee.class);
List<String> empNumbers = Arrays.asList("A123", "A124");
List<Employee> employees = query.setParameter("numbers", empNumbers).getResultList();
```

- JPA 규격은 Native Query에 의해 지원되는 Named parameter를 지원하지는 않는다.
- Hibernate와 같은 일부 구현체가 Named parameter를 지원하더라도 쿼리의 휴대성이 떨어진다.



#### Criteria Query Parameters

- JPA query는 JPA Criteria API를 사용해서 작성할 수 있다. 

  (Hibernate 공식 Docs https://docs.jboss.org/hibernate/orm/5.2/topical/html_single/metamodelgen/MetamodelGenerator.html)

- 이름이나 Index 대신 객체를 사용해서 매개변수를 나타낸다.

```java
CriteriaBuilder cb = em.getCriteriaBuilder();
 
CriteriaQuery<Employee> cQuery = cb.createQuery(Employee.class);
Root<Employee> c = cQuery.from(Employee.class);
ParameterExpression<String> paramEmpNumber = cb.parameter(String.class);
cQuery.select(c).where(cb.equal(c.get(Employee_.empNumber), paramEmpNumber));
 
TypedQuery<Employee> query = em.createQuery(cQuery);
String empNumber = "A123";
query.setParameter(paramEmpNumber, empNumber);
Employee employee = query.getResultList();
```

- Hibernate metamodel generator로 class를 생성하여 정적 JPA metamodel의 일부로서 단단한(?) critera query를 만들 수 있다.







### Spring Data JPA Query Method

| Keyword                | Sample                                                       | JPQL snippet                                                 |
| :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `And`                  | `findByLastnameAndFirstname`                                 | `… where x.lastname = ?1 and x.firstname = ?2`               |
| `Or`                   | `findByLastnameOrFirstname`                                  | `… where x.lastname = ?1 or x.firstname = ?2`                |
| `Is`, `Equals`         | `findByFirstname`,`findByFirstnameIs`,`findByFirstnameEquals` | `… where x.firstname = ?1`                                   |
| `Between`              | `findByStartDateBetween`                                     | `… where x.startDate between ?1 and ?2`                      |
| `LessThan`             | `findByAgeLessThan`                                          | `… where x.age < ?1`                                         |
| `LessThanEqual`        | `findByAgeLessThanEqual`                                     | `… where x.age <= ?1`                                        |
| `GreaterThan`          | `findByAgeGreaterThan`                                       | `… where x.age > ?1`                                         |
| `GreaterThanEqual`     | `findByAgeGreaterThanEqual`                                  | `… where x.age >= ?1`                                        |
| `After`                | `findByStartDateAfter`                                       | `… where x.startDate > ?1`                                   |
| `Before`               | `findByStartDateBefore`                                      | `… where x.startDate < ?1`                                   |
| `IsNull`, `Null`       | `findByAge(Is)Null`                                          | `… where x.age is null`                                      |
| `IsNotNull`, `NotNull` | `findByAge(Is)NotNull`                                       | `… where x.age not null`                                     |
| `Like`                 | `findByFirstnameLike`                                        | `… where x.firstname like ?1`                                |
| `NotLike`              | `findByFirstnameNotLike`                                     | `… where x.firstname not like ?1`                            |
| `StartingWith`         | `findByFirstnameStartingWith`                                | `… where x.firstname like ?1` (parameter bound with appended `%`) |
| `EndingWith`           | `findByFirstnameEndingWith`                                  | `… where x.firstname like ?1` (parameter bound with prepended `%`) |
| `Containing`           | `findByFirstnameContaining`                                  | `… where x.firstname like ?1` (parameter bound wrapped in `%`) |
| `OrderBy`              | `findByAgeOrderByLastnameDesc`                               | `… where x.age = ?1 order by x.lastname desc`                |
| `Not`                  | `findByLastnameNot`                                          | `… where x.lastname <> ?1`                                   |
| `In`                   | `findByAgeIn(Collection<Age> ages)`                          | `… where x.age in ?1`                                        |
| `NotIn`                | `findByAgeNotIn(Collection<Age> ages)`                       | `… where x.age not in ?1`                                    |
| `True`                 | `findByActiveTrue()`                                         | `… where x.active = true`                                    |
| `False`                | `findByActiveFalse()`                                        | `… where x.active = false`                                   |
| `IgnoreCase`           | `findByFirstnameIgnoreCase`                                  | `… where UPPER(x.firstame) = UPPER(?1)`                      |

- 사용 방법
  - Repository Method
  - @NamedQuery
  - @Query


### Statement / Prepared Statement 클래스

SQL을 실행할 수 있는 클래스로, 큰 차이는 캐시 사용여부이다.

#### Statement 클래스

- 단일로 사용될 때 속도가 빠르다.
- 쿼리에 인자를 부여할 수 없다.
- 매번 컴파일을 수행해야 한다.

#### PreparedStatement 클래스

- 쿼리에 인자를 부여할 수 있다.
- 처음 프리 컴파일된 후, 이후에는 컴파일을 수행하지 않는다.
- 여러번 수행될 때 속도가 빠르다.
- 동작 방식
  - 애플리케이션은 특정값은 지정하지 않은 채로 틀을 만들고 DBMS로 보낸다.
  - DBMS는 틀을 컴파일(최적화 및 변환)하며 실행하지 않고 결과만 저장한다.
  - 변수에 값을 지정하면 실행하고, 여러 값으로 원하는 횟수만큼 실행할 수 있다.



## References

- JPA Document https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference

- JPA Query https://www.baeldung.com/jpa-query-parameters

- JPA Specification: https://dzone.com/articles/using-spring-data-jpa-specification

- JPA Specification Example: 

  [https://velog.io/@hellozin/JPA-Specification%EC%9C%BC%EB%A1%9C-%EC%BF%BC%EB%A6%AC-%EC%A1%B0%EA%B1%B4-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0](https://velog.io/@hellozin/JPA-Specification으로-쿼리-조건-처리하기)

- https://hojak99.tistory.com/503

- https://javacan.tistory.com/entry/SpringDataJPA-Specifcation-Usage

- Spring Data JPA와 QueryDSL 이해 https://ict-nroo.tistory.com/117

