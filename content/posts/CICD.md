---
template: SinglePost
title: CI/CD
status: Published
date: '2020-04-07'
featuredImage: >-
  https://blog.kakaocdn.net/dn/uoHsi/btqCX88hUI9/QYRT2aRll0K78yIs4a9IT0/img.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![CI/CD](https://blog.kakaocdn.net/dn/uoHsi/btqCX88hUI9/QYRT2aRll0K78yIs4a9IT0/img.png)


## DevOps

- DevOps: 운영과 개발을 함께 진행하여 서비스를 빠르게 제공할 수 있음. 프로젝트 진행상황을 파악, 코드 이력관리, 자동화 등을 통해 일의 효율을 높일 수 있음.
- DevOps 도구: Git, GitLab, Jenkins, Apache Maven 등


## CI/CD

- CI(Continuous Integration): 개발자를 위한 자동화 프로세스. 정기적인 빌드 및 테스트를 거쳐 코드를 병합.
- CD(Continuous Delivery/Deployment): repository에 자동으로 업로드되어 운영팀이 실시간으로 배포 가능. 배포 작업을 자동화하는 것.
- CI/CD 툴: Jenkins, Hudson 등



### Jenkins

Jenkins: 소프트웨어 개발 시 버전 충돌을 방지하도록 공유 저장소에 업로드하여 지속적인 통합 서비스를 제공하는 툴

  자동화된 빌드와 테스트 작업으로

  1. 프로젝트 표준 컴파일 환경에서의 컴파일 오류 검출
  2. 정적 코드 분석에 의한 코딩 규약 준수여부 체크
  3. 프로파일링 툴을 이용한 소스 변경에 따른 성능 변화 감시
  4. 결합 테스트 환경에 대한 배포작업

  을 지원한다.



### Nexus

Nexus: Maven repository manager로 기업에서 필요로 하는 내부 리포지토리 구성을 위한 도구

#### Nexus 사용효과

1. Proxy적용을 통한 빠른 라이브러리 다운로딩
  - Central 리포지토리에서 직접 다운로딩하는 방식보다 효과적임

2. 공개된 리포지토리에 올릴 수 없는 라이브러리의 효과적인 관리
  - 라이선스 문제로 공개 배포할 수 없는 라이브러리 사용
  - 3rd 파티에서 제공하는 라이브러리
  - 내부 프로젝트 산출물로 생성되는 라이브러리

3. 프로젝트 개발자간의 일관된 라이브러리 사용 관리
  - 프로젝트 내에서 사용되는 라이브러리 버전 관리

#### Nexus 특징

1. 직관적이고 뛰어난 사용성의 UI
2. 빠르고 쉬운 설치 - war 파일 형태의 배포 파일
3. artifact들에 대한 index 기능 및 효과적인 search 기능
4. m2eclipse와의 연동 기능
5. 웹 UI를 통한 artifact 등록 및 관리 기능


### SonarQube

SonarQube: 조직에서 개발된 코드의 지속적인 인스펙션을 통해 품질 목표를 달성할 수 있게 해주는 플랫폼.
  - 소스 코드 품질 현황을 가시화, 리스크 분석, 소스 코드에서 발생하는 문제를 해결



### Ansible

Ansible: 셸과 같은 기존의 비정형 스크립트를 자동화 관점에서 기능을 모듈화(정형화)하여 쉽게 기능을 구현할 수 있도록 지원하는 언어로서, Python + YAML(YAML Ain’t Markup Language) 포맷 기반으로 만들어진 자동화 언어

*YAML의 들여쓰기 고통을 피하기 위해서는 IntelliJ, Eclipse 등의 IDE(Integrated Development Environment)에 Ansible 관련 플러그인을 추가해서 사용하는 것을 추천
*이미 모듈화되어 있는 대부분의 기능을 사용하려고 할 때 입력 항목이 정의되어 있고 예제가 제공되기 때문에 큰 어려움 없이 사용 (Ansible galaxy 사이트)



### AWX

AWX: Ansible 언어를 운영하는 미들웨어. playbook을 관리하고 운영하는 데 필요한 여러 기능을 제공.
  - Ansible 코드를 기업에서 사용할 수 있도록 도와주는 환경(플랫폼)을 제공하는 개념
  - AWX가 제공하는 기능들은 개발된 Ansible 코드를 실행하기 위해 목록을 관리하거나, 계정을 등록하고, SCM 정보를 등록하여 마지막에는 작업을 실제로 수행하는 템플릿(template)을 생성하는 데 그 목적
  - 사용방법 및 참고: https://engineering.linecorp.com/ko/blog/ansible-awx-for-provisioning-1/



### NewDEAL

1. DevOps
  - 개발자(개발SR처리+서비스관점) <-> 운영자(서비스안정성+시스템관점)
  - DevOps CA(L)MS: Culture Automation Measurement Sharing Lean

2. DevOps tool chain
  - CI/CT/CD: Continuous Integration/Test/Delivery/Deploy

*개발서버, test서버, staging서버, 상용서버, product서버
flow: Code Commmit(gitlab)->Continuous Build(docker, jenkins)->Code Analysis->Continuous Testing(selenium, postman)->Delivery(사설/공용 repository, nexus)->Deploy(kubernetes, docker, jenkins, ansible)
*flow 관리: jenkins travis CI
*work flow JIRA 툴 많이 씀

3. NewDEAL(New DevOps Adventure Lab)

- 개념: CaaS(Container as a Service)+Core Module+Common Module
- 구성: Gitlab(소스관리)+docker(build)+SonarQube(정적코드분석)+Postman(api test)+nexus(delivery)+deploy(ansible)

*Jenkins(pipeline관리)
*Issue Tracking(Orchestra)


