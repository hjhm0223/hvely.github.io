---
template: SinglePost
title: Swagger
status: Published
date: '2020-04-01'
featuredImage: >-
  https://9b74456f2e4bcbc20970-51751c7e8fb38e7c8b474cab6c7dc602.ssl.cf5.rackcdn.com/2020-07/swagger_logo_1.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![swagger](https://9b74456f2e4bcbc20970-51751c7e8fb38e7c8b474cab6c7dc602.ssl.cf5.rackcdn.com/2020-07/swagger_logo_1.png)



## Swagger 란?

API 문서화. `Open API Specification(OAS)`를 위한 프레임워크

- Swagger 공식 사이트: https://swagger.io/
- License: Apache 2.0

### 기능

- API 디자인: `Swagger-editor`를 통한 api 문서화
- API Development: `Swagger-codegen`을 통해 작성된 문서로 SDK를 생성하여 빌드 프로세스 간소화
- API Documentation: `Swagger-UI`를 통해 작성된 API 시각화
- API Testing: `Swagger-Inspector`를 통해 API를 시각화하고 빠른 테스트 진행
- Standardize: `Swagger-hub`를 통해 개인, 팀원들이 API 정보 공유

### 특징

- API가 변경될 때 문서 변경을 자동화
- API가 가지고 있는 스펙을 명세, 관리할 수 있어 테스트 및 유지보수에 좋다.
- Swagger는 기본적으로 YAML 포맷을 이용해 Docs 문서 작성
- NodeJS, Java, Python 등 다양한 언어 지원



## Open API Specification 3.0

Open API 표준 명세

- gitlab: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md
- swagger: https://swagger.io/docs/specification/basic-structure/
- license: Apache 2.0


```yml
# meta data
openapi: 3.0.0
info:
title: Sample API
description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
version: 0.1.9

# server 정보
servers:
- url: http://api.example.com/v1
description: Optional server description, e.g. Main (production) server
- url: http://staging-api.example.com
description: Optional server description, e.g. Internal staging server for testing

# data type

# api 정의

# path 정의
paths:
/users:
get:
summary: Returns a list of users.
description: Optional extended description in CommonMark or HTML
responses:
'200':
description: A JSON array of user names
content:
application/json:
schema:
type: array
items:
type: string

# parameter 정의
paths:
/user/{userId}:
get:
summary: Returns a user by ID.
parameters:
- name: userId
in: path
required: true
description: Parameter description in CommonMark or HTML.
schema:
type : integer
format: int64
minimum: 1
responses:
'200':
description: OK

# request body
paths:
/pets:
post:
summary: Add a new pet
requestBody:
description: Optional description in *Markdown*
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/Pet'
/pets:
post:
paths:
/users:
post:
summary: Creates a user.
requestBody:
required: true
content:
application/json:
schema:
type: object
properties:
username:
type: string
responses:
'201':
description: Created

# response
paths:
/user/{userId}:
get:
summary: Returns a user by ID.
parameters:
- name: userId
in: path
required: true
description: The ID of the user to return.
schema:
type: integer
format: int64
minimum: 1
responses:
'200':
description: A user object.
content:
application/json:
schema:
type: object
properties:
id:
type: integer
format: int64
example: 4
name:
type: string
example: Jessica Smith
'400':
description: The specified user ID is invalid (not a number).
'404':
description: A user with the specified ID was not found.
default:
description: Unexpected error

# Input and Output Models

# Input
components:
schemas:
User:
properties:
id:
type: integer
name:
type: string

# Both properties are required
required:
- id
- name

# Output
paths:
/users/{userId}:
get:
summary: Returns a user by ID.
parameters:
- in: path
name: userId
required: true
type: integer
responses:
'200':
description: OK
content:
application/json:
schema:
$ref: '#/components/schemas/User'
/users:
post:
summary: Creates a new user.
requestBody:
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/User'
responses:
'201':
description: Created


# Authentication
components:
securitySchemes:
BasicAuth:
type: http
scheme: basic
security:
- BasicAuth: []
```


## Spring에서의 사용

### 1. 의존성 추가

```config
<!-- maven -->
<dependency>
<groupId>io.springfox</groupId>
<artifactId>springfox-swagger2</artifactId>
<version>2.6.1</version>
</dependency>
<dependency>
<groupId>io.springfox</groupId>
<artifactId>springfox-swagger-ui</artifactId>
<version>2.6.1</version>
</dependency>
```

```config
<!-- gradle -->
dependencies {
implementation 'org.springframework.boot:spring-boot-starter-web'
compile group: 'io.springfox', name: 'springfox-swagger2', version: '2.9.2'
compile group: 'io.springfox', name: 'springfox-swagger-ui', version: '2.9.2'
testImplementation('org.springframework.boot:spring-boot-starter-test') {
exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
}
}
```


### 2. Config 파일 작성

- `@EnableSwagger2`: Swagger 2버전 활성화하는 Annotation
- `Docket`: Swagger 설정하는 Bean.
- API 스펙은 Controller에서 작성
- 설정정보
  - useDefaultResponseMessages(): swagger에서 제공해주는 응답코드(200, 401, 403, 404)에 대한 기본 메시지. false면 제거. controller에서 명시할 수 있음.
  - groupName(): Docket Bean이 여러개일 경우 충돌하지 않도록 버전 명시
  - select(): ApiSelectorBuilder 생성
  - apis(): api 스펙이 작성되어 있는 패키지(controller) 지정. RequestMapping(GetMapping, PostMapping 등)이 선언된 API 문서화
  - paths(): apis()로 선택된 API 중 특정 path 조건에 맞는 API들을 필터링하여 문서화
  - apiInfo(): 제목, 설명 등 문서에 대한 정보를 보여주기 위해 호출. parameter: public ApiInfo( title, description, version, termsOfServiceUrl, contact, license, licenseUrl, vendorExtensions )

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("example.api.control"))
                .paths(PathSelectors.any())
                .build();
  }
}
```


### 3. controller 작성

- `@Api`: 해당 클래스가 Swagger resource임을 명시
  - value: 태그
  - tags: 여러개의 태그 정의
- `@ApiOperation`: API URL과 메소드 선언
  - value: API에 대한 간략한 설명
  - notes: 자세한 설명
- `@ApiResponse`: operation의 가능한 response 명시
  - code: 응답코드
  - message: 응답에 대한 설명
  - responseHeaders: 헤더
- `@ApiParam`: 파라미터 정보 명시
  - value: 파라미터 정보
  - required: 필수이면 true
  - example: 테스트할 때 예시

![swagger.png](https://t1.daumcdn.net/cfile/tistory/99FAD94F5E56616519?download)

```java
@RestController
@Api(value = "BoardController V2")
@RequestMapping("/v1/api")
public class BoardControllerV1 {

  @ApiOperation(value = "exam", notes = "예제입니다.")
  @ApiResponses({
    @ApiResponse(code = 200, message = "OK !!"),
    @ApiResponse(code = 500, message = "Internal Server Error !!"),
    @ApiResponse(code = 404, message = "Not Found !!")
  })
  @GetMapping(value = "/board")
  public Map<String, String> selectOneBoard(@ApiParam(value = "게시판번호", required = true, example = "1") @RequestParam String no) {
    Map<String, String> result = new HashMap<>();
    result.put("author", "victolee");
    result.put("content", "V1 API 내용");
    return result;
  }
}
```



## 참조

- spring 사용: https://victorydntmd.tistory.com/341
- OAS3.0: https://swagger.io/docs/specification/basic-structure/, https://joont92.github.io/openAPI/OAS-3-0/
