---
template: SinglePost
title: NodeJS
status: Published
date: '2020-04-01'
featuredImage: >-
  https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png
excerpt: >-
  
categories:
  - category: JavaScript
meta:
  description: test meta description
  title: test meta title
---

![nodejs](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png)



## Node.js
Node.js는 구글의 `Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임`이다.   
  
- 자바스크립트의 `간결함`과 V8 자바스크립트 엔진의 `빠른 속도` 그리고 `단일 스레드` `Non-bloking I/O`로 빠른 성능을 낸다.
- 누구든지 자바스크립트로 패킷을 주고 받을 수 있어 서버를 간단하게 구현할 수 있다.
- 일반적인 소켓 통신 뿐만 아니라 Node.js 자체를 `HTTP 웹 서버로 실행`할 수 있고, WebSocket(socket.io) 등의 `HTTP 기반 실시간 프로토콜`도 손쉽게 사용할 수 있다. 실시간 통신을 자바스크립트 단 몇줄로 구현할 수 있게 되어 생산성을 높였다.  
- 결과적으로 Node.js는 자바스크립트를 웹 브라우저 속에서만 사용되던 언어에서 Python이나 Perl, Ruby와 같은 범용 스크립트 언어로 탈바꿈 시켰다.

### npm (Node Packaged Modules)
Node.js로 만들어진 모듈을 인터넷에서 받아서 설치해주는 `패키지 매니저`이다.  
  
- 수만개의 모듈을 `npm으로 설치`해서 쓸 수 있다.

### 단일 스레드 모델과 Non-blocking I/O
Node.js의 가장 큰 특징은 `단일 스레드 모델`과 `Non-blocking I/O`이다.  
  
- 프로세스 안에서 스레드를 여러 개 만들고 여러 개 로직을 동시에 처리하는 멀티 스레드 방식은 복잡한 동기화 문제를 가졌다.  
- Node.js는 단일 스레드 모델과 Non-blocking I/O를 채택하여 생산성을 높였다.

### Non-blocking I/O
비동기적 처리(Asyncronous Processing)의 태스크들을 호출 스택에서 태스크 큐로 보내거나 태스크 큐로 부터 이벤트 루프를 통해 다시 스택으로 가져오는 I/O의 형태를 말한다. 이에 따라 실행 순서에 영향을 미치는 행위를 `Non-Blocking I/O` 라고 간단히 말할 수 있다. 반대로 Blocking 의 경우 동기적 처리(Syncronous Processing)들에 대해 뒤에 작업들이 해당 작업으로 인해 지연되는 현상을 이야기한다.

### 설치하기
#### 소스 컴파일
[Node.js 다운로드](http://nodejs.org/download)

#### 리눅스(우분투)
  ```
  sudo apt-get install node
  ```
  node를 설치하면 npm도 함께 설치가 된다.

  - 패키지 설치
  ```
  npm install 패키지명
  ```
  - 패키지 전역 설치
  ```
  npm install -g 패키지명
  ```

### 사용하기
#### 웹 서버 만들기
  - app.js 작성
  ```javascript
  var http = require('http');

  var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('Hello World');
  });

  server.listen(8000);
  ```
  - 실행
  ```
  $ node app.js
  ```
  - 결과
  http://127.0.0.1:8000으로 접속

#### express로 웹 서버 만들기
`express`는 Node.js에서 가장 유명한 웹 프레임워크 모듈이다. express를 이용하면 더 간단하게 웹 서버를 만들 수 있고, 다양한 템플릿 엔진과 기능들을 사용할 수 있다.

  - 패키지 다운로드
  ```
  $ npm install express
  ```
  - app.js 작성  
  ```javascript
  var express = require('express')
    , http = require('http')
    , app = express()
    , server = http.createServer(app);

  app.get('/', function (req, res) {
    res.send('Hello /');
  });

  app.get('/world.html', function (req, res) {
    res.send('Hello World');
  });

  server.listen(8000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
  ```   
  - require: 모듈을 로딩하는 함수이다. express, http 모듈을 로딩하고 변수에 저장된 express를 함수로 실행해서 app 객체를 생성한다. 그리고 http.createServer(app) 함수로 app 객체와 http 서버를 연결한다.
  - app 객체에서 get 함수로 HTTP의 GET 메서드를 처리할 수 있다. get 함수에 경로를 지정하고, 웹 브라우저가 해당 경로에 접속했을 때 실행될 함수를 지정한다. 그리고 이 함수는 웹 브라우저가 접속할 때마다 실행된다. req는 요청(Request) 객체이고 res는 응답(Response) 객체다.
  - 웹 브라우저가 접속하면 이 콜백 함수에서 res의 send 함수를 실행하여 웹 브라우저에 표시할 내용을 보낸다. app 객체에 경로마다 응답할 함수를 지정하면 여러 개의 파일을 처리할 수 있다.
  - app 객체에서 HTTP의 GET 메서드 뿐만 아니라 모든 메서드(POST, PUT, DELETE, OPTIONS, HEAD 등)를 처리할 수 있다. 다양한 HTTP 메서드를 간단하게 처리할 수 있어서 Node.js와 express로 RESTful 서비스를 손쉽게 만들 수 있습니다.
  - http 모듈로 생성한 http 서버를 8000번 포트로 실행한다.
    
  - 실행
  ```
  node app.js
  ```

##### 템플릿 엔진 사용하기
`express`로 웹 서버를 만들더라도 많은 경로(파일)를 하나하나 정의하기에는 무리가 있다. express에서 템플릿 엔진을 사용하면 PHP나 ASP, JSP 처럼 `서버에서 HTML을 동적으로 생성`할 수 있다. 또한, HTML 태그를 전부 입력하지 않고, `간단한 문법`으로 웹 페이지를 만들 수 있다.
  - `router` 사용
    - EJS(Embedded JavaScript): 
    - Jade

#### 실시간 통신 사용하기
Node.js는 다양한 실시간 통신 기술을 지원하고, 복잡한 코드 없이 간단하게 만들 수 있다.   
  
Node.js에서 사용할 수 있는 대표적인 `실시간 통신 기술`
  - TCP socket: 기본 내장 net 모듈로 TCP 소켓을 사용할 수 있다.
  - WebSocket: HTTP 프로토콜을 기반으로 `양방향 통신`(full-duplex)을 구현한 것이다. 기존 HTTP 프로토콜은 서버 방향으로 요청 후 응답만 받을 수 있었고, 클라이언트 방향으로는 요청을 할 수 없었다. 또한, WebSocket은 HTTP 프로토콜을 기반으로 하고 있기 때문에 방화벽에서 걸러지는 경우가 적다. WebSocket은 모든 브라우저에서 지원하지는 않는다.
  - socket.io: WebSocket 등 실시간 통신 기술의 웹 `브라우저 호환성 문제를 해결`하기 위해 생긴 프로젝트이다. 옛날 IE6 부터 최신 웹 브라우저까지 지원한다. WebSocket, Flash Socket, AJAX Long Polling, AJAX Multipart Streaming, Forever iframe, JSONP Polling 기술을 모두 포함하고 있으며 웹 브라우저의 종류와 버전에 따라 최적화된 기술을 알아서 사용한다. 따라서 사용자는 여러 가지 실시간 통신 기술을 신경쓸 필요 없이 일관된 API와 문법을 사용하여 개발할 수 있다.

##### WebSocket 사용 예시
  - websocket 설치
  ```
  ~$ mkdir ExampleWebSocket
  ~/ExampleWebSocket$ npm install websocket
  ```
  - app.js 작성: 클라이언트에서 받은 메시지를 다시 클라이언트로 보내는 예제
  ```javascript
  var WebSocketServer = require('websocket').server;
  var http = require('http');

  var server = http.createServer(function (req, res) {
    console.log('Received request for ' + req.url);
    res.writeHead(404);
    res.end();
  });

  server.listen(8000, function () {
    console.log('Server is listening on port 8000');
  });

  wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  wsServer.on('request', function (request) {
    var connection = request.accept('example-echo', request.origin);
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        console.log('Received message: ' + message.utf8Data);
        connection.sendUTF(message.utf8Data);
      }
      else if (message.type === 'binary') {
        connection.sendBytes(message.binaryData);
      }

      connection.on('close', function (reasonCode, description) {
        console.log('Peer ' + connection.remoteAddress + ' disconnected.');
      });
    });
  });
  ```
  - index.html: 웹 브라우저에서 WebSocket을 사용 (jQuery 사용)
  ```html
  <!DOCTYPE HTML>
  <html>
  <head>
    <title>Example WebSocket</title>
  </head>
  <body>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script type="text/javascript">
  if ('WebSocket' in window) {
    var ws = new WebSocket('ws://127.0.0.1:8000', 'example-echo');

    ws.onopen = function () {
      $('#status').text('connected');

      for (var i = 0; i < 10; i++) {
        ws.send('Hello ' + i);
      }
    };

    ws.onmessage = function (evt) {
      $('#messages').append($('<li>').text('Received message: ' + evt.data));
    };

    ws.onclose = function () {
      $('#status').text('connection is closed');
    };
  }
  else
    $('#status').text('WebSocket not supported.');
  </script>

  Status: <span id="status"></span><br /><br />
  Messages: <ul id="messages"></ul>
  </body>
  </html>
  ```
 
##### socket.io 사용 예시  
http://pyrasis.com/nodejs/nodejs-HOWTO

#### 모듈 작성하기
웹 브라우저의 자바스크립트는 HTML에서 `script 태그로 로딩`한다. 하지만 지금까지 자바스크립트끼리는 서로 로딩할 방법이 없었는데 최근 여러 가지 표준이 개발되었고, node.js는 `CommonJS 모듈 방식`을 사용한다.  
  
- `require() 함수`로 모듈을 로딩하여 사용  
node_modeuls directory 안의 패키지화 된 모듈이나 사용자가 만든 파일 등을 로딩할 수 있다.

- 사용 예시
http://pyrasis.com/nodejs/nodejs-HOWTO

#### package.json
개발한 Node.js 어플리케이션을 서버에 배포할 때 `package.json` 파일이 필수이다.  
package.json 파일은 현재 어플리케이션에서 사용하고 있는 npm 모듈을 정의한다. 그래서 npm 명령은 package.json 파일을 읽어서 모듈을 설치한다.   
- package.json 파일은 소스의 `최상위 디렉터리`에 위치해야 한다.  
- `dependencies` 부분에서 npm 모듈의 이름과 버전을 지정한다.  
- package.json 파일을 작성하고 `npm install` 명령을 입력하면 정의된 모듈을 설치한다.  
  
package.json 파일에 프로젝트의 모든 정보를 기록한다. 각 항목의 의미는 다음과 같다.
- name: 프로젝트 이름
- version: 프로젝트 버전 정보
- description: 프로젝트 설명
- main: 노드 어플리케이션일 경우 진입점 경로. 프론트엔드 프로젝트일 경우 사용하지 않는다.
- scripts: 프로젝트 명령어를 등록할 수 있다.초기화시 test 명령어가 샘플로 등록되어 있다
- author: 프로그램 작성자
- license: 라이센스

#### project 명령어
- start: 어플리케이션 실행
- test: 테스트
- install: 패키지 설치
- uninstall: 패키지 삭제

#### 환경변수 설정하기
- 리눅스에서 환경 변수 설정하기
```
$ NODE_ENV="production" node app.js
```


### reference
- Node.js와 npm 설치: https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html
- npm jquery package: https://www.npmjs.com/package/jquery, https://iotcenter.seoul.go.kr/629
- http://pyrasis.com/nodejs/nodejs-HOWTO#section-12
