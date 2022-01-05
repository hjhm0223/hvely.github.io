---
template: SinglePost
title: PostgreSQL (1) - 개요
status: Published
date: '2020-04-01'
featuredImage: >-
  https://t1.daumcdn.net/cfile/tistory/99AE574A5C49905F20
excerpt: >-
  
categories:
  - category: DataBase
meta:
  description: test meta description
  title: test meta title
---

![postgresql](https://t1.daumcdn.net/cfile/tistory/99AE574A5C49905F20)



## PostgreSQL  
PostgreSQL은 오픈소스 데이터베이스 중 가장 안정적인 데이터 베이스이며 ANSI/ISO 규격의 SQL을 지원한다. 초기 개발 단계부터 완벽한 ACID와 MVCC를 지원하는 아키텍처로 설계되었으며, 대용량의 복잡한 트랜잭션 처리를 위한 RDBMS이다. 상용 RDBMS 급의 기능을 제공한다.


### 특징

1. License  
  PostgreSQL과 함께 배포되는 라이선스로서 BSD, MIT 라이선스와 유사한, 매우 자유로운 라이선스이다. 라이선스 계열은 BDS이다.  

![image](https://mblogthumb-phinf.pstatic.net/20151006_242/enterprisedb_1444104838650Kp1kC_PNG/%BD%BD%B6%F3%C0%CC%B5%E54.PNG?type=w2)  

2. Portable  
  Windows, Linux, MAC OS/X 또는 Unix Platform 등 다양한 플랫폼을 지원한다.

3. Reliable  
  트랜잭션 속성인 ACID에 대한 구현 및 MVCC 로우 레벨 라킹 등이 구현되어 있다.

4. Scalable  
  PostgreSQL의 멀티-버전에 대하여 사용이 가능하다. 대용량 처리를 위한 Table Partitioning과 TableSpace 기능 구현이 가능하다.

5. Secure  
  DB 보안의 경우 데이터 암호화, 접근 제어 및 감사의 3가지로 구성되어 있으며, PostgreSQL 또한 DB보안 요구사항에 의해 호스트-기반 접근 제어, object-level 권한, ssl 통신을 통한 클라이언트와 네트워크 구간의 전송 데이터를 암호화하는 방안 등을 지원한다.

6. Recovery & Availability  
  Streaming Replication을 기본적으로 동기식, 비동기식의 Hot Standby 서버를 구축할 수 있으며 WAL log 아카이빙 및 Hot Backup을 통해 Point in time recovery를 할 수 있다.

7. Advanced  
  pg_upgrade를 이용하여 업그레이드를 진행할 수 있으며 웹 기반 또는 C/S 기반의 GUI 관리도구를 제공하여 모니터링 및 관리는 물론 튜닝까지 가능하다.

8. 사용자 정의 procedural로 Perl, java, php 등의 스크립트 언어 지원이 가능하다.

### 기능 및 제한  
PostgreSQL은 관계형 DBMS의 기본적인 기능인 트랜잭션과 ACID(Atomicity, Consistency, Isolation, Durability)를 지원한다. 또한 ANSI SQL:2008 규격을 상당 부분 만족시키고 있으며, 전부를 지원하는 것을 목표로 현재도 기능이 계속 추가되고 있다.  
PostgreSQL은 기본적인 신뢰도와 안정성을 위한 기능뿐만 아니라 진보적인 기능이나 학술적 연구를 위한 확장 기능도 많이 가지고 있다.

#### 기능
- Nested transactions (savepoints)
- Point in time recovery
- Online/hot backups, Parallel restore
- Rules system (query rewrite system)
- B-tree, R-tree, hash, GiST method indexes
- Multi-Version Concurrency Control (MVCC)
- Tablespaces
- Procedural Language
- Information Schema
- I18N, L10N
- Database & Column level collation
- Array, XML, UUID type
- Auto-increment (sequences),
- Asynchronous replication
- LIMIT/OFFSET
- Full text search
- SSL, IPv6
- Key/Value storage
- Table inheritance 등
 
#### 제한사항  
![image](https://blog.kakaocdn.net/dn/b7ewSr/btqDgx2jrCJ/K4uIj4jWl1KRg590gPHN7K/img.png)


### 내부구조  
![image](https://d2.naver.com/content/images/2015/06/helloworld-227936-5.png)  

- 클라이언트는 인터페이스 라이브러리(libpg, JDBC, ODBC 등)를 통해 서버와의 연결을 요청(1)하면, Postmaster 프로세스가 서버와의 연결을 중계(2)한다. 이후 클라이언트는 할당된 서버와의 연결을 통해 질의를 수행(3)한다.

#### 서버 내부의 질의 수행 과정  
![image](https://d2.naver.com/content/images/2015/06/helloworld-227936-6.png)  

- 클라이언트로부터 질의 요청이 들어오면 구문 분석 과정(1)을 통해 Parse Tree를 생성하고 의미 분석 과정(2)을 통해 새로운 트랜잭션을 시작하고 Query Tree를 생성한다.  
- 이후 서버에 정의된 Rule에 따라 Query Tree가 재 생성(3)되고 실행 가능한 여러 수행 계획 중 가장 최적화된 Plan Tree를 생성(4)한다. 서버는 이를 수행(5)하여 요청된 질의에 대한 결과를 클라이언트로 전달하게 된다.
  
  > * 서버의 쿼리 수행 과정에서는 데이터베이스 내부의 시스템 카탈로그가 많이 사용되는데, 사용자가 함수나 데이터 타입은 물론 인덱스 접근 방식 및 RULE 등을 시스템 카탈로그에 직접 정의할 수도 있다. 따라서 PostgreSQL에서는 이것이 기능을 새로 추가하거나 확장하는데 있어 중요한 포인트로 활용된다.

#### 데이터 저장 구조  
데이터가 저장되는 파일들은 여러 개의 페이지들로 구성되며, 하나의 페이지는 확장 가능한 slotted page 구조를 가진다.  

* 데이터 페이지 구조  
![image](https://d2.naver.com/content/images/2015/06/helloworld-227936-7.png)  

* 인덱스 페이지 구조  
![image](https://d2.naver.com/content/images/2015/06/helloworld-227936-8.png)  


### PostgreSQL Process & Memory Architecture  

- PostgreSQL의 경우 process 기반으로 동작한다.

  ![image](https://lh3.googleusercontent.com/proxy/Zl3osCzbFSVVrkIZ_ubpOQWrNgKNsbMVhPks3TcbJtYKBIK0gMRIwE13xuwEtp3OMWo5oE08ytyN-21GDC8mijJYSlxJCpJJG1XecA)    

- 포스트마스터(Postmaster)라는 main process가 있으며, child process로 유틸리티 프로세스가 실행되어 동작된다. Postmaster에서는 유틸리티 프로세스가 죽으면 restart 시킨다.  
- 사용자 Session에 대해서는 한 개에 백앤드 프로세스가 실행된다. Postmaster에서 새로운 connection을 맺는다.   


## 설치
### PostgreSQL supported platforms
- Linux (all recent distributions)
- Windows (Win2000 SP4 and later)
- FreeBSD, OpenBSD, NetBSD, OS X, AIX, HP/UX, Solaris, Tru64 Unix, and UnixWare
- Other Unix-like systems may also work but are not currently being tested

### 다운로드  
- 링크: http://www.enterprisedb.com/products-services-training/pgdownload

### Configuration  
#### 디렉토리 구조
- 엔진 디렉토리 구조  
![image](https://lh3.googleusercontent.com/proxy/vI1tY2lS8c6W-fdIEHtKWRDfYRJJRV22sie_dLGxwpIH4I6EOpaK1HyEAjlc3zEVJ74nhA3tL_mHCbYPQhDmo7K-H9s_4AERamzxPMH3L4P5)  

- data 디렉토리 정보  
data 디렉토리는 PostgreSQL(DB)의 Data정보가 저장되는 디렉터리로 PostgreSQL(DB)에 대한 Data에 대한 정보, 트랜잭션 로그 정보, 환경설정 부분 등에 대한 파일들이 위치하게 된다. data 디렉토리에 대한 구조와 형식에 대해서 살펴보면 아래와 같다.  
![image](https://lh3.googleusercontent.com/proxy/_B6QFeuPfeDv4fbMm8XYgrJKfgoecKB_xSspXsRc3TPrz2Ero78BAY7_jXCb9G9I-O83ugKoI03Rcixo06FmyK8OEJBVuPBCS4MzWjik)  

- cluster 디렉토리 구조  
PostgreSQL(DB)에서는 하나의 서버의 인스턴스에서 관리되는 database의 모음을 cluster라고 한다. 이때, cluster는 아래 그림에서 data 디렉토리에 해당된다.  
![image](https://blog.kakaocdn.net/dn/rble9/btqC4uqkT4k/RWP0qXx6qwxHnwqceDxwRK/img.jpg)  

- 이외: http://www.gurubee.net/lecture/2917

#### 주요 환경설정  
http://www.gurubee.net/lecture/2917

### pgAdmin
pgAdmin은 PostgreSQL을 실행하는 오픈소스 개발 플랫폼이다. 간단한 SQL쿼리를 작성하거나 server-side 코드편집기, SQL/batch/shell job scheduling을 한다.  
- 설정: http://www.gurubee.net/lecture/2929


### psql
psql은 PostgreSQL의 Command Line Interface(CLI)이다.

#### 사용
1. 접속하기  
  - 사용할 Server, Database, Port, Username, Password 입력  
  ```cmd
  psql -h 호스트 -p 포트 -U 사용자명 디비명
  ```

2. 데이터베이스 접속
3. psql 기본 명령어
    - Database 목록 확인: `\l`
    - relation 확인: `\d` (자세한 정보: `\d+`)
    - System table 목록 확인: `\dS`
    - table 목록 확인: `\dt`
    - view 목록 확인: `\dv`
    - schema 목록 확인: `\dn`
    - 다른 데이터ㅔ이스 접속: `\c DBNAME`
    - psql 종료: `\q`
4. Query 수정 및 실행
    - psql.edit 메모장 파일 열기: `\e`


## REFERENCE   
- 강좌 URL  
  http://www.gurubee.net/lecture/2888
- PostgreSQL  
  http://www.gurubee.net/postgresql/basic
- https://d2.naver.com/helloworld/227936
- psql  
  http://blog.kichul.co.kr/2017/03/30/2017-03-30-postgresql-notes/

