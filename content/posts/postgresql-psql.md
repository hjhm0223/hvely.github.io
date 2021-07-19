---
template: SinglePost
title: PostgreSQL (2) - PSQL
status: Published
date: '2020-04-01'
featuredImage: >-
  https://t1.daumcdn.net/cfile/tistory/99AE574A5C49905F20
excerpt: >-
  
categories:
  - category: DB
meta:
  description: test meta description
  title: test meta title
---

![postgresql](https://t1.daumcdn.net/cfile/tistory/99AE574A5C49905F20)


(*postgre 9.4 ver document)  
  
## PostgreSQL 기본 구조  

PostgreSQL은 클라이언트/서버 모델을 사용하고 있다. 하나의 PostgreSQL 세션(작업)은 다음과 같은 프로세스들의 상호 작동으로 구성된다.

- 서버 프로세스  
  데이터베이스 파일을 관리하고 클라이언트 응용 프로그램들이 서버에 연결을 요청할 때 그 요청들을 처리하고, 클라이언트들이 데이터베이스를 사용할 수 있도록 기반 작업들을 준비한다.
- 클라이언트 프로세스  
  데이터베이스를 사용하려는 사용자 측 응용 프로그램으로 클매우 다양한 형태를 띄고 있다. 어떤 것은 텍스트 기반의 프로그램, 그래픽 응용 프로그램이며, 웹서버를 통해서 웹페이지로 보여지기도 한다. 


## 데이터베이스 사용하기  
### 데이터베이스 만들기  

```cmd
# mydb라는 이름의 새로운 데이터베이스 만들기
$ createdb mydb

# "command not found" 메시지 나올 경우 환경변수 설정 필요
```  
### psql 사용하기  

https://postgresql.kr/docs/9.4/tutorial-accessdb.html



## SQL 언어

PostgreSQL은 관계형 데이터베이스 관리 시스템(RDBMS, relational database management system)이다. 즉, 관계들로 구성된 자료를 관리하기 위한 시스템이다. 테이블은 `데이터베이스` 안에 속하고, 이 데이터베이스들의 모음을 하나의 `PostgreSQL 서버`가 관리한다. 그리고 하나의 서버가 관리하는 데이터베이스 집합 단위를 `클러스터`라 한다.

### 새 테이블 생성  

테이블 이름과 테이블을 구성하는 각 칼럼, 칼럼의 자료형을 지정해서 생성한다.  

```cmd
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);
```  

- 예약어(keyword, 명령이름, 구문 중간 중간에 나오는 on, default, not null 같은 것들)와 식별자(identifier, 테이블 이름, 칼럼 이름 같은 것들)의 `대소문자를 구별하지 않지만`, 식별자가 큰따옴표(") 안에 쓰이면 `대소문자를 그대로 유지`한다.

- `표준 SQL 자료형인 int, smallint, real, double precision, char(N), varchar(N), date, time, timestamp, interval형`을 사용할 수 있으며, 기타 자료형들과 지리 정보를 담는 다양한 자료형을 사용할 수 있다.

### 테이블 삭제  

```cmd
DROP TABLE 테이블이름;
```  

### 테이블에 자료 입력하기  

특정 테이블에 자료를 입력할 때는 `INSERT 구문`이 사용된다.  

```cmd
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
```  

- 각 칼럼의 실제 자료들은 테이블을 생성할 때 지정한 자료형과 완벽하게 일치해야 한다.
- 숫자가 아닌 자료일 경우는 작은 따옴표(')로 둘러쌓아야한다. 날짜형 자료를 입력할 경우는 그 값이 정확하게 날짜 표현 형식이어야 한다. 
- point 자료형은 다음과 같이 하나의 쌍으로 입력되어야 한다.  

  ```cmd
  INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
  ```  

- 각 칼럼의 입력 순서를 사용자가 지정할 수 있다.  

  ```cmd
  INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
      VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
  ```  

- 대용량의 데이터를 빠르게 입력해야할 때 `COPY` 명령을 사용한다. 이 때 지정한 파일은 서버가 가동 중인 호스트에 있어야 한다. 접속한 서버가 원격호스트라면 파일을 원격호스트에서 찾는다.  

  ```cmd
  COPY weather FROM '/home/user/weather.txt';
  ```  

### 테이블 자료 조회하기  

입력한 자료를 찾기 위해 테이블을 검색하는 것을 `쿼리`라 하고, `SELECT` 구문을 사용한다.  
이 구문은 크게 세 부분으로 구성되는데, 원하는 자료의 칼럼들을 지정하고, 그 칼럼들이 있는 테이블을 from 절이라 하고, 원하는 부분을 지정하는 where 조건절이라 한다.   

```cmd
SELECT * FROM weather;

SELECT * FROM weather
    WHERE city = 'San Francisco' AND prcp > 0.0;
```  

- where 절이 생략되면 지정한 테이블의 모든 자료를 보여준다.
- WHERE절에 사용할 조건은 boolean 조건들의 집합으로 구성된다. 일반적으로 boolean 연산자(AND, OR, NOT)을 이용해서 WHERE절 전체의 조건을 구성한다.
- 출력 순서를 바꾸고 싶으면 `정렬 조건`을 추가한다.  

  ```cmd
  SELECT * FROM weather ORDER BY city;

  SELECT * FROM weather ORDER BY city, temp_lo;
  ```  

- 같은 값에 대한 중복을 없애려면 `DISTINCT`을 사용한다.  

  ```cmd
  SELECT DISTINCT city FROM weather ORDER BY city;
  ```  

### 테이블 조인  

하나 이상의 테이블, 뷰, SELECT 구문으로 만들어진 특정 row들, 서버 함수의 리턴 값 등을 같이 연결해서 자료를 뽑아내는 것을 `JOIN`이라 한다.  

```cmd
SELECT * FROM weather, cities WHERE city = name;

# 결과
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
(2 rows)
```  

- 이 결과에서는 Hayward 도시 정보가 빠져있다. 이것은 cities 테이블에 이 도시에 대한 정보가 빠져있기 때문이다. 즉, 윗 구문에서는 where 절 다음에 오는 조건에 일치하는 자료들만 보이게 된다. 
- 다른 하나는 도시 이름이 두개가 보이는 것이다. 잘못된 결과가 아니라, 출력 칼럼을 지정하는 곳에서 * 문자를 사용해서 모든 칼럼을 보겠다고 했으니, weather 테이블과 cities 테이블에 있는 각각의 도시 이름이 모두 보이게 된 것이다.
- `지정자(qualify)`를 사용하여 컬럼 이름이 같을 경우를 대비한다.  

  ```cmd
  SELECT weather.city, weather.temp_lo, weather.temp_hi,
        weather.prcp, weather.date, cities.location
      FROM weather, cities
      WHERE cities.name = weather.city;
  ```  

- INNER JOIN 구문  

  ```cmd
  SELECT *
      FROM weather INNER JOIN cities ON (weather.city = cities.name);
  ```  

- OUTER JOIN 구문  

  ```cmd
  SELECT *
      FROM weather LEFT OUTER JOIN cities ON (weather.city = cities.name);

  # 결과
      city      | temp_lo | temp_hi | prcp |    date    |     name      | location
  ---------------+---------+---------+------+------------+---------------+-----------
  Hayward       |      37 |      54 |      | 1994-11-29 |               |
  San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
  San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
  (3 rows)
  ```  

- 하나의 테이블을 연결하는 경우 `self join 구문`을 사용한다.  

  ```cmd
  # 현재 행의 최저기온이 다른 행의 최저기온보다 더 낮고, 최고 기온이 다른 행의 최고기온보다 높은 경우의 행을 출력
  SELECT W1.city, W1.temp_lo AS low, W1.temp_hi AS high,
      W2.city, W2.temp_lo AS low, W2.temp_hi AS high
      FROM weather W1, weather W2
      WHERE W1.temp_lo < W2.temp_lo
      AND W1.temp_hi > W2.temp_hi;

  # 결과
      city      | low | high |     city      | low | high
  ---------------+-----+------+---------------+-----+------
  San Francisco |  43 |   57 | San Francisco |  46 |   50
  Hayward       |  37 |   54 | San Francisco |  46 |   50
  (2 rows)
  ```  

### 집계 함수  
집계 함수(Aggregate Function)이란 입력이 여러 개의 행이고, 출력이 하나인 결과를 말한다. 테이블의 전체 row 수를 구하는 count, 평균(avg), 총합(sum), 최대값(max), 최소값(min) 등의 함수를 말한다.  

```cmd
SELECT max(temp_lo) FROM weather;

# 결과
 max
-----
  46
(1 row)
```  

- `서브쿼리(subquery)`를 통해 집계 함수 사용할 수 있다.  

  ```cmd
  # 최고 기온의 해당 도시 구하기  
  SELECT city FROM weather WHERE temp_lo = (SELECT max(temp_lo) FROM weather);

  # 결과
      city
  ---------------
  San Francisco
  (1 row)
  ```  

- `GROUP BY 절`과 함께 사용하여 다양하고 유용한 결과를 볼 수 있다.  

  ```cmd
  # 각 도시별 최고기온 출력
  SELECT city, max(temp_lo) FROM weather GROUP BY city;

  # 결과
      city      | max
  ---------------+-----
  Hayward       |  37
  San Francisco |  46
  (2 rows)
  ```  

- 집계된 자료에 대해서 어떤 조건이 주어질 때는 `HAVING 구문`을 사용한다.  

  ```cmd
  SELECT city, max(temp_lo) FROM weather GROUP BY city
      HAVING max(temp_lo) < 40;

  # 결과
    city   | max
  ---------+-----
  Hayward |  37
  (1 row)
  ```  

- `LIKE 연산자`를 이용한 예제  

  ```cmd
  # 각 도시별 최고 기온이 40도가 되지 않는 목록들 중 도시 이름이 S로 시작하는 자료 출력
  SELECT city, max(temp_lo) FROM weather WHERE city LIKE 'S%'(1) GROUP BY city
      HAVING max(temp_lo) < 40;
  ```  

- 집계 함수를 사용할 때는 WHERE절과 HAVING절의 관계를 반드시 숙지하고 있어야 한다. WHERE절은 조회할 집계되지 않은 자료에 대한 조건이고, HAVING은 집계된 자료에 대한 조건이다. 그래서 WHERE절의 조건으로 HAVING절이 사용될 수 없고, 일반적으로 HAVING절 다음에는 집계함수가 사용된다. WHERE 다음에는 집계할 대상에 대한 조건이, HAVING 다음에는 그 자료를 집계한 값에 대한 조건을 사용한다.

### 자료 갱신  

이미 입력되어 있는 자료를 수정하기 위해 `UPDATE 명령`을 사용한다.  

```cmd
# 11월 28일 이후 자료에 대해 최고/최저 기온을 각각 2도씩 낮추기
UPDATE weather
    SET temp_hi = temp_hi - 2,  temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
```  

### 자료 삭제  

한 테이블에서 필요 없는 자료를 삭제하기 위해 `DELETE 명령`을 사용한다.  

```cmd
DELETE FROM weather WHERE city = 'Hayward';
```  

- 삭제 컬럼을 지정하지 않을 경우 해당 테이블의 전체 자료가 삭제될 수 있으니 주의해야 한다.



## 고급 기능  

좀더 심화된 SQL 명령을 통해 관리 작업을 단순화 하고, 지료의 손실, 손상을 막을 수 있도록 한다.  

### 뷰(View)   

기본적인 뷰를 만들고 응용프로그램에서 사용하면, 뷰가 참조하는 원래 테이블의 자료구조가 만들어진 뷰에 영향을 미치지 않는 범위에서 얼마든지 확장되고 수정될 수 있다.

```cmd
CREATE VIEW myview AS
    SELECT city, temp_lo, temp_hi, prcp, date, location
        FROM weather, cities
        WHERE city = name;

SELECT * FROM myview;
```  

### 참조키  

JOIN을 수행할 때 한 테이블에서 자료를 잘못 입력한 경우 완벽하게 찾을 수 없는 문제가 발생한다. 또한 한 테이블에서 특정 칼럼이 삭제되는 경우 다른 테이블의 정보가 쓸모 없어질 수 있다. 따라서 한 테이블의 특정 칼럼을 반드시 다른 테이블의 칼럼에서 사용해야만 입력할 수 있도록 테이블 관계를 다시 정의한다. 이것을 `참조 무결성(referential integrity)`이라 한다.  

```cmd
# weather의 도시명을 입력할 때는 cities 테이블의 도시명을 사용해야 한다.
CREATE TABLE cities (
        city     varchar(80) primary key,
        location point
);

CREATE TABLE weather (
        city      varchar(80) references cities(city),
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);
```  

- 잘못된 자료를 입력할 경우 제약 조건을 위반했다는 오류 메시지가 나타난다.
- 참조키 기능은 응용 프로그램에서 해야할 일들을 대폭 줄여줌과 동시에 자료의 관계성을 보다 견고하게 만들어 준다.

### 트랜잭션  

트랜잭션이란 모든 데이터베이스 시스템에서 기본적인 한 개념이다. 트랜잭션의 핵심은 여러 개의 작업이 최종적으로 하나로 취급된다는 것이다. 이것을 전부 적용 혹은 전부 취소 작업이라 부른다. 각각의 트랜잭션은 독립적이어서 동시에 발생한 트랜잭션에 대해서는 그 트랜잭션 안에서의 데이터만 적용된다. 또, 하나의 트랜잭션 안에서 어떤 작업 도중 오류가 발생되었다면, 이전에 적용되었던 모든 작업들은 취소된다.  

```cmd
# 은행 데이터베이스: 각 계좌의 현 잔액을 보관하는 accounts 테이블과 각 계좌의 거래내역을 보관하는 braches 테이블로 구성되어 있다.
# Alice 계좌에서 $100.00을 빼서 Bob 계좌로 이체
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
UPDATE branches SET balance = balance - 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
UPDATE branches SET balance = balance + 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
```  

- 만약 위 네 개 작업 도중 부분적으로 작업을 성공하고 나머지는 실패한다면 각 계좌에 남아있는 금액이 이상해진다. 이 문제를 방지하기 위해서 하나의 작업군이 전부 처리가 되든지, 아니면 전부 취소가 되는 작업이 필요하다. 
- `트랜잭션`을 이용하여 하나의 트랜잭션 내에서의 작업이 하나로 처리되는 것을 트랜잭션의 `원자성(atomic)`이라 한다.
- 또한, 트랜잭션 작업이 정상적으로 끝났을 경우 그 변경된 자료가 어떠한 간섭 없이 저장되어야 하고, 저장된 자료는 손상되지 않아야 한다. 이를 위해 하나의 트랜잭션에서 발생하는 모든 작업들을 영구저장장치(하드디스크 등)에 기록하며, 이를 `내구성(durability)`라 한다.
- 트랜잭션의 중요한 또 하나의 속성은 하나의 트랜잭션은 다른 트랜잭션에 의해 간섭받지 않아야 한다는 것이다. 즉, 동시에 여러 개의 트랜잭션이 발생했을 때 각각의 트랜잭션은 다른 트랜잭션에서 변경되고 있는 자료들에 대해서는 참조하거나 간섭할 수 없어야 하며 이를 `고립성(isolation)`이라 한다. - 따라서 트랜잭션은 각각의 명령이 수행될 때마다 그 변경 사항이 데이터베이스의 원래 자료에 영향을 주는 것이 아니라 트랜잭션 영역 안에 있는 모든 작업이 끝났을 때 한꺼번에 그 변경사항이 데이터베이스에 적용된다. 이때부터 다른 트랜잭션이 그 변경된 데이터를 참조할 수 있게 되고, 이를 `정합성(consistency)`라 한다.  
- 트랜잭션 작업을 하기 위해서 `BEGIN`과 `COMMIT` 명령을 지정한다.  

  ```cmd
  BEGIN;
  UPDATE accounts SET balance = balance - 100.00
      WHERE name = 'Alice';
  -- etc etc
  COMMIT;
  ```  

- 작업 도중 다음 작업을 더이상 진행하지 말아야 할 경우 `ROLLBACK` 명령을 사용해서 모든 작업을 취소하고 트랜잭션을 종료한다.
- PostgreSQL에서는 모든 SQL 구문은 트랜잭션 안에서 실행되는 것으로 간주한다. BEGIN 명령을 명시적으로 실행하지 않더라도 실행하고자 하는 명령 앞 뒤에 BEGIN과 성공 시 COMMIT 명령을 함께 사용한다. 이 때 BEGIN과 COMMIT 사이의 영역을 `트랜잭션 블록`이라 한다. (몇몇 클라이언트 라이브러리는 자동으로 BEGIN, COMMIT 명령을 포함해서 실행되기 때문에 사용자가 트랜잭션을 지정하면 오류가 발생할 수 있으므로 라이브러리 문서를 참조해야 한다.)
- 트랜잭션 안에서 savepoint를 지정해서 작업을 좀 더 유연하게 처리할 수 있다. savepoint란 여기까지 작업이 정상 처리 되었다면 `ROLLBACK TO 명령`을 이용해서 그 지점 전까지 작업한 것에 대해서는 작업한 내용을 보장하겠다고 표시하는 지점이다. 이 지점을 표시하기 위해 `SAVEPOINT 명령`을 이용한다. savepoint로 취소 작업을 진행 한 뒤에도 계속 트랜잭션 내 작업을 진행할 수 있으며 작업을 진행하다가도 언제든 해당 savepoint로 돌아갈 수 있다. 또한 더이상 savepoint가 필요 없다고 판단되면 삭제해서 시스템 자원을 늘릴 수도 있다. `주의 사항`은 특정 savepoint로 돌아갈 경우 그 지점 이후에 지정해두었던 다른 savepoint들도 모두 사라진다.
- 트랜잭션 내에서 일어나는 모든 작업은 그 트랜잭션이 커밋되기 전까지 다른 사용자가 볼 수 없다.  

  ```cmd
  # savepoint를 사용한 은행 거래 예제 
  BEGIN;
  UPDATE accounts SET balance = balance - 100.00
      WHERE name = 'Alice';
  SAVEPOINT my_savepoint;
  UPDATE accounts SET balance = balance + 100.00
      WHERE name = 'Bob';
  -- 에구 ... Wally한테 가야하는 거였는데...
  ROLLBACK TO my_savepoint;
  UPDATE accounts SET balance = balance + 100.00
      WHERE name = 'Wally';
  COMMIT;
  ```

### 윈도우 함수  

윈도우 함수는 테이블에서 row 집합을 대상으로 계산하는 함수다. row 집합은 한 row에 대해서 어떠한 방식으로 관계된 것이며, 이 함수는 row 집합 단위로 계산한다는 점에서 집계 함수와 비슷하다. 집계 함수는 해당되는 row 집합에 대해서 하나의 row로 그 결과물을 보여주지만, 윈도우 함수는 각 row 단위로 그 처리결과를 출력한다. 쿼리 결과의 현재 row 뿐 아니라 더 많은 것을 접근할수도 있다.  

```cmd
# 각 부서별 평균 임금과 각 직원별 급여 비교
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;

# 결과
  depname  | empno | salary |          avg          
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```  

- 첫번째~세번째 칼럼은 empsalary 테이블의 실제 row이다. 네번째 칼럼은 depname 칼럼 값을 기준으로 그룹회된 자료의 평균값을 각 row마다 보여준다. `OVER 절`을 이용한 avg 집계 함수는 윈도우 함수로 처리된다.
- 윈도우 함수 뒤에는 항상 `OVER 절`을 사용한다. 이 규칙은 함수를 윈도우 함수로 처리할 것인지 그렇지 않은지 구분하는 문법상 규칙이다. OVER 절에는 윈도우 함수의 계산 대상이 되는 row들을 집합화하는 방법을 정의한다. 
- `PARTITION BY`로 정의하는 목록은 같은 그룹인지 다른 그룹인지 구분하는 기준으로 사용되고, 같은 그룹 내에서는 현재 row 값도 포함해서 계산된 윈도우 함수의 결과값을 공유한다.
- 또한 OVER절로 집합화하는 row들의 정렬 순서를 `ORDER BY 절`을 사용해서 지정할 수 있다.  

  ```cmd
  # 부서명을 기준으로 급여가 많은 자료부터 차례로 출력
  SELECT depname, empno, salary,
        rank() OVER (PARTITION BY depname ORDER BY salary DESC)
  FROM empsalary;

  # 결과
    depname  | empno | salary | rank 
  -----------+-------+--------+------
  develop   |     8 |   6000 |    1
  develop   |    10 |   5200 |    2
  develop   |    11 |   5200 |    2
  develop   |     9 |   4500 |    4
  develop   |     7 |   4200 |    5
  personnel |     2 |   3900 |    1
  personnel |     5 |   3500 |    2
  sales     |     1 |   5000 |    1
  sales     |     4 |   4800 |    2
  sales     |     3 |   4800 |    2
  (10 rows)
  ```  

- `rank 함수`를 사용하여 순위를 보여주며, rank 함수의 입력 매개변수는 필요없다. 뒤에 오는 OVER절에서 이 함수에서 처리해야할 모든 입력 정보들이 다 정의되었기 때문이다.
- 윈도우 함수의 계산 대상이 되는 row는 FROM 다음부터 WERE, GROUP BY, HAVING 절로 각 조건에 맞게 걸러진 `가상 테이블`의 각 row이다. WEHRE 조건절을 통해 이미 걸러진 row에 대해서는 윈도우 함수의 계산 대상이 되지 않는다. 
- 하나의 쿼리에 여러개의 윈도우 함수를 사용할 수 있다. 이 함수들은 각각의 OVER절을 사용하여 각각 자료를 집합화 한다. 하지만 이 집합화 대상이 되는 가상 테이블은 같아야 한다.
- ODER BY, PARTITION BY 절을 생략할 수 있으며, 윈도우 함수가 처리하는 같은 집합은 처리 결과 모든 row의 집합이 된다.
- 또 하나 중요한 사항은 `윈도우 프레임(window frame)`이라는 개념인데, 구분 대상이 되는 row 집합들 가운데 현재 윈도우 함수가 처리하는 row 집합을 뜻한다. 많은 윈도우 함수들이 이 윈도우 프레임 단위로 계산을 한다(전부는 아니다).  

  ```cmd
  # ORDER BY 생략
  SELECT salary, sum(salary) OVER () FROM empsalary;

  # 결과
  salary |  sum  
  --------+-------
    5200 | 47100
    5000 | 47100
    3500 | 47100
    4800 | 47100
    3900 | 47100
    4200 | 47100
    4500 | 47100
    4800 | 47100
    6000 | 47100
    5200 | 47100
  (10 rows)

  # ORDER BY 정의
  SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;

  # 결과
  salary |  sum  
  --------+-------
    3500 |  3500
    3900 |  7400
    4200 | 11600
    4500 | 16100
    4800 | 25700
    4800 | 25700
    5000 | 30700
    5200 | 41100
    5200 | 41100
    6000 | 47100
  (10 rows)
  ```  

- 윈도우 함수는 `현재 row를 포함해서` 급여가 제일 적은 것부터 차례대로 함수 결과를 그때 그때 출력한다.
- 윈도우 함수는 SELECT 항목 영역 안에서와 ORDER BY 절에서만 사용할 수 있다. 그 외 GROUP BY 절이나 HAVING, WHERE 절에는 사용할 수 없다. 논리적으로 이 함수의 처리 대상이 되는 입력 매개 변수값이 이미 결정이 나야하기 때문이다. 같은 이유로 윈도우 함수의 입력 매개 변수로 집계함수의 결과를 사용할 수 있지만, 그 반대는 불가능하다.
- 윈도우 함수를 사용한 결과에 대한 검색 조건이나, 재집계가 필요하다면 서브쿼리를 사용할 수 있다.  

  ```cmd
  # rank 값이 3보다 작은 자료 출력
  SELECT depname, empno, salary, enroll_date
  FROM
    (SELECT depname, empno, salary, enroll_date,
            rank() OVER (PARTITION BY depname ORDER BY salary DESC, empno) AS pos
      FROM empsalary
    ) AS ss
  WHERE pos < 3;
  ```  

- 여러 개의 윈도우 함수를 함께 쓸 때는 각각 OVER 절을 사용해야 하는데, 이 때 지정할 윈도우 프레임이 복잡하다면 오류가 날 가능성이 커진다. 이 문제를 줄이기 위해 `WINDOW 절`을 이용한다.  

  ```cmd
  SELECT sum(salary) OVER w, avg(salary) OVER w
    FROM empsalary
    WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);
  ```  

### 상속  

상속은 개게지향 데이터베이스에서 사용하는 개념이다. 상속은 데이터베이스 설계 방법에 대한 새로운 가능성을 제시한다.  

```cmd
# 전통적인 개념으로 자료구조를 설계
CREATE TABLE capitals (
  name       text,
  population real,
  altitude   int,    -- (in ft)
  state      char(2)
);

CREATE TABLE non_capitals (
  name       text,
  population real,
  altitude   int     -- (in ft)
);

CREATE VIEW cities AS
  SELECT name, population, altitude FROM capitals
    UNION
  SELECT name, population, altitude FROM non_capitals;


# inherits을 통해 테이블 상속
CREATE TABLE cities (
  name       text,
  population real,
  altitude   int     -- (in ft)
);

CREATE TABLE capitals (
  state      char(2)
) INHERITS (cities);
```  

- 하나의 테이블은 자신이 상위 테이블이 되거나 여러개의 상위 테이블을 상속받을 수 있다. 또한 그 테이블의 자료 조회는 하위 테이블의 모든 자료를 포함해서 조회한다.  

  ```cmd
  # 고도가 500 ft.보다 높은 수도와 도시 출력
  SELECT name, altitude
    FROM cities
    WHERE altitude > 500;

  # 고도가 500 ft.보다 높은 도시만 출력
  SELECT name, altitude
      FROM ONLY cities
      WHERE altitude > 500;
  ```  
  
- `ONLY 예약어`를 통해 조건을 추가할 수 있으며, SELECT, UPDATE, DELETE에서도 그대로 적용된다.
- 테이블 상속 기능은 유용하지만 유니크 제약조건, 참조키 같은 부분에서 그리 깔끔한 해결책을 제시하고 있지는 않다.


## Reference  
- SQL 언어: https://postgresql.kr/docs/9.4/tutorial.html