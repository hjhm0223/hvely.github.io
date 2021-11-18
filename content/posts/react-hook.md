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


# React Hooks

  - `React Hooks`는 React의 state machine에 연결하는 기본적인 방법이다.
  - class component, did mount, render 등을 하지 않아 간편하다.  
    - Hooks이 생기기 전 Class Component를 사용했을 때는 함수형 component에서 state를 사용할 수 없었다. 
    - Class Component 형태로 만들어야 state를 사용할 수 있었고, this와 같은 문장 규칙과 render와 같은 사용하는 방법을 고려해야 하지만 hooks를 사용하면 신경쓰지 않아도 된다. 
    - Hooks를 사용하면 return에 뿌려주고 그 위에 적어주기만 하면 된다.
  - Functional Component에서 state를 가질 수 있게 해준다. 
  - `Effect Hooks`: API에서 데이터 요청할 떄 주로 사용한다. 
  

## Class Component와 Hooks 비교
  - Class Component
    ```javascript
    import React from "react";
    import ReactDOM from "react-dom";

    class AppUgly extends React.Component {
      state = {
        item: 1
      };
      render() {
        const {item} = this.state;
        return (
          <div className="App">
            <h1>Hello {item}</h1>
            <button onClick={this.incrementItem}>Increment</button>
            <button onClick={this.decrementItem}>Decrement</button>
          </div>
        );
      }
      incrementItem = () => {
        this.setState(state => {
          return {
            item: state.item + 1
          };
        });
      };
      decrementItem = () => {
        this.setState(state => {
          return {
            item: state.item - 1
          };
        });
      };
    }

    const rootElement = document.getElementById("root");
    ReactDOM.render(<AppUgly />, rootElement); 
    ```

  - Hooks
    ```javascript
    import React, { useState } from "react";
    import ReactDOM from "react-dom";

    const App = () => {
      const [item, setItem] = useState(1);
      const incrementItem = () => setItem(item + 1);
      const decrementItem = () => setItem(item - 1);
      return (
        <div className="App">
          <h1>Hello {item}</h1>
          <button onClick={incrementItem}>Increment</button>
          <button onClick={decrementItem}>Decrement</button>
        </div>
      );
    };

    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
    ```


## Hooks 예제 

### `(1) useState`
  - `useState<S>(initialState: S | (() => S))`
    ```javascript
    import React, { useState } from "react";
    import ReactDOM from "react-dom";

    const useInput = (initialValue, validator) => {
      const [value, setValue] = useState(initialValue);
      const onChange = (event) => {
        const {
          target: { value }
        } = event;
        let willUpdate = true;
        if (typeof validator === "function") {
          willUpdate = validator(value);
        }
        if (willUpdate) {
          setValue(value);
        }
      };
      return { value, onChange };
    };

    const content = [
      {
        tab: "Section 1",
        content: "I'm the content of the Section 1"
      },
      {
        tab: "Section 2",
        content: "I'm the content of the Section 2"
      }
    ];

    const useTabs = (initialTab, allTabs) => {
      if (!allTabs || !Array.isArray(allTabs)) {
        return;
      }
      const [currentIndex, setCurrentIndex] = useState(initialTab);
      return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
      };
    };

    const App = () => {
      const maxLen = (value) => value.length <= 10;
      const isInclude = (value) => value.include("@");
      const name = useInput("Mr.", maxLen);
      const email = useInput("@", isInclude);
      const { currentItem, changeItem } = useTabs(0, content);
      return (
        <div className="App">
          <div>
            <h1>Hello</h1>
            <input placeholder="Name" {...name} />
            <input placeholder="Email" {...email} />
          </div>
          <div>
            {content.map((section, index) => (
              <button onClick={() => changeItem(index)}>{section.tab}</button>
            ))}
          </div>
          <div>{currentItem.content}</div>
        </div>
      );
    };

    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
    ```


### `(2) useEffect`
  - `componentWillUnmout`, `componentDidMount`, `componentWillUpdate`와 동일한 함수로 새로고침을 하면 실행된다.
  - `useEffect(effect: EffectCallback, deps?: DependencyList)`  
    페이지 로딩 시 callback함수가 실행되고, `DependenctList`를 지정하면 List가 변경될 때마다 callback함수가 실행된다.
    ```javascript
    import React, { useEffect, useState } from "react";
    import ReactDOM from "react-dom";

    const App = () => {
      const [number, setNumber] = useState(0);
      const [aNumber, setANumber] = useState(0);
      const sayHello = () => {
        console.log("Hello");
      };
      useEffect(sayHello, [number, aNumber]);

      return (
        <div className="App">
          <div>Hi</div>
          <button onClick={() => setNumber(number + 1)}>{number}</button>
          <button onClick={() => setANumber(aNumber - 1)}>{aNumber}</button>
        </div>
      );
    };

    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
    ```

  1. `useTitle`  
    - 브라우저 타이틀 변경
      ```javascript
      import React, { useEffect, useState } from "react";
      import ReactDOM from "react-dom";

      const useTitle = (initialTitle) => {
        const [title, setTitle] = useState(initialTitle);
        const updateTitle = () => {
          const htmlTitle = document.querySelector("title");
          htmlTitle.innerText = title;
        };
        useEffect(updateTitle, [title]);
        return setTitle;
      };

      const App = () => {
        const titleUpdater = useTitle("Loading ...");
        setTimeout(() => titleUpdater("Home"), 5000);
        return (
          <div className="App">
            <div>Hi</div>
          </div>
        );
      };

      const rootElement = document.getElementById("root");
      ReactDOM.render(<App />, rootElement);
      ```

  2. `useClick`  
    - `references`는 기본적으로 우리의 component의 어떤 부분을 선택할 수 있는 방법으로 `document.getElementById()`와 같다.  
    - useEffect는 `componentWillUnmount`일 때 return을 호출한다. component가 mount되기 전에 eventListener를 추가하는 것은 좋지 않다.  
    - useEffect 안에 callback function이 있으면 `componentDidMount`, `componentDidUpdate`일 때 발생하게 되는데, `dependency = []`이면 단 한번만 실행된다.  
    - 하지만 `dependency=[]`를 지정하지 않고 없애면 매번 update될 때마다 eventListener가 추가되는 오류가 발생한다.  
      ```javascript
      import React, { useEffect, useState, useRef } from "react";
      import ReactDOM from "react-dom";

      const useClick = (onClick) => {
        const element = useRef();
        useEffect(() => {
          if (element.current) {
            element.current.addEventListener("click", onClick);
          }
          return () => {
            if (element.current) {
              element.current.removeEventListener("click", onClick);
            }
          };
        }, []);
        return element;
      };
      const App = () => {
        const sayHello = () => {
          console.log("say hello");
        };
        const title = useClick(sayHello);
        return (
          <div className="App">
            <h2 ref={title}>Hi</h2>
          </div>
        );
      };

      const rootElement = document.getElementById("root");
      ReactDOM.render(<App />, rootElement);
      ```

  3. `useConfirm` & `usePreventLeave`  
  4. `useBeforeLeave`
  5. `useFadeIn` & `useNetwork`