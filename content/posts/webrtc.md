---
template: SinglePost
title: WebRTC
status: Published
date: '2020-04-01'
featuredImage: >-
  https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/WebRTC_Logo.svg/1280px-WebRTC_Logo.svg.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![webrtc](https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/WebRTC_Logo.svg/1280px-WebRTC_Logo.svg.png)



# WebRTC (Web Real-Time Communications)란?

  `WebRTC` 은 웹 어플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술이다. WebRTC를 구성하는 일련의 표준들은 플러그인이나 제 3자 소프트웨어 설치 없이 종단 간 데이터 공유와 화상 회의를 가능하게 한다. 이를 위하여 WebRTC는 상호 연관된 API와 프로토콜로 구성되어 함께 작동한다.

- 가이드 및 공식 문서: https://webrtc.org/
- 깃헙: https://github.com/googlecodelabs/webrtc-web
- WebRTC를 사용하면 개방형 표준 위에서 작동하는 애플리케이션에 실시간 통신 기능을 추가 할 수 있다.
- Peer 간에 전송되는 비디오, 음성 및 일반 데이터를 지원하므로 개발자는 강력한 음성 및 비디오 통신 솔루션을 구축 할 수 있다. 
- 이 기술은 모든 최신 브라우저와 모든 주요 플랫폼의 기본 클라이언트에서 사용할 수 있다.
- WebRTC 기반의 기술은 개방형 웹 표준으로 구현되며 모든 주요 브라우저에서 일반 `JavaScript API`로 사용할 수 있다.
- Android 및 iOS 애플리케이션과 같은 기본 클라이언트의 경우 동일한 기능을 제공하는 라이브러리를 사용할 수 있다.
- WebRTC 프로젝트는 [오픈 소스](https://webrtc.googlesource.com/src/) 이며 Apple, Google, Microsoft 및 Mozilla 등이 지원한다. 

## WebRTC 개념 및 사용법

 WebRTC는 여러가지 목적으로 사용될 수 있으며, Media Capture and Streams API와 상당히 많은 부분이 겹친다. 이 둘은 서로 상호작용을 하면서 웹에 강력한 멀티미디어 기능을 제공한다. Peer들 간의 커넥션이 만들어제는데 어떤 드라이버나 플러그인도 필요하지 않다.

 두 peer 간의 커넥션은 `RTCPeerConnection Interface` 를 통해 이루어진다. 커넥션이 이루어지고 열리면, 미디어 스트림(`MediaStream`)과 데이터 채널(`RTCDataChannel`)들을 커넥션에 연결할 수 있다.

 미디어 스트림들은 미디어 정보를 가지는 다수의 트랙들로 구성될 수 있다. `MediaStreamTrack Interface` object를 베이스로 하는 트랙은 음성, 영상 및 텍스트를 포함하는 다양한 미디어 데이터의 타입 중 하나를 포함할 수 있다. 대부분의 스트림들은 적어도 한 개 이상의 음성(영상) 트랙으로 구성되어 있고, live 미디어(웹 캠 등)나 저장된(스트리밍) 미디어들을 전송하고 받을 수 있다.

 또한, 임의의 binary data를 `RTCDataChannel interface` 를 통해 peer들 간에 교환할 수 있다. 이것은 메타데이터 교환, 게임 status 패킷들, 파일 교환 등에 쓰일 수 있다.


### 상호 운용성

 WebRTC의 구현이 계속 진화하고 있으며 각 브라우저마다 다른 코덱 및 기타 미디어 기능에 대한 지원 수준이 다르기 대문에 코드 작성을 시작하기 전에 Google에서 제공하는 `Adapter.js 라이브러리`를 사용하는 것을 강력하게 고려해야 한다.

 `Adapter.js`는 shim 및 polyfill을 사용하여 다양한 플랫폼에서 WebRTC 구현 간의 다양한 차이점을 없애준다. 또한 WebRTC 개발 프로세스를 전체적으로 쉽게 수행할 수 있도록 접두사와 다른 이름 지정의 차이점을 처리하며 `보다 광범위하게 호환되는 결과를 제공`한다. 라이브러리는 `npm 패키지` 로도 제공된다.

> *shim: Microsoft Fakes 프레임워크가 환경에서 테스트 대상 구성 요소를 격리할 수 있도록 하기 위해 사용하는 두 기술 중 하나. shim은 특정 메서드 호출을 테스트의 일부로 작성하는 코드로 우회  
> *polifill: 기본적으로 지원하지 않는 이전 브라우저에서 최신 기능을 제공하는 데 필요한 코드


### WebRTC 통신 원리

- P2P(Peer to Peer) 통신에 최적화되어 있다.

- WebRTC에 크게 사용되는 3가지 클래스

  - `MediaStream`: 카메라와 마이크 등의 데이터 스트림 접근
  - `RTCPeerConnection`: 암호화 및 대역폭 관리 및 오디어, 비디오의 연결
  - `RTCDataChannel`: 일반적인 데이터의 P2P 통신

- 이 3가지의 객체를 통해서 데이터 교환이 이루어지며, RTCPeerConnection들이 적절하게 데이터를 교환할 수 있게 처리해주는 과정을 `시그널링(Signalling)`이라고 한다.

- 시그널링하는 과정

  ![image](https://miro.medium.com/max/1400/1*Lhsz8eckhNrXDehMo2hQyA.png)

  - PeerConnection은 두 명의 유저가 스트림을 주고 받는 것이므로 연결을 요청하는 Caller와 연결을 받는 Callee가 존재한다.
  - Caller와 Callee가 통신을 하기 위한 중간 역할인 서버가 필요하고, 서버를 통해서 SessoinDescription을 서로 주고 받아야 한다.


### WebRTC adapter.js

 WebRTC 사양은 비교적 안정적이지만 모든 브라우저가 모든 기능이 구현되어 있는 것은 아니다. 또한, 일부 브라우저는 여전히 일부 혹은 모든 WebRTC API에 접두사가 붙어 있는 상황이다. 이러한 문제에 대해 수동적으로 코딩할 수 있지만 더 쉬운 방법이 있다. WebRTC 단체는 다른 브라우저의 WebRTC 구현에서 호환성 문제를 해결하기 위해 `WebRTC 어댑터를 Github에서 제공`한다. 어댑터는 WebRTC가 지원되는 모든 브라우저에서 그냥 작동되도록 작성한 코드가 사양에 적합하도록 해주는 Javascript 코드 모음이다. 더이상 접두사 API를 조건부로 사용하거나 다른 해결방법을 구현할 필요가 없다.

> WebRTC 및 지원 브라우저에서 API 용어의 기능과 이름 지정이 지속적으로 변경되고 있기 때문에, 일반적으로 이 어댑터의 사용을 권장한다. 이 어댑터는 BSD 스타일 라이선스로 제공된다.

#### adapter.js가 하는 일

 WebRTC를 지원하는 각 브라우저의 각 버전에 대해 adapter.js는 필요한 polyfill을 구현하고, 접두사가 없는 API 이름을 설정하며 `브라우저가 WebRTC 사양에 작성된 코드를 실행하도록 하는데 필요한 기타 변경 사항을 적용`한다.

 WebRTC 어댑터는 현재 Mozilla Firefox, Google Chrome, Apple Safari 및 Microsoft Edge를 지원한다.

#### adapter.js 사용

 adapter.js를 사용하려면 WebRTC API를 사용하는 `모든 페이지에 adapter.js를 포함`해야 한다.

1. 최신 버전의 adapter.js [다운로드](https://github.com/webrtc/adapter/tree/master/release)
2. 스크립트 디렉토리에 배치
3. 프로젝트에 adapter.js를 포함 `<script src="adapter.js"></script>`
4. 코드가 모든 브라우저에서 작동해야한다는 것을 고려하고 사양에 따라 WebRTC API를 사용하여 코드를 작성
5. 좋은 shim이라도 다른 브라우저에서 코드를 테스트할 필요가 없다는 것은 아님

[adapter.js 프로젝트](https://github.com/webrtc/adapter)


### 참고 용어

- Stun Server, Turn Server

  - Web RTC는 P2P에 최적화 되어 있다. 즉, Peer들 간의 공인 네트워크 주소(IP)를 알고 데이터 교환을 해야하는데, 실제 개개인의 컴퓨터는 방화벽 등 여러가지 보호장치들이 존재하고 있어 Peer들 간의 연결이 쉽지 않다. 서로 간의 연결을 위한 정보를 공유하여 P2P 통신을 가능하게 해주는 것이 Stun/Turn Server이다.

    더 자세한 내용 (https://www.html5rocks.com/ko/tutorials/webrtc/infrastructure/)

  - STUN(Session Traversal Utilities for NAT)

    - public 주소를 발견하거나 Peer 간의 직접 연결을 막는 등의 라우터 제한을 결정하는 프로토콜. 클라이언트는 인터넷을 통해 클라이언트의 공개주소와 라우터의 NAT 뒤에 있는 클라이언트가 접근 가능한지에 대한 답변을 위한 요청을 STUN 서버에 전송한다.

      ![image](https://miro.medium.com/max/518/1*80Z67TRcEZnqHj3dWSi2cg.png)

  - NAT(네트워크 주소 변환)

    - 단말에 공개 IP 주소를 할당하기 위해 사용된다. 라우터는 공개 IP 주소를 가지고 있고, 모든 단말들은 라우터에 연결되어 있으며 비공개 IP 주소를 가지고 있다. 요청은 단말의 비공개 IP로부터 라우터의 공개 IP와 유일한 포트를 기반으로 번역될 것이다. 따라서 각각의 단말이 유일한 공개 IP 없이 인터넷 상에서 검색될 수 있는 방법이다.
    - 어떠한 라우터들은 네트워크에 연결할 수 없는 제한을 가지고 있다. 따라서 STUN 서버에 의해 공개 IP주소를 발견한다 해도 모두가 연결을 할 수 있는 것은 아니다. 이를 위해 TURN이 필요하다.

  - TURN(Traversal Using Relays around NAT)

    - 몇몇의 라우터들은 Symmetric NAT이라고 불리우는 제한을 위한 NAT을 채용하고 있다. 즉, `Peer들이 오직 이전에 연결한 적이 있는 연결들만 허용`한다는 것이다.

    - TURN은 TURN 서버와 연결하고 모든 정보를 그 서버에 전달하는 것으로 Symmetric NAT 제한을 우회하는 것을 의미한다. 이를 위해 TURN 서버와 연결을 한 후 모든 peer들에게 저 서버에 모든 패킷을 보내고 다시 나에게 전달해달라고 해야 한다. 이 과정은 명백히 오버헤드가 발생하므로 다른 대안이 없는 경우에만 사용하게 된다.

      > *오버헤드: 어떤 처리를 하기 위해 들어가는 간접적인 시간이나 메모리 등을 말한다.

      ![image](https://miro.medium.com/max/590/1*WSa3buqCC42Jc4Qygi9jXw.png)

- SDP(Session Description Protocol)

  - 스트리밍 미디어의 초기화 인수를 기술하기 위한 포맷이다. 본 규격은 IETF(국제 인터넷 표준화 기구)의 RFC 4566로 공식화 되어 있다. 실제로 WebRTC를 이용하여 SDP format에 맞춰져 음성, 영상 데이터를 교환하고 있다. 해상도나 형식, 코덱, 암호화 등의 멀티미디어 컨텐츠의 연결을 설명하기 위한 표준이다.

- ICE(Interactive Connectivity Establishment)

  - 브라우저가 Peer를 통한 연결이 가능하도록 하게 해주는 프레임워크이다. Peer A -> Peer B 로 단순하게 연결하는 것으로는 작동하지 않는 것에 대한 이유가 많다. 연결을 시도하는 방화벽을 통과해야하고, 단말에 Public IP가 없으면 유일한 주소 값을 할당해야할 필요도 있으며 라우터가 Peer 간의 직접 연결을 허용하지 않을 때에는 데이터를 릴레이해야 할 경우도 있다. 이러한 작업을 수행하기 위해서 STUN, TURN Server 하나 혹은 같이 사용한다.

- RTMP(Real Time Messaging Protocol)

  - Adobe Systems의 독점 컴퓨터 통신 규약이다. 오디오, 비디오 및 기타 데이터를 인터넷을 통해 스트리밍할 때 쓰인다. Adobe Flash Player와 서버 사이의 통신에 이용한다.



### WebRTC Interface

 WebRTC는 다양한 작업을 수행하기 위해 함께 동작하는 [인터페이스](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API)를 제공한다.  


### Guides

- [Introduction to WebRTC protocols](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols)

  이 문서는 WebRTC API가 구축된 기반이 되는 프로토콜을 소개한다.

- [WebRTC connectivity](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity)

  WebRTC 커넥션의 작동 방식 및 다양한 프로토콜과 인터페이스를 함께 사용하여 강력한 커뮤니케이션 앱을 만드는 방법에 대한 가이드이다.

- [Lifetime of a WebRTC session](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Session_lifetime)

  WebRTC는 임의 데이터, 오디오, 비디오 또는 이들의 모든 조합에 대한 피어 투 피어 커뮤니케이션을 브라우저 어플리케이션으로 구축하도록 해준다. 이 문서에서는, 모든 방법으로 커넥션을 설정하는 것에서 부터 더 이상 필요하지 않을 때 커넥션을 닫는 것까지 WebRTC 세션의 수명에 대해 살펴볼 것이다.

- [Signaling and two-way video calling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)

  여러 사용자들 간의 화상통화를 할 수 있는 Websocket을 기반으로한 튜토리얼 및 예제이다. 채팅 서버의 웹소켓 커넥션은 WebRTC의 시그널링을 위해 사용된다.

- [Codecs used by WebRTC](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/WebRTC_codecs)

  A guide to the codecs which WebRTC requires browsers to support as well as the optional ones supported by various popular browsers. Included is a guide to help you choose the best codecs for your needs.

- [Using WebRTC data channels](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels)

  이 가이드는 두 피어 사이의 임의의 데이터를 교환하기 위해 피어 커넥션와 관련된 [`RTCDataChannel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel)을 사용할 수 있는 방법을 다룬다.

- [Using DTMF with WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_DTMF)

  구식 전화 시스템에 연결되는 게이트웨이와 상호 작용하기 위한 WebRTC의 지원에는 [`RTCDTMFSender` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/RTCDTMFSender) 인터페이스를 사용하여 DTMF 톤을 보내는 기능이 포함된다. 이 가이드는 어떻게 그렇게 하는지 보여준다.


### Tutorials

- [Improving compatibility using WebRTC adapter.js](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/adapter.js)

  The WebRTC organization [provides on GitHub the WebRTC adapter](https://github.com/webrtc/adapter/) to work around compatibility issues in different browsers' WebRTC implementations. The adapter is a JavaScript shim which lets your code to be written to the specification so that it will "just work" in all browsers with WebRTC support.

- [Taking still photos with WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos)

  This article shows how to use WebRTC to access the camera on a computer or mobile phone with WebRTC support and take a photo with it.

- [A simple RTCDataChannel sample](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample)

  The [`RTCDataChannel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) interface is a feature which lets you open a channel between two peers over which you may send and receive arbitrary data. The API is intentionally similar to the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), so that the same programming model can be used for each.



### Kurento

 전체 WebRTC 스택의 기능적 구현을 제공하는 미디어 서버

#### Kurento를 사용할 수 있는 3가지 방법

  1. 웹 소켓 브라우저로부터 직접적으로 Kurento JavaScript SDK 사용 (빠르게 테스트할 때만 추천)
  2. Java EE 서버에서 Kurento Java SDK 사용 (웹 브라우저는 HTML, WebRTC 시그널링과 같은 작업을 위한 애플리케이션의 클라이언트)
  3. Node.js에 Kurento JavaScript SDK 사용

  ![image](https://blog.kakaocdn.net/dn/cmo3h3/btqSIZpblr4/8mLfaeh0yLZWuULhtLjn01/img.png)

  

#### Media Server 사용하는 이유

  WebRTC는 P2P연결을 통해 웹 브라우저와 모바일 애플리케이션의 RTC 기능을 제공하는 프로토콜과 APIs이다. 소프트웨어나 별도의 플러그인이 필요없고 단지 Peer 와 Peer 간의 연결을 통해 video, data 스트리밍이 가능하다.

  유튜브, 인스타 라이브와 같은 대규모의 서비스를 하기 위해서는 한 명의 스트리머와 N명의 뷰어들이 존재한다. `대규모 서비스에서 1:N 스트리밍 또는 다양한 기능들을 추가하기에 P2P 방식은 무리가 있다.` 스트리밍하고 있는 클라이언트에 10만명의 Viewer들이 연결되어 있다면 스트리머의 클라이언트는 터질 것이다.

  그렇기 때문에 `Peer 중간에 미디어 서버가 필요`하고 Kurento는 그 중 하나이다.

  ![image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTHesfPtarZavXy4tGaP6Zf-LKPNesP60C3WZO0cDU4tsZHzHifsxtaskurdpBICTZhg&usqp=CAU)

  

#### 미디어 서버가 제공하는 기능

  WebRTC 미디어 서버는 미디어 트래픽이 통과하는 멀티미디어 미들웨어이다. 미디어 서버에서는 들어오는 미디어 스트림을 처리하고 다른 결과물을 내보낼 수 있다.

  1. Group Communications: 한 명의 스트리머가 방송을 시작하고, 그 방에 접속해 있는 참여자들에게 미디어 스트림을 배포 (다중 회의 장치 MCU 역할 수행)
  2. Mixing: 여러 수신 스트림을 하나의 복합 스트림으로 변환
  3. Transcoding: 호환되지 않는 클라이언트 간에 코덱 및 형식을 즉석에서 조정
  4. Recording: 미디어에 들어오는 스트림을 영구적인 방식으로 저장


#### Kurento 미디어서버 (KMS) 가 제공하는 기능

  1. HTTP, RTR, WebRTC를 포함한 네트워크 스트리밍 프로토콜 지원
  2. 미디어 믹싱 및 미디어 라우팅/디스패칭을 지원하는 그룹 통신 (MCU 및 SFU 기능 모두)
  3. Computer Vision과 Augmented Reality 알고리즘을 구현하는 필터에 대한 일반적인 지원
  4. WebM과 MP4에 대한 쓰기 작업을 지원하고 GStreamer에서 지원하는 모든 형시으로 재생하는 미디어 저장소
  5. VP8, H.264, H263, AMR, OPUS, Speex, G.711 등을 포함하여 GStreamer에서 지원하는 코덱 간의 자동 미디어 트랜스 코딩





### WebRTC 시작하기

#### WebRTC API

- 카메라와 마이크를 위해 navigator.mediaDevices.getUserMedia()를 사용하여 MediaStreams를 캡처한다. 화면 녹화의 경우 navigator.mediaDevices.getDisplayMedia()를 대신 사용한다.
- peer to peer 연결은 **RTCPeerConnection 인터페이스**에서 처리된다. 이 인터페이스는 WebRTC에서 두 peer 간 연결을 설정하고 제어하는 중심 역할이다.



#### 1. 예제소스 다운로드

```cmd
git clone https://github.com/googlecodelabs/webrtc-web.git
```



#### 2. 의존성 추가

```properties
implementation 'org.webrtc:google-webrtc:1.0.+' // 버전 맞추기
```

- 최신버전 확인하기: [bintray.com/google/webrtc/google-webrtc](https://bintray.com/google/webrtc/google-webrtc)



#### 로컬 PeerConnection 비디오 스트림 출력 예제

- https://cornbro.tistory.com/5?category=1088426





## References

- [WebRTC 개념](https://www.html5rocks.com/en/tutorials/webrtc/basics/)
- [WebRTC 개념 및 참고 용어](https://medium.com/@hyun.sang/webrtc-webrtc%EB%9E%80-43df68cbe511)
- [WebRTC API](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API)
- [adapter.js](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API/adapter.js)
- [Kurento](https://gh402.tistory.com/43)