---
template: SinglePost
title: OOP
status: Published
date: '2020-04-01'
featuredImage: >-
  https://media.vlpt.us/images/gyu716625/post/bf9c30e2-6402-4415-8aeb-31d84f5b059b/image.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

## 객체 지향 프로그래밍(OOP, Object Oriented Programming)이란?

- `객체 지향 프로그래밍`은 객체의 관점에서 프로그래밍 하는 것이다. 

- 컴퓨터 프로그래밍의 패러다임 중 하나이며, 관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인이다. 

- 객체 지향 프로그래밍은 컴퓨터 프로그램을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 `객체`들의 모임으로 파악하고자 하는 것이다. 

- 각각의 객체는 메시지를 주고받고, 데이터를 처리할 수 있다.

- 객체지향 프로그래밍은 보다 유연하고 유지보수하기 쉬우며 확장성 측면에서서도 유리한 프로그래밍을 하도록 의도되었고, 대규모 소프트웨어 개발에 널리 사용되고 있다.



### 장점

- 프로그램을 유연하고 변경이 용이하게 만든다.
- 프로그램의 개발과 보수를 간편하게 한다.
- 직관적인 코드 분석을 가능하게 한다.

  > 중요한 특성은 강한 응집력과 약한 결합력을 지향한다. 하나의 문제 해결을 위해 데이터를 모아 놓은 객체를 활용한 프로그래밍을 지향하므로 응집력을 강화하며, 클래스 간에 독립적으로 디자인함으로써 결합력을 약하게 할 수 있다.



### OOP의 기본 구성 요소

- `클래스(Class)`
  - 같은 종류의 집단에 속하는 속성과 행위를 정의한 것. 가장 추상적.
  - `다른 클래스와 독립적`으로 디자인해야 한다.

- `객체(Object)`
  - 클래스의 인스턴스. 상위 클래스의 속성을 가지고 있으면서 `개별적인 특성과 행위` 또한 가지고 있다.
    > 인스턴스화: 클래스를 원형으로 파생하는 것.
  - 하나의 원본(클래스)에서 파생 되어도 서로 구분 가능하다.

- `메서드(Method)`
  - 클래스로부터 생성된 객체를 사용하는 방법. 객체의 속성을 조작하는 데 사용된다.



### OOP의 특성

#### 	1. 캡슐화

​		- 객체의 데이터를 외부에서 직접 접근하지 못하게 막고, `함수를 통해서만 조작이 가능`하게 하는 작업(은닉성)이다.

  ```java
  // 절차 지향
  let baseSalary = 30_000;
  let overtime = 10;
  let rate = 20;
  function getWage(baseSalary, overtime, rate){
    return baseSalary + (overtime * rate);
  }

  // 객체 지향
  let employee = {
    baseSalary :30_000,
    overtime: 10,
    rate: 20,
    getWage: function(){
      return this.baseSalary + (this.overtime * this.rate);
    }
  };
  employee.getWage();
  ```

#### 	2. 추상화

- 객체들이 가진 공통의 특성들을 파악하고, `불필요한 특성들을 제거`하는 과정이다.

- 객체들이 가진 동작들을 기준으로 이용자들이 동작만 쉽게 구동할 수 있도록 한다. 이런 추상화 과정을 통해 이용자들은 프로그래머가 만든 객체를 더 쉽게 사용할 수 있게 된다.

- 추상화를 할 때 주의할 점은 `속성 위주가 아닌 동작 위주로 정의하는 작업`을 하는 것이다. 객체의 동작에 연관되지 않는 속성들은 결국 불필요하기 때문에 불필요한 속성들을 걸러내기 위한 동작을 먼저 정의하고 동작에 필요한 속성들을 정리하는 것이 좋다.

- 프로그래머의 의도에 맞추어 가장 중요한 것들만 뽑아서 복잡한 모델을 보다 `단순한 모델로 변환하는 작업`이라고 말할 수 있겠다.

#### 	3. 재사용성/상속

- 가장 큰 특성 중 하나가 코드의 재사용성과 상속의 개념이다. 

- 같은 객체를 여러 개 만들어야 하는 경우, `한 번 작성된 코드를 활용하여 동일한 객체`를 만들 수 있다. 

- Javascript에서는 생성자 함수와 팩토리 함수를 통해 `재사용성을 유지`하면서 여러 객체를 생성할 수 있다.

#### 	4. 다형성

- 형태는 같으나 다른 기능을 하는 것이다. 

- 같은 이름의 속성을 유지함으로써 속성을 사용하기 위한 인터페이스를 유지하고, 메서드 이름을 낭비하지 않는 장점이 있다. 

- `오버라이딩`을 통해 속성을 재정의 할 수 있다.

- 여러 가지 객체 유형이 서로 다른 방식으로 작동하더라도 공통 인터페이스에서 지원하는 동일한 기능을 구현할 수 있다.

  > 상속과 차이: 부모 클래스로부터 자식 클래스를 만드는 경우, 부모의 기본 메서드를 상속 받았지만, 자식 클래스 각 특성에 맞게 기본 are() 메서드를 확장하여 사용할 때 다형성이라 한다.




## References

- OOP
  - MDN Web Docs  
  https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object-oriented_JS
  - 개념 및 특성, 상속  
  https://velog.io/@cyranocoding/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8DOOP-Object-Oriented-Programming-%EA%B0%9C%EB%85%90-%EB%B0%8F-%ED%99%9C%EC%9A%A9-%EC%A0%95%EB%A6%AC-igjyooyc6c
  - 개념 및 특성  
  https://victorydntmd.tistory.com/117, https://poiemaweb.com/js-object-oriented-programming
  - 상속  
  https://velog.io/@cyranocoding/JavaScript%EC%97%90%EC%84%9C%EC%9D%98-OOP-Inheritance%EC%99%80-Prototype-Chain%EA%B3%BC-Class-%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%EC%9D%B4%ED%95%B4-spjypizora