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

## JSX & PROPS
### JSX
### Protection with PropTypes
  - proptypes: type chkeck
  - docs: [proptypes](reactjs.org/docs/typechkecing-with-proptyes.html)

## STATE
### Class Component
  - example
    ```javascript
      import React from "react";
      
      class App extends React.Component {
        render() {
          return <h1>Im a class component</h1>;
        }
      }

      export default App;
    ```
  - state를 사용하기 위해 class component를 사용한다.   
    -> `react hook`을 사용하면 class component를 사용하지 않고 state를 쓸 수 있다.
  - React.Component의 render()를 사용한다.
  - `react는 자동으로 class component의 render method를 실행한다.`

### State
  - state example
    ```javascript
      import React from "react";
      
      class App extends React.Component {
        state = {
          count: 0
        };

        render() {
          return (
            <div>
              <h1>Im a class {this.state.count}</h1>
            </div>
          );
        }
      }

      export default App;
    ```
  - state or function을 사용할 때 `{this}`를 사용한다.
    ```javascript
      state = {
          count: 0
        };

        render() {
          const { count } = this.state; //ES6 활용 
          return (
            <div>
              <h1>Im a class {count}</h1>
            </div>
          );
        }
    ```
  - state를 바꾸기 위해서 `render()`를 refresh해야 한다.
  - `setState()`를 통해 `render()`를 refresh하지만 virtual DOM을 사용하기 때문에 변경된 부분만 적용된다.
    ```javascript
      add = () => {
        this.setState({ count: this.state.count + 1 });
      };

      minus = () => {
        this.setState(current => ({ count: current.count + 1 })); // 추천 방법
      };
    ```

### Component Life Cycle
  Component가 동작하는 방법으로 자동으로 실행된다. (순서는 Docs 참고)

  1. Mounting  
    - `constructor()`  
    - `render()`  
    - `componentDidMount()` 
  2. Updating
  3. Unmounting

## EXAMPLE - MOVIE APP
### Fetching  
  - axios  
    - 설치 후 사용
      ```javascript
        import React from "react";
        import axios from "axios";

        class App extends React.Component {
          state = {
            isLoading: true,
            movies: []
          }

          getMovies = async () => {
            const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
            // axios.get() 은 동작이 느리기 때문에 ansync/await (비동기 방식) 사용
            // movies의 data.data.movies 를 사용하기 위해 const movies 대신 const { data: { data: { movies }}}를 사용해서 필요한 데이터만 가져올 수 있다.
            this.setState({ movies: movies, isLoading: false });
          }

          componentDidMount() {
            this.getMovies();
            // render() 후 componentDidMount()가 실행되기 때문에 API를 자동으로 호출힌다. 
          }

          render() {
            const { isLoading } = this.state;
            return (
              <div>{ isLoading ? "Loading..." : "We are ready" }</div>
            );
          }
        }

      ```

### Styling
  - JSX에서는 `className`을 사용한다.

## DEPLOY
### Deploying to Github Pages
  1. `gh-pages` 설치
  2. package.json
    ```json
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "deploy": "gh-pages -d build",
        "predeploy": "npm run build"
      },
      
      //...

      "homepage": "https://{user_name}.github.io/{app_name}.../"
    ```

## ROUTER
### Router
  - react- router-dom 설치
  - React에서 url이 동작하는 방식  
    url을 비교해서 url이 포함되는 페이지를 모두 렌더링 한다. 따라서 `exact={true}`를 사용해줘야 한다.
  - example
    ```javascript
      import React from "react";
      import { HashRouter, Route } from "react-router-dom";
      import Home from "./routes/Home";
      import About from "./routes/About";

      function App() {
        return (
          <HashRouter>
            <Route path="/" exact={true} component={ Home }></Route>
            <Route path="/about" component={ About }> </Route>
          </HashRouter>
        );
      }

      export default App;
    ```
  
### Building the Navigation
  - react-router-dom 의 `Link`를 사용해서 페이지를 새로고침하지 않고 빠르게 불러올 수 있다.
  - `router 밖에서 Link를 쓸 수 없다.`
  - `BrowserRouter` or `HashRouter` 중 필요한 것을 사용해도 된다.

### Sharing Props Between Routes
  - `react-router`를 통해 props를 전달할 수 있다.
  - Link의 `to`를 사용해서 state를 보낼 수 있다.

### Redirecting
  - `history`를 사용해서 뒤로 가기를 할 수 있다.
  