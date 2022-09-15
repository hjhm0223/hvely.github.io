---
template: SinglePost
title: TDD SAMPLE PROJECT
status: Published
date: '2022-03-16'
featuredImage: >-
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

## TDD SAMPLE PROJECT

<hr>

### 1. `gradle` project 생성 후 JAVA 8 이상 선택

- Junit은 자동으로 dependency에 추가되어 있어 따로 설정 필요 X

>`maven` project의 경우 JAVA 선택 후 프로젝트 생성   
> File > Project Structure > Modules > dependencies > +클릭 > Library > From Maven > `org.junit.jupiter:junit-jupiter:5.5.0` 검색 후 다운로드

<br>

### 2. `src/test/java` 아래 테스트 코드 작성

- 테스트 코드 작성
   ```java
   public class HelloWorldTest {
      public static void main(String[] args) {
         System.out.println("Hello World");
      }
   
      @Test
      void HelloTest() {
        Assertions.assertEquals(1,1);
        Assertions.assertEquals(1,2, "error message");
        // expected와 actual이 다르면 테스트 시 실패 메시지 표시
      }
   }   
   ```
- 코드 옆에 초록생 재생버튼 클릭 후 RUN
    - `Test Results`에 성공/오류 결과 확인
- `import static org.junit.jupiter.api.Assertions.*`로 받아오면 `Assertions` 생략 가능
   
<br>

### 3. 자주 사용하는 메서드
- `AssertionTest.java` 참조

   | 메서드                                                                | 설명                                                                                  |
   |--------------------------------------------------------------------|---------------------------------------------------------------------|
   | assertEquals(expected, actual)                                     | 실제 값이 기대하는 값과 같은지 검사                                                           |
   | assertNotEquals(unexpected, actual)                                | 실제 값이 특정 값과 같지 않은지 검사                                                          |
   | assertSame(Object unexpected, Object actual)                       | 두 객체가 동일한 객체인지 검사                                                               |
   | assertNotSame(Object unexpected, Object actual)                    | 두 객체가 동일하지 않은 객체인지 검사                                                          |
   | assertTrue(boolean condition)                                      | 값이 true인지 검사                                                                       |
   | assertFalse(boolean condition)                                     | 값이 false인지 검사                                                                      |
   | assertNull(Object actual)                                          | 값이 null인지 검사                                                                       |
   | assertNotNull(Object actual)                                       | 값이 null이 아닌지 검사                                                                   |
   | fail()                                                             | 테스트를 실패 처리                                                                        |
   | assertThrows(Class<T> expected, Executable executable)             | executable을 실행한 결과로 지정한 타입의 예외가 발생하는지 검사                                   |
   | assertDoesNotThrows(Executable executable)                         | executable을 실행한 결과로 예외가 발생하지 않는지 검사                                          |
   | assertAll(Executable executable)                                   | executable을 지정한 모든 검증을 실행하고 실패한 것이 있는지 검사                                  |
   | assertTimeout(Duration timeout, Executable executable)             | executable을 지정한 검증을 지정된 시간 동안 실행하는지 검사, executable 루틴 실행이 완료될 때까지 대기   |
   | assertTimeoutPreemptively(Duration timeout, Executable executable) | executable을 지정한 검증을 지정된 시간 동안 실행하는지 검사, 지정된 시간을 초과하면 테스트 실패로 자동 종료  |


### 4. 라이프 사이클
- `LifeCycleTest.java` 참조

   | Annotation           | 내용                                                                              |
   |----------------------|----------------------------------------------------------------------------------|
   | @BeforeEach          | 각각 테스트 메서드가 실행되기 전에 실행되어야 하는 메서드 명시. @Test, @RepeatTest, @ParameterizedTest, @TestFactory가 붙은 테스트 메서드가 실행하기 전에 실행. JUnit4의 @Before와 같은 역할. 테스트하기 전에 필요한 MockUp 데이터를 미리 세팅해주기 위해 주로 사용 |
   | @BeforeAll           | @BeforeEach는 각 테스트 메서드마다 실행되지만, 이 Annotation은 테스트가 시작하기 전 딱 한번만 실행 |
   | @AfterEach           | @Test, @RepeatTest, @ParameterizedTest, @TestFactory가 붙은 테스트 메서드가 실행되고 난 후 실행. JUnit4의 @After Annotation과 같은 역할 |
   | @AfterAll            | 테스트가 완전히 끝난 후 딱 한번만 실행                                                    |

### 6. JUnit5 Annotation
- 테스트를 구성하고, 프레임워크를 상속하기 위해서 Annotation을 지원
- `junit-jupiter-api` 모듈 안의 `org.junit.jupiter.api` 패키지 안에 존재

  | Annotation              | 내용                                                                                                                                                      |
  |-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
  | @DisplayName            | 테스트 클래스나 테스트 메서드에 이름을 붙여줄 때 사용                                                                                                                 |
  | @DisplayNameGeneration  | 클래스에 해당 Annotation을 붙이면 @Test 메서드 이름에 언더바(_) 로 표시한 모든 부분은 공백으로 처리                                                                         |
  | @Nested                 | test 클래스 안에 Nested 테스트 클래스를 작성할 때 사용. static이 아닌 중첩 클래스, 즉 Inner 클래스여야만 한다. 테스트 인스턴스 라이플사이클이 per-class로 설정되어 있지 않다면 @BeforeAll, @AfterAll이 동작하지 않는다.(주의) |
  | @Tag                    | 테스트를 필터링 할 때 사용. 클래스 또는 메서드 레벨에 사용                                                                                                            |
  | @Disabled               | 테스트 클래스나, 메서드의 테스트를 비활성화. JUnit4의 @Ignore와 같다.                                                                                                |
  | @Timeout                | 주어진 시간 안에 테스트가 끝나지 않으면 실패                                                                                                                       |
  | @ExtendWith             | extension을 등록. 이 Annotation은 상속이 된다. (확장 팩)                                                                                                        |


### 7. 테스트 실행 조건
- JUnit Juptier에 있는 ExecutionCondition API는 개발자가 특정 조건에 따라 테스트를 실행할지 말지 결정한다.
- 여러 개의 ExecutionCondition이 등록되면 여러 개 조건 중 하나라도 비활성화 조건에 걸리면, 테스트를 비활성화한다.
- 테스트가 왜 비활성화 되었는지 알려주고 싶다면, 모든 어노테이션은 disabledReason 속성을 이용하면 된다.
- 예시
  1. OS 종류에 따라 테스트 실행하기
     - @EnabledOnOs, @DisabledOnOs 어너테이션 사용 
     - `ConditionalTest.java` 참조
  2. 자바 환경변수에 따라 실행하기
     - @EnabledOnJre, @DisabledOnJre, @EnabledForJreRange, @DisabledForJreRange 
     - `JreConditionalTest.java` 참조
  3. 시스템 속성 조건
     - @EnabledIfSystemProperty, @DisabledIfSystemProperty 
     - `SystemPropertyConditionalTest.java` 참조
  4. 환경변수조건
     - @EnabledIfEnvironmentVariable, @DisabledIfEnvironmentVariable 
     - `EnvironmentVariableConditionalTest.java` 참조
  5. 사용자 커스텀 조건
     - @EnabledIf, @DisabledIf 
     - `CustomConditionalTest.java` 참조

`build.gradle`의 dependency에 `testImplementation("org.junit.jupiter:junit-jupiter-params:5.8.2")` 추가