---
template: SinglePost
title: Redux & React-Redux
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


# Redux

Redux는 기본적으로 JavaScript Application들의 상태(state)를 관리하는 방법이다.

- [Redux 공식문서](https://redux.js.org/)
- Redux 설치
  ```cmd
  yarn add redux
  ```

## Pure Redux

### `createStore`와 `reducer`

- `store`는 data(state)를 넣을 수 있는 장소를 생성한다.
- `createStore`는 reducer를 필요로 하고, `reducer`는 state를 변경할 수 있는 `유일한 함수`다.
  - `dispatch`: reducer에 `action`이 담긴 메시지를 보내 state를 변경하도록 한다. action은 `type`을 가지는 Object여야 한다. 
  - `subscribe`: store 안에 있는 변화들을 알 수 있게 해준다.
  - `getState`
  - `replaceReducer`
- 예시 1. counter
  ```javascript
  import { createStore } from "redux";

  // vanilla js
  const add = document.getElementById("add");
  const minus = document.getElementById("minus");
  const number = document.querySelector("span");

  number.innerText = 0;

  const ADD = "ADD";
  const MINUS = "MINUS";

  // reducer
  const countModifier = (count = 0, action) => {
    console.log(count, action.type);

    switch (action.type) {
      case ADD:
        return count + 1;
      case MINUS:
        return count - 1;
      default:
        return count;
    }
  };

  // createStore
  const countStore = createStore(countModifier);

  // subscribe
  const onChange = () => {
    number.innerText = countStore.getState();
  }
  countStore.subscribe(onChange);

  // dispatch
  const handleAdd = () => {
    countStore.dispatch({ type: ADD })
  }
  const handleMinus = () => {
    countStore.dispatch({ type: MINUS })
  }
  add.addEventListener("click", handleAdd);
  minus.addEventListener("click", handleMinus));
  ```
- 예시 2. to do list
  ```javascript
  import { createStore } from "redux";

  // vanilla js
  const input = document.querySelector("input");
  const form = document.querySelector("form");
  const ul = document.querySelector("ul");

  const ADD_TODO = "ADD_TODO";
  const DELETE_TODO = "DELETE_TODO";

  const createAction = () => {
    
  }

  // reducer
  const reducer = (state = [], action) => {
    console.log(state, action);

    switch (action.type) {
      case ADD_TODO:
        return [ { text: action.text, id: Date.now() }, ...state ]; // mutate 방식(push)은 사용 불가. 새로운 array를 생성하여 return 해야 한다.
      case DELETE_TODO:
        return state.filter(toDo => toDo.id !== action.id);
      default:
        return state;
    }
  };

  // createStore
  const store = createStore(reducer);

  const addToDo = text => {
    store.dispatch({ type: ADD_TODO, text });
  };

  const deleteToDo = e => {
    const id = e.target.parentNode.id;
    store.dispatch({ type: DELETE_TODO, id });
  };

  // subscribe
  const paintToDos = () => {
    const toDos = store.getState();
    in.innerHTML = "";
    toDos.forEach(toDo => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.innerText = "DEL";
      btn.addEventListener("click", deleteToDo);
      li.id = toDo.id;
      li.innerText = toDo.text;
      li.appendChild(btn);
      ul.appendChild(li);
    });
  };
  store.subscribe(paintToDos);

  const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    addToDo(toDo);
  }

  form.addEventListener("submit", onSubmit);
  ```

## React Redux

- React-Redux 설치
  ```cmd
  yarn add react-redux react-router-dom
  ```



















[Redux Tooltips](https://redux-toolkit.js.org/tutorials/overview)