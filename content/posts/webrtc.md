---
template: SinglePost
title: WebRTC
status: Published
date: '2020-04-01'
featuredImage: >-
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---



## WebRTC (Web Real-Time Communications)란?

 웹 어플리케이션 및 사이트들이 별도의 소프트웨어 없이 음성, 영상 미디어 혹은 텍스트, 파일 같은 데이터를 브라우저끼리 주고 받을 수 있게 만든 기술이다.

- 가이드 및 공식 문서: https://webrtc.org/
- 깃헙: https://github.com/googlecodelabs/webrtc-web
- WebRTC를 사용하면 개방형 표준 위에서 작동하는 애플리케이션에 실시간 통신 기능을 추가 할 수 있다.
- Peer 간에 전송되는 비디오, 음성 및 일반 데이터를 지원하므로 개발자는 강력한 음성 및 비디오 통신 솔루션을 구축 할 수 있다. 
- 이 기술은 모든 최신 브라우저와 모든 주요 플랫폼의 기본 클라이언트에서 사용할 수 있다.
- WebRTC 기반의 기술은 개방형 웹 표준으로 구현되며 모든 주요 브라우저에서 일반 **JavaScript API**로 사용할 수 있다.
- Android 및 iOS 애플리케이션과 같은 기본 클라이언트의 경우 동일한 기능을 제공하는 라이브러리를 사용할 수 있다.
- WebRTC 프로젝트는 [오픈 소스](https://webrtc.googlesource.com/src/) 이며 Apple, Google, Microsoft 및 Mozilla 등이 지원한다. 



### WebRTC 통신 원리

- P2P(Peer to Peer) 통신에 최적화되어 있다.

- WebRTC에 크게 사용되는 3가지 클래스

  - **MediaStream**: 카메라와 마이크 등의 데이터 스트림 접근
  - **RTCPeerConnection**: 암호화 및 대역폭 관리 및 오디어, 비디오의 연결
  - **RTCDataChannel**: 일반적인 데이터의 P2P 통신

- 이 3가지의 객체를 통해서 데이터 교환이 이루어지며, RTCPeerConnection들이 적절하게 데이터를 교환할 수 있게 처리해주는 과정을 **시그널링(Signalling)**이라고 한다.

- 시그널링하는 과정

  ![image](https://miro.medium.com/max/1400/1*Lhsz8eckhNrXDehMo2hQyA.png)

  - PeerConnection은 두 명의 유저가 스트림을 주고 받는 것이므로 연결을 요청하는 Caller와 연결을 받는 Callee가 존재한다.
  - Caller와 Callee가 통신을 하기 위한 중간 역할인 서버가 필요하고, 서버를 통해서 SessoinDescription을 서로 주고 받아야 한다.



### API Spec

- https://w3c.github.io/webrtc-pc/
- https://www.w3.org/TR/mediacapture-streams/



#### 참고 용어

- Stun Server, Turn Server

  - Web RTC는 P2P에 최적화 되어 있다. 즉, Peer들 간의 공인 네트워크 주소(IP)를 알고 데이터 교환을 해야하는데. 실제 개개인의 컴퓨터는 방화벽 등 여러가지 보호장치들이 존재하고 있어 Peer들 간의 연결이 쉽지 않다. 서로 간의 연결을 위한 정보를 공유하여 P2P 통신을 가능하게 해주는 것이 Stun/Turn Server이다.

    더 자세한 내용 (https://www.html5rocks.com/ko/tutorials/webrtc/infrastructure/)

  - STUN(Session Traversal Utilities for NAT)

    - public 주소를 발견하거나 Peer 간의 직접 연결을 막는 등의 라우터 제한을 결정하는 프로토콜. 클라이언트는 인터넷을 통해 클라이언트의 공개주소와 라우터의 NAT 뒤에 있는 클라이언트가 접근 가능한지에 대한 답변을 위한 요청을 STUN 서버에 전송한다.

      ![image](https://miro.medium.com/max/518/1*80Z67TRcEZnqHj3dWSi2cg.png)

  - NAT

    - 단말에 공개 IP 주소를 할당하기 위해 사용된다. 라우터는 공개 IP 주소를 가지고 있고, 모든 단말들은 라우터에 연결되어 있으며 비공개 IP 주소를 가지고 있다. 요청은 단말의 비공개 IP로부터 라우터의 공개 IP와 유일한 포트를 기반으로 번역될 것이다. 따라서 각각의 단말이 유일한 공개 IP 없이 인터넷 상에서 검색될 수 있는 방법이다.
    - 어떠한 라우터들은 네트워크에 연결할 수 없는 제한을 가지고 있다. 따라서 STUN 서버에 의해 공개 IP주소를 발견한다 해도 모두가 연결을 할 수 있는 것은 아니다. 이를 위해 TURN이 필요하다.

  - TURN(Traversal Using Relays around NAT)

    - 몇몇의 라우터들은 Symmetric NAT이라고 불리우는 제한을 위한 NAT을 채용하고 있다. 즉, Peer들이 오직 이전에 연결한 적이 있는 연결들만 허용한다는 것이다.

    - TURN은 TURN 서버와 연결하고 모든 정보를 그 서버에 전달하는 것으로 Symmetric NAT 제한을 우회하는 것을 의미한다. 이를 위해 TURN 서버와 연결을 한 후 모든 peer들에게 저 서버에 모든 패킷을 보내고 다시 나에게 전달해달라고 해야 한다. 이 과정은 명백히 오버헤드가 발생하므로 다른 대안이 없는 경우에만 사용하게 된다.

      ![image](https://miro.medium.com/max/590/1*WSa3buqCC42Jc4Qygi9jXw.png)

- SDP(Session Description Protocol)

  - 스트리밍 미디어의 초기화 인수를 기술하기 위한 포맷이다. 본 규격은 IETF(국제 인터넷 표준화 기구)의 RFC 4566로 규격이 공식화 되어 있다. 실제로 WebRTC를 이용하여 SDP format에 맞춰져 음성, 영상 데이터를 교환하고 있다. 해상도나 형식, 코덱, 암호화 등의 멀티미디어 컨텐츠의 연결을 설명하기 위한 표준이다.

- ICE(Interactive Connectivity Establishment)

  - 브라우저가 Peer를 통한 연결이 가능하도록 하게 해주는 프레임워크이다. Peer A -> Peer B 로 단순하게 연결하는 것으로는 작동하지 않는 것에 대한 이유가 많다. 연결을 시도하는 방화벽을 통과해야하고, 단말에 Public IP가 없으면 유일한 주소 값을 할당해야할 필요도 있으며 라우터가 Peer 간의 직접 연결을 허용하지 않을 때에는 데이터를 릴레이해야 할 경우도 있다. 이러한 작업을 수행하기 위해서 STUN, TURN Server 하나 혹은 같이 사용한다.

- RTMP(Real Time Messaging Protocol)

  - Adobe Systems의 독점 컴퓨터 통신 규약이다. 오디오, 비디오 및 기타 데이터를 인터넷을 ㅌㅇ해 스트리밍할 때 쓰인다. Adobe Flash Player와 서버 사이의 통신에 이용한다.



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

- WebRTC

  https://www.html5rocks.com/en/tutorials/webrtc/basics/

- WebRTC 개념 및 참고 용어

  https://medium.com/@hyun.sang/webrtc-webrtc%EB%9E%80-43df68cbe511

