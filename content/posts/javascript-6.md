---
template: SinglePost
title: JavaScript (6) - Objects
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


# JavaScript (6) - Objects
## Working with Objects

​	JavaScript는 간단한 객체 기반 패러다임 상에서 만들어졌다. 객체는 프로퍼티의 모음이며 프로퍼티는 이름(key)과 값(value)의 연결로 이루어진다.  프로퍼티의 값으로 함수가 될 수 있는데, 이런 프로퍼티는 메소드라고 불린다. 브라우저 안에 미리 정의된 객체뿐 아니라 사용자들이 직접 자신만의 객체를 정의할 수도 있다. JavaScript의 객체는 Object의 특징을 결정짓는 여러 프로퍼티(속성)를 가진다.

### 객체와 프로퍼티

- JavaScript의 객체에는 그와 연관된 프로퍼티가 있다. 프로퍼티는 객체에 붙은 변수(variable)라고 설명할 수 있다. 

- 객체의 프로퍼티는 일반 자바스크립의 변수와 기본적으로 똑같은데, 다만 객체에 속해있다는 차이만 있을 뿐이다. 

- 객체의 프로퍼티들이 객체의 특징을 규정한다. 프로퍼티에 접근할 때는 도트(점) 표기법을 사용한다.

  ```javascript
  objectName.propertyName
  ```

- JavaScript의 모든 변수가 그렇듯이, 객체의 이름과 프로퍼티 이름은 모두 대소문자를 구별한다. 프로퍼티를 새로 정의하려면 그냥 이름과 값을 추가하면 된다. 

  ```javascript
  var myCar = new Object();
  myCar.make = "Ford";
  myCar.model = "Mustang";
  myCar.year = 1969;
  ```

- 대괄호 표기법을 사용하여 객체의 프로퍼티에 접근할 수 있다. 객체는 연관배열(*associative arrays*)이라고도 불리는데, 각 프로퍼티는 하나의 문자열 이름과 연관되어(associated) 이것을 통해 접근할 수 있기 때문이다. 예를 들면 myCar 객체의 프로퍼티에 다음과 같이 접근할 수 있다.

  ```javascript
  myCar["make"] = "Ford";
  myCar["model"] = "Mustang";
  myCar["year"] = 1969;
  ```

- 객체의 프로퍼티 이름은 유효한 자바스크립트 문자열이거나 문자열로 변환이 가능한 것이면 어떤 것이든 가능하며, 심지어 빈 문자열도 된다. 하지만 자바스크립트 식별자(identifier)로 적합하지 않으면 (예 : 하이픈, 빈칸을 포함하거나 숫자로 시작하는 이름), 대괄호를 이용한 표기법으로만 접근이 가능하다. 이 표기법은 프로퍼티 이름이 사전에 미리 결정되지 않고 런타임 시점에 결정되는 경우에 특히 유용하다. 

- 대괄호 표기법을 `for ... in`과 함께 사용하면 객체의 열거가능한 프로퍼티를 나열할 수 있다.

  ```javascript
  function showProps(obj, objName) {
    var result = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
          result += objName + "." + i + " = " + obj[i] + "\n";
      }
    }
    return result;
  }
  
  console.log(showProps(myCar, "myCar"));
  // myCar.make = Ford
  // myCar.model = Mustang
  // myCar.year = 1969
  ```

### 객체의 프로퍼티 나열하기

1. `for ... in` 루프

   객체와 객체의 프로토타입 체인 상의 열거 가능한 모든 프로퍼티를 순회한다.

2. `Objects.keys`

   객체 자체에 속한 열거 가능한 프로퍼티 이름들("keys")의 배열을 반환한다.

3. `Object.getOwnPropertyNames`

   객체 자체의 모든  프로퍼티(열거 가능 여부에 무관) 이름들의 배열을 반환한다.

### 객체 생성하기

- 방법

  1. `객체 Initializer` 이용

     - `literal` 표기에 의한 객체 생성` 이라고도 불린다.

       ```javascript
       var obj = { property_1:   value_1,   // property_# may be an identifier...
                   2:            value_2,   // or a number...
                   // ...,
                   "property n": value_n }; // or a string 
       ```

  2. 생성자 함수 정의 후 `new` 연산자와 함께 이용

     - 객체의 타입을 정의하려면 타입의 이름, 속성, 메소드 등을 기술하는 함수를 하나 만들어야 한다.

       ```javascript
       function Car(make, model, year) {
         this.make = make;
         this.model = model;
         this.year = year;
       }
       
       var mycar = new Car("Eagle", "Talon TSi", 1993);
       ```

  3. `Object.create` 메서드 사용

     - 프로토타입 객체를 사용자가 직접 선택할 수 있기 때문에 유용하다. 

     - 객체 생성 시 생성자 함수가 없어도 가능하다.

       ```javascript
       // Animal properties and method encapsulation
       var Animal = {
         type: "Invertebrates", // Default value of properties
         displayType : function(){  // Method which will display type of Animal
           console.log(this.type);
         }
       }
       
       // Create new animal type called animal1
       var animal1 = Object.create(Animal);
       animal1.displayType(); // Output:Invertebrates
       
       // Create new animal type called Fishes
       var fish = Object.create(Animal);
       fish.type = "Fishes";
       fish.displayType(); // Output:Fishes
       ```

### 상속

- JavaScript 에서의 모든 객체들은 최소한 하나의 다른 객체로부터 상속을 받는다. 
- 상속을 제공하는 객체를 프로토타입이라고 부르며, 상속되는 속성들은 `prototype` 이라는 생성자 객체에서 찾을 수 있다.

### 객체 참조를 위한 `this` 사용

- 메서드 내부에서 `this` 키워드를 사용하게 되면 해당 메서드를 포함한 객체를 가리키게 된다.


## 객체 모델의 세부사항

>  JavaScript는 클래스 기반이 아닌 prototype에 기초한 객체 기반 언어다. 이러한 차이점으로 인해 객체들의 계층 구조의 생성과 속성 및 속성 값의 상속을 어떻게 구현해야하는지에 대한 부분이 덜 분명할 수 있다.

### 클래스 기반과 prototype 기반 객체 시스템의 비교

| 클래스 기반(자바)                                            | 원형 기반(자바스크립트)                                      |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| 클래스와 인스턴스는 별개다. (예: 클래스-직원, 인스턴스-현지) | 모든 객체는 다른 객체로부터 상속을 받는다.                   |
| 클래스 정의를 가지고 클래스를 생성하고 생성자 메서드로 인스턴스를 생성한다. | 생성자 함수를 가지고 객체군을 정의 및 생성한다.              |
| new 연산자로 하나의 객체(인스턴스)를 생성한다.               | new 연산자로 하나의 객체(인스턴스)를 생성한다.               |
| 이미 존재하는 클래스에 대한 하위 클래스를 정의함으로써 객체의 계층구조를 생성한다. | 하나의 객체를 생성자 함수와 결합된 프로토타입에 할당함으로써 객체의 계층구조를 생성한다. |
| 클래스의 상속 구조에 따라 속성을 상속 받는다.                | 프로토타입 체인에 따라  속성을 상속 받는다.                  |
| 클래스 정의는 모든 인스턴스의 모든 속성을 명시한다. 실행시에 동적으로 속성을 추가할 수 없다. | 생성자 함수 혹은 프로토타입은 초기 속성들을 명시한다. 개별 객체 혹은 전체 객체군에 동적으로 속성을 추가 삭제할 수 있다. |

- javascript

  ```javascript
  function Manager() {
    Employee.call(this);
    this.reports = [];
  }
  Manager.prototype = Object.create(Employee.prototype);
  
  function WorkerBee() {
    Employee.call(this);
    this.projects = [];
  }
  WorkerBee.prototype = Object.create(Employee.prototype);
  ```

- java

  ```java
  public class Manager extends Employee {
     public Employee[] reports = new Employee[0];
  }
  
  public class WorkerBee extends Employee {
     public String[] projects = new String[0];
  }
  ```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Details_of_the_Object_Model




## References

- [MDN - JavaScript 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [MDN - JavaScript 참고서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)
