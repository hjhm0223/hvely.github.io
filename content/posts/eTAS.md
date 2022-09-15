---
template: SinglePost
title: eTAS Server to Server 연동 Batch
status: Published
date: '2022-03-16'
featuredImage: >-
excerpt: >-
  
categories:
  - category: Project
meta:
  description: test meta description
  title: test meta title
---

# eTAS Server to Server 연동 Batch

## 0. 시스템 연동 정보

| 시스템 | 인스턴스 | 세부 정보 | 설명 |
| ---- | ------ | ------- | --- |
| PPAS | 추후 기재 | 추후 기재(table) | 운행차량, 사업자 번호 조회를 위한 연동 |
| MongoDB | 추후 기재 | 추후 기재 (collection) | 운행차량별 운행 기록 정보 조회를 위한 연동 |
| Redis | 1 | 추후 기재(Keys) | PPAS 에서 가져온 정보 Provisioning, 교통안전공단 정보 Caching |

<br>

## 1. 개발환경 세팅

| 항목        | 버전            |
| ---------- |----------------|
| Java       | openjdk-17.0.2 |
| gradle     | 7.4            |
| springboot | 2.6.3          |

<br>

**로컬 개발 환경 셋팅을 위한 Postgres, MongoDB, Redis Setting**
1. Redis (for Mac)
    ```shell
    brew install redis
    brew services start redis
    ```

2. MongoDB, Postgres (with docker-compose)

    아래 기재한 docker-compose.yaml 파일을 활용하여 다음 명령어를 입력합니다.
    ```shell
    docker-compose -f docker-compose.yaml up -d
    ```
    ```yaml
    version: '3.1'
    services:
      mongo:
        image: mongo
        restart: always
        container_name: mongo
        ports:
          - "27017:27017"
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: test1234
          MONGO_INITDB_DATABASE: test_db
      postgres:
        image: postgres:latest
        container_name: postgres
        restart: always
        ports:
          - "5432:5432"
        environment:
          POSTGRES_USER: admin
          POSTGRES_PASSWORD: test1234
          POSTGRES_DB: testdb
        volumes:
          - "/Users/hyunjeeoh/docker/db/init.sql"
    #  redis:
    #    image: redis
    #    restart: always
    #    ports:
    #      - "6379:6379"
    ```
    PostgreSQL 접속하기
    ```shell
    docker exec -it postgres /bin/bash
    ```
    DB 한번에 종료하기  
    ```shell
    docker-compose down
    ```


## 2. Build & Deploy

**Build**

```shell
./gradlew build
```

**Deploy**

```shell
java -jar ETASSubmissionBatch-1.0.0.jar
```

## 3. 전송상태 업데이트 API 개발

### 설계 내용
1. 최승훈 대리에게 파일그룹키 전달 받은 후 파일그룹키로 운행파일수집, 분석결과 테이블 조회
2. 파일정상여부와 파일키 리스트 가져오기
3. 운행전송상태 업데이트 API 전송

### 개발 내용
1. 로컬 DB에 운행파일수집, 분석결과 테이블 생성  
    [docker-compose를 활용한 DB 환경 및 스키마 생성 자동화](https://intrepidgeeks.com/tutorial/using-docker-compose-to-automatically-create-database-environment-and-schema)
    ```shell
    docker exec -it postgres /bin/bash
    su - postgres 
    psql --username admin --dbname testdb
    ```
    > psql 명령어
    > - \list(or \l) : 전체 Database Instance 목록
    > - \dt : 접속한 DB Instance의 Table 목록
    > - \ds : Sequence 목록
    > - \df : Function 목록
    > - \dv : View 목록
    > - \du : User 목록
    ```sql
    -- Creation of mvmn_file_colec table
    CREATE TABLE IF NOT EXISTS public.mvmn_file_colec (
      ccom_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
      car_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
      inner_chk_dt timestamp without time zone NOT NULL,
      grp_key character varying(14) COLLATE pg_catalog."default",
      car_no character varying(20) COLLATE pg_catalog."default",
      req_cmd character varying(3) COLLATE pg_catalog."default",
      login_id character varying(20) COLLATE pg_catalog."default",
      secure_key character varying(20) COLLATE pg_catalog."default",
      enterp_code character varying(5) COLLATE pg_catalog."default",
      file_name character varying(40) COLLATE pg_catalog."default",
      file_size numeric(5,0),
      file_type character varying(1) COLLATE pg_catalog."default",
      model_name character varying(20) COLLATE pg_catalog."default",
      type_cd character varying(9) COLLATE pg_catalog."default",
      bizr_no character varying(250) COLLATE pg_catalog."default",
      driver_code character varying(18) COLLATE pg_catalog."default",
      drive_date character varying(8) COLLATE pg_catalog."default",
      drive_start_time timestamp without time zone,
      drive_end_time timestamp without time zone,
      drive_sumdist numeric(10,3),
      verify_errcode character varying(50) COLLATE pg_catalog."default",
      file_standard character varying(1) COLLATE pg_catalog."default",
      cretr_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
      cret_dt timestamp without time zone NOT NULL,
      cret_ipadr character varying(15) COLLATE pg_catalog."default",
      amdr_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
      amd_dt timestamp without time zone NOT NULL,
      amd_ipadr character varying(15) COLLATE pg_catalog."default",
      req_appcode character varying(3) COLLATE pg_catalog."default",
      CONSTRAINT mvmn_file_colec_pk PRIMARY KEY (ccom_id, car_id, inner_chk_dt)
    )

    WITH ( autovacuum_enabled = TRUE ) TABLESPACE pg_default;

    ALTER TABLE public.mvmn_file_colec OWNER to admin;

    GRANT ALL ON TABLE public.mvmn_file_colec TO admin;


    -- Creation of anal_result table
    CREATE TABLE IF NOT EXISTS public.anal_result (
      ccom_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
      car_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
      inner_chk_dt timestamp without time zone NOT NULL,
      trm_dt timestamp without time zone NOT NULL,
      rcv_dt timestamp without time zone NOT NULL,
      grp_key character varying(14) COLLATE pg_catalog."default",
      res_code character varying(10) COLLATE pg_catalog."default",
      res_msg character varying(100) COLLATE pg_catalog."default",
      file_key character varying(15) COLLATE pg_catalog."default",
      cretr_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
      cret_dt timestamp without time zone NOT NULL,
      cret_ipadr character varying(15) COLLATE pg_catalog."default",
      amdr_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
      amd_dt timestamp without time zone NOT NULL,
      amd_ipadr character varying(15) COLLATE pg_catalog."default",
      req_appcode character varying(3) COLLATE pg_catalog."default",
      CONSTRAINT anal_result_pk PRIMARY KEY (ccom_id, car_id, inner_chk_dt)
    )

    WITH ( autovacuum_enabled = TRUE ) TABLESPACE pg_default;

    ALTER TABLE public.anal_result OWNER to admin;

    GRANT ALL ON TABLE public.anal_result TO admin;


    -- Filling of mvmn_file_colec
    INSERT INTO mvmn_file_colec VALUES('TCCOMID001', 'TESTA18TPKC122110', '2022-04-01 15:17:31.010679', '20220324935709', '11가1112', 'INS', 'kt', '', '8324',
                                      '20220323-11가1112-S-01-DRIVER0.TXT', '81', 'S', 'TMODEL001', '16', '1308164643', 'DRIVER000111222334', '20220323', '2022-03-23 11:39:40.585', '2022-03-23 12:39:40.586', '100.000',
                                      '', '5', 'FileValidJob', '2022-03-24 15:17:30.911353', '172.18.0.1', 'FileValidJob', '2022-03-24 15:17:30.911353', '172.18.0.1', 'CS5');

    -- Filling of anal_result
    INSERT INTO anal_result VALUES('TCCOMID001', 'TESTA18TPKC122110', '2022-04-01 15:17:31.010679', '2022-03-24 06:37:32.586507', '2022-04-01 06:37:32.586507', '20220324935709', '200' , '',
                                  '202203240603325', 'DriveRecordJob', '2022-03-24 06:37:32.586507', '172.18.0.1/32', 'DriveRecordJob', '2022-03-24 06:37:32.586507', '172.18.0.1/32', 'CS5');
    INSERT INTO anal_result VALUES('TCCOMID001', 'TESTA18TPKC122110', '2022-04-01 15:17:31.019839', '2022-03-24 06:37:32.586507', '2022-04-01 06:37:32.586507', '20220324935709', '200' , '',
                                  '202203240603326', 'DriveRecordJob', '2022-03-24 06:37:32.586507', '172.18.0.1/32', 'DriveRecordJob', '2022-03-24 06:37:32.586507', '172.18.0.1/32', 'CS5');
    ```
    데이터 입력 결과 확인
    ```shell
    SELECT * FROM mvmn_file_colec;
    SELECT * FROM anal_result;
    ```

2. Domain(Entity), DTO class 생성  
    필요한 Domain(Entity), DTO class 생성
    - MvmnFileCollect(Entity)
    - MvmnFileCollectDto
      - 엔티티에 포함되지 않지만 DB 조회 결과로 받고 싶은 속성 추가
    - eTAS 파일전송상태 업데이트 API 요청/응답 class
      - FileTrmStatusUpdateRequest
      - FileTrmStatusUpdateResponse

    > Domain(Entity)와 DTO  
    > - [DTO, DAO(=Repository), Domain(=Entity)](https://velog.io/@linger0310/DDD)  
    > - [DTO의 사용 범위에 대하여](https://tecoble.techcourse.co.kr/post/2021-04-25-dto-layer-scope/)
    

3. Service 생성  
    그룹키로 운행정보수집파일 조회하여 file_Key, file_Standard 값 가져오기
    - Mapper 생성 후 SQL 쿼리문 작성 (Mybatis 사용)
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
      <mapper namespace="com.kt.ccp.etas.mapper.FileTrmStatusMapper">
          <select id="selectMvmnFileCollectListByGrpKey" resultType="com.kt.ccp.etas.dto.MvmnFileCollectDto" parameterType="java.lang.String">
              SELECT
                  M.ccom_id as "ccomId"
                  , M.car_id AS "carId"
                  , M.inner_chk_dt AS "innerCheckDate"
                  , M.grp_key AS "grpKey"
                  , A.file_key AS "fileKey"
                  , M.file_standard AS "fileStandard"
              FROM mvmn_file_colec M INNER JOIN anal_result A
                  ON M.grp_key = A.grp_key
                      AND M.ccom_id = A.ccom_id
                      AND M.car_id = A.car_id
              WHERE M.grp_key = #{grpKey}
          </select>
      </mapper>
      ```

    전송상태 업데이트 API 호출
      - 조회한 데이터로 query parameter(FileTrmStatusUpdateRequest) 생성
      - MultiValueMap<String, String> 값으로 변환
        - parameter 검증 필요
      - RestTemplate 사용하여 eTAS에 파일전송상태 업데이트 API 호출 (WebClient 사용 시 parameter 값 받지 못하는 현상 발생하여 RestTemplate 이용)

4. Test Code 작성

    dependency 추가 
      - application.yaml
        ```yaml
        dependencies {
            testImplementation 'org.springframework.boot:spring-boot-starter-test'
            testImplementation 'org.springframework.batch:spring-batch-test'
            testImplementation "org.mybatis.spring.boot:mybatis-spring-boot-starter-test:2.2.2"
            testCompileOnly 'org.projectlombok:lombok'
            testAnnotationProcessor 'org.projectlombok:lombok'
        }
        ```
    
    테스트 클래스 생성
      - `FileTrmStatusUpdateService 클래스 테스트`
        ```java
        @Slf4j
        @SpringBootTest
        @AutoConfigureMockMvc
        @AutoConfigureMockRestServiceServer
        @AutoConfigureMybatis
        @Transactional
        @ImportAutoConfiguration(CommonDBConfig.class)
        @DisplayName("FileTrmStatusUpdateService 클래스")
        @Sql("/fileTrmStatusUpdateTestData.sql")
        public class FileTrmStatusUpdateServiceTests {

        }
        ```
        - `@SpringBootTest` : Spring Boot 기반 테스트 클래스에 지정
        - `@ImportAutoConfiguration(CommonDBConfig.class)` : DB 연동 설정
        - `@AutoConfigureMybatis` : Mybatis 설정
        - `@Sql` : 테스트 테이블 및 데이터 삽입
        - `@Transactional` : 사용하여 테스트 종료 후 자동 rollback)

    FileTrmStatusUpdateService 클래스 테스트
      - 테스트 시나리오
        1. 테스트 데이터 존재 여부 확인
            - 필요 데이터: 운행파일수집 테이블 (mvmn_file_colec),  분석결과 테이블 (anal_result)
            - 데이터 조회 예상 결과 확인
        2. 파라미터 유효성 테스트
            - 파일전송상태 업데이트 서비스 호출 시 전달받는 `grpKey`가 null 일 때 `NullPointerException` 처리되는지 확인
            - 파일전송상태 업데이트 API 호출 시 전달하는 query parameter 검증
              - 입력한 테스트 데이터로 만든 parameter와 일치하는지
        3. API 테스트
            - API 호출하는 URI 및 Encoding 결과 검증 (query parameter 포함)
            - API 응답 결과 Status Code, Response Body 검증
              - 성공 케이스
              - 실패 케이스
                - 필수 파라미터 없는 경우, 401
      - 테스트 코드
        ```java
        @Slf4j
        @SpringBootTest
        @AutoConfigureMockRestServiceServer
        @AutoConfigureMybatis
        @Transactional
        @ImportAutoConfiguration(CommonDBConfig.class)
        @DisplayName("FileTrmStatusUpdateService 클래스")
        @Sql("/fileTrmStatusUpdateTestData.sql")
        public class FileTrmStatusUpdateServiceTests {
            private static final String expectedCarId = "TESTA18TPKC122110";
            private static final String expectedCcomId = "TCCOMID001";
            private static final LocalDateTime expectedInnerChkDt = LocalDateTime.parse("2022-03-24T15:17:31.010679");
            private static final String expectedGrpKey = "20220324935708";
            private static final String expectedFileKey1 = "202203240603325";
            private static final String expectedFileKey2 = "202203240603326";
            private static final String expectedFileStandard = "5";
            private static final List<MvmnFileCollectDto> expectedList = Arrays.asList(
                    MvmnFileCollectDto.builder()
                        .ccomId(expectedCcomId)
                        .carId(expectedCarId)
                        .innerCheckDate(expectedInnerChkDt)
                        .grpKey(expectedGrpKey)
                        .fileKey(expectedFileKey1)
                        .fileStandard(expectedFileStandard)
                        .build(),
                    MvmnFileCollectDto.builder()
                        .ccomId(expectedCcomId)
                        .carId(expectedCarId)
                        .innerCheckDate(expectedInnerChkDt)
                        .grpKey(expectedGrpKey)
                        .fileKey(expectedFileKey2)
                        .fileStandard(expectedFileStandard)
                        .build());
            private static final String expectedItems = """
                [{"grp_Key":"20220324935708","file_Key":"202203240603325","file_Standard":"5"}, {"grp_Key":"20220324935708","file_Key":"202203240603326","file_Standard":"5"}]""";

            @Autowired
            FileTrmStatusUpdateService fileTrmStatusUpdateService;

            @Autowired
            FileTrmStatusMapper fileTrmStatusMapper;

            @Autowired
            MockRestServiceServer mockRestServiceServer;

            @Autowired
            EtasUrlConfig etasUrlConfig;

            @BeforeAll
            static void testSetUp() {
            }

            @BeforeEach
            void setUp() {
            }

            @Nested
            @DisplayName("파일전송상태 업데이트 테스트 데이터 검증")
            class FileTrmStatusUpdateDataTest {
                @Test
                @DisplayName("테스트 데이터 조회 결과 정상")
                void doExistTestData() throws IOException {
                    var actualList = fileTrmStatusMapper.selectMvmnFileCollectListByGrpKey(expectedGrpKey);

                    assertThat(actualList).isEqualTo(expectedList);
                }

                @Test
                @DisplayName("테스트 파라미터 정상")
                void isValidTestData() throws IOException {
                    String actualItems = fileTrmStatusUpdateService.getUpdateRequestItems(expectedList);

                    assertThat(actualItems).isEqualTo(expectedItems);
                }
            }

            @Nested
            @DisplayName("파일전송상태 업데이트 API 테스트")
            class FileTrmStatusUpdateServiceTest {
                @Nested
                @DisplayName("성공 케이스")
                class FileTrmStatusUpdateServiceSuccessTest {
                    @Test
                    @DisplayName("정상 200 리턴(MockRestServiceServer)")
                    void isFileTrmStatusUpdateServiceSuccess() {
                        final String expectedResCode = "200";
                        final String expectedJsonResponse = """
                                {
                                    "res_Code": "200",
                                    "res_Msg": ""
                                }""";

                        FileTrmStatusUpdateRequest expectedRequest = new FileTrmStatusUpdateRequest();
                        expectedRequest.setItems(expectedItems);

                        URI expectedUri = UriComponentsBuilder.fromPath(ApiEndpoints.ETAS_FILE_STATUS)
                                .scheme("http")
                                .host(etasUrlConfig.getBaseHost())
                                .port(etasUrlConfig.getUploadPort())
                                .queryParams(MultiValueMapConverter.convert(expectedRequest))
                                .build()
                                .toUri();

                        mockRestServiceServer
                                .expect(requestTo(expectedUri))
                                .andExpect(method(HttpMethod.POST))
                                .andRespond(withSuccess(expectedJsonResponse, MediaType.APPLICATION_JSON));

                        FileTrmStatusUpdateResponse actualResponse = fileTrmStatusUpdateService.updateFileTrmStatus(expectedGrpKey);

                        assertThat(actualResponse).isNotNull();
                        assertThat(actualResponse.getRes_Code()).isEqualTo(expectedResCode);
                    }
                }

                @Nested
                @DisplayName("실패 케이스")
                class FileTrmStatusUpdateServiceFailTest {
                    @Test
                    @DisplayName("grpKey NullPointerException 발생(MockRestServiceServer)")
                    void isFileTrmStatusUpdateServiceThrowNullPointerException() {
                        final String expectedJsonResponse = """
                                {
                                    "res_Code": "200",
                                    "res_Msg": ""
                                }""";

                        FileTrmStatusUpdateRequest expectedRequest = new FileTrmStatusUpdateRequest();
                        expectedRequest.setItems(expectedItems);

                        URI expectedUri = UriComponentsBuilder.fromPath(ApiEndpoints.ETAS_FILE_STATUS)
                                .scheme("http")
                                .host(etasUrlConfig.getBaseHost())
                                .port(etasUrlConfig.getUploadPort())
                                .queryParams(MultiValueMapConverter.convert(expectedRequest))
                                .build()
                                .toUri();

                        mockRestServiceServer
                                .expect(requestTo(expectedUri))
                                .andExpect(method(HttpMethod.POST))
                                .andRespond(withSuccess(expectedJsonResponse, MediaType.APPLICATION_JSON));

                        Assertions.assertThrows(NullPointerException.class, () -> fileTrmStatusUpdateService.updateFileTrmStatus(""));
                    }

                    @Test
                    @DisplayName("잘못된 파라미터 401 리턴(MockRestServiceServer)")
                    void isFileTrmStatusUpdateServiceReturn401() {
                        String expectedGrpKey = "202001010000000";
                        final String expectedResCode = "401";
                        final String expectedJsonResponse = """
                                {
                                    "res_Code": "401",
                                    "res_Msg": "필수 파라미터 값이 없습니다."
                                }""";

                        FileTrmStatusUpdateRequest expectedRequest = new FileTrmStatusUpdateRequest();

                        URI expectedUri = UriComponentsBuilder.fromPath(ApiEndpoints.ETAS_FILE_STATUS)
                                .scheme("http")
                                .host(etasUrlConfig.getBaseHost())
                                .port(etasUrlConfig.getUploadPort())
                                .queryParams(MultiValueMapConverter.convert(expectedRequest))
                                .build()
                                .toUri();

                        mockRestServiceServer
                                .expect(requestTo(expectedUri))
                                .andExpect(method(HttpMethod.POST))
                                .andRespond(withSuccess(expectedJsonResponse, MediaType.APPLICATION_JSON));

                        FileTrmStatusUpdateResponse actualResponse = fileTrmStatusUpdateService.updateFileTrmStatus(expectedGrpKey);

                        assertThat(actualResponse).isNotNull();
                        assertThat(actualResponse.getRes_Code()).isEqualTo(expectedResCode);
                    }
                }
            }

            @AfterEach
            void tearDown() {
            }

            @AfterAll
            static void testTearDown() {
            }
        }
        ```


    RestTemplateUtil 클래스 테스트 (RestTemplate)
      - 테스트 시나리오
        1. `RestTemplate의 postForEntity()` util 테스트
      - 테스트 코드
        ```java
        @Test
        @DisplayName("POST 호출 실패 RestTemplateException 발생 (postForEntity)")
        void isPostForEntityMethodThrowsRestTemplateException() {
            // given
            URI expectedUri = UriComponentsBuilder
                    .fromPath(expectedPath)
                    .scheme(expectedScheme)
                    .host(expectedHost)
                    .port(expectedPort)
                    .build()
                    .toUri();
            String expectedJsonRequest = """
                    {
                        "key1": "test1",
                        "key2": "test2"
                    }""";
            HttpHeaders expectedHeaders = new HttpHeaders();
            expectedHeaders.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> expectedRequest = new HttpEntity<>(expectedJsonRequest, expectedHeaders);
            mockRestServiceServer.expect(requestTo(expectedUri))
                    .andExpect(method(HttpMethod.POST))
                    .andExpect(content().json(expectedJsonRequest))
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andRespond(withServerError());
            log.debug(expectedRequest.toString());

            // when & then
            Exception exception = assertThrows(RestTemplateException.class,
                    () -> RestTemplateUtil.postForEntity(expectedUri, expectedRequest, String.class));
        }
        ```
