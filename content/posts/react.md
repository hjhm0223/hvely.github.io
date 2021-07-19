---
template: SinglePost
title: React
status: Published
date: '2020-04-01'
featuredImage: >-
  https://1.bp.blogspot.com/-cNSt8XtzLYw/WE_-NzliWsI/AAAAAAAC5O4/YNuRc6DGl_sUgMTsM3SDp2jEeU63BbEnACLcB/s1600/logo-578x270.png
excerpt: >-
  
categories:
  - category: JavaScript
meta:
  description: test meta description
  title: test meta title
---

![react](https://1.bp.blogspot.com/-cNSt8XtzLYw/WE_-NzliWsI/AAAAAAAC5O4/YNuRc6DGl_sUgMTsM3SDp2jEeU63BbEnACLcB/s1600/logo-578x270.png)



*React*는 사용자 인터페이스(UI)를 구축하기 위한 선언적이고 효율적인 `JavaScript 라이브러리`.



## React

  사용자 인터페이스를 개발하기 위한 라이브러리이며, 컴포넌트에 기초한 간결하면서도 유연한 API를 제공한다. 컴포넌트는 리액트의 기본 단위이며 리액트 애플리케이션 내에서 폭넓게 활용된다. 리액트는 개발자가 작성한 프로그램과 실제 브라우저 DOM 사이에서 이 둘을 연결해주는 가상 DOM을 구현한다. 데이터 모델링, HTTP 호출, 스타일 조정 및 기타 프런트엔드 애플리케이션이 필요로 하는 여러 기능을 지원하지 않는다. 따라서 필요에 따라 다양한 코드, 모듈 혹은 도구들을 자유롭게 선택하여 사용할 수 있다.


- 컴포넌트

  구현하고자 하는 기능을 캡슐화하는 기본 단위. 데이터(속성 및 상태)를 다루며, 그 결과로 UI를 렌더링 한다.

- 리액트 라이브러리

  리액트 코어 라이브러리는 react-dom 및 react-native 라이브러리와 함께 동작하며, 컴포넌트의 명세 및 정의에 중점을 두고 있다. 핵심 라이브러리를 통해 브라우저나 다른 플랫폼이 UI를 렌더링할 때 사용할 컴포넌트의 트리를 구성하게 된다. React-dom 라이브러리는 UI를 렌더링할 수 있는 렌더러 중 하나를 구현한 라이브러리로 브라우저 환경 및 서버 측 렌더링 기능의 구현을 목적으로 하고 있다. React-native 라이브러리는 네이티브 플랫폼에서의 UI 렌더링을 위한 라이브러리로 iOS, 안드로이드 등 다른 플랫폼을 위한 리액트 애플리케이션을 개발할 때 활용한다.

- render() 메서드

  화면에 html view를 생성해주는 역할을 한다. 렌더링할 내용을 경량화한 React Element를 반환한다.



### 장점

1. JSX 문법
  - JavaScript 안에서 HTML문을 사용해서 view를 구성할 수 있게 해주는 JavaScript 문법.
  - React 구조를 보다 쉽게 작성할 수 있다.

2. Component 기반 라이브러리
  - 여러 부분을 분할해서 코드의 재사용성과 유지보수성을 증가시킨다.
  - 복잡한 UI를 구성할 수 있다.

3. Virtual DOM(Document Object Model)
  - 데이터가 변경될 때 컴포넌트를 효율적으로 업데이트하고 다시 렌더링 한다.
  - 변화가 일어나면 실제 브라우저의 DOM에 새롭게 넣는 것이 아니라 가상 DOM에 한번 렌더링을 하고, 기존의 DOM과 비교하여 정말 변화가 필요한 곳만 업데이트 한다. (https://www.youtube.com/watch?v=muc2ZF0QIO4)



- `JSX` 사용 예제
- `<div />` 구문은 빌드하는 시점에서 `React.createTelement('div')`로 변환된다.

```html
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
      <h1>Shopping List for {this.props.name}</h1>
      <ul>
      <li>Instagram</li>
      <li>WhatsApp</li>
      <li>Oculus</li>
      </ul>
      </div>
    );
  }
}
```

```js
return React.createElement('div', {className: 'shopping-list'},
React.createElement('h1', /* ... h1 children ... */),
React.createElement('ul', /* ... ul children ... */)
);
```



### 가상 DOM

  데이터가 변경될 때 변경 사항을 반영하기 위해 UI를 갱신하는 과정을 효과적이면서도 쉽게 처리할 수 있다. 굉장히 빠른 변경 탐지 알고리즘을 이용해 실제 DOM을 효과적으로 갱신한다. 가상 DOM은 뛰어난 성능을 발휘하지만, 그보다 더 중요한 것은 정적인 멘탈 모델을 제공한다는 점이다.


- 가상 DOM 동작 방식: 갱신과 변경 비교

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcLx0Fj%2FbtqzEC7eCe7%2FpOWQArZDNwHiQrvrdTDqdk%2Fimg.png)

  메모리에 가상 DOM을 생성하고 관리하며, 리액트 DOM과 같은 렌더러는 가상 DOM의 변경 사항을 브라우저 DOM에 반영한다. 변경 사항을 매우 똑똑하게 처리하며, 이 동작은 메모리의 DOM에서 발생한 변경 사항이 실제 DOM의 변경을 유발한다고 판단되는 경우에만 수행한다.



### Component

  기능을 단위별로 캡슐화하는 리액트의 기본 단위. 사용자가 보는 뷰는 이 컴포넌트들을 조합하여 만든다. 컴포넌트는 기본적으로 자바스크립트 함수 혹은 클래스로, 속성들을 입력으로 받아들이며 내부적으로 각자의 상태를 관리한다. 리액트는 특정 형식의 컴포넌트에 대해서는 생명주기 메서드를 제공하기 때문에 컴포넌트 관리 단계 중 필요한 곳에 임의의 기능을 추가할 수 있다.


- `리액트 요소`
  - 리액트 요소는 문자열을 이요해(div, a, p 등) DOM 요소를 생성한다.
  - props 객체를 이용해 리액트 요소를 설정할 수 있다. 이 속성은 DOM 요소들에 지정할 수 있는 특성과 유사하다.

  ```html
  <img src="aUrl"/>
  ```

  - 리액트 요소는 중첩할 수 있기 때문에 다른 리액트 요소를 한 요소의 자식 요소로 지정할 수 있다.
  - 리액트는 리액트 요소를 이용해 가상 DOM을 구성하며, React-dom 라이브러리는 가상 DOM을 이용해 브라우저 DOM을 갱신한다.
  - 리액트 요소는 리액트에서 컴포넌트를 구성하기 위한 기본 단위이다.

- 컴포넌트는 요소를 그룹화하는 방법이다. 컴포넌트는 기능, 마크업, 스타일 그리고 기타 UI에 필요한 다른 요소들을 하나로 묶어 그룹화한다. 컴포넌트는 UI를 여러 부분으로 나누는 경계처럼 동작하며, 다른 컴포넌트를 포함할 수도 있다. 컴포넌트는 독립적이면서도 재사용이 가능하기 때문에 필요한 기능을 독자적으로 구성할 수 있다.

- `React.Component` 클래스

  컴포넌트를 생성하는 클래스로 대부분 하나의 리액트 요소 또는 리액트 요소의 배열을 리턴하는 render 메서드를 정의한다.

- render() 메서드

  render 메서드는 반드시 단 하나의 리액트 요소를 리턴해야 한다.





1. Uncontrolled Component

- 상태를 직접 React에서 제어하지 않는 컴포넌트.

2. Controlled Component

- 예제

  ```html
  class JoinForm extends React.Component {
    state = {
    email: '',
    password: '',
  }

  render() {
    console.log('render')
    const { email, password } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
      <input type="email" placeholder="이메일" value={email} onChange={this.handleChangeEmail}/>
      <input type="password" placeholder="비밀번호" value={password} onChange={this.handleChangePassword}/>

      <button type="submit">가입하기</button>
      <button type="button" onClick={this.handleReset}>초기화</button>
      </form>
    );
  }

  handleChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value })
  }

  handleChangePassword = ({ target: { value } }) => {
    this.setState({ password: value })
  }

  handleSubmit = () => {
    console.log(this.state.email, this.state.password)
  }


  handleReset = () => {
    this.setState({
      email: '',
      password: '',
      })
    }
  }

  export default JoinForm
  ```


#### PureComponent

- 렌더링 Performance를 Optimize한 것으로, Props나 State를 얕은 비교해서 변경점이 없으면 render를 다시 실행하지 않는다.

- 사용 시 re-render에 주의해야 한다.(인라인 함수 사용, 렌더 메소드 내에서 객체를 새로 생성, children 사용 시 등)

- 예제

  ```html
  import React from 'react'

  class Input extends React.PureComponent {
    renderCount = 0;

    render() {
      const { type, placeholder, value, onChange } = this.props
      console.log(placeholder, 'Rendered', ++this.renderCount)

      return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    }
  }

  export default Input
  ```


#### Props

컴포넌트 내에서 변경이 불가능하고, 하위 컴포넌트에 상속이 가능하다.


#### State

하나의 컴포넌트가 가질 수 있는 `변경 가능한 데이터`로, 하위 컴포넌트에 상속이 가능하다. 컴포넌트를 렌더링할 때 새로운 데이터를 생성해야 하거나, 기존의 데이터를 참고해서 새로운 데이터르 만들어야 할 때 사용할 수 있다.


- State 예제
  - State 변수에 데이터를 담고, JSX에 변수를 넣을 때는 중괄호에 담아야 한다.

    ```html
    import React, { Component } from 'react';

    class App extends Component {
      state = {
        hello: 'hello app js!'
      };

      handleChange = () => {
        this.setState({
          hello: 'bye app js!'
        });
      };

      render() {
        return (
          <div className="App">
          <div>{this.state.hello}</div>
          <button onClick={this.handleChange}>click Me!</button>
          </div>
        );
      }
    }

    export default App;
    ```


### References

- tutorial  
https://ko.reactjs.org/tutorial/tutorial.html#making-an-interactive-component

- JSX, Props, State  
https://medium.com/wasd/%EA%B8%B0%EC%B4%88%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-react-part-5-77e997cf597

- Component / Pure Component  
https://hyunseob.github.io/2019/06/02/react-component-the-right-way/

- 개념  
React in Action, Mark Tielens Thomas, Jpub, 2017.

- 실습 코드  
https://codesandbox.io
