---
template: SinglePost
title: Apache Spark (1) - 개요
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



## 개요

`Apache Spark`는 범용적이면서도 빠른 속도로 작업을 수행할 수 있도록 설계한 `클러스터용` 연산 플랫폼이자 스트림 처리를 효과적으로 수행하는 인-메모리 방식의 분산 처리 시스템이다.

- `인메모리 컴퓨팅`: 기존의 디스크 기반 컴퓨팅과는 달리 데이터를 하드디스크에 저장하고 관리하는 것이 아니라 전체 데이터를 메모리에 적재하여 사용하는 것을 의미한다. 조금 더 기술적인 정의는 컴퓨팅 시스템의 공식 기록 시스템으로 하드디스크를 사용하는 것이 아니라 메모리를 사용하는 것이라 할 수 있다. 기존 디스크 기반 컴퓨팅에서는 데이터를 하드디스크에 보관/처리하고, 빈번하게 사용되는 일부 데이터를 메모리에 캐싱하는 구조라고 하면, 인메모리 컴퓨팅은 데이터를 메모리에 보관/처리하고 하드디스크를 데이터의 안전한 보관하기 위해 사용하는 구조다.

- `Spark Dataframe`: 관계형 데이터베이스의 테이블에서 칼럼 이름으로 구성된 변경 불가능한 분산 데이터 컬렉션이다.

- Zeppelin: https://zeppelin.apache.org/




## Apache Spark란?

![image](https://blog.kakaocdn.net/dn/VFS3T/btq27Yf4c6U/SZazHv7jY7IDtZamav6VV0/img.png)

- `인메모리` 기반의 대용량 데이터 고속 처리 엔진이다.
- 오픈 소스 범용 분산 클러스터 컴퓨팅 프레임워크이다.
- 최초 데이터 로드와 최종 결과 저장시에만 디스크를 사용한다.
- 메모리에 분산 저장하고, 병렬 처리 구조이다.


### Spark 소개 및 특징

- Hadoop vs Spark
- 디스크 입출력 방식을 인-메모리 데이터 처리 방식으로 전환
- 기존 맵리듀스 디스크 입출력 방식보다 평균 10~100배 정도의 `속도 향상`
- 기존 디스크 입출력에 대한 지연 시간 개선
- 메모리를 사용하여 반복적인 작업이나 스트리밍 데이터를 효율적으로 처리
- 빅데이터 애플리케이션에 필요한 대부분의 기능을 지원
- 맵리듀스와 유사한 일괄 처리 기능
- 실시간 데이터 처리 기능 (Spark Streaming)
- SQL과 유사한 정형 데이터 처리 기능 (Spark SQL)
- 그래프 알고리즘 (Spark GraphX)
- 머신러닝 알고리즘 (Spark MLlib)
- 아키텍처 구조

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlLXNZ%2FbtqVcrWGj6d%2FeMIYlXgLtLCuOlNFjLFEm0%2Fimg.png)


#### Spark 특징

- 인메모리 기반의 빠른 처리
- 다양한 언어(Java, Scala, Python, R, SQL)을 통한 사용의 편의성
- SQL, Streaming, 머신러닝, 그래프 연산 등 다양한 컴포넌트 제공
- YARN, Mesos, Kubernetes 등 다양한 클러스터에서 동작 가능
- HDFS(하둡 분산파일 시스템), Cassandra, HBase 등 다양한 파일 포맷 지원


#### Spark 지원언어

- Spark 프로그래밍
- Spark Application은 Scala, Java, Python, R로 구현
- 각 언어로 `스파크 SQL`을 실행
- 스칼라
- `객체 지향 언어`의 특징과 `함수형 언어`의 특징을 함께 가지는 다중 패러다임 프로그래밍 언어
- 스칼라는 자바 가상머신(JVM)에서 동작하는 JVML언어
- JVML(Java Virtual Machine Language) 언어는 자바 가상머신 위에서 동작하는 언어들로 Scala, Kotlin, Groovy 등
- 파이썬, Java, R
- 스파크 쉘: 데이터를 대화식으로 분석하는 강력한 도구인 대화형 쉘을 제공
- PySpark


#### Spark 유사 플랫폼 비교

- 스파크와 하둡과의 비교
  - 스파크의 `메모리 내` 데이터 고속 처리 엔진은 특정 상황, 스테이지 간 다중 스테이지 작업과 비교 시 맵리듀스에 비해 최대 100배 더 빠르다.
  - Apache Spark API는 맵리듀스와 다른 아파치 하둡 구성 요소에 비해 `개발자 친화적 API`를 제공하여 분산 처리 엔진의 복잡성 대부분을 간단한 메서드로 처리하도록 한다.
  - 아파치 스파크의 중심은 `컴퓨팅 클러스터`로 분할 가능한 `불변적 객체 컬렉션`을 나타내는 프로그래밍 추상화, 즉 `탄력적 분산 데이터 집합(Resilient Distributed Dataset, RDD) 개념`이다.
  - 스파크 SQL은 구조적 데이터 처리에 초점을 두며, R과 Python에서 차용한 `데이터프레임`을 사용한다.
  - 스파크 SQL은 표준 SQL 지원 외에 기본적으로 지원되는 JSON, HDFS, 아파치 하이브, JDBC, 아파치 ORC, `아파치 파케이(Parquet)`을 포함한 다른 데이터 저장소에서의 읽기와 쓰기를 위한 표준 인터페이스도 제공한다.




### Apache Spark 구조

- 지원하는 Open Source Ecosystem

![image](https://databricks.com/wp-content/uploads/2019/02/largest-open-source-apache-spark.png)


#### Spark Components

![image](https://blog.kakaocdn.net/dn/p5OdB/btqAZNZtkHQ/WL2wlmkWmJ67XJVOJXxkw1/img.gif)

- `Spark Core`
  - 메모리 기반의 분산 `클러스터` 컴퓨팅 환경
  - 스파크 전체의 기초가 되는 `기초 분산 작업 처리`
  - `장애복구`, 네트워킹, 보안, 스케줄링 및 데이터 셔플링 등 기본 기능을 제공
  - 분산 데이터 컬렉션(dataset)을 추상화한 객체인 RDD(Resilient Distributed Dataset)로 다양한 연산 및 변환 메소드를 제공
  - 스파크 코어는 HDFS, GlusterFS, 아마존 S3 등 다양한 파일 시스템에 접근 가능
  - 스파크 잡과 다른 스파크 컴포넌트에 필요한 기본 기능을 제공
- `Spark SQL`
  - 스파크와 하이브 SQL이 지원하는 SQL을 사용해 `대규모 분산 정형 데이터 처리`
  - JSON, Parquet 파일, RDB 테이블, 하이블 테이블 등 다양한 정형 데이터 읽기 및 쓰기 가능
  - DataFrame과 Dataset에 적용된 연산을 일정 시점에 RDD 연산으로 변환해 일반 스파크 잡으로 실행
- `Spark Streaming`
  - 실시간 스트리밍 데이터를 처리하는 프레임워크
  - HDFS, Apache Kafka, Apache Flume, 트위터, ZeroMQ와 더불어 커스텀 리소스도 사용 가능
  - 이산 스트림(Discretized Stream, DStream) 방식으로 스트리밍 데이터를 표현하는데, 가장 마지막 타임 윈도 안에 유입된 데이터를 `RDD`로 구성해 주기적으로 생성
  - 다른 스파크 컴포넌트와 함께 사용할 수 있어 실시간 데이터 처리를 머신러닝 작업, SQL 작업, 그래프 연산 등을 통합 가능
- Ignite: 속도가 더 개선된 데이터 처리 엔진
- Spark MLlib
  - 머신러닝 알고리즘 라이브러리
  - RDD 또는 DataFrame의 dataset을 변환하는 머신 러닝 모델을 구현
- Spark GraphX
  - 그래프는 정점과 두 정점을 잇는 간선으로 구성된 데이터 구조
  - 그래프 RDD(EdgeRDD 및 VertexRDD) 형태의 그래프 구조를 만들 수 있는 기능을 제공
  - 그래프 데이터는 Vertex와 Edge로 구성


#### Spark 동작 구조

![image](uploads/6c57d9145281f7534d8519fbb40fbdfd/image.png)

- Cluster Manager
  - 클러스터에 1개 존재
  - 여러 대의 서버로 구성된 클러스터 환경에서 다수의 Application이 함께 구동될수 있게 Application 간의 CPU나 메모리, 디스크와 같은 전반적인 `컴퓨팅 자원 관리`
- `스케줄링` 담당
- Standalone: 스파크가 독립적으로 작동할 수 있음
- YARN: 하둡의 리소스 매니저(하둡과 스파크는 상호 독립적)
- `Mesos`: 분산 커널 시스템
- `Kubernetes`: Orchestration 도구
- Driver
  - SparkContext와 RDD 생성
  - Transformation과 Action을 생성
  - 사용자 코드를 실행, main()문과 같은 역할을 하는 프로세스
- SparkContext
  - 어떻게 클러스터에 접근할 수 있는지 알려주는 object
  - Worker Node 내 Executor간 통신이 발생
  - Driver는 Executor에게 Task를 할당
  - Executor에서는 Task를 수행하고 종료시 Driver에게 결과 값을 주게 됨
- Worker Node
  - 실제 작업을 수행하는 노드
- Executor
  - 주어진 스파크 작업의 개별 태스크들을 실행하는 작업실행 프로세스
  - 애플리케이션을 구성하는 작업을 실행 -> 드라이버에 결과를 전송
  - 사용자 프로그램에서 캐시하는 RDD를 저장하기 위한 메모리 저장소 제공
- Task: executor에 할당되는 작업의 단위


#### Spark 프로그래밍 모델

- Spark의 처리 모델 RDD
  - 스파크 내부에 존재하는 분산 데이터에 대한 모델, `기본 데이터 구조`
  - 단순히 값으로 표현되는 데이터만 가리키는 것이 아니라 `데이터를 다루는 방법까지 포함`하는 일종의 클래스와 같은 개념
  - 스파크에서 내부적으로 연산하는 데이터들은 모두 RDD 타입으로 처리
  - RDD는 대량의 데이터를 요소로 가지는 분산 컬렉션
  - RDD는 여러 머신으로 구성된 클러스터 환경에서의 분산처리를 전제로 설계되었으며, 내부는 `파티션`이라는 단위로 구분
  - RDD는 배열/리스트 등의 요소를 저장하며, 내부는 여러 개의 파티션(분산 처리 단위)으로 구분
  - 사용자는 HDFS 등의 분산 파일시스템에 있는 파일 내용을 RDD로 로드하고, RDD를 가공하는 대량의 데이터를 분산처리
  - Immutable(변경이 불가능한 데이터셋): RDD 복구 가능
- RDD 연산
  - Transformation
    - 주어진 스파크 작업의 개별 태스크들을 실행하는 작업실행 프로세스
    - 기존의 RDD 내용이 바뀌는 것이 아니라 새로운 RDD가 생성
    - 즉, 기존의 RDD와 새로운 RDD 2개가 각각 존재
  - Action
    - RDD의 요소들을 이용해 어떤 결과값을 얻어내는 연산
    - return 값이 RDD가 아닌 값(다른 타입의 데이터)
  - Partition
    - 하나의 RDD는 여러 개의 파티션으로 나뉘어짐
    - 성능에 유효한 영향을 줌
    - 파티션의 갯수, 파티셔너는 선택 가능
    - 기본 파티셔너(Hash, range) 외에도 사용자가 정의한 파티셔너를 사용 가능


### Apache Spark 운용

#### Spark 설치 및 환경설정

- Spark 운용 특징
  - 대량의 데이터를 고속 병렬분산처리
  - 스토리지 I/O와 네트워크 I/O를 최소화하도록 처리
  - 동일한 데이터에 대한 변환처리가 연속으로 이루어지는 경우 머신러닝처럼 결과셋을 여러번 반복하여 처리 고속화
  - 한 대의 노드로 처리할 수 있는 용량보다 더 큰 데이터셋에 대해 시행착오 가능한 환경 제공
  - `배치처리, 스트림처리, SQL 처리`와 같은 서로 다른 형태의 애플리케이션을 하나의 환경에서 통합해 이용할 수 있는 환경
  - 스파크 코어는 데이터소스로 HDFS뿐만 아니라 Hive, HBase, PostgreSQL, MySQL, CSV 파일 등도 처리
- 다운로드 사이트: https://spark.apache.org/downloads.html
- 설치

```
- wget http://www.apache.org/dyn/closer.lua/spark/spark-2.4.5/spark-2.4.5-bin-hadoop2.7.tgz

- 압축 풀기
tar -xvzf spark-2.4.5-bin-hadoop2.7.tgz

- symbolic link
ln --s spark-2.4.5-bin-hadoop2.7 spark
```

- Spark 환경설정

```
- 계정설정 ~/.bashrc
export SPARK_HOME=/home/계정/spark
export PATH=$PATH:$SPARK_HOME/bin

- 설정된 내용 적용
source ~/.bashrc
```

- 각 언어별 실행 스크립트
- Spark/bin directory에 다음과 같이 각 언어를 실행할 수 있는 스크립트 확인

```
- bin 폴더 실행 파일
rwxr-xr-x 1 root root 3265 Nov 2019 pyspark //파이썬
rwxr-xr-x 1 root root 1049 Nov 16 2019 sparkR //R
rwxr-xr-x 1 root root 3026 Nov 16 2019 spark-shell //scala repl
rwxr-xr-x 1 root root 1075 Nov 16 2019 spark-sql //scala on sql
rwxr-xr-x 1 root root 1050 Nov 16 2019 spark-submit //scala jar
```

- Spark Application 제출(spark-submit)
- 스칼라나 자바로 작성한 스파크 애플리케이션을 jar파일로 만들어서 spark-submit을 이용해 실행

```
${SPARK_HOME}/bin/spark-submit \
--class <main-class> \
--master <master-url> \
--deploy-mode <deploy-mode> \
--conf <key>=<value> \
...
```

- 예시

```
{SPARK_HOME}/bin/spark-submit --master spark:/host:7077 --executor-memory 10g myscript.py
```


#### Spark Shell

- Spark 애플리케이션 REPL 처리
- REPL 환경을 이용한 작업 처리도 지원
- spark-shell, pyspark를 실행하면 REPL 환경에서 interactively 작업 처리
- 스칼라를 이용한 처리는 spark-shell 이용
- Spark Scala
  - 객체 지향 언어의 특징과 함수형 언어의 특징을 함께 가지는 다중 패러다임 프로그래밍 언어
  - Scala가 성능과 동시처리성 측면에서 유리
  - 스칼라는 자바 가상머신(JVM)에서 동작하는 JVML언어
  - 스칼라는 스칼라 컴파일러를 통해 스칼라 코드를 바이트 코드로 변환하고, 바이트 코드는 JVM상에서 자바와 동일하세 실행
  - 스칼라는 변경 불가능한 Immutable 변수 (RDD의 특징)


#### PySpark

- PySpark 개요
  - 스파크의 메인 추상화는 RDD
  - PySpark는 apache spark를 python에서 실행하기 위한 api
  - PySpark 스크립트는 대화형 Python shell
  - PySpark는 Python의 minor version과 동일한 version을 필요
  - 기본 파이선 버전을 `PATH`에 걸어주는 작업이 필요
  - 특정 버전을 설정하고자 한다면 PYSPARK_PYTHON의 값 설정

```
$PYSPARK_PYTHON=python3.4 bin/pyspark
```

- PySpark 사용
- 스파크 프로그램의 시작은 SparkContext를 생성하는 것으로 시작
- PySpark는 더 많은 일반 spark-submit script를 호출
- PySpark 쉘은 SparkContext가 이미 생성되어 있는 인터프리터

```
$./bin/pyspark --master local[4] --py-files code.py
```


### Reference

인메모리 컴퓨팅: https://blog.lgcns.com/176

