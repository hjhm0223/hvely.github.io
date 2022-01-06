---
template: SinglePost
title: JavaScript (5) - Collections
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



# JavaScript (5) - Collections

## Indexed Collections
### 배열 객체

- 배열은 이름과 인덱스로 참조되는 정렬된 값들의 집합이다. 예를 들면, 숫자로 된 사원번호를 index로하여 사원명을 가지고 있는 emp라는 배열을 가질 수 있다.

- 자바스크립트는 명시적인 배열 데이터 형식을 가지고 있지 않지만 미리 정의된 배열 객체를 사용할 수 있고 배열 객체의 메서드를 개발하는 어플리케이션에서 사용되는 배열에 사용할 수 있다. 

- 배열 객체는 합치기(joining), 순서 뒤집기(reversing) 그리고 정렬(sorting)과 같은 다양한 방법으로 배열을 조작하는 메서드들을 제공한다. 정규 표현식과 함께 사용할 배열 길이와 기타 속성을 결정하는 속성이 있다.

- 배열 생성하는 방법

  ```javascript
  var arr = new Array(element0, element1, ..., elementN);
  var arr = Array(element0, element1, ..., elementN);
  var arr = [element0, element1, ..., elementN];
  
  // 길이가 0보다 크지만 아무런 요소를 가지고 있지 않은 배열
  new Array(상수);
  
  // 배열 활용
  var colors = ['red', 'green', 'blue'];
  for (var i = 0; i < colors.length; i++) {
    console.log(colors[i]);
  }
  ```

### 배열 객체의 메서드

1. `concat()` 메서드 두개의 배열을 합쳐 새로운 배열을 반환한다.

2. `join(delimiter = ',')` 메서드는 배열의 모든 요소를 주어진 구분자로 연결된 하나의 문자열을 반환한다.

   ```javascript
   var myArray = new Array('Wind', 'Rain', 'Fire');
   var list = myArray.join(' - '); // list is "Wind - Rain - Fire"
   ```

3. `push()` 메서드는 하나 혹은 그 이상의 요소를 배열의 마지막에 추가하고 추가된 요소를 포함한 길이를 반환한다.

4. `pop()` 메서드는 배열의 마지막 요소를 제거 하고 그 제거된 요소를 반환한다.

   ```javascript
   var myArray = new Array('1', '2', '3');
   var last = myArray.pop();
   // myArray is now ["1", "2"], last = "3"
   ```

5. `shift()` 메서드는 배열의 첫번째 요소를 제거하고 그 제거된 요소를 반환한다.

6. `unshift()` 메서드는 하나 혹은 그 이상의 요소를 배열의 앞쪽에 추가하고 추가한 요소를 포함한 길이를 반환한다.

   ```javascript
   var myArray = new Array('1', '2', '3');
   myArray.unshift('4', '5');
   // myArray becomes ["4", "5", "1", "2", "3"]
   ```

7. `slice(start_index, upto_index)` 메서드는 배열의 특정 부분을 추출하여 그 추출된 부분을 포함하는 새로운 배열을 반환한다. upto_index에 해당하는 요소는 포함되지 않는다.   

   `splice(index, count_to_remove, addElement1, addElement2, ...)` 메서드는 주어진 인덱스 요소를 포함하여 count_to_remove 개수만큼 삭제하고 주어진 요소로. 바꿔준다. 

8. `reverse ()` 메서드는 배열의 요소를 반대자리에 배치한다.

9. `sort ()` 배열의 요소를 제자리에 정렬하고 배열에 대한 참조를 반환한다.  

   ```javascript
   var myArray = new Array('Wind', 'Rain', 'Fire');
   myArray.sort();
   
   // 어떻게 해당 배열의 요소를 정렬할 지 결정하는 콜백 함수를 인자로 줄 수 있다.
   var sortFn = function(a, b){
     if (a[a.length - 1] < b[b.length - 1]) return -1;
     if (a[a.length - 1] > b[b.length - 1]) return 1;
     if (a[a.length - 1] == b[b.length - 1]) return 0;
   }
   
   myArray.sort(sortFn);
   // sorts the array so that myArray = ["Wind","Fire","Rain"]
   ```

10. `indexOf (searchElement [, fromIndex\])` 는 배열에서 `searchElement`를 검색하고 첫 번째 일치 항목의 인덱스를 반환한다. 

     `lastIndexOf(searchElement[, fromIndex\])` 메서드는 `indexOf`메서드와 유사하게 작동하지만 배열의 뒤쪽에서부터 요소를 찾는다.

11. `forEach(callback[, thisObject\])` 메서드는 배열의 모든 요소에 대해 반복적으로 주어진 `callback` 함수를 실행한다. 

12. `map(callback[, thisObject\])` 메서드는 배열의 모든 요소에 대해 콜백함수를 실행하고 콜백함수의 실행결과를 새로운 배열에 담아 반환한다.

    ```javascript
    var a1 = ['a', 'b', 'c'];
    var a2 = a1.map(function(item) { return item.toUpperCase(); });
    console.log(a2); // logs ['A', 'B', 'C']
    ```

13. `filter(callback[, thisObject\])` 메서드는 배열의 모든 요소에 대해 콜백 함수가 true를 반환하는 요소를 새로운 배열에 담아 반환한다. 

    ```javascript
    var a1 = ['a', 10, 'b', 20, 'c', 30];
    var a2 = a1.filter(function(item) { return typeof item == 'number'; });
    console.log(a2); // logs ['10', '20', '30']
    ```

14. `every (callback [, thisObject\])` 는 콜백이 배열의 모든 항목에 대해 true를 반환하면 true를 반환한다.

    ```javascript
    function isNumber(value){
      return typeof value == 'number';
    }
    var a1 = [1, 2, 3];
    console.log(a1.every(isNumber)); // logs true
    var a2 = [1, '2', 3];
    console.log(a2.every(isNumber)); // logs false
    ```

15. `some(callback[, thisObject\])` 메서드는 배열의 모든 요소에 대해 콜백 함수를 실행하고 하나의 요소라도 콜백 함수의 결과가 true이면 some()메서드의 결과는 true가 된다.

16. `reduce(callback[, initialValue\])` 메서드는 배열 내의 요소를 하나의 요소로 줄이기 위해 `firstValue, secondValue`를 인자로 받는 콜백 함수를 실행한다.  

    `reduceRight(callback[, initalvalue\])` 메서드는 reduce()와 유사하게 작동하지만 배열의 마지막 요소부터 시작한다.  

    `reduce`와 `reduceRight` 메서드는 반복적인 배열. 메서드 중 가장 명백하다. 두 메서드는 재귀적으로 하나의 시퀀스를 하나의 값으로 줄이기 위해 두개의 값을 합치는 알고리즘을 위해 사용되어야 한다. 

    ```javascript
    var a = [10, 20, 30];
    var total = a.reduce(function(first, second) { return first + second; }, 0);
    console.log(total) // Prints 60
    ```


## key 기반의 Collections
### Map 객체

- ECMAScript 6에서 값들을 매핑하기 위한 새로운 데이터 구조를 소개하고 있다.  그 중 하나인 Map객체는 간단한 키와 값을 서로 연결(매핑)시켜 저장하며 저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 한다.

- Map 객체에 저장되어 있는 각 요소들을 [키, 값] 형태의 배열로 반복적으로 반환해주는 `for...of` 를 사용할 수 있다.

  ```javascript
  var sayings = new Map();
  sayings.set("dog", "woof");
  sayings.set("cat", "meow");
  
  for (var [key, value] of sayings) {
    console.log(key + " goes " + value);
  ```

- Object와 Map 비교

  - Object의 키는 `Strings`이며, Map의 키는 모든 값을 가질 수 있다.
  - Object는 크기를 수동으로 추적해야하지만, Map은 크기를 쉽게 얻을 수 있다.
  - Map은 삽입된 순서대로 반복된다.
  - 객체(Object)에는 prototype이 있고, Map에 기본 키들이 있다.

- Object와 Map 사용

  - 실행 시까지 키를 알 수 없고, 모든 키가 동일한 type이며 모든 값들이 동일한 type일 경우에는 objects를 대신해서 map을 사용하는 것이 좋다.
  - 각 개별 요소에 대해 적용해야 하는 로직이 있을 경우에는 objects를 사용하는 것이 좋다.

### Set 객체

- Set 객체는 값들의 집합이다. 입력된 순서에따라 저장된 요소를 반복처리할 수 있다. 

- Set은 중복된 값을 허용하지 않는다. 따라서 특정 값은 Set내에서 하나만 존재하게 된다. 

  ```javascript
  var mySet = new Set();
  mySet.add(1);
  mySet.add("some text");
  mySet.add("foo");
  
  mySet.has(1); // true
  mySet.delete("foo");
  mySet.size; // 2
  
  for (let item of mySet) console.log(item);
  ```

- Array와 Set의 상호 변환

  - Array.from 혹은 spread operator를 통해 Set 객체를 가지고 Array를 생성할 수 있다.
  - 또한 Set 생성자는 배열을 인자로 받을 수 있고 해당 배열을 Set객체의 요소로 저장한다. 
  - Set객체는 **중복된 값을 저장하지 않기 때문에** 주어진 배열내의 중복된 요소들을 제거되어 Set으로 변환된다.

  ```javascript
  Array.from(mySet);
  [...mySet2];
  
  mySet2 = new Set([1,2,3,4]);
  ```

- Array와 Set 비교

  - Set의 장점
    - `indexOf` 메서드를 사용하여 배열내에 특정 요소가 존재하는지 확인하는 것은 느리다.
    - 배열에선 해당 요소를 배열에서 잘라내야 하는 반면 Set 객체는 요소의 값으로 해당 요소를 삭제하는 기능 제공한다.
    - `NaN`은 배열에서 indexOf 메서드로 찾을 수 없다. 
    - Set 객체는 값의 유일성을 보장하기 때문에 직접 요소의 중복성을 확인할 필요가 없다. 

### Map과 Set의 키와 값의 동치성

- Map 객체의 key에 대한 동치성 비교와 Set 객체의 값에 대한 동치성 비교 모두 `same-value-sero algorithm`에 근거한다.
  - 동치성 비교는 `===` 비교 연산과 같이 작동한다.
  - -0과 +0은 같다고 간주한다.
  - `NaN`는 자기 자신하고 같다고 간주한다.



## References

- [MDN - JavaScript 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [MDN - JavaScript 참고서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)
