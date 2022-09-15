---
template: SinglePost
title: Open Robot Makers YandexOrderMgt
status: Published
date: '2022-05-20'
featuredImage: >-
excerpt: >-
  
categories:
  - category: Project
meta:
  description: test meta description
  title: test meta title
---

# Open Robot Makers YandexOrderMgt

## 0. 시스템 연동 정보

| 시스템 | 인스턴스 | 세부 정보 | 설명 |
| ---- | ------ | ------- | --- |
| Postgres | 추후 기재 | 추후 기재(table) |  |

<br>

## 1. 개발환경

| 항목        | 버전            |
| ---------- |----------------|
| Java       | openjdk-17.0.2 |
| gradle     | 7.4.1          |
| springboot | 2.6.7          |

<br>

### Dependencies

- Spring Boot Starter
  - Spring Data JPA
    - DB 접근/영속성을 위한 의존성
  - Spring Data REST
    - REST Pagebale 적용하여 Pagination 처리하기 위한 의존성
  - Spring Validation
    - @NotNull @NotEmpty 등 DTO/VO 객체 유효성 검증을 위한 의존성
  - Spring AOP
    - AOP 적용을 위한 의존성
  - Spring Web
    - Spring MVC 적용을 위한 의존성
  - Spring Webflux
    - WebClient 사용을 위한 의존성
      > Webflux를 사용하기 위한 것이 아닌 추후 RestTemplate Deprecate 예정에 따라 WebClient를 선제적으로 사용하기 위함입니다.
  - Spring Security
    - OAuth2 + JWT 인증/인가 처리를 위한 의존성
  - Spring Devtools
    - 개발시 Live Reload를 위한 의존성
  - Spring Test
    - Spring 기반 테스트를 위한 의존성
  - Keycloak
    - Spring Security에서 Keycloak을 인증 서버로 사용하기 위한 의존성
- Sping Boot Configuration Processor
  - application.yml 변수 설정을 위한 의존성
- Project Lombok
  - Getter, Setter, 생성자등 보일러플레이트를 줄이기 위한 의존성
- Modelmapper
  - DTO - Entity 객체간 변환을 위한 매퍼 라이브러리

<br>

### 로컬 개발 환경 구성

#### Postgres (with docker-compose)

  `docker-compose.yml` 파일을 활용하여 다음 명령어를 입력합니다.  

  > docker-compose가 설치되어 있어야 합니다.

  ```shell
  docker-compose -f docker-compose.yml up -d
  ```
  docker-compose.yml
  ```yaml
  version: '3.1'
  services:
    postgres:
      image: postgres:latest
      container_name: postRobotTest
      restart: always
      ports:
        - "5432:5432"
      environment:
        POSTGRES_USER: admin
        POSTGRES_PASSWORD: test1234
        POSTGRES_DB: robot_test
  ```
  테스트 테이블 및 데이터 생성
  ```sql
  -- Table: public.robot_status

  DROP TABLE IF EXISTS public.widget;

  CREATE TABLE IF NOT EXISTS public.widget (
      id CHARACTER VARYING(50) PRIMARY KEY NOT NULL,
      name CHARACTER VARYING(30) NOT NULL,
      item_key CHARACTER VARYING(50),
      x DOUBLE PRECISION,
      y DOUBLE PRECISION,
      width DOUBLE PRECISION,
      height DOUBLE PRECISION,
      draggable BOOLEAN,
      resizable BOOLEAN,
      selected BOOLEAN,
      grid_x DOUBLE PRECISION,
      grid_y DOUBLE PRECISION
  );

  -- Table: public.robot_status

  DROP TABLE IF EXISTS public.robot_info;

  CREATE TABLE IF NOT EXISTS public.robot_info (
      id CHARACTER VARYING(50) PRIMARY KEY NOT NULL,
      version CHARACTER VARYING(5),
      name CHARACTER VARYING(30)
  );

  -- Table: public.robot_status

  DROP TABLE IF EXISTS public.robot_status;

  CREATE TABLE IF NOT EXISTS public.robot_status(
      rb_id character varying(30) PRIMARY KEY NOT NULL,
      clct_dt timestamp without time zone,
      x double precision,
      y double precision,
      bttr double precision,
      drv_stat integer,
      speed double precision,
      heading double precision,
      map_id character varying(32),
      floor character varying(5),
      section character varying(5),
      from_node character varying(32),
      to_node character varying(32),
      charge boolean
  );

  INSERT INTO public.widget VALUES(gen_random_uuid(), 'RobotInfo', 'TE.ST.RO.BO.T1.11', 220, 120, 360, 160, true, false, false, 20, 20);
  INSERT INTO public.widget VALUES(gen_random_uuid(), 'TestWidget', 'TE.ST.RO.BO.T1.12', 680, 80, 360, 160, true, true, false, 20, 20);
  INSERT INTO public.widget VALUES(gen_random_uuid(), 'TestWidget', 'TE.ST.RO.BO.T1.22', 1340, 100, 360, 160, true, false, false, 20, 20);

  INSERT INTO public.robot_info VALUES('TE.ST.RO.BO.T1.11', '1.0.1', 'SR-01');
  INSERT INTO public.robot_info VALUES('TE.ST.RO.BO.T1.12', '1.0.1', '서빙로봇A');
  INSERT INTO public.robot_info VALUES('TE.ST.RO.BO.T1.22', '1.0.1', 'SR-01');

  INSERT INTO public.robot_status(rb_id, clct_dt, x, y, bttr, drv_stat, speed, heading, map_id, floor, section, from_node, to_node, charge)
  VALUES ('TE.ST.RO.BO.T1.11', now(), -12.00001, 32.123111, 99, 1, 0.7, 57.295779, '670', '1', 'A', 'T-C8', 'T-C1', false);
  INSERT INTO public.robot_status(rb_id, clct_dt, x, y, bttr, drv_stat, speed, heading, map_id, floor, section, from_node, to_node, charge)
  VALUES ('TE.ST.RO.BO.T1.12', '2021-12-15 20:47:31.523322', 7.741755, -63.037176, 62, 0, 0.7, 57.295779, '670', '1', 'A', 'T-C8', 'T-C1', false);
  ```


#### 프로젝트 설정

  - 프로파일  
    - local
      - 로컬 개발 및 테스트를 위한 profile
    - dev
      - 개발환경 (dev 브랜치) 적용을 위한 profile
    - prd
      - 상용환경 (prd 브랜치) 적용을 위한 profile
  
  application.yml
  ```yml
  spring:
  profiles:
    active: local

  ---
  spring:
    config:
      activate:
        on-profile: local
    datasource:
      url: jdbc:postgresql://localhost:5432/robot_test
      username: admin
      password: test1234
      driver-class-name: org.postgresql.Driver
    jpa:
      show-sql: true
      hibernate:
        ddl-auto: none
    mvc:
      pathmatch:
        matching-strategy: ant_path_matcher
      throw-exception-if-no-handler-found: true
    web:
      resources:
        add-mappings: false

  openrm:
    baseScheme: "http"
    baseHost: "localhost"
    basePort: 9090

  logging:
    level:
      org:
        keycloak: DEBUG
        springframework:
          security: DEBUG
        hibernate:
          SQL: DEBUG
          type:
            descriptor:
              sql:
                BasicBinder: TRACE
  keycloak:
    auth-server-url: http://dev.aiindustry.xyz:30480/auth/
    realm: openrm
    resource: openapi
  ```



## 2. 인증

  인증 서버로 Keycloak을 사용

  > 기존 Spring Security OAuth2를 이용한 스프링 기반의 인증서버 구축이 Deprecated됨에 따라 공식적으로 Keycloak과 같은 인증 서버를 사용할 것을 권장하고 있다.


### Keycloak 정보(임시)

| 구분      | 주소                                                          |
| -------- | ------------------------------------------------------------ |
| Keycloak | http://dev.aiindustry.xyz:30480/auth                         |
| OpenID   | http://dev.aiindustry.xyz:30480/auth/realms/openrm/.well-known/openid-configuration |


| 항목           | 값       | 설명                                      |
| ------------- | -------- | ----------------------------------------|
| realm         | openrm   | keycloak의 플랫폼 관리 단위                  |
| client_id     | ormweb   | 클라이언트의 아이디                          |
| client_secret | -        | 클라이언트의 비밀번호(postman 샘플 참고)        |
| grant_type    | password | 인증 방식으로 "password" 고정                |
| username      | admin    | 사용자명                                  |
| password      | -        | 사용자의 비밀번호(postman 샘플 참고)           |

  > 암호 정보는 첨부된 Postman 샘플의 변수 부분 참고


### 인증 방식

  인증 표준인 OAuth2 프로토콜을 사용

  OAuth2의 Resource Owner Password Credentials Grant 인증 방식을 사용하며 Bearer 토큰 타입과 JWT 포맷을 사용

  Role에 기반한 권한 분리




## 3. 호출 흐름

  ```mermaid
  sequenceDiagram
    participant A as FE
    participant B as BE
    participant D as Keycloak<br>(인증 서버)
    participant C as ORM 플랫폼<br>(Open API)
    A->>B: Request
    B->D: Auth
    B->>C: Request
    C->>B: Response
    B->>A: Response
  ```

  - 플랫폼에 대한 도메인 정보 요청은 같이 개발이 진행되는 Open API를 이용
  - BFF에서 사용할 DB는 인스턴스/스키마 분리

## 4. Directory 구조

  ```
  📦src
  ┣ 📂main
  ┃ ┣ 📂java
  ┃ ┃ ┗ 📂com
  ┃ ┃ ┃ ┗ 📂kt
  ┃ ┃ ┃ ┃ ┗ 📂orm
  ┃ ┃ ┃ ┃ ┃ ┣ 📂config
  ┃ ┃ ┃ ┃ ┃ ┣ 📂constant
  ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
  ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
  ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
  ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
  ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂handler
  ┃ ┃ ┃ ┃ ┃ ┣ 📂filter
  ┃ ┃ ┃ ┃ ┃ ┣ 📂model
  ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
  ┃ ┃ ┃ ┃ ┃ ┣ 📂service
  ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂impl
  ┃ ┃ ┃ ┃ ┃ ┣ 📂util
  ┃ ┃ ┗ ┗ ┗ ┗ 📜OpenRmWebDemoApplication.java
  ┃ ┗ 📂resources
  ┗ 📂test
  ┃ ┣ 📂java
  ┃ ┃ ┣ 📂com
  ┃ ┃ ┃ ┣ 📂kt
  ┗ ┗ ┗ ┗ ┗ 📂orm
  ```
  - src/main/java/com/kt/orm
    - config: Keycloak, SpringFox, 변수 설정 파일
    - constant
    - controller: RestController 파일
    - domain: Entity Class 파일
    - dto
    - exception
      - handler
    - filter: Logging Filter 파일
    - model: Response Class 파일
    - repository: JPA Repository 파일
    - service
      - serviceImpl
    - util: Converter, WebClient Util 파일
  - resource
    - application.yml
    - messages.properties