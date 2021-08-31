---
template: SinglePost
title: JavaScript (1) - 개요 
status: Published
date: '2021-07-29'
featuredImage: >-
  https://gawoori.net/wp-content/uploads/2018/04/javascript-frameworks.jpg
excerpt: >-
  
categories:
  - category: JavaScript
meta:
  description: test meta description
  title: test meta title
---

![javascript](https://gawoori.net/wp-content/uploads/2018/04/javascript-frameworks.jpg)


# JavaScript (1) - 개요 



- 배경지식
  - Internet, WWW(World Wide Web)에 대한 전반적인 이해
  - HTML(Hyper Text Markup Language)에 대한 실무 지식
  - [JavaScript 튜토리얼]()
- JavaScript 문서
  - [프로그래밍과 인터넷에 대한 기본 개념]
  - [JavaScript 언어와 객체에 대한 개요]
  - [JavaScript와 관련된 자세한 참고 자료]



## JavaScript란?

​	JavaScript는 크로스-플랫폼, 객체지향 스크립트 언어이다. 작고 가벼운 언어다.   

​	호스트 환경(웹 브라우저 등) 내에서 JavaScript는 프로그램 제어를 제공하기 위해 그 환경의 객체에 연결될 수 있다.  

​	Node.Js와 같은 자바 스크립트의 고급 서버언어로 사용 할 수도 있다. 이것을 사용하면 단순히 파일을 다운로드하는 것보다 웹 사이트에 더 많은 기능을 추가 할 수 있다. 호스트 환경 내에서 JavaScript는 해당 환경의 객체에 연결되어 프로그래밍 방식으로 제어 할 수 있다.  

​	JavaScript는. `Array`, `Date`, `Math`와. 같은 객체에 대한 표준 라이브러리와 연산자(operator), 제어 구조, 제어문과 같은 언어 요소의 코어 집합을 포함한다. Core JavaScript는 거기에 추가 객체를 보충하여 다양한 목적으로 확장될 수 있다.

- *클라이언트 측 JavaScript*는 브라우저와 문서 객체 모델(DOM) 을 제어하는 객체를 제공하여 코어 언어를 확장한다. 예를 들어, 클라이언트 측 확장은 어플리케이션이 요소(element)를 HTML 폼에 두고, 마우스 클릭, 폼 입력 및 페이지 탐색 같은 사용자 이벤트에 응답하게 해준다.
- *서버 측 JavaScript*는 서버에서 JavaScript 실행에 관련된 객체를 제공하여 코어 언어를 확장한다. 예를 들어, 서버 측 확장은 어플리케이션이 데이터베이스와 통신하고, 한 번의 호출 정보의 연속성을 어플리케이션의 다른 곳에 제공하거나, 서버에서 파일 조작을 수행할 수 있도록 해준다.

​	이것은 브라우저에서 JavaScript가 웹 페이지 (DOM)의 모양을 바꿀 수 있음을 의미한다. 또한 서버의 Node.js JavaScript는 브라우저에 작성된 코드의 사용자 정의 요청에 응답 할 수 있다.



### JavaScript 와 Java

​	JavaScript 와 Java는 여러 면에서 비슷하지만 어떤 면에서는 근본적으로 다르다. JavaScript 언어는 Java를 닮았지만 Java의 `정적 형지정(static typing)과 강한 형 검사(strong type checking)가 없다`. JavaScript는 대부분의 Java 식 구문, 명명 규칙 및 기본적인 흐름 제어 구조를 따른다. 그것이 LiveScript에서 JavaScript로 이름이 바뀐 이유였다.  

​	Java의 선언에 의해 생성되는 클래스의 컴파일-타임 시스템과는 달리, JavaScript는 숫자, 불리언, 그리고 문자열 값을 표현하는 적은 수의 자료 형을 기반으로 한 런타임 시스템을 지원한다. JavaScript 는 더 일반적인 클래스 기반 객체 모델 대신에 `프로토타입 기반 객체 모델을 갖는다. 프로토타입 기반 모델은 동적 상속을 제공한다`. 즉, 상속된 대상은 각각의 객체에 따라 다양할 수 있다. JavaScript는 또한 어떤 특정한 선언을 요구하지 않는 함수도 지원한다. 함수는 객체의 속성이나, 타입이 느슨하게 형지정된 채 실행되는 메소드가 될 수 있다.  

​	JavaScript는 Java에 비해 매우 자유로운 형태의. 언어다. 모든 변수, 클래스, 및 메소드를 선언하지 않아도 된다. 메소드가 public, private, 또는 protected 인지 염려할 필요가 없고 인터페이스를 구현하지 않아도 된다. 변수, 매개변수(parameter) 및 함수의 반환 형은 명시적으로 지정되지 않는다.  

​	Java는 빠른 실행과 형 안전성(type safety)을 위해 설계된 클래스 기반 프로그래밍 언어다. 형 안전성은 Java 정수를 객체의 레퍼런스로 형변환(cast)하거나 Java 바이트코드를 변경하여 private 메모리에 접근할 수 없음을 의미한다. Java의 클래스 기반 모델은 프로그램이 오로지 클래스와 그 메소드로만 구성된다는 것을 뜻한다. Java의 클래스 상속과 강한 형지정은 보통 단단하게 결합된 객체 계층구조를 요구한다. 이러한 요구는 Java 프로그래밍을 JavaScript 프로그래밍보다 더 복잡하게 만든다.  

​	반면에, JavaScript는 `HyperTalk 과 dBASE 같은 더 작고 동적 형지정이 가능한 언어들`을 선택했다. 이러한 스크립팅 언어는 더 쉬운 구문과 특별한 내장(built-in) 기능 및 객체 생성을 위한 최소 요구사항으로 인해 훨씬 더 많은 사람들에게 프로그래밍 도구를 제공한다.

| JavaScript                                                   | Java                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| - 객체 지향. <br />- 객체의 형 간에 차이 없음. <br />- 프로토타입 메커니즘을 통한 상속, 그리고 속성과 메서드는 어떤 객체든 동적으로 추가될 수 있음. | - 클래스 기반. <br />- 객체는 클래스 계층구조를 통한 모든 상속과 함께 클래스와 인스턴스로 나뉨. <br />- 클래스와 인스턴스는 동적으로 추가된 속성이나 메소드를 가질 수 없음. |
| 변수 자료형이 선언되지 않음(dynamic typing, loosely typed).  | 변수 자료형은 반드시 선언되어야 함(정적 형지정, static typing). |
| 하드 디스크에 자동으로 작성 불가.                            | 하드 디스크에 자동으로 작성 가능.                            |



### JavaScript 와 ECMAScript 명세

​	JavaScript는 JavaScript에 기반한 표준화된 국제 프로그래밍 언어를 제공하기 위해 [ECMA(European association for standardizing information and communication systems) International](https://www.ecma-international.org/) 에서 표준화 된다.



## JavaScript 시작하기

### Web Console 와 Scratchpad

- Web Console은 현재 로드된 페이지에 대한 정보를 보여주고 현재 페이지에서 JavaScript 식을 실행하볼 수 있는 command line을 제공한다.

- Web Console은 한 줄 JavaScript를 실행하기에 좋지만 여러 줄을 실행하기에는 아주 불편하고 샘플 코드를 저장할 수도 없다. Scratchpad는 브라우저에서 JavaScript를 작성하고 실행할 수 있는 에디터로, 스크립트를 부르거나 저장할 수 있다.

  ```javascript
  // Hello World
  (function(){
    "use strict";
    /* Start of your code */
    function greetMe(yourName) {
      alert('Hello ' + yourName);
    }
  
    greetMe('World');
    /* End of your code */
  })();
  ```

  >  `use strict`의 의미
  >
  >  1. 성능을 크게 개선한다.
  >  2. 초보자가 실수하게 만드는 JavaScript의 일부 시멘틱을 막는다.
  >  3. 콘솔에서 실행되는 코드 스니펫이 서로 상호작용하지 못하도록 한다. (한 콘솔 실행에서 생성된 내용을 다른 콘솔 실행에 사용하는 경우)



## References

- [MDN - JavaScript 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [MDN - JavaScript 참고서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)

