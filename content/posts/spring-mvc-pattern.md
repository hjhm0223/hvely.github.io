---
template: SinglePost
title: Spring MVC Pattern
status: Published
date: '2020-04-07'
featuredImage: >-
  https://www.researchgate.net/profile/Jan-Wielemaker/publication/254852917/figure/fig3/AS:669454635630607@1536621831811/Model-View-Controller-MVC-design-pattern-Controllers-modify-UI-aspects-of-a-view.png
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---


MVC는 Design Pattern 중 하나이다.


## Design Pattern

- 디자인 패턴은 상황에 따라 자주 쓰이는 설계 방법을 정리한 `개발 방법론`이다.
- 보편적으로 적용해볼 수 있는 해결책을 정의해 놓은 것


### MVC Pattern

- MVC (`Model` `View` `Controller`)
- application/service 등을 구현할 때 해당 시스템을 3가지로 구분한 방법론

![mvc pattern image](https://www.researchgate.net/profile/Jan-Wielemaker/publication/254852917/figure/fig3/AS:669454635630607@1536621831811/Model-View-Controller-MVC-design-pattern-Controllers-modify-UI-aspects-of-a-view.png)


#### 1. Model

- application의 `데이터`를 나타낸다.
- database application 단에서 맨 처음 정의되는 여러 변수, 상수 등 혹은 이러한 데이터들을 다루기 위한 여러 쿼리를 비롯한 기능들도 포함될 수 있다.
- `MVC Model 규칙`: 사용자는 최종적으로 오직 Model을 통해서만 데이터에 접근한다. 나머지 View, Controller단에서 내부 속성값을 가지면 안된다. 따라서 다른 컴포넌트가 모델의 데이터를 변경하고 싶을 때 다른 컴포넌트 간의 통신 수단을 구현해야 한다.

#### 2. View

- 사용자에게 application의 `UI` 등을 통해 화면에 보여주기 위한 역할을 맡고 있다.
- web의 경우 html, css, js 등이 될 수 있다.
- View는 사용자에게 화면을 보여주는 역할 외에 타 역할에 절대 관여하지 않는다.

#### 3. Controller

- Model과 View의 중간 다리 역할을 수행한다.
- 사용자가 View에서 제공된 화면에서 입력을 비롯한 "이벤트"에 대하여 기능을 수행할 때 그것을 Controller가 받아서 수행한다.
- Model과 View는 Controller를 통해 `상호작용`하므로 application의 핵심 로직이다.


### MVC 작동방식

1. User가 View를 통해 소통
2. Controller가 Model에게 `Status를 변경`하라고 요청
3. Model의 Status가 변경되면 `View에게 알림`
4. View에서 Model에게 Status에 대한 `data 요청`

#### 필요성
- 구조화되어 코드가 나눠져 있어 `유지보수가 용이`하다.
- Model에 데이터가 체계적으로 관리되어 중복된 변수 사용 없이 이미 존재하는 데이터를 참조할 수 있다.

#### 단점
- Model과 View의 의존성이 완전히 분리될 수 없기 때문에 설계 구조가 복잡해질 수 있다.

#### MVC Pattern의 예
- AngularJS
- CodeIgniter
- Python
- Django
- React


### Web MVC Framework

Spring MVC의 설정 방법만 익혀두면 `웹 개발`에 필요한 다양한 기능을 구현할 수 있다.


#### 1. Project 생성

- webapp은 html, css, js, jsp 등 `web application`을 구현하는데 필요한 코드가 위치
- WEB-INF에는 `web.xml` 파일이 위치 (servlet spec에 따르면 WEB-INF 폴더 하위에 lib와 classes 폴더와 jar, compile된 class 파일이 위치해야 하지만 maven이나 gradle의 경우 의존을 통해 필요한 jar 파일을 지정하므로 compile된 결과는 target 폴더나 build 폴더에 위치한다.)

  ```
  src/main/java
  src/main/webapp
  src/main/webapp/WEB-INF
  src/main/webapp/WEB_INF/view
  ```

- war(web application archive)의 기본값은 jar로서 servlet/JSP를 이용한 web application을 개발할 경우 사용된다.

  ```java
  // pom.xml
  <packaging>war</packaging>
  ```

- tomcat 설치 및 실행 환경 등록


#### 2. Spring MVC를 위한 설정

- Spring MVC의 주요 설정(`HandlerMApping`, `ViewResolver` 등)

1. Spring의 `DispatcherServlet` 설정

  ```java

  // MvcConfig.java

  ...

  @Configuration

  @EnableWebMvc

  public class MvcConfig implements WebMvcConfigurer {


  @Override

  public void configureDefaulServletHandling(

  DefaultServletHandlerConfigurer configurer) {

  configurer.enable();

  }


  @Override

  public void configureViewResolvers(ViewResolverRegistry registry) {

  registry.jsp("/WEB_INF/view/", ".jsp");

  }

  }

  ```

- @EnableWebMvc: Spring MVC 설정을 `활성화`한다. Spring MVC를 사용하는데 필요한 다양한 설정을 생성한다.

- configureDefaulServletHandling: `DispatcherServlet`의 mapping 경로를 '/'로 주었을 때, `JSP/HTML/CSS 등을 올바르게 처리`하기 위한 설정을 추가한다.

- configureViewResolvers: JSP를 이용해서 `Controller의 실행 결과`를 보여주기 위한 설정을 추가한다.



  @EnableWebMvc

- 내부적으로 다양한 빈 설정을 추가해준다.


  configureDefaultServletHandlig(), configureViewResolvers()

- WebMvcConfigurer interface에 정의된 method로 각각 default servlet과 ViewResolver과 관련된 설정을 조정한다.


2. web.xml 파일에 DispatcherServlet 설정

Spring MVC가 웹 요청을 처리하려면 DispatcherServlet을 통해서 웹 요청을 받아야 한다. 이를 위해 web.xml에 DispatcherServlet을 등록한다.


```java

// src/main/webapp/WEB-INF/web.xml

...

<servlet>

<servlet-name>dispatcher</servlet-name>

<servlet-class>

org.springframework.web.servlet.DispatcherServlet

</servlet-class>

<init-param>

<param-name>contextClass</param-name>

<param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>

</init-param>
```
