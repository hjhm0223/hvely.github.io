---
template: SinglePost
title: JavaScript (4) - Loop와 반복, 함수, 표현식과 연산자, 숫자와 날자, 텍스트 서식, 정규표현식
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



# JavaScript (4) - Loop와 반복

### 1. `for` / `for .. in` / `for .. of` 문

- `for .. in` 문

  객체의 열거 속성을 통해 지정된 변수를 반복한다.

- `for .. of` 문

  반복 가능한 객체를 통해 반복하는 루프를 만든다.

- 차이

  ```javascript
  let arr = [3, 5, 7];
  arr.foo = "hello";
  
  for (let i in arr) {
     console.log(i); // logs "0", "1", "2", "foo"
  }
  
  for (let i of arr) {
     console.log(i); // logs "3", "5", "7"
  }
  ```

### 2. `do .. while` / `while` 문

- 조건이 거짓으로 판별될 때까지 반복한다.

- `do .. while` 문

  ```javascript
  do {
    statement
  } while (조건문);
  ```

- `while` 문

### 3. `label` 문

- 다른 곳으로 참조할 수 있도록 식별자로 제공한다.

  ```javascript
  label:
  	statement
  ```

### 4. `break` / `continue` 문

- `break` 문

  `switch` 문, `label` 문과 결합한 문장을 빠져나올 때 사용한다.

  - 레이블 없이 break문을 쓸 때 `break;`

    `가장 가까운 `while`, `do-while`, `for`, 또는 `switch`문을 종료하고 다음 명령어로 넘어간다.

  - 레이블 문을 쓸 때 `break [레이블];`

    특정 레이블 문에서 끝난다. 

- `continue` 문

  while, do-while, for, 레이블 문을 다시 시작하기 위해 사용될 수 있다.

  - 레이블 없이 continue를 사용하는 경우 `continue;`

    가장 안쪽의 while, do-while, for 문을 둘러싼 현재 반복을 종료하고, 다음 반복으로 루프의 실행을 계속한다.  

    break문과 달리, continue 문은 전체 루프의 실행을 종료하지 않는다. 

    while 루프에서는 다시 조건으로 이동하고, for 루프에서는 증감 표현으로 이동한다.     

  - 레이블과 함께 continue를 사용하는 경우 `continue [레이블];`

    continue는 그 레이블로 식별되는 루프 문에 적용된다.



# JavaScript (4) - 함수 

- default parameter

  ```javascript
  // default parameter를 지정하면 undefined인지 검사할 필요가 없다.
  function multiply(a, b = 1) {
    return a*b;
  }
  ```

- 나머지 매개변수

  ```javascript
  function multiply(multiplier, ...theArgs) {
    return theArgs.map(x => multiplier * x);
  }
  
  var arr = multiply(2, 1, 2, 3);
  console.log(arr); // [2, 4, 6]
  ```

### 화살표 (fat arrow) 함수

- `=>`를 사용하여 나타낸다.

- 비교적 짧은 문법을 가지고 있고 사전적으로  this 값을 묶는다.

  ```javascript
  var a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl­lium"
  ];
  
  var a2 = a.map(function(s){ return s.length });
  console.log(a2); // logs [8, 6, 7, 9]
  
  var a3 = a.map( s => s.length );
  console.log(a3); // logs [8, 6, 7, 9]
  ```

### 사전적 `this`

- 화살표 함수에서 모든 new 함수들은 그들의 this 값을 정의한다.

- 생성자로서 새로운 객체, 정의되지 않은 strict mode의 함수 호출 등은 객체지향 프로그래밍 스타일이 아니다.

- IECMAScript 3/5 에서 `this` 안의 값을 수정할 수 있는 변수에 할당하는 것으로 고쳐졌다.

  ```javascript
  function Person() {
    var self = this; // Some choose `that` instead of `self`.
                     // Choose one and be consistent.
    self.age = 0;
  
    setInterval(function growUp() {
      // The callback refers to the `self` variable of which
      // the value is the expected object.
      self.age++;
    }, 1000);
  }
  ```

- 화살표 함수에는 `this`가 없다.

  ```javascript
  function Person() {
    this.age = 0;
  
    setInterval(() => {
      this.age++; // |this| properly refers to the person object
    }, 1000);
  }
  
  var p = new Person();
  ```

### JavaScript 내장함수

1. `eval()`

   `eval()` 메소드는 문자열로 표현된 자바스크립트 코드를 수행한다.

2. `uneval()`

   `uneval()` 메소드는 `Object`의 소스코드를 표현하는 문자열을 만든다.

3. `isFinite()`

   전역 `isFinite()` 함수는 전달받은 값이 유한한지 결정한다. 만약 필요하다면, 매개변수는 첫번째로 숫자로 변환된다.

4. `isNaN()`

   `isNaN()` 함수는 `NaN`인지 아닌지 결정한다. 

   > Note: `isNaN` 함수 안의 강제 변환은 흥미로운 규칙을 가지고 있다. `Number.isNaN()`을 대신 사용하고 싶을것이다. ECMAScript 6 에서 정의된, 또는 값이 숫자값이 아닐 때, `typeof` 를 사용할 수도 있다 .

5. `parseFloat()`

   `parseFloat()` 함수는 문자열 인수 값을 해석하여 부동소숫점 수를 반환한다.

6. `parseInt()`

   `parseInt()` 함수는 문자열 인수 값을 해석하여 특정한 진법의 정수를 반환한다.

7. `decodeURI()`

   `decodeURI()` 함수는 사전에 `encodeURI`을 통해 만들어지거나 비슷한 과정을 통해 만들어진 URI(Uniform Resource Identifier) 를 해독한다.

8. `decodeURIComponent()`

   `decodeURIComponent()` 메소드는 사전에 `encodeURIComponent`를 통하여 만들어 지거나 또는 비슷한 과정을 통해 만들어진 URI (Uniform Resource Identifier) 컴포넌트를 해독한다.

9. `encodeURI()`

   `encodeURI()` 메소드는 URI(Uniform Resource Identifier)를 각 인스턴스의 특정한 문자를 한개, 두개,세개, 또는 네개의 UTF-8인코딩으로 나타내어지는 연속된 확장문자들과 바꾸는 방법으로 부호화한다. (두 "surrogate" 문자로 구성된 문자들은 오직 네개의 연속된 확장문자다.)

10. `encodeURIComponent()`

    `encodeURIComponent()` 메소드는 URI(Uniform Resource Identifier) 컴포넌트를 각 인스턴스의 특정한 문자를 한개, 두개, 세개, 또는 네개의 UTF-8인코딩으로 나타내어지는 연속된 확장문자들과 바꾸는 방법으로 부호화한다. (두 "surrogate" 문자로 구성된 문자들은 오직 네개의 연속된 확장문자다.)

11. `escape()` (en-US)

    곧 사라질 `escape()` 메소드는 한 문자열에서 특정 문자들이 16진 확장 비트열로 바뀌어진 문자열로 계산한다. `encodeURI` 또는 `encodeURIComponent` 를 사용하는 것이 좋다.

12. `unescape()` (en-US)

    곧 사라질 `unescape()` 메소드는 문자열에서 확장 비트열이 확장 비트열이 나타내는 문자로 바뀌어진 문자열로 계산한다. `escape` (en-US)에서 확장 비트열이 소개될 것이다. `unescape()` 메소드가 곧 사라지기 때문에, `decodeURI()` or `decodeURIComponent`를 대신 사용하는 것이 좋다.




# JavaScript (4) - 표현식과 연산자

### 연산자

1. 할당 연산자

2. 비교 연산자

3. 산술 연산자

4. 비트 연산자

5. 논리 연산자

6. 문자열 연산자

7. 조건 (삼항) 연산자

   ```javascript
   condition ? val1 : val2
   ```

8. 쉼표 연산자

9. 단항 연산자

   - `delete` 연산자

     객체의 속성을 삭제한다.

     ```javascript
     delete object.property;
     delete object[propertyKey];
     delete objectName[index];
     ```

     > 배열의 원소를 삭제하는 경우에는 `undefined`로 덮어쓰거나 `splice`와 같은 다양한 배열 메서드를 사용하는 것이 좋다.

   - `type of` 연산자

     평가 전의 피연산자 타입을 나타내는 문자열을 반환한다.

     ```javascript
     typeof true; // "boolean" 반환
     typeof null; // "object" 반환
     ```

   - `void` 연산자

     표현식을 평가할 때 값을 반환하지 않도록 지정한다. 

     ```javascript
     void expression
     ```

10. 관계 연산자

    - `in` 연산자

      지정한 속성이 지정한 객체에 존재할 경우 `true`를 반환한다.

      ```javascript
      propNameOrNumber in objectName
      ```

    - `instanceof` 연산자

      지정한 객체가 지정한 객체 타입에 속하면 `true`를 반환한다.

      ```javascript
      objectName instanceof objectType
      ```

### 표현식

1. 일차 표현식

   JavaScript의 키워드와 일반 표현식이다.

   - `this` 키워드

     현재 객체를 참조할 때 사용한다.

2. 좌변 표현식

   - `new` 연산자

     사용자 정의 객체 타입이나 내장 객체 타입의 인스턴스를 생성할 수 있다.

   - `super` 키워드

     객체의 부모가 가진 함수를 호출할 때 사용한다.




# JavaScript (4) - 숫자와 날짜

### `Date` 객체

- 자바스크립트에는 날짜 데이터 타입이 없지만 `Date` 객체와 그 메소드를 사용하여 응용 프로그램에서 날짜와 시간을 처리 할 수 있다.

- `Date` 객체에는 날짜 설정, 가져 오기 및 조작을위한 많은 메소드가 있으나 속성(properties)은 없다.

- 자바스크립트는 자바와 비슷하게 날짜를 처리한다. 두 언어에는 동일한 날짜 메소드가 많으며 두 언어 모두 1970 년 1 월 1 일 00:00:00 이후의 밀리 초 수로 날짜를 저장한다. 유닉스 타임 스탬프는 1970 년 1 월 1 일 00:00:00 이후의 초 수다.

- Date 개체 범위는 UTC 1970 년 1 월 1 일을 기준으로 -100,000,000 일에서 100,000,000 일이다.

  ```javascript
  var dateObjectName = new Date([parameters]);
  
  // 오늘의 날짜와 시간
  new Date();
  
  // 날짜를 나타내는 문자열의 형식 ("Month day, year hours:minutes:seconds", 시간은 생략 가능)
  new Date("December 25, 1995 13:30:00");
  
  // 정수 값의 (연도, 월, 날)
  new Date(1995, 11, 25);
  
  // (연도, 월, 일, 시, 분, 초)
  new Date(1995, 11, 25, 9, 30, 0);
  ```

- Date 개체의 표현 방법

  - "set" 함수

    날짜 및 시간 값을 설정한다.

  - "get" 함수

    날짜 및 시간 값을 얻는다.

  - "to" 함수

    문자열 값을 반환한다.

  - `Date` 문자열을 분석하기위해 parse와 UTC함수를 사용한다.

    ```javascript
    var IPOdate = new Date();
    IPOdate.setTime(Date.parse("Aug 9, 1995"));
    ```

  - "get"및 "set"메소드를 사용하여 초, 분,시, 일, 요일, 월 및 연도를 별도로 가져 와서 설정할 수 있다. (요일이 자동적으로 설정되기 (위해) 때문에, 요일을 돌려주는 getDay 메소드가 있습니다만, 대응하는 setDay 메소드는 없다.) 

    - 초와 분: 0 to 59
    - 시간: 0 to 23
    - 요일: 0 (Sunday) to 6 (Saturday)
    - 날짜: 1 to 31 (day of the month)
    - 월: 0 (January) to 11 (December)
    - 연도: years since 1900

    ```javascript
    var Xmas95 = new Date("December 25, 1995");
    console.log(Xmas95.getMonth()); // 11
    console.log(Xmas95.getFullYear()); // 1995
    ```

  


# JavaScript (4) - 텍스트 서식

### 문자열 메서드

| Method                                                       | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`charAt`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/charAt), [`charCodeAt`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt), [`codePointAt` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) | 문자열에서 지정된 위치에 있는 문자나 문자 코드를 반환합니다. |
| [`indexOf`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), [`lastIndexOf`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) | 문자열에서 지정된 부분 문자열의 위치나 지정된 부분 문자열의 마지막 위치를 각각 반환합니다. |
| [`startsWith`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [`endsWith`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [`includes`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes) | 문자열 시작하고, 끝나고, 지정된 문자열을 포함하는지의 여부를 반환합니다. |
| [`concat`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/concat) | 두 문자열의 텍스트를 결합하고 새로운 문자열을 반환합니다.    |
| [`fromCharCode`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode), [`fromCodePoint` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) | 유니코드 값의 지정된 시퀀스로부터 문자열을 구축합니다. 문자열 인스턴스가 아닌 문자열 클래스의 메서드입니다. |
| [`split`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split) | 부분 문자열로 문자열을 분리하여 문자열 배열로 문자열 개체를 분할합니다. |
| [`slice`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/slice) | 문자열의 한 부분을 추출하고 새 문자열을 반환합니다.          |
| [`substring`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/substring), [`substr`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/substr) | 어느 시작 및 종료 인덱스 또는 시작 인덱스 및 길이를 지정하여, 문자열의 지정된 일부를 반환합니다. |
| [`match`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`replace`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`search`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/search) | 정규 표현식으로 작업합니다.                                  |
| [`toLowerCase`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), [`toUpperCase`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) | .모든 소문자 또는 대문자에서 각각 문자열을 반환합니다.       |
| [`normalize`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) | 호출 문자열 값의 유니 코드 표준화 양식을 반환합니다.         |
| [`repeat`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) | 주어진 회를 반복하는 개체 요소로 이루어진 문자열을 반환합니다. |
| [`trim`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) | 문자열의 시작과 끝에서 공백을 자릅니다.                      |

> syntactic sugar (`$`)의 사용
>
> ```javascript
> var a = 5;
> var b = 10;
> console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
> // "Fifteen is 15 and
> // not 20."
> ```




# JavaScript (4) - 정규 표현식

### 정규식에서 쓰이는 Methods

| Method    | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| `exec`    | 대응되는 문자열을 찾는 `RegExp` 메소드입니다. 정보를 가지고 있는 배열을 반환합니다. 대응되는 문자열을 찾지 못했다면 null을 반환한다. |
| `test`    | 대응되는 문자열이 있는지 검사하는 `RegExp` 메소드 입니다. true 나 false를 반환한다. |
| `match`   | 대응되는 문자열을 찾는 `RegExp` 메소드입니다. 정보를 가지고 있는 배열을 반환한다. 대응되는 문자열을 찾지 못했다면 null을 반환한다. |
| `search`  | 대응되는 문자열이 있는지 검사하는 `String` 메소드다. 대응된 부분의 인덱스를 반환한다. 대응되는 문자열을 찾지 못했다면 -1을 반환한다. |
| `replace` | 대응되는 문자열을 찾아 다른 문자열로 치환하는 `String` 메소드다. |
| `split`   | 정규식 혹은 문자열로 대상 문자열을 나누어 배열로 반환하는 `String` 메소드다. |



## References

- [MDN - JavaScript 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [MDN - JavaScript 참고서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)
