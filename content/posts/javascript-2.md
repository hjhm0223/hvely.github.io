---
template: SinglePost
title: JavaScript (2) - 문법과 자료형 
status: Published
date: '2020-04-01'
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


# JavaScript (2) - 문법과 자료형 

JavaScript는 문법의 대부분을 Java와 C, C++로부터 차용하고 있으며, Awk, Perl, Python의 영향도 받았다.  

- JavaScript는 **대소문자를 구별**하며 **유니코드** 문자셋을 이용한다.  
- JavaScript에서는 명령을 Statement 라고 부르며, 세미콜론(`;`)으로 구분한다.
- JavaScript의 스크립트 소스는 왼쪽에서 오른쪽으로 탐색하면서 토큰, 제어 문자, 줄바꿈 문자, 주석이나 공백으로 이루어진 입력 element의 시퀀스로 변환된다. 
- 스페이스, 탭, 줄바꿈 문자는 공백으로 간주된다.

### 주석

```javascript
// 한 줄 주석

/* 
 * 여러 줄 주석 
 */
```



### 선언

1. `var`

   변수 선언과 동시에 값을 초기화

2. `let`

   블록 범위(scope) 지역 변수를 선언. 동시에 값을 초기화

3. `const`

   블록 범위 읽기 전용 상수를 선언

#### 변수

- 어플리케이션에서 값에 상징적인 이름으로 변수를 사용하며, 변수명은 식별자(identifier)라고 불리며 특정 규칙을 따른다.
- JavaScript 식별자는 문자, 밑줄(_), 달러 기호($)로 시작해야 하고, 이후는 숫자(0-9)일 수도 있다. 
- JavaScript가 대소문자를 구분하기에, 문자는 "A"부터 "Z"(대문자)와 "a"부터 "z"(소문자)까지 모두 포함한다.
- ISO 8859-1 혹은 Unicode 문자(가령 å 나 ü)도 식별자에 사용할 수 있다. 또한 [Unicode escape sequences](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Lexical_grammar#string_literals)도 식별자에 문자로 사용할 수 있다.

#### 변수 선언 및 할당

- 초기값 지정 없이 `var` 혹은 `let`문으로 선언된 변수는 `undefined` 값을 가진다. 

- 선언되지 않은 변수에 접근을 시도하는 경우 `ReferenceError` 예외가 발생한다.

- `undefined` 값은 `boolean` context에서 사용될 때 `false`로 동작한다.

  ```javascript
  var input;
  if(!input){
    doFunction(); // undefined일 경우 실행되지 않음
  }
  ```

#### 변수 범위

- 전역변수

  어떤 함수의 바깥에 변수를 선언하면 현재 문서의 다른 코드에 해당 변수를 사용할 수 있다.  

  전역 변수는 사실 *global 객체*의 속성(property)이다. 웹 페이지에서 global 객체는 `window이므로, `windows.*variable*` 구문을 통해 전역 변수를 설정하고 접근할 수 있다.  

  그 결과, window 혹은 frame의 이름을 지정하여 한 window 혹은 frame에서 다른 window 혹은 frame에 선언된 전역 변수에 접근할 수 있다. 예를 들어, `phoneNumber` 라는 변수가 문서에 선언된 경우, iframe에서 `parent.phoneNumber`로 이 변수를 참조할 수 있다.  

- 지역변수

  함수 내부에 변수를 선언하면 오직 그 함수 내에서만 사용할 수 있다.  

#### 변수 hoisting

- 호이스팅이란 JavaScript의 특이한 점으로 예외를 받지 않고 나중에 선언된 변수를 참조할 수 있다는 것이다. 즉, JavaScript 변수가 어떤 의미에서 함수나 제어문의 최상단으로 올려지는 것을 말한다. 하지만 끌어올려진 변수는 `undefined` 값을 반환한다.변수를 사용하거나 참조한 후에 선언 및 초기화하더라도 여전히 `undefined`를 반환한다.  

  ```javascript
  /**
   * Example 1
   */
  console.log(x === undefined); // logs "true"
  var x = 3;
  
  
  /**
   * Example 2
   */
  // undefined 값을 반환함.
  var myvar = "my value";
  
  (function() {
    console.log(myvar); // undefined
    var myvar = "local value";
  })();
  ```

- 호이스팅 때문에 함수 내의 모든 `var`문은 가능한 함수 상단 근처에 두는 것이 좋으며 코드를 더욱 명확하게 만들어준다.  

#### 함수 hoisting

- 함수에서는 단지 함수 선언만 상단으로 끌어올려지며 함수 표현식은 그렇지 않다.  

  ```javascript
  /* 함수 선언 */
  foo(); // "bar"
  
  function foo() {
    console.log('bar');
  }
  
  
  /* 함수 표현식 */
  baz(); // TypeError: baz is not a function
  
  var baz = function() {
    console.log('bar2');
  };
  ```

  



### 상수

- `const` 키워드로 읽기 전용 상수를 만들 수 있다. 상수 식별자의 구문은 변수 식별자와 같다. 문자, 밑줄이나 달러 기호로 시작해야 하고, 문자나 숫자, 밑줄을 포함할 수 있다.

- 상수는 스크립트가 실행 중인 동안 대입을 통해 값을 바꾸거나 재선언될 수 없다. 값으로 초기화해야 한다.

- 상수에 대한 범위 규칙은 `let` 블록 범위 변수와 동일하다. 만약 `const` 키워드가 생략된 경우에 식별자는 변수를 나타내는 것으로 간주된다.

- 상수는 같은 범위에 있는 함수나 변수와 동일한 이름으로 선언할 수 없다. 그러나, 상수에 할당된 객체의 속성과 배열의 내용은 보호되지 않는다.

  ```javascript
  // 보호되지 않는 객체의 속성
  const MY_OBJECT = {'key': 'value'};
  MY_OBJECT.key = 'otherValue';
  
  // 보호되지 않는 배열의 내용
  const MY_ARRAY = ['HTML','CSS'];
  MY_ARRAY.push('JAVASCRIPT');
  console.log(MY_ARRAY); //logs ['HTML','CSS','JAVASCRIPT'];
  ```



### 데이터 구조 및 형

#### 데이터 형

- 최신 ECMAScript 표준은 7가지 데이터 형을 정의한다.

  1. Boolean

     true or false

  2. null

     null 값을 나타내는 특별한 키워드. Null, NULL과 다르다.

  3. undefined

     값이 저장되어 있지 않은 최상위 속성

  4. Number

     정수 또는 실수형 숫자

  5. String

     문자열

  6. Symbol

     인스턴스가 고유하고 불변인 데이터 형

  7. Object

- 데이터 형이 비교적 많지 않지만, 어플리케이션에 유용한 기능을 수행할 수 있다. 

- `객체`와 `함수`는 언어의 다른 기본 요소이다. 객체는 값을 위한 컨테이너, 함수는 어플리케이션이 수행할 수 있는 절차(procedure)로 생각할 수 있다.

#### 자료형 변환

​	JavaScript는 동적 형지정(정형) 언어다. 이는 변수를 선언할 때 데이터 형을 지정할 필요가 없음을 의미한다. 또한 데이터 형이 스크립트 실행 도중 필요에 의해 자동으로 변환됨을 뜻한다.

#### 문자열을 숫자로 변환하기

​	숫자를 나타내는 값이 문자열로 메모리에 있는 경우, 변환을 위한 메서드가 있다. 

- `parseInt()`

  오직 정수만 반환하므로, 소수에서는 사용성이 떨어진다. 또한, 항상 진법(Radix) 매개변수를 포함해야 한다. 진법 매개변수는 변환에 사용될 진법을 지정하는데 사용된다.

- `parseFloat()`

- 문자열을 숫자로 변환하는 대안은 +(단항 더하기) 연산자이다.

  ```javascript
  "1.1" + "1.1" = "1.11.1"
  +"1.1" + +"1.1" = 2.2
  ```

### literal

​	JavaScript에서 값을 나타내기 위해 리터럴을 사용한다. 말 그대로 스크립트에 부여된 고정값으로 변수가 아니다.

#### 배열 literal

- 배열 리터럴은 0개 이상의 식(expression) 목록이다.

- 각 식은 배열 요소를 나타내고 대괄호(`[]`)로 묶인다. 

- 배열 리터럴을 사용하여 배열을 만들 때, 그 요소로 지정된 값으로 초기화되고, 그 길이는 지정된 인수의 갯수로 설정된다.

  > 배열 리터럴은 일종의 객체 initializer이다.

- 배열이 최상단 스크립트에서 리터럴을 사용하여 만들어진 경우, JavaScript는 배열 리터럴을 포함한 식을 평가할 때마다 배열로 해석한다. 

- 함수에서 사용되는 리터럴은 함수가 호출될 때마다 생성된다.

- 모든 요소를 지정할 필요는 없지만 마지막 쉼표는 무시된다. 코드의 명확성과 유지보수성을 높이기 위해 명시적으로 `undefined`로 선언하는 것이 좋다.

  ```javascript
  // 배열의 길이는 3, fish[1]은 `undefined`
  var fish = ["Lion", , "Angel"];
  
  // 배열의 길이는 4, myList[1], myList[3]은 `undefined`
  var myList = ['home', , 'school', , ];
  ```

#### Boolean literal

- Boolean 객체(true or false)의 리터럴 값을 가진다.

#### 정수, 부동소수점 literal

- [정수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#정수)
- [부동 소수점 리터럴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#부동_소수점_리터럴)

#### 객체 literal

- 객체 리터럴은 중괄호(`{}`)로 묶인 0개 이상인 객체의 속성명과 관련 값 쌍 목록이다. 

- 문의 시작에 객체 리터럴을 사용해서는 안된다. `{`가 블록의 시작으로 해석되기 때문에 오류를 이끌거나 의도한 대로 동작하지 않는다.

- 속성명으로 숫자나 문자열 리터럴을 사용하거나 또다른 객체 리터럴 내부에 객체를 중첩할 수도 있다.

  ```javascript
  var car = { myCar: "Saturn", getCar: carTypes("Honda"), special: sales };
  var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" };
  ```

- 객체 속성명은 빈 문자열 포함 어떤 문자열도 될 수 있다. 속성명이 유효한 JavaScript 식별자나 숫자가 아닌 경우, 따옴표로 묶여야 한다. 또한 유효한 식별자가 아닌 속성명은 점(`.`) 속성으로 접근할 수 없다. 대신 배열 같은 표기법("`[]`")으로 접근하고 값을 설정할 수 있다.

  ```javascript
  var unusualPropertyNames = {
    "": "An empty string",
    "!": "Bang!"
  }
  console.log(unusualPropertyNames."");   // SyntaxError: Unexpected string
  console.log(unusualPropertyNames[""]);  // An empty string
  console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
  console.log(unusualPropertyNames["!"]); // Bang!
  ```

#### 향상된 객체 literal

- ES2015에서 객체 리터럴은 구성에서 프로토타입 설정, foo: foo 할당을 위한 단축 표기, 메서드 정의, super 클래스 호출 및 식으로 동적인 속성명 계산을 지원하기 위해 확장됐다. 그에 따라 객체 리터럴 및 클래스 선언이 함께 더 가까워지고, 객체 기반 설계는 같은 일부 편의기능으로 득을 볼 수 있다.

### 정규식 literal

- 정규식 literal은 `/`사이에 감싸인 패턴이다.

  ```javascript
  var re = /ab+c/;
  ```

### 문자열 literal

- 큰 따옴표 쌍이나 작은 따옴표 쌍으로 구분되어야 한다.

#### 특수 문자 사용

| 문자        | 뜻                                                           |
| :---------- | :----------------------------------------------------------- |
| `\0`        | Null Byte                                                    |
| `\b`        | Backspace                                                    |
| `\f`        | Form feed                                                    |
| `\n`        | New line                                                     |
| `\r`        | Carriage return                                              |
| `\t`        | Tab                                                          |
| `\v`        | Vertical tab                                                 |
| `\'`        | Apostrophe 혹은 작은 따옴표                                  |
| `\"`        | 큰 따옴표                                                    |
| `\\`        | 백슬래시                                                     |
| `\XXX`      | Latin-1 인코딩 문자는 0 - 377 사이 8진수 3자리까지 지정될 수 있습니다. 예를 들어, \251은 copyright 심볼을 표현하는 8진수 시퀀스입니다. |
| `\xXX`      | Latin-1 인코딩 문자는 00 - FF 사이의 16진수 2자리로 지정될 수 있습니다. 예를 들어, \xA9는 copyright 심볼을 표현하는 16진수 시퀀스입니다. |
| `\uXXXX`    | 유니코드 문자는 16진수 4자리로 지정될 수 있습니다. 예를 들어, \u00A9는 copyright 심볼을 표현하는 유니코드 열입니다. [Unicode escape sequences](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Lexical_grammar#string_literals)를 참고하세요. |
| `\u{XXXXX}` | 유니코드 코드 포인트 이스케이프. 예를 들어, \u{2F804}는 간단한 유니코드 이스케이프 \uD87E\uDC04와 같습니다. |

#### 문자 이스케이프

- 표에 없는 문자의 경우 백슬래시는 무시되지만, 이 용법은 더 이상 사용되지 않으며 사용을 피해야 한다.

