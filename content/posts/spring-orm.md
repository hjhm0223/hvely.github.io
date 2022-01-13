---
template: SinglePost
title: ORM과 JPA (1)
status: Published
date: '2020-04-07'
featuredImage: >-
  https://blog.kakaocdn.net/dn/ZxKaR/btq6aPMQxBD/HhJXL4DKopWEevoOqqj79K/img.png
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---

## JDBC (Java DataBase Connection) 란?

 - `데이터베이스 서버에 접속해서 쿼리를 수행`하고, 그 결과를 프로그램상에서 사용할 수 있도록 제공하는 API이다.
 - 다양한 데이터 서버들을 공통적으로 대응할 수 있도록 제공되는 스펙이다.
 - 서로 다른 데이터베이스라고 하더라도 동일한 메서드를 사용해 Connection 객체를 얻어서 접속할 수 있다.
 - 로직 처리를 SQL로 하게 되고, 자바를 쿼리와 결과를 매핑하는 용도로 사용한다.
 - `한계`
    - 데이터베이스에서 데이터를 얻기 위해서는 DML문을 데이터베이스 서버에 전달해야 하는데, 시스템의 규모가 커지고 로직이 복잡해짐에 따라서 길어진 쿼리문을 문자열과 소스가 결합된 형태로 개발하는 것에 대한 불편함이 있다.
    - 추상화 계층 없이 직접적으로 SQL을 통해서 제어하면 빠르게 개발이 가능하지만 상태 변화가 객체가 아니라 데이터베이스상에서 일어나므로 상태를 제어하기 위해서는 데이터베이스를 제어할 수 있는 SQL을 수행하는 코드를 반복적으로 작성해야 한다.
 - `해결책`
    - SQL Mapper
    - ORM (JPA, Hibernate 등)    


## ORM (Object-Relational Mapping) 이란?

 - `객체와 관계형 데이터베이스 매핑`, 객체가 DB의 테이블이 되도록 매핑시켜주는 프레임워크이다.
 - 프로그램의 복잡도를 줄이고 자바 객체와 쿼리를 분리할 수 있다.
 - 트랜잭션 처리나 기타 데이터베이스 관련 작업들을 좀 더 편리하게 처리할 수 있는 방법이다.
 - 코드의 반복을 줄이고 `객체 중심의 설계`에 집중할 수 있다.
 - SQL Query가 아닌 `직관적인 코드(메서드)`로서 데이터를 조작할 수 있다.  
    - 기존쿼리: SELECT * FROM MEMBER;  
    - ORM: Member테이블과 매핑된 객체가 member라고 할 때, member.findAll()이라는 메서드 호출로 데이터 조회가 가능하다.  


### JPA (Java Persistence API) 란?
 - `자바 ORM 기술에 대한 API 표준 명세`
 - ORM을 사용하기 위한 인터페이스를 모아둔 것이라고 볼 수 있다.
 - `자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스`이다.
 - Hibernate, OpenJPA, EcipseLink, DataNucleus, TopLink 등이 JPA 구현체이다.  
*결국 인터페이스이기 때문에 JPA를 사용하기 위해서는 JPA를 구현한 Hibernate, EclipseLink, DataNucleus 같은 ORM 프레임워크를 사용해야 한다.

### Hibernate 란?
 - `JPA를 구현한 ORM 프레임워크` 중 하나. (자바를 위한 오픈소스 ORM 프레임워크를 제공한다.)
 - javax.persistence.EntityManager와 같은 JPA의 인터페이스를 직접 구현한 라이브러리이다.

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbUHeS3%2FbtqCaRN7gVh%2F0ZQRYe0CF6tQeD3d9d8ITk%2Fimg.png)


### 장단점
#### 장점
1. `생산성이 뛰어나고 유지보수가 용이하다.`(데이터베이스 중심 설계에서 객체 중심 설계로 변경됨에 따른)
    - 객체 지향적인 코드로 인해 더 직관적이고 비즈니스 로직에 더 집중할 수 있게 도와준다.
    - 객체지향적으로 데이터를 관리할 수 있기 때문에 전체 프로그램 구조를 일관되게 유지할 수 있다.
    - SQL을 직접적으로 작성하지 않고 객체를 사용하여 동작하기 때문에 유지보수가 더욱 간결하고, 재사용성도 증가하여 유지보수가 편리해진다.
    - DB컬럼이 추가될 때마다 테이블 수정이나 SQL 수정하는 과정이 많이 줄어들고, 값을 할당하거나, 변수 선언등의 부수적인 코드 또한 급격히 줄어든다.
    - 각각의 객체에 대한 코드를 별도로 작성하여 코드의 가독성도 올라간다.

2. `DBMS에 대한 종속성이 줄어든다.`
    - DBMS가 변경된다 하더라도 소스, 쿼리, 구현 방법, 자료형 타입 등을 변경할 필요가 없다.
    - 즉 프로그래머는 Object에만 집중하면 되고, DBMS를 교체하는 작업에도 비교적 적은 리스크와 시간이 소요된다. (특히 요즘은 탈Oracle을 하여 MariaDB 등의 무료, 오픈소스 기반의 DMBS로 변경하는 기업이 늘고 있는데 이럴때 개발자들이 신경쓸 부분이 현저히 줄어든다.)

#### 단점
1. 어렵다.
    - JPA의 장점을 살려 잘 사용하려면 학습 비용이 높은 편이다.
    - 복잡한 쿼리를 사용해야 할 때에 불리하다.
   업무 비즈니스가 매우 복잡한 경우 JPA로 처리하기 어렵고, 통계처리와 같은 복잡한 쿼리 자체를 ORM으로 표현하는데 한계가 있다. (실시간 처리용 쿼리에 더 최적화되어 있다고 봐도 무방할 것이다.)
    - 결국 기존 데이터베이스 중심으로 되어 있는 환경에서는 JPA를 사용하기도 어렵고, 힘을 발휘하기 어렵다.
    - 잘못사용할 경우 실제 SQL문을 직접 작성하는 것보다는 성능이 비교적 떨어질 수 있다.
    - 대용량 데이터 기반의 환경에서도 튜닝이 어려워 상대적으로 기존 방식보다 성능이 떨어질 수 있다.

### 설정 방법
* Reference: https://goddaehee.tistory.com/209


## Spring Data
 - `NoSQL 또는 RDMBS 어느 한쪽만을 목표로 하지 않는 새로운 스펙이다.`
 - 추상화된 인터페이스를 통해서 다양한 저장소(MySQL, ElasticSearch, Redis 등)를 활용할 수 있다.


### Spring Data JPA
 - JPA, Hibernate에 비해 Spring project에 적용이 수월하다.
 - 추상화가 잘 되어 있어 데이터베이스를 NoSQL로 변경하더라도 Repository 인터페이스에 정의된 동일한 메소드 시그니처를 사용할 수 있다.
 - Repository 구조
![image](https://i2.wp.com/softwareengineeringdaily.com/wp-content/uploads/2018/01/SpringData.jpg?resize=638%2C389&ssl=1)
    - JpaRepository를 상속받으면 대부분의 기능이 구현 가능하다.


### Spring Data JPA 활용
1. Entity Class 설정  
    - 데이터베이스 테이블을 매핑하는 역할을 한다.

2. 데이터베이스와 key 매핑  
    - class(@Id)와 table(Primary key)
    - Primary Key 설정 Annotation  

    | Table | key값을 데이터베이스 테이블로 표현할 경우 |
    | ------ | ------ |
    | Sequence | 데이터베이스의 sequence 객체와 매핑할 때 |
    | Identity | Auto를 지원하지 않는 경우, Identity 속성으로 직접 지정해서 사용할 수 있다. |
    | Auto | 데이터베이스에 자동으로 key 관련 객체를 생성한다. |   

    ```java
    @Entity
    @Table(name="users")
    public class UserEntity implements Serializable {
    
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
    
        ...
    }
    ```
    - @Id Annotation을 이용해서 Primary Key 값과 매핑한다.
    - 실제 테이블명과 클래스명이 다를경우 @Table Annotation을 추가해서 매핑한다.

3. 날짜 형식 매핑
    - 날짜와 같이 매핑 시에 값 참조를 위해서 미리 인스턴스가 생성되어야 하는 필드는 JPA에서 제공하는 콜백 메서드를 사용해서 값을 세팅할 수 있다.  
    
    ```java
    @Entity
    @Table(name="users")
    public class UserEntity implements Serializable {
    
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private Date createdAt;

        @PrePersist
        public void beforeCreate() {
            createdAt = new Date();
        }

        ...
    }
    ```    

4. @Enemerated Annotation을 사용하여 값 매핑  
    - 코드성 데이터와 데이터베이스를 매핑할 때 Enum으로 선언 후 @Enumerated Annotation을 사용하여 매핑하면 된다.  

    ```java
    public enum UserRole {
    
        USER, //0
        ADMIN //1
    }
    ```  

    ```java
    @Entity
    @Table(name="users")
    public class UserEntity implements Serializable {
    
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private Date createdAt;

        @Column(name="role")
        @Enumerated(EnumType.ORDINARY) //Ordinary는 int, STRING은 ENUM의 이름으로 할당
        private UserRole role;

        ...
    }
    ```  

    - 데이터베이스의 필드명과 Java 클래스명이 서로 다를 경우 @Column Annotation을 사용해서 매핑한다.

5. Repository Class 작성
    - Entity 조작에 필요한 쿼리를 메서드화해서 사용할 수 있는 역할을 한다.  

    ```java
    @Repository
    public interface UserRepository extends JpaRepository<UserEntity, Long> {

    }
    ```
    - JpaRepository 쿼리 메서드 사용
    - main 메서드 실행



