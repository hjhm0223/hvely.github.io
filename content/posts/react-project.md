---
template: SinglePost
title: React Project 개발기
status: Published
date: '2022-01-01'
featuredImage: >-
  https://1.bp.blogspot.com/-cNSt8XtzLYw/WE_-NzliWsI/AAAAAAAC5O4/YNuRc6DGl_sUgMTsM3SDp2jEeU63BbEnACLcB/s1600/logo-578x270.png
excerpt: >-
  
categories:
  - category: Project
meta:
  description: test meta description
  title: test meta title
---

![react](https://1.bp.blogspot.com/-cNSt8XtzLYw/WE_-NzliWsI/AAAAAAAC5O4/YNuRc6DGl_sUgMTsM3SDp2jEeU63BbEnACLcB/s1600/logo-578x270.png)



# React Project 시작하기

## 1. 프로젝트 생성 

`react-create-app`으로 프로젝트 생성

### npx
```cmd
npx create-react-app react-project-name
```

(npx comes with npm 5.2+ and higher, see instructions for older npm versions)

### npm
```cmd
npm init react-app react-project-name
```
npm init <initializer> is available in npm 6+

### Yarn
```cmd
yarn create react-app react-project-name
```
yarn create is available in Yarn 0.25+

### 프로젝트 초기화
1. 파일 제거
   - src/App.js
   - src/App.css
   - src/App.test.js
   - src/logo.svg
2. 프로젝트 구조 설계
   - 파일 구조
     1) 파일의 기능이나 라우터에 의한 분류
     2) 파일 유형에 의한 분류 
     3) 역할에 따른 컴포넌트 폴더 분류 ([아토민 디자인 패턴](https://bradfrost.com/blog/post/atomic-web-design/))
     - [이미지 경로 설정](https://velog.io/@rimo09/React-Create-react-app-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B2%BD%EB%A1%9C%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-4%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)
   - 컴포넌트 스타일
     - [Styled-components](https://styled-components.com/)
       - JS 파일 안에 CSS를 작성
     - SASS(Syntactically Awesome Style Sheets) / SCSS(Sassy CSS)
       - CSS pre-processor. 작업이 쉽고, 코드 재활용성 및 가독성을 높여 유지보수가 쉽다.
       - SCSS가 더 넓은 범용성과 CSS의 호환성 등의 장점으로 **SCSS를 사용하기를 권장**
   - 라우팅 처리
     - App.js 의 역할은 react-router-dom 을 사용하여 클라이언트 사이드의 url 라우팅을 해주는 역할. 나중에 서버 사이드 렌더링을 하게 된다면, BrowserRouter 가 아닌, StaticRouter 로 감싸서 사용하기도 함
     - Redux vs Context-API

## 2. 리액트 라우터 사용

### SPA(Single Page Application)

  SPA는 말 그대로 한 개의 페이지로 이루어진 어플리케이션. 하나의 HTML 페이지와 애플리케이션 실행에 필요한 JavaScript와 CSS 같은 모든 자산을 로드한다. 페이지 또는 후속 페이지의 상호작용은 서버로부터 새로운 페이지를 불러오지 않으므로 페이지가 다시 로드되지 않는다.

### 서버 사이드 렌더링

  UI를 서버에서 렌더링하는 것. 기본적으로 클라이언트 사이드 렌더링(UI를 브라우저에서 모두 처리)을 하고 있다.

#### 장점
  1. 구글, 네이버 등 검색 엔진이 우리가 만든 웹 어플리케이션의 페이지를 원할하게 수집  
    - 리액트로 만든 SPA는 자바스크립트가 실행되지 않는 환경에서는 페이지가 제대로 나타나지 않지만, 클라이언트 대신 서버에서 렌더링을 해주면 검색 엔진이 페이지의 내용을 제대로 수집해 갈 수 있다.
    - 구글 검색 엔진은 다른 검색 엔진과 달리 검색 엔진에서 자바스크립트를 실행하는 기능이 탑재되어 있으므로 제대로 페이지를 크롤링해 갈 때도 있지만, 모든 페이지에 대해 자바스크립트를 실행해주지 않는다. 따라서 웹 서비스의 검색 엔진 최적화를 위해서라면 서버 사이드 렌더링을 구현해주는 것이 좋다.
  2. 초기 렌더링 성능 개선  
    - 서버 사이드 렌더링이 구현되지 않은 웹 페이지에 사용자가 방문하면 자바스크립트가 로딩되고 실행될 때까지 사용자는 비어있는 페이지를 보며 대기해야 하고, API까지 호출해야 한다면 대기 시간이 더더욱 길어진다.
    - 서버 사이드 렌더링을 구현한 웹 페이지는 자바스크립트 파일 다운로드가 완료되지 않은 시점에서도 html 상에 사용자가 볼 콘텐츠가 있기 때문에 대기 시간이 최소화되고 사용자 경험도 향상된다.

#### 단점
  1. 원래 브라우저가 해야 할 일을 서버가 대신 처리하므로 서버 리소스가 사용된다.
  2. 수많은 사용자가 웹페이지에 동시 접속하면 서버 과부하가 발생할 수 있다.
  3. 사용자가 많은 서비스라면 캐싱과 로드 밸런싱을 통해 성능을 최적화 해주어야 한다.
  4. 프로젝트 구조가 더 복잡해질 수 있다.
  5. 데이터 미리 불러오기, 코드 스플리팅과의 호환 등 고려해야 할 사항이 많아 개발이 어려워질 수 있다.

#### 서버 사이드 렌더링과 code splitting 충돌

  서버 사이드 렌더링과 코드 스플리팅을 함께 적용하면 작업이 꽤 까다롭다. 별도의 호환 작업 없이 두 기술을 함께 적용하면, 다음과 같은 흐름으로 작동하면서 페이지에 깜빡임이 발생한다.

  1. 서버 사이드 렌더링된 결과물이 브라우저에 나타남
  2. 자바스크립트 파일 로딩 시작
  3. 자바스크립트가 실행되면서 아직 불러오지 않은 컴포넌트를 null로 렌더링함
  4. 페이지에서 코드 스플리팅된 컴포넌트들이 사라짐
  5. 코드 스플리팅된 컴포넌트들이 로딩된 이루 제대로 나타남
  
  이러한 이슈를 해결하려면 라우트 경로마다 코드 스플리팅된 파일 중에서 필요한 모든 파일을 브라우저에서 렌더링하기 전에 미리 불러와야 한다.
  `Loadable Components 라이브러리`에서 제공하는 기능을 써서 서버사이드 렌더링 후 필요한 파일의 경로를 추출하여 렌더링 결과에 스크립트/스타일 태그를 삽입해 주는 방법으로도 해결 가능하다.


## 이슈 해결
1. `react-scripts: command not found` 에러 `npm install`로 해결
2. 



## References
- [Create React App](https://create-react-app.dev/docs/getting-started)
- [CSS/SCSS/SASS](https://velog.io/@jch9537/CSS-SCSS-SASS)