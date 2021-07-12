---
template: SinglePost
title: ORM과 JPA
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

### JDBC (Java DataBase Connection) 이란?

 - `데이터베이스 서버에 접속해서 쿼리를 수행`하고, 그 결과를 프로그램상에서 사용할 수 있도록 제공하는 API이다.
 - 다양한 데이터 서버들을 공통적으로 대응할 수 있도록 제공되는 스펙이다.
 - 서로 다른 데이터베이스라고 하더라도 동일한 메서드를 사용해 Connection 객체를 얻어서 접속할 수 있다.
 - 로직 처리를 SQL로 하게 되고, 자바를 쿼리와 결과를 매핑하는 용도로 사용한다.
 - `한계`
    - 데이터베이스에서 데이터를 얻기 위해서는 DML문을 데이터베이스 서버에 전달해야 하는데, 시스템의 규모가 커지고 로직이 복잡해짐에 따라서 길어진 쿼리문을 문자열과 소스가 결합된 형태로 개발하는 것에 대한 불편함이 있다.
    - 추상화 계층 없이 직접적으로 SQL을 통해서 제어하면 빠르게 개발이 가능하지만 상태 변화가 객체가 아니라 데이터베이스상에서 일어나므로 상태를 제어하기 위해서는 데이터베이스를 제어할 수 있는 SQL을 수행하는 코드를 반복적으로 작성해야 한다.
 - 해결책  
    - SQL Mapper
    - ORM (JPA, Hibernate 등)    


### ORM (Object-Relational Mapping) 이란?

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

#### Hibernate 란?
 - `JPA를 구현한 ORM 프레임워크` 중 하나. (자바를 위한 오픈소스 ORM 프레임워크를 제공한다.)
 - javax.persistence.EntityManager와 같은 JPA의 인터페이스를 직접 구현한 라이브러리이다.

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbUHeS3%2FbtqCaRN7gVh%2F0ZQRYe0CF6tQeD3d9d8ITk%2Fimg.png)


#### 장단점
##### 장점
1. `생산성이 뛰어나고 유지보수가 용이하다.`(데이터베이스 중심 설계에서 객체 중심 설계로 변경됨에 따른)
    - 객체 지향적인 코드로 인해 더 직관적이고 비즈니스 로직에 더 집중할 수 있게 도와준다.
    - 객체지향적으로 데이터를 관리할 수 있기 때문에 전체 프로그램 구조를 일관되게 유지할 수 있다.
    - SQL을 직접적으로 작성하지 않고 객체를 사용하여 동작하기 때문에 유지보수가 더욱 간결하고, 재사용성도 증가하여 유지보수가 편리해진다.
    - DB컬럼이 추가될 때마다 테이블 수정이나 SQL 수정하는 과정이 많이 줄어들고, 값을 할당하거나, 변수 선언등의 부수적인 코드 또한 급격히 줄어든다.
    - 각각의 객체에 대한 코드를 별도로 작성하여 코드의 가독성도 올라간다.

2. `DBMS에 대한 종속성이 줄어든다.`
    - DBMS가 변경된다 하더라도 소스, 쿼리, 구현 방법, 자료형 타입 등을 변경할 필요가 없다.
    - 즉 프로그래머는 Object에만 집중하면 되고, DBMS를 교체하는 작업에도 비교적 적은 리스크와 시간이 소요된다. (특히 요즘은 탈Oracle을 하여 MariaDB 등의 무료, 오픈소스 기반의 DMBS로 변경하는 기업이 늘고 있는데 이럴때 개발자들이 신경쓸 부분이 현저히 줄어든다.)

##### 단점
1. 어렵다.
    - JPA의 장점을 살려 잘 사용하려면 학습 비용이 높은 편이다.
    - 복잡한 쿼리를 사용해야 할 때에 불리하다.
   업무 비즈니스가 매우 복잡한 경우 JPA로 처리하기 어렵고, 통계처리와 같은 복잡한 쿼리 자체를 ORM으로 표현하는데 한계가 있다. (실시간 처리용 쿼리에 더 최적화되어 있다고 봐도 무방할 것이다.)
    - 결국 기존 데이터베이스 중심으로 되어 있는 환경에서는 JPA를 사용하기도 어렵고, 힘을 발휘하기 어렵다.
    - 잘못사용할 경우 실제 SQL문을 직접 작성하는 것보다는 성능이 비교적 떨어질 수 있다.
    - 대용량 데이터 기반의 환경에서도 튜닝이 어려워 상대적으로 기존 방식보다 성능이 떨어질 수 있다.

#### 설정 방법
* Reference: https://goddaehee.tistory.com/209


### Spring Data
 - `NoSQL 또는 RDMBS 어느 한쪽만을 목표로 하지 않는 새로운 스펙이다.`
 - 추상화된 인터페이스를 통해서 다양한 저장소(MySQL, ElasticSearch, Redis 등)를 활용할 수 있다.


### Spring Data JPA
 - JPA, Hibernate에 비해 Spring project에 적용이 수월하다.
 - 추상화가 잘 되어 있어 데이터베이스를 NoSQL로 변경하더라도 Repository 인터페이스에 정의된 동일한 메소드 시그니처를 사용할 수 있다.
 - Repository 구조
![image](https://i2.wp.com/softwareengineeringdaily.com/wp-content/uploads/2018/01/SpringData.jpg?resize=638%2C389&ssl=1)
    - JpaRepository를 상속받으면 대부분의 기능이 구현 가능하다.


### Spring Data JPA 활용
#### 1. Entity Class 설정
 - 데이터베이스 테이블을 매핑하는 역할을 한다.

#### 2. 데이터베이스와 key 매핑
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


#### 3. 날짜 형식 매핑
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


#### 4. @Enemerated Annotation을 사용하여 값 매핑  
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


#### 5. Repository Class 작성
 - Entity 조작에 필요한 쿼리를 메서드화해서 사용할 수 있는 역할을 한다.  

    ```java
    @Repository
    public interface UserRepository extends JpaRepository<UserEntity, Long> {

    }
    ```
  
 **- JpaRepository 쿼리 메서드 사용
 - main 메서드 실행**





## ORM

- **ORM**(Object Relational Mapping)에서 가장 어려운 부분이 `객체 연관관계와 테이블 연관관계를 매핑`하는 일이다.  
- 연관관계를 매핑할 때 다음 `3가지`를 고려해야 한다.
    1. **방향**(direction)
        - 단방향, 양방향 존재
        - 방향은 `객체 관계`에만 존재하고, 테이블은 항상 양방향
    2. **다중성**(multiplicity)
        - 다대일(N:1), 일대다(1:N), 일대일(1:1), 다대다(N:M) 존재
    3. **연관관계의 주인**(owner)
        - 객체를 양방향 연관관계로 만들면 연관관계의 `주인`을 정해야 한다.


### 객체 연관관계와 테이블 연관관계의 차이

- **객체 연관관계는 참조를 사용한다.**
    - 참조를 통한 연관관계는 언제나 `단방향`이다.
    - 객체간에 연관관계를 양방향으로 만들고 싶으면 반대쪽에도 필드를 추가해서 참조를 보관해야 한다.
    - 서로 다른 `단방향 관계가 2개`인 것  
    ```java
    // 단방향
    class A {
        B b;
    }
    class B {
    }


    // 양방향
    class A {
        B b;
    }
    class B {
        A a;
    }
    ```  
- **테이블 연관관계는 외래키를 사용한다.**
    - `조인`을 사용한다.
    - 항상 `양방향`이다.  
    ```sql
    SELECT * FROM A JOIN B on A.b = B.b
    SELECT * FROM B JOIN A on A.b = B.b  
    ```

### JPA를 사용하여 객체 연관관계와 테이블 연관관계 매핑

- **@ManyToOne**: (N:1) 관계라는 매핑 정보이다.
    - 속성  

    | 속성       | 기능                              | 기본값                                                   |
    |----------|---------------------------------|-------------------------------------------------------|
    | optional | false로 설정하면 연관된 엔티티가 항상 있어야 한다. | true                                                  |
    | fetch    | 글로벌 페치전략                        | @ManyToOne=FetchType.EAGER, @OneToMany=FetchType.LAZY |
    | cascade  | 연속성 전이 기능                       |                                                       |  
    
    - @ManyToOne의 로딩 방식
        - EAGER (즉시 로딩): 연결된 엔티티 정보까지 한 번에 가져오기 때문에 성능 문제가 발생할 수 있다. (무한루프)
        - LAZY (지연 로딩): proxy를 이용해서 데이터를 처리한다.

- **@JoinColumn**: 외래 키를 매핑할 때 사용한다.
    - 속성   

    | 속성                   | 기능                    | 기본값                         |
    |----------------------|-----------------------|-----------------------------|
    | name                 | 매핑할 외래 키 이름           | 필드명 + _ + 참조하는 테이블의 기본키 컬럼명 |
    | referencedColumnName | 외래키가 참조하는 대상 테이블의 컬럼명 | 참조하는 테이블의 기본키 컬럼명           |     
  
    - @JoinColumn을 생략하게 되면 기본 전략을 사용한다. (필드명_참조하는 테이블의 컬럼명. 예시: team_TEAM_ID)

- **@OneToMany**: (1:N) 관계라는 매핑 정보이다.
    - `mappedBy 속성`은 `양방향` 매핑일 때 사용한다.
    - `연관관계의 주인`: 양방향 연관관계 매핑 시 외래키 관리자 (외래키가 있는 곳, 일대다 관계에서 다 쪽이 항상 주인이다.)
    - 단방향 연관관계가 2개이므로 두 객체 연관관계 중 하나를 정해서 테이블의 외래키를 관리해야 한다.
    - 주인은 외래키 관리(등록, 수정, 삭제)가 가능하지만, 주인이 아니면 읽기만 할 수 있다.
    - 주인은 mappedBy 속성을 사용하지 않는다.
    - `주인이 아니면 mappedBy 속성을 사용해서 연관관계 주인을 지정해야 한다.` (mappedBy = "연관관계 주인의 field값")


## 연관관계
- 고려사항
    1. **다중성**
        - N:1(다대일, @ManyToOne)
        - 1:N(일대다, @OneToMany)
        - 1:1(일대일, @OneToOne)
        - N:M(다대다, @ManyToMany)
    2. **단방향, 양방향**
    3. **연관관계의 주인**

### 1. 다대일 (N:1)
- Member(N)와 Team(1)

#### 1.1 다대일 단방향
- Member (N) -> Team (1)
- Member (N)  
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        // 연관관계 매핑
        @ManyToOne
        @JoinColumn(name = "TEAM_ID")
        private Team team;

        // 연관관계 설정
        public void setTeam(Team team) {
            this.team = team;
        }

        ...
    }
    ```  
- Team (1)  
    ```java
    @Entity
    public class Team {
    
        @Id
        @Column(name = "TEAM_ID")
        private Long id;
        private String name;

        ...
    }
    ```  

#### 1.2 다대일 양방향
- Member (N) <-> Team (1)
- Member (N)  
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        // 연관관계 매핑
        @ManyToOne
        @JoinColumn(name = "TEAM_ID")
        private Team team;

        // 연관관계 편의 메소드
        public void setTeam(Team team) {
            this.team = team;

            if(!team.getMembers().contains(this)){ // 무한루프에 빠지지 않도록 체크
                team.getMembers().addthis();
            }
        }

        ...
    }
    ```  
- Team (1)  
    ```java
    @Entity
    public class Team {
    
        @Id
        @Column(name = "TEAM_ID")
        private Long id;
        private String name;

        // 일대다 매핑
        @OneToMany(mappedBy = "team")
        private List<Member> members = new ArrayList<Member>();

        // 연관관계 편의 메소드
        public void addMember(Member member) {
            this.members.add(member);

            if(member.getTeam() != this){ // 무한루프에 빠지지 않도록 체크
                member.setTeam(this);
            }
        }
        ...
    }
    ```  
    - mappedBy 속성에서 연관관계 주인인 Member의 field값 "team"을 지정한다.
    - Collection, List, Set, Map 중에 하나를 사용한다.
- 양방향 연관관계의 주의점
    - 연관관계 주인에 값을 입력하지 않고, 주인이 아닌 곳에만 값을 입력하면 데이터베이스의 외래키에 정상적으로 저장되지 않는다.
    - 객체 관점에서 양쪽 방향 모두 값을 입력해주는 것이 안전하다. (JPA를 사용하지 않는 경우 문제 발생)
    - 올바른 연관관계 설정    
    ```java
    // 연관관계 설정
    public void setTeam(Team team) {
        
        // 기존 팀과 관계 제거
        if (this.team != null) {
            this.team.getMembers().remove(this);
        }
        this.team = team;
        team.getMembers().addthis();
    }
    ```  

### 2. 일대다 (1:N)
#### 2.1 일대다 단방향
- Team (1)  
    ```java
    @Entity
    public class Team {
    
        @Id
        @Column(name = "TEAM_ID")
        private Long id;
        private String name;

        // 일대다 매핑
        @OneToMany
        @JoinColumn(name = "TEAM_ID")
        private List<Member> members = new ArrayList<Member>();

        ...
    }
    ```  

- Member (N)  
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        ...
    }
    ```  

- 일대다 단방향 매핑의 단점
    - 매핑한 객체가 관리하는 외래키가 다른 테이블에 있다.
    - 다른 테이블에 외래키가 있으면 연관관계 처리를 위한 UPDATE SQL을 추가로 실행해야 한다.
    - 성능 및 관리 문제가 있으므로 `다대일 양방향 매핑을 사용하는 것이 좋다.`

#### 2.2 일대다 양방향
- Team (1)  
    ```java
    @Entity
    public class Team {
    
        @Id
        @Column(name = "TEAM_ID")
        private Long id;
        private String name;

        // 일대다 매핑
        @OneToMany
        @JoinColumn(name = "TEAM_ID")
        private List<Member> members = new ArrayList<Member>();

        ...
    }
    ```  

- Member (N)  
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        // 일대다 매핑
        @ManyToOne
        @JoinColumn(name = "TEAM_ID", insertable = false, updatable = false) // 읽기만 가능하도록 설정
        private List<Member> members = new ArrayList<Member>();
        ...
    }
    ```  
    - 양쪽에서 같은 키를 관리하므로 다 쪽은 읽기만 가능하도록 설정해야 한다.
    - 일대다 단방향 매핑의 단점을 그대로 가지므로 `다대일 양방향 매핑을 사용하는 것이 좋다.`


### 3. 일대일 (1:1)
- 일대일 관계는 어느 곳에나 외래키를 가질 수 있으므로 주 테이블과 대상 테이블 중 누가 외래키를 가질지 선택해야 한다.
- 주 테이블에 외래키 (객체 지향)
    - 외래키를 객체 참조와 비슷하게 사용할 수 있다.
    - 주 테이블만 확인하면 대상 테이블과 연관관계가 있는지 알 수 있다.
- 대상 테이블에 외래키
    - 일대일에서 일대다 관계로 변경할 때 테이블 구조를 그대로 유지할 수 있다.
    - 일대일 단방향 관계는 JPA에서 지원하지 않는다.

#### 3.1 주 테이블에 외래키
- JPA의 경우 주 테이블에 외래키가 있으면 좀 더 편리하게 매핑할 수 있다.
- 단방향
    ```java
    @Entity
    public class Member {
    
        @Id
        @GeneratedValue
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @OneToOne
        @JoinColumn(name = "LOCKER_ID")
        private Locker locker;

        ...
    }

    @Entity
    public class Locker {
    
        @Id
        @GeneratedValue
        @Column(name = "LOCKER_ID")
        private Long id;
        private String name;

        ...
    }
    ```  

- 양방향
    ```java
    @Entity
    public class Member {
    
        @Id
        @GeneratedValue
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @OneToOne
        @JoinColumn(name = "LOCKER_ID")
        private Locker locker;

        ...
    }

    @Entity
    public class Locker {
    
        @Id
        @GeneratedValue
        @Column(name = "LOCKER_ID")
        private Long id;
        private String name;

        @OneToOne(mappedBy = "locker")
        private Member member;

        ...
    }
    ```  

#### 3.2 대상 테이블에 외래키
- 단방향은 일대일 단방향 관계는 JPA에서 지원하지 않는다.
- 양방향    
    ```java
    @Entity
    public class Member {
    
        @Id
        @GeneratedValue
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @OneToOne(mappedBy = "member")
        private Locker locker;

        ...
    }

    @Entity
    public class Locker {
    
        @Id
        @GeneratedValue
        @Column(name = "LOCKER_ID")
        private Long id;
        private String name;

        @OneToOne
        @JoinColumn(name = "MEMBER_ID")
        private Member member;

        ...
    }
    ```  


### 4. 다대다 (N:M)
- `관계형 데이터베이스`는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없다.
- `연결 테이블`을 추가하여 일대다, 다대일 관계로 풀어내야 한다.  
![Untitled__4_](uploads/886e626b7cea316b9f80119f096f3358/Untitled__4_.png)
- `객체`는 테이블과 달리 객체 2개로 다대다 관계를 만들 수 있다.

#### 4.1 다대다 단방향  
- @JoinTable: 연결 테이블을 매핑한다.
    - 속성  

    | 속성 | 기능 |
    | ------ | ------ |
    | @JoinTable.name | 연결 테이블을 지정한다.  |
    | @JoinTable.joinColumns | 현재 방향에서 매핑할 조인 컬럼 정보를 지정한다. | 
    | @JoinTable.inverseJoinColumns | 반대 방향에서 매핑할 조인 컬럼 정보를 지정한다. |   
 
- Member -> Product (다대다 단방향)   
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @ManyToMany
        @JoinTable(name = "MEMBER_PRODUCT", joinColums = @JoinColumn(name = "MEMBER_ID"), 
                   inverseJoinColums = @JoinColumn(name = "PRODUCT_ID"))
        private List<Product> products = new ArrayList<Product>();

        ...
    }

    @Entity
    public class Product {
    
        @Id
        @Column(name = "PRODUCT_ID")
        private Long id;
        private String name;

        ...
    }
    ```  

#### 4.2 다대다 양방향
- 연관관계의 주인이 아닌 곳에 mappedBy로 주인을 지정한다.
- Member <-> Product (다대다 양방향)   
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @ManyToMany
        @JoinTable(name = "MEMBER_PRODUCT", joinColums = @JoinColumn(name = "MEMBER_ID"), 
                   inverseJoinColums = @JoinColumn(name = "PRODUCT_ID"))
        private List<Product> products = new ArrayList<Product>();

        ...
    }

    @Entity
    public class Product {
    
        @Id
        @Column(name = "PRODUCT_ID")
        private Long id;
        private String name;

        // 역방향 추가
        @ManyToMany(mappedBy = "products")
        private List<Member> members;

        ...
    }
    ```  
    - MEMBER_PRODUCT 테이블은 다대다 관계를 일대다, 다대일 관계로 풀어내기 위한 `연결 테이블`이다.

#### 4.3 다대다 매핑의 한계와 극복, 연결 엔티티 사용
- @ManyToMany를 사용하면 연결 테이블을 자동으로 처리해주므로 도메인 모델이 단순해지고 편리하다.
- 한계: 연결 테이블에 새로운 컬럼을 추가할 경우 @ManyToMany를 사용할 수 없다.
- 해결 방법: 엔티티 간의 관계도 다대다에서 일대다, 다대일 관계로 풀어야 한다.  
- Member -일대다- MemberProduct -다대일- Product
    ```java
    @Entity
    public class Member {
    
        @Id
        @Column(name = "MEMBER_ID")
        private Long id;
        private String username;

        @OneToMany(mappedBy = "member")
        private List<MemberProduct> memberproducts;

        ...
    }

    @Entity
    public class Product {
    
        @Id
        @Column(name = "PRODUCT_ID")
        private Long id;
        private String name;

        ...
    }

    // 복합 기본키
    @Entity
    @IdClass(MemberProductId.class)
    public class MemberProduct {
        
        // 기본키+외래키
        @Id
        @ManyToOne
        @JoinColumn(name = "MEMBER_ID")
        private Member member; // MemberProductId.member와 연결

        // 기본키+외래키
        @Id
        @ManyToOne
        @JoinColumn(name = "PRODUCT_ID")
        private Product product; // MemberProductId.product와 연결
    
        private int orderAmount;

        ...
    }
    ```  
    - 기본키를 매핑하는 @Id와 외래키를 매핑하는 @JoinColumn을 동시에 사용해서 기본키+외래키를 한번에 매핑한다.
    - @IdClass를 사용해서 복합 기본키를 매핑한다.  
    ```java
    // 식별자 클래스
    public class MemberProductId implements Serializable {
        
        private String member; // MemberProduct.member와 연결
        private String product; // MemberProduct.product와 연결

        // hashCode and equals

        @Override
        public boolean equals(Object o) {...}

        @Override
        public int hashCode() {...}
    }
    ```  
- **복합 기본키**
    - JPA에서 복합키를 사용하려면 별도의 식별자 클래스를 만들어야 한다.
    - @IdClass를 사용해서 식별자 클래스를 지정한다.
    - 복합키를 위한 식별자 클래스의 `특징`
        - 복합키는 별도의 식별자 클래스로 만들어야 한다.
        - Serializable을 구현해야 한다.
        - equals와 hashCode 메소드를 구현해야 한다.
        - 기본 생성자가 있어야 한다.
        - 식별자 클래스는 public이어야 한다.
        - @IdClass를 사용하는 방법 외에 @EmbeddedId를 사용하는 방법도 있다.  
        (* JAVA IDE에는 대부분 equals, hashCode 메소드를 자동으로 생성해주는 기능이 있다.)  
- **식별 관계**
    - 부모 테이블의 기본키를 받아서 자신의 기본키+외래키로 사용하는 것을 데이터베이스 용어로 `식별 관계`라 한다.
 
#### 4.4 다대다: 새로운 기본키 사용
- 기본키 생성 전략은 데이터베이스에서 자동으로 생성해주는 대리키를 Long값으로 사용하는 것이다.
- 간편하고 거의 영구적으로 사용할 수 있으며, 비즈니스에 의존하지 않는다는 장점이 있다.
- ORM 매핑 시 복합키를 만들지 않아도 되므로 간단히 매핑을 완성할 수 있다.
- 연결 테이블에 새로운 기본키 사용 (MemberProduct가 아닌 Order 이름 사용)  
    ```java

    @Entity
    public class Order {

        // 새로운 식별자
        @Id
        @GeneratedValue
        @Column(name = "ORDER_ID")
        private Long id;

        // 외래키
        @ManyToOne
        @JoinColumn(name = "MEMBER_ID")
        private Member member;

        // 외래키
        @ManyToOne
        @JoinColumn(name = "PRODUCT_ID")
        private Product product;
    
        private int orderAmount;

        ...
    }
    ```   
    - 대리키를 사용함으로써 이전에 보았던 식별 관계에 복합키를 사용한느 것보다 매핑이 단순하고 이해하기 쉽다.

#### 4.5 다대다 연관관계 정리
- 다대다 관계를 일대다, 다대일 관계로 풀어내기 위해 연결 테이블을 만들 때 `식별자`를 어떻게 구성할지 선택해야 한다.
    - `식별 관계`: 받아온 식별자를 기본키+외래키로 사용한다.
    - `비식별 관계`: 받아온 식별자는 외래키로만 사용하고 새로운 식별자를 추가한다.
- `비식별 관계`를 사용하는 것이 복합키를 위한 식별자 클래스를 만들지 않아도 되므로 단순하고 편리하게 ORM 매핑을 할 수 있다.