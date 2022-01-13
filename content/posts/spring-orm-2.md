---
template: SinglePost
title: ORM과 JPA (2)
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

## ORM

- **ORM**(Object Relational Mapping)에서 가장 어려운 부분이 `객체 연관관계와 테이블 연관관계를 매핑`하는 일이다.  
- 연관관계를 매핑할 때 다음 `3가지`를 고려해야 한다.
    1. 방향(direction)
        - 단방향, 양방향 존재
        - 방향은 `객체 관계`에만 존재하고, 테이블은 항상 양방향
    2. 다중성(multiplicity)
        - 다대일(N:1), 일대다(1:N), 일대일(1:1), 다대다(N:M) 존재
    3. 연관관계의 주인(owner)
        - 객체를 양방향 연관관계로 만들면 연관관계의 `주인`을 정해야 한다.


### 객체 연관관계와 테이블 연관관계의 차이

- 객체 연관관계는 `참조`를 사용한다.
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
- 테이블 연관관계는 `외래키`를 사용한다.
    - `조인`을 사용한다.
    - 항상 `양방향`이다.  
    ```sql
    SELECT * FROM A JOIN B on A.b = B.b
    SELECT * FROM B JOIN A on A.b = B.b  
    ```

### JPA를 사용하여 객체 연관관계와 테이블 연관관계 매핑

- `@ManyToOne`: (N:1) 관계라는 매핑 정보이다.
    - 속성  

    | 속성       | 기능                              | 기본값                                                   |
    |----------|---------------------------------|-------------------------------------------------------|
    | optional | false로 설정하면 연관된 엔티티가 항상 있어야 한다. | true                                                  |
    | fetch    | 글로벌 페치전략                        | @ManyToOne=FetchType.EAGER, @OneToMany=FetchType.LAZY |
    | cascade  | 연속성 전이 기능                       |                                                       |  
    
    - @ManyToOne의 로딩 방식
        - EAGER (즉시 로딩): 연결된 엔티티 정보까지 한 번에 가져오기 때문에 성능 문제가 발생할 수 있다. (무한루프)
        - LAZY (지연 로딩): proxy를 이용해서 데이터를 처리한다.

- `@JoinColumn`: 외래 키를 매핑할 때 사용한다.
    - 속성   

    | 속성                   | 기능                    | 기본값                         |
    |----------------------|-----------------------|-----------------------------|
    | name                 | 매핑할 외래 키 이름           | 필드명 + _ + 참조하는 테이블의 기본키 컬럼명 |
    | referencedColumnName | 외래키가 참조하는 대상 테이블의 컬럼명 | 참조하는 테이블의 기본키 컬럼명           |     
  
    - @JoinColumn을 생략하게 되면 기본 전략을 사용한다. (필드명_참조하는 테이블의 컬럼명. 예시: team_TEAM_ID)

- `@OneToMany`: (1:N) 관계라는 매핑 정보이다.
    - `mappedBy 속성`은 `양방향` 매핑일 때 사용한다.
    - `연관관계의 주인`: 양방향 연관관계 매핑 시 외래키 관리자 (외래키가 있는 곳, 일대다 관계에서 다 쪽이 항상 주인이다.)
    - 단방향 연관관계가 2개이므로 두 객체 연관관계 중 하나를 정해서 테이블의 외래키를 관리해야 한다.
    - 주인은 외래키 관리(등록, 수정, 삭제)가 가능하지만, 주인이 아니면 읽기만 할 수 있다.
    - 주인은 mappedBy 속성을 사용하지 않는다.
    - `주인이 아니면 mappedBy 속성을 사용해서 연관관계 주인을 지정해야 한다.` (mappedBy = "연관관계 주인의 field값")


## 연관관계
- 고려사항
    1. 다중성
        - N:1(다대일, @ManyToOne)
        - 1:N(일대다, @OneToMany)
        - 1:1(일대일, @OneToOne)
        - N:M(다대다, @ManyToMany)
    2. 단방향, 양방향
    3. 연관관계의 주인

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
- 복합 기본키
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
- 식별 관계
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