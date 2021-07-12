---
template: SinglePost
title: Tomcat 사용법
status: Published
date: '2020-04-01'
featuredImage: >-
  https://media.vlpt.us/images/hyunjae-lee/post/086f54ec-4bad-4ce5-a474-fecf121a94f0/tomcat-cover.png
excerpt: >-
  
categories:
  - category: Study
meta:
  description: test meta description
  title: test meta title
---

![tomcat](https://media.vlpt.us/images/hyunjae-lee/post/086f54ec-4bad-4ce5-a474-fecf121a94f0/tomcat-cover.png)


"tomcat" 실행 (관리자 생성)
1. http://tomcat.apache.org binary tar.gz 파일 다운로드
2. tomcat 계정생성 (su 명령어 이용)
3. tomcat 계정의 홈에 "tomcat" 디렉토리 생성
sudo mkdir /home/tomcat
sudo chown tomcat:tomcat /home/tomcat
4. tomcat 디렉토리에 tomcat 설치
5. tomcat 기동
bin/startup.sh
6. 프로세스 확인 (http://localhost:8080)
ps -ef | grep tomcat
7. 프로세스 죽이기
kill -9 process이름
8. conf/server.xml 파일의 "8080"->"8090" 변경
9. tomcat 기동
10. 정상동작 확인 (http://hocalhost:8090)
*관리자 확인하기 : id