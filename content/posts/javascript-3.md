---
template: SinglePost
title: JavaScript (3) - 제어흐름과 에러처리, Loop, 함수, 표현식과 연산자, 숫자와 날짜, 텍스트 서식, 정규 표현식
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


# JavaScript (3) - 제어흐름과 에러처리 

​	JavaScript는 어플리케이션 상의 상호작용을 통합하는데 사용할 수 있는 일련의 문법, 특히 제어흐름 문을 지원한다.  

### Block 문

- Block 문은 코드를 묶는 가장 기본적인 문법이다. Block 문은 중괄호 ( `{ }` )에 의해 범위가 결정된다.

  ```javascript
  {
    statement_1;
    statement_2;
    .
    .
    .
    statement_n;
  }
  ```

- Block 문은 일반적으로 제어 흐름 문(if, for, while)과 함께 사용된다.

  ```javascript
  // 여기서 `{ x++; }`는 block 문
  while (x < 10) {
    x++;
  }
  ```

  > **중요**: ECMAScript2015 이전의 JavaScript는 **블록 범위를 가지고 있지 않다.** Block 내에서 선언한 변수는 블록을 넘어 변수가 위치한 함수 혹은 스크립트에 영향을 끼치게 된다.즉, block 문은 변수의 범위를 정의하지 않는다. 자바스크립트의 "독립" block 은 C 혹은 Java의 그것과 완전히 다른 결과를 가진다.
  >
  > ```javascript
  > var x = 1;
  > {
  > var x = 2;
  > }
  > console.log(x); // outputs 2
  > ```
  >
  > C나 Java에서 해당 코드는 1을 출력한다.
  >
  > ECMAScript2015부터, `let` 그리고 `const` 변수 선언으로 변수의 블록 범위를 제한할 수 있다.

### 조건문

- 조건문은 특정 조건이 참인 경우에 실행하는 명령의 집합이다. 
- JavaScript는 두 가지 조건문을 지원한다
  1. `if...else`문
     - 조건문 안에서의 변수값 할당은 동등비교연산자로 오해할 수 있기 때문에 사용하지 않는 것이 좋다. 
     - 거짓으로 취급하는 값
       - `false`, `undefined`, `null`, `0`, `NaN`, the empty string (`""`)
  2. `switch`문

### 예외처리문

1. `throw`문

   - 예외를 사용할 때 사용되는 값을 표함하는 표현을 명시해야 한다.

     ```javascript
     throw "Error2";   // String type
     throw 42;         // Number type
     throw true;       // Boolean type
     throw {toString: function() { return "I'm an object!"; } };
     ```

     > **Note:** *예외를 사용할때* 객체를 명시할 수 있다. 그리고나서  `catch` 문 안에서 객체의 특성들을 참조 할 수 있다. 다음 예시는 `myUserException` of type `UserException`객체를 만들고 throw문에서 사용한다.
     >
     > ```javascript
     > // Create an object type UserException
     > function UserException (message){
     > this.message=message;
     > this.name="UserException";
     > }
     > 
     > // Make the exception convert to a pretty string when used as a string
     > // (e.g. by the error console)
     > UserException.prototype.toString = function () {
     > return this.name + ': "' + this.message + '"';
     > }
     > 
     > // Create an instance of the object type and throw it
     > throw new UserException("Value too high");
     > ```

   

2. `try...catch`문

   - `try...catch` 문법은 시도할 블록을 표시하고, 예외가 발생하였을 때 하나 이상의 반응을 명시한다. 만약 예외가 발생하였을때, `try...catch` 문법은 예외를 잡아낸다.

   - `try` 블록이 성공하지 않았다면, 제어는 즉시 `catch` 블록으로 이동한다. 만약 `try` 블록에서 예외가 발생하지 않았을 때, `catch` 블록을 건너뛴다.

   - 예시: 함수에 전해진 값을 토대로 달의 이름을 검색하는 함수를 호출한다. 만약 값이 달 숫자값(1-12) 에 일치하지 않으면,`"InvalidMonthNo"` 라는 값과 함께 예외가 발생하고 `catch` 블록의 문장들이 `monthName` 변수를 `unknown` 값으로 설정한다.

     ```javascript
     function getMonthName (mo) {
       mo = mo-1; // Adjust month number for array index (1=Jan, 12=Dec)
       var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
                     "Aug","Sep","Oct","Nov","Dec"];
       if (months[mo] != null) {
         return months[mo];
       } else {
         throw "InvalidMonthNo"; //throw keyword is used here
       }
     }
     
     try { // statements to try
       monthName = getMonthName(myMonth); // function could throw exception
     }
     catch (e) {
       monthName = "unknown";
       logMyErrors(e); // pass exception object to error handler
     }
     ```

   - `catch` 블록

     - `catch` 블록은 `throw`문장에 의해 명시된 값을 가지고 있는 식별자(앞 구문의 `catchID`)를 명시한다. 이 식별자를 발생된 예외에 대한 정보를 얻기 위하여 사용할 수 있다. JavaScript는 `catch` 블록에 진입했을때 식별자를 생성한다. 식별자는 `catch` 블록에 있는 동안만 유지된다. `catch` 블록의 시행이 끝난 후, 식별자는 더이상 사용할 수 없다.

   - `finally` 블록

     - `finally` 블록은 `try` 블록과 `catch` 블록이 시행되고, `try...catch` 문법 다음 문장이 시행되기 전에 시행되는 문장들을 포함하고 있다.

     - `finally` 블록은 예외가 발생하든 안하든 수행된다.

     - `finally` 블록을 예외가 발생하였을때 스크립트가 우아하게 실패하도록 만들기 위하여 사용할 수 있다. 

     - 예시: 파일을 열고, 파일을 사용하는 문장(서버 측 자바스크립트는 파일에 접근하는 것을 허가합니다)을 시행할 때, 만약 파일이 열린 동안 예외가 발생했다면, `finally` 블록은 스크립트가 실패하기 전에 파일을 닫아준다.

       ```javascript
       openMyFile();
       try {
         writeMyFile(theData); //This may throw a error
       } catch(e) {
         handleError(e); // If we got a error we handle it
       } finally {
         closeMyFile(); // always close the resource
       }
       ```

   - try...catch 문법 중첩하기

     - 중첩된 안쪽 `try ... catch` 문에 `catch` 블록이 없으면 `finally` 블록이 있어야하고 `try ... catch` 문의 `catch` 블록에 일치하는 항목이 있는지 확인해야한다.

#### 예외 유형

- 대부분 자바스크립트안에서 사용될 수 있음에도 불구하고, 반드시 사용되는 객체들이 같은 것으로 만들어 지지는 않는다. 이것들은 에러같은 숫자들이나 문자열들을 사용하는데 흔한 일이지만 특히 이런 목적으로 만들어진 예외 유형중 하나를 사용하는데 더 효과적이다.
  - [ECMAScript exceptions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects#fundamental_objects)
  - [`DOMException` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) and [`DOMError` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMError)

### Error 객체를 도구화하기

- 오류의 종류에 따라 더 정제된 메세지를 얻기 위하여 'name'속성과 'message'속성을 사용할 수 있다. 

  - 'name' 속성

    오류의 일반 클래스(e.g., 'DOMException' 또는 'Error')를 제공

  - 'message' 속성

    error 객체를 문자열로 바꿀수 있는 것보다 더 간결한 메세지를 제공

  ```javascript
  function doSomethingErrorProne () {
    if (ourCodeMakesAMistake()) {
      throw (new Error('The message'));
    } else {
      doSomethingToGetAJavascriptError();
    }
  }
  
  try {
    doSomethingErrorProne();
  }
  catch (e) {
    console.log(e.name); // logs 'Error'
    console.log(e.message); // logs 'The message' or a JavaScript error message)
  }
  ```



### Promises

​	ECMAScript2015를 시작하면서, JavaScript는 지연된 흐름과 비동기식의 연산을 제어할 수 있게 하는 [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) 객체에 대한 지원을 얻게 되었다.

- `Promise` 상태 종류

  1. *pending*

     초기상태, fulfilled 되거나 rejected 되지 않음.

  2. *fulfilled*

     연산 수행 성공.

  3. *rejected*

     연산 수행 실패.

  4. *settled*

     Promise 가 fulfilled 이거나 rejected 이지만 pending 은 아님.

![promises](https://mdn.mozillademos.org/files/8633/promises.png)

- 예시: XHR를 통해 이미지 불러오기

  ```javascript
  function imgLoad(url) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
      request.onload = function() {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('Image didn\'t load successfully; error code:'
                       + request.statusText));
        }
      };
      request.onerror = function() {
        reject(Error('There was a network error.'));
      };
      request.send();
    });
  }
  ```

  >  [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) 참고 페이지


## References

- [MDN - JavaScript 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [MDN - JavaScript 참고서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)
