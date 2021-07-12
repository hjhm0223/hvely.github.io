---
template: SinglePost
title: Annotation
status: Published
date: '2020-04-07'
featuredImage: >-
  https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99D355445AFC05F23B
excerpt: >-
  
categories:
  - category: Spring
meta:
  description: test meta description
  title: test meta title
---

### 1. @Component

- Bean 생성을 위한 Annotation
- @ComponentScan을 통해 특정 패키지 안의 클래스들을 스캔하고, @Component Annotation이 있는 클래스에 대하여 Bean 인스턴스를 생성한다.

### 2. @Controller, @Service, @Repository

- @Component 구체화 -> @Controller, @Service, @Repository
- Bean으로 등록
- 해당 클래스가 Controller/Servie/Repository로 사용됨을 Spring Framework에 알린다.

### 3. @RequestMapping

- 모든 mapping 정보는 Spring에서 제공하는 HandlerMapping Class가 가지고 있다.

```java
@Controller
@RequestMapping("/home") // 1) Class Level
public class HomeController {
  /* an HTTP GET for /home */
  @RequestMapping(method = RequestMethod.GET) // 2) Handler Level
  public String getAllEmployees(Model model) {
    
  ...
  }

  /* an HTTP POST for /home/employees */
  @RequestMapping(value = "/employees", method = RequestMethod.POST)
  public String addEmployee(Employee employee) {

  ...
  }

}
```

## reference

- https://gmlwjd9405.github.io/2018/12/02/spring-annotation-types.html
