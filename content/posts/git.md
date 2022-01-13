---
template: SinglePost
title: Git 사용법
status: Published
date: '2020-04-01'
featuredImage: >-
  https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1200px-Git-logo.svg.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![git](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1200px-Git-logo.svg.png)


## 개요
- 기본적으로 브랜치를 **feature - develop - release - hotfix - master** 5단계로 나누어 코드를 관리
- 각 브랜치는 특정한 목적을 위해 만들어지며, 필요에 따라 생성 및 삭제될 수 있음
- 기존 git 저장소 내에서 git 확장 콜렉션 git flow 를 통해 일련의 단계를 자동으로 수행할 수 있음


### branch 종류

- Master branch(메인 배포)
  - 실제로 클라이언트에서 이용하는 최종 형태의 메인 브랜치

- Develop branch(메인 개발)
  - 현재 개발이 진행 중인 메인 브랜치. Master 브랜치와 마찬가지로 추가적으로 생성 또는 삭제되지 않는 브랜치

- Feature branch(추가 기능 개발)
  - 새로운 기능을 추가하기 위해 사용되는 브랜치로, 특정 기능의 개발이 필요할 때 Develop 브랜치에서 파생되며, 기능 개발이 완료되면 Develop 브랜치로 병합
  - 가장 많이 생성되었다 삭제되는 브랜치

- Release branch(배포 준비, 오류 확인)
  - 실제로 프로젝트를 배포하기 위한 브랜치.
  - 이 브랜치는 지금까지 개발한 기능들이 있는 Develop 브랜치에서 파생되어, 각종 오류 사항이나 문제들을 검토 및 수정하는 일종의 테스트 서버.
  - Realese되어야 할 내용에서 발생한 수정사항, 문서의 갱신 등의 작업 진행.
  - 수정이 완료되면 Release 브랜치는 Develop 브랜치와 Master 브랜치로 병합.

- Hotfix branch(긴급 오류 수정)
  - 배포된 Master 브랜치에서 예기치 못한 버그가 발생했을 때 급하게 Develop, Feature 브랜치를 거치지 않고 버그를 수정하는 단계.
  - 수정이 완료되면 Develop과 Master 브랜치로 병합.


### git flow
![git-flow_overall_graph](https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png)


### 예시

1. develop branch 생성
```
$ git checkout -b develop
$ git log --decorate --all --graph --oneline // graph 확인하기
```

2. 변경사항 추가 및 commit
```
$ git add *
$ git commit -am "develop update"
```

3. feature branch 생성, 변경 내용 추가 및 commit
```
$ git checkout -b feature-some
$ git log --decorate --all --graph --oneline
$ git add *
$ git commit -am "feature-some3"
```

4. feature 변경 내용 develop에 merge
```
$ git checkout develop
$ git merge feature-some
$ git log --decorate --all --graph --oneline
```

5. 변경 완료한 feature branch 삭제
```
$ git branch -d feature-some
```

6. release branch 생성, 내용 변경 및 commit
```
$ git checkout -b realease-1.0
$ git commit -am "release-1.0"
```

7. master branch에 merge 및 tag 추가
```
$ git checkout master
$ git merge realease-1.0
$ git tag -a 1.0 -m "first release" master
```

8. master branch 적용 내용 develop branch에 merge
```
$ git checkout develop
$ git merge realease-1.0
```

9. hotfix branch 생성, 변경 및 master와 develop branch에 merge
```
$ git checkout -b hotfix-some
$ git commit -am "hotfix-5"
$ git checkout master
$ git merge hotfix-some
$ git tag -a 1.1 -m "hotfix-some" master
$ git checkout develop
$ git merge hotfix-some
```

## commit rules
### 커밋 메시지 구조

```html
<type>(<scope>): <subject>			-- 헤더
<BLANK LINE>										-- 빈줄
<body>													-- 본문
<BLANK LINE>										-- 빈줄
<footer>												-- 바닥글
```



#### 커밋 메시지 구조 상세

##### ```<type>```

| 종류     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| 신규     | 새로운 기능에 대한 커밋                                      |
| 수정     | 버그 수정에 대한 커밋                                        |
| 빌드     | 빌드 관련 파일 수정에 대한 커밋                              |
| 기타     | 그 외 수정사항에 대한 커밋                                   |
| 설정     | CI (Code Integration) 설정 수정에 대한 커밋 (Docker, Jenkins 등) |
| 문서     | 문서 수정에 대한 커밋                                        |
| 스타일   | 코드 스타일 또는 포맷 등에 관한 커밋 (CSS, Image 등)         |
| 리팩토링 | 코드 리팩토링에 대한 커밋                                    |
| 테스트   | 테스트 코드 수정에 대한 커밋                                 |



##### ```<scope>``` 수정범위

- 단일 파일 수정 시 단일 파일만 기입
- 단일 패키지 내에서 수정 시 패키지 기입
- 여러 파일, 여러 패키지 수정 시 대표 파일 및 ... 표시로 표기 후 본문에 추가
  - 수정 (robot.map.js, ...)
  - 본문에 나머지 파일 추가



##### ```<subject>```

- 수정한 내용을 50글자 이내로 요약 작성



##### ```<body>```

- 본문으로 헤더에 표현하지 않은 상세한 내용 기입
- 본문의 각 행은 72자를 넘기지 않음
- How보다는 What & Why 를 위주로 작성



##### ```<footer>```

- ```close #1233``` 과 같이 특정 이슈 트래킹, 이슈 클로징 등의 사항 추가 (선택사항)



#### 예시

- 예시 1

  ```
  수정(map.api.js): 대시보드 화면 멀티맵 띄울 시 화면 틀어지는 사항 수정
  
  Before
  대시보드에서 멀티맵 (2개 이상) 띄울 시 화면 비율이 맞지 않는 현상
  
  After
  최대 4개까지 멀티맵 화면 비율 정상
  
  Issue #32 Closed.
  ```

- 예시 2

  ```
  신규(RobotService.java, ...): 신규 B 로봇사 수용을 위한 로봇서비스 파트 수정
  
  B 로봇사 수용을 위한 서비스 내 각종 비즈니스 로직 수정
  1. iot Makers API 연동 분기 적용
  2. B사 수용을 위해 변경된 rm_robot api 분기 적용
  3. B사 로봇 특수 동작을 위한 AAA 메서드 적용
  
  수정파일 목록
  AAAService.java
  BBBService.java
  CCCService.java
  DDD.js
  main.css
  
  (footer 생략)
  ```

### References

- https://beomseok95.tistory.com/328
- https://github.com/angular/nagular/commits/master