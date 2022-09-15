# Blog 만들기

[TOC]



## 스펙

- 운영체제: macOS
- 사용 프로그램: Homebrew
- nginx 버전: 



## 웹 서버

- 비교
  - Apache
    - 요청 당 스레드 또는 프로세스가 처리되는 구조
    - 모듈이 다양하고 안정성, 호환성이 높다
  - Nginx
    - Apache에 비해 기능은 적지만 경량화되어 빠르고 성능이 좋다
    - 프로그램의 흐름이 이벤트에 의해 결정되며 이벤트 핸들러를 통해 여러 개의 커넥션을 비동기 방식으로 처리한다
    - Apache에 비해 스레드를 많이 사용하지 않기 때문에 CPU 소모도가 상대적으로 낮다
    - 적은 수의 스레드로 효율적인 일처리가 가능하기 때문에 많은 접속자들이 와도 대응할 수 있다

### Nginx

- Nginx 프로세스

  - 하나의 master 프로세스와 여러 개의 worker 프로세스를 가진다
  - master 프로세스는 nginx의 성능을 측정하고 worker 프로세스를 관리한다
  - worker 프로세스는 요청을 처리하며, worker 프로세스 사이의 요청을 효율적으로 분배하기 위해 운영체제에 의존한다
  - worker 프로세스의 개수는 설정 파일에서 알 수 있는데 정의된 프로세스 개수와 사용 가능한 CPU 코어 숫자에 맞게 자동으로 조정된다

- 다운로드

  ```cmd
  brew install nginx
  # 버전 확인
  nginx -v
  # homebrew로 설치 시 root 권한이 없어 1024보다 작은 포트를 사용할 수 없다.
  # 설정 파일: /usr/local/etc/nginx/nginx.conf
  sudo vi /usr/local/etc/nginx/nginx.conf
  # 80 포트로 변경 (일부 서비스에서 인코딩, 서버 통신 오류가 발생할 수 있으므로 80번 포트 지정이 좋음)
  server {
  	listen 80;
  	server+name localhost;
  }
  ```

  - 



# References

- nginx

  http://blog.illunex.com/nginx-%EC%9B%B9%EC%84%9C%EB%B2%84-%EB%9D%84%EC%9B%8C%EB%B3%B4%EA%B8%B0/

- gatsby

  https://dyjh-blog.netlify.app/posts/2020-gatsby-blog

- 

