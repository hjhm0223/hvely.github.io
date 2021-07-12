---
template: SinglePost
title: ERD
status: Published
date: '2020-04-01'
featuredImage: >-
  https://gitmind.com/wp-content/uploads/2020/10/er-diagram-creator.jpg
excerpt: >-
  
categories:
  - category: DB
meta:
  description: test meta description
  title: test meta title
---

![erd](https://gitmind.com/wp-content/uploads/2020/10/er-diagram-creator.jpg)


# ERD (Entity Relationship Diagram)

개체 속성과 개체 간 관계를 도표로 표현한 것을 의미한다.


## ERD 표기법

![image](https://blog.kakaocdn.net/dn/kCnHv/btqLW8LRGpN/IDARbgYYD5WmA7wfo7m2y1/img.gif)

### 외래키 (Foreign Key)

- 외래키는 두 테이블을 서로 연결하는 데 사용되는 키이다.
- 외래키가 포함된 테이블을 자식 테이블이라고 하고 외래키 값을 제공하는 테이블을 부모 테이블이라한다.
- 외래키 사용시 외래키 값은 NULL이거나 부모 테이블의 기본키 값과 동일해야한다. (참조 무결성 제약조건)
- 부모 테이블의 기본키, 고유키를 외래키로 지정할 수 있다.
- 외래키는 부모 테이블의 기본키 개수 만큼 지정할 수 있다. 예를 들어서 부모 테이블의 기본키가 3개 있다면, 1개만 참조거나 3개 모두 참조할 수 있다.
- 외래키로 지정할 두 테이블의 필드는 같은 데이터 타입이어야 한다.


## 비 식별관계와 식별관계

- 식별 관계: 기본키에 외래키가 포함되어있다면 이를 식별 관계라고한다.
- 비식별 관계: 비식별관계는 점선으로 표현한다. 기본키에 외래키가 포함되어 있지 않다면 비식별 관계라고 한다.

### 식별관계

![image](https://blog.kakaocdn.net/dn/c6BTNF/btqBujD3vGj/tpbcCk9iXnjxjSoXgk1Xb0/img.png)
  - student(학생)과 subject(과목) 그리고 student_subject(수강) 테이블이 있다.
  - student 테이블에는 id(pk), name(학생이름), code(학번) 컬럼이 정의되어있고,
  - subject 테이블에는 id(pk), name(과목이름), code(과목번호) 컬럼이 정의되어있다.
  - student_subject 테이블에는 어떤 학생이 어떤 과목을 수강했는지 알 수 있게 각각 student_id, subject_id 컬럼이 정의되어 있다.
  - 그리고 두 컬럼은 기본키(Primary Key)이면서 외래키(Foreign Key)이다.
  - 이렇듯 기본키에 외래키가 포함되어있다면 이를 식별 관계라고한다. 즉 외부 테이블에 의해 식별되며, student_id, subject_id 중 한개라도 존재하지 않으면 데이터 행을 이룰 수 없다.
  (PK는 Not Null 제약조건을 위배할 수 없기 때문)


### 비식별 관계

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmRgjN%2FbtqBvudPka1%2FZE0d4LE4kicFuAwk4UhD3k%2Fimg.png)
  - member와 member_access_log 테이블이 있다.
  - member는 회원 정보를 저장하는 테이블이고, member_access_log는 member가 특정 서비스에 접속할때 마다 쌓는 로그 테이블이다.
  - 식별관계와 다르게 기본키를 직접 생성해 사용한다.
  - 비식별 관계란 기본키에 외래키가 포함되어 있지 않고, 외부 테이블을 참조만 하는 관계를 의미한다.


## Reference

- ERD 표기법: https://freehoon.tistory.com/60
- 식별/비식별 관계: https://bamdule.tistory.com/46?category=372613, https://bamdule.tistory.com/43

