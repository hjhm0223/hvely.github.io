---
template: SinglePost
title: Restful API
status: Published
date: '2020-04-07'
featuredImage: >-
  https://gmlwjd9405.github.io/images/network/rest.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![Restful API](https://gmlwjd9405.github.io/images/network/rest.png)


- [REST란?](#REST(Representational-State-Transfer)-란?)
  - [구성요소](##구성요소)
  - [특성](##특성)
  - [REST Interface 규칙](##REST-Interface-규칙)
- [REST API란?](#REST-API(Representational-State-Transfer-Application-Programming-Interface)-란?)
  - [특징](##특징)
  - [REST Interface 규칙](##REST-Interface-규칙)
  - [REST API 설계 기본 규칙](##REST-API-설계-기본-규칙)
  - [URI 설계 규칙](##URI-설계-규칙)
  - [Request Methods](##Request-Methods)
    - [성공 응답 코드](###성공-응답-코드)
    - [실패 응답 코드](###실패-응답-코드)
    - [서비스 장애 코드](###서비스-장애-코드)
- [References](#References)



# REST(Representational State Transfer) 란?

자원을 이름으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미

- REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일 
- HTTP URI(Uniform Resource Identifier)를 통해 자원을 명시하고, `HTTP Method`(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미    

| Method | 역할 |
| ------ | ------ |
| POST | 리소스 생성 |
| GET | 리소스 조회, 해당 도큐먼트에 대한 자세한 정보 가져오기 | 
| PUT | 리소스 수정 |
| DELETE | 리소스 삭제 | 

## 구성요소
- 자원(Resource)
    - Uniform Resource Identifier(URI)
- 행위(Verb)
    - HyperText Transfer Protocaol(HTTP) Method 
- 표현(Representation)

## 특성
Web 확장에 따라 `constraints`를 6가지 항목으로 정의
1. client-server 구조
    - 클라이언트와 서버가 서로 독립적으로 구분되어야 함
    - 클라이언트 또는 서버 증설 시 서로의 의존성 때문에 확장에 문제가 되는 일이 없어야 함
2. Uniform interface
    - 각각의 고유 식별자를 가져야 함(URI)
    - 서버와 클라이언트 간 상호작용은 일관된 인터페이스 위에서 이루어짐(특정 언어에나 기술에 종속되지 않음)
3. Layered system
    - 클라이언트와 서버 사이의 gateway, proxy, 방화벽 등과 같은 네트워크 기반의 매개체가 존재
    - layer를 추가하거나 수정, 삭제할 수 있어야 함
    - 확장성을 가짐
4. Cache
    - HTTP가 가진 캐싱 기능 적용 가능
    - 캐시를 가질 경우, 클라이언트가 캐시를 통해서 응답을 재사용할 수 있음
    - 서버의 부하를 낮추는 중요한 역할
5. Stateless
    - 통신 시 웹 서버가 클라이언트의 상태 정보를 저장하지 않아도 됨.
    - HTTP는 비상태 프로토콜, 클라이언트에서 상태 관리는 쿠키, 서버에서 상태 관리는 세션
6. Code-on-demand
    - client의 요구에 따라 server로부터 code를 받을 수 있음
    - 특정 시점에 서버가 특정 기능을 수행하는 스크립트나 플러그인을 클라이언트에게 전달해 해당 기능을 동작하도록 함

## REST Interface 규칙
- resource 식별: resource는 URI와 같은 고유 식별자로 표현
- 표현을 위한 resource 처리: 같은 resource를 JSON, XML, HTML과 같이 다양한 형태로 표현 가능. 데이터 자체는 변경되지 않음
- 자기 표현 메시지: HTTP 통신시, 헤더에 메타 데이터 정보를 추가하여 데이터에 대한 설명을 담을 수 있음
- application 상태에 대한 하이퍼미디어: 단순한 데이터 전달이 아닌 링크 정보를 포함하여 웹을 구성


# REST API(Representational State Transfer Application Programming Interface) 란?

REST 기반으로 서비스 API를 구현한 것

## 특징
- REST 기반으로 시스템을 분산하여 확장성과 재사용성을 높여 유지보수 및 운용이 편리
- REST는 HTTP 표준을 기반으로 구현하므로, HTTP를 지원하는 프로그램 언어로 클라이언트, 서버 구현 가능

## REST API 설계 기본 규칙
1. URI로 resource을 표현
    - 동사보다는 명사, 대문자보다는 소문자
    - `document`(객체) 이름은 단수 명사
    - `collection`(document의 집합, directory) 이름은 복수 명사
    - `store`(resource 저장소) 이름은 복수 명사
```
GET /Member/1 (X)
GET /members/1 (O)
```
2. resource에 대한 행위는 `HTTP Method`로 표현
    - URI에 HTTP Method가 들어가면 안됨
    - URI에 행위에 대한 동사가 들어가면 안됨
    - 경로 중 변하는 부분(id)는 유일한 값으로 대체  
```
GET /members/delete/1 (X)
DELETE /members/1 (O)
```

#### URI 설계 규칙
- '/'(슬래시)는 계층 관계를 나타내는 데 사용
    ```
    GET : /users/{userid}/devices
    ```
- 마지막에 '/'(슬래시)를 포함하지 않음
- 가독성을 위해 '_'보다 '-'(하이픈)을 사용
- 소문자 사용
- 파일 확장자는 포함하지 않고, Accept header 사용
    ```
    GET /members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg
    ```


## Request Methods    

| 상태코드 | 설명 |
| ------ | ------ |
| 1xx | 프로토콜 수준의 정보 전달 |
| 2xx | 성공 응답 코드 | 
| 3xx | 실패 응답 코드, 클라이언트의 추가적인 action이 필요 |
| 4xx | 실패 응답 코드, 클라이언트 실수 | 
| 5xx | 서비스 장애 코드 | 

### 성공 응답 코드
- 200 : [OK]
- 201 : [Created]
    - 200과 달리 요청에 성공하고, 새로운 리소스를 만든 경우에 응답한다.
    - POST, PUT에 사용한다.
- 202 : [Accepted]
    - 클라이언트 요청을 받은 후, 요청은 유효하나 서버가 아직 처리하지 않은 경우에 응답한다. (비동기 작업)
        - 요청에 대한 응답이 일정 시간 후 완료되는 작업의 경우<br>작업 완료 후 클라이언트에 알릴 수 있는 server push 작업을 하거나, 클라이언트가 해당 작업의 진행 상황을 조회할 수 있는 URL을 응답해야 한다.

    ```JSON
    HTTP/1.1 202 Accepted
    {
        "links": [
            {
                "rel": "self",
                "method": "GET",
                "href":  "https://api.test.com/v1/users/3"
            }
        ] 
    }
    ```

- 204 : [No Content]
    - 응답 body가 필요 없는 자원 삭제 요청(DELETE) 같은 경우 응답한다.
    - 200 응답 후 body에 null, {}, [], false로 응답하는 것과 다르다.<br>(204의 경우 HTTP body가 아예 없음)

### 실패 응답 코드
- 301
    - 클라이언트가 요청한 리소스에 대한 URI가 변경되었을 때 사용
    - 응답 시 Location header에 변경된 URI를 적어줘야 함
- 400 : [Bad Request]
    - 클라이언트 요청이 미리 정의된 파라미터 요구사항을 위반한 경우
    - 파라미터의 위치(path, query, body), 사용자 입력 값, 에러 이유 등을 반드시 알린다

    case 1
    ```
    {
        "message" : "'name'(body) must be Number, input 'name': test123"
    }
    ```
    case 2
    ```
    {
        "errors": [
            {
                "location": "body",
                "param": "name",
                "value": "test123",
                "msg": "must be Number"
            }
        ]
    }
    ```
- 401 : [Unauthorized]
- 403 : [Forbidden]
    - 해당 요청은 유효하나 서버 작업 중 접근이 허용되지 않은 자원을 조회하려는 경우
    - 접근 권한이 전체가 아닌 일부만 허용되어 요청자의 접근이 불가한 자원에 접근 시도한 경우 응답한다.
- 404 : [Not Found]
- 405 : [Method Not Allowed]
    - 405 code는 404 code와 혼동될 수 있기 때문에 룰을 잘 정하고 시작한다.
    - POST /users/1의 경우 404로 응답한다고 생각할 수 있지만, 경우에 따라 405로 응답할 수 있다. <br>/users/:id URL은 GET, PATCH, DELETE method는 허용되고 POST는 불가한 URL이다.
    - 만약 id가 1인 사용자가 없는 경우엔 404로 응답하지만(GET, PATCH, DELETE의 경우), POST /users/1는 /users/:id URL이 POST method를 제공하지 않기 때문에 405로 응답하는 게 옳다.
- 409 : [Conflict]
    - 해당 요청의 처리가 비지니스 로직상 불가능하거나 모순이 생긴 경우
    e.g.) DELETE /users/hak의 경우, 비지니스 로직상 사용자의 모든 자원이 비어있을 때만 사용자를 삭제할 수 있는 규칙이 있을 때 409로 응답한다.
    ```
    409 Conflict
    {   
        "message" : "first, delete connected resources."
        "links": [
            {
                "rel": "posts.delete",
                "method": "DELETE",
                "href":  "https://api.test.com/v1/users/hak/posts"
            },
            {
                "rel": "comments.delete",
                "method": "DELETE",
                "href":  "https://api.test.com/v1/users/hak/comments"
            }
        ]
    }
    ```
- 429 : [Too Many Requests]
    - DoS, Brute-force attack 같은 비정상적인 접근을 막기 위해 요청의 수를 제한한다.

### 서비스 장애 코드
- 500
    - API Server level에선 나지 않음
    - API Server를 서빙하는 웹서버(apache, nginx)가 오류일 때 가능    
    
    
# References
- REST API: https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html    
- URI 설계 규칙: https://medium.com/@dydrlaks/rest-api-3e424716bab   
- REST API 설계 규칙: https://meetup.toast.com/posts/92