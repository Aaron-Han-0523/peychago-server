# .env 파일 설정
- JWT_SECRET_KEY
    - JWT 비밀키 값  
- JWT_MAXAGE
    - JWT 인증 지속시간(초)  
- salt
    - 비밀번호 salt값  
- stretching_num
    - 비밀번호 stretching값  
- cookie_secure
    - https여부  
- UPLOADFILES_ROOT
    - 업로드 경로(앱경로 기준)

## 예시
> JWT_SECRET_KEY=wewunvb34097bh%(%)9dm348n  
JWT_MAXAGE=14400  
salt=kkkwwwzz  
stretching_num=4848  
cookie_secure=0  
UPLOADFILES_ROOT=uploads  
<hr/>  

# 테스트 서버 운용
## 1. nginx
- 설치
    - [설치 참조 링크](http://nginx.org/en/linux_packages.html#instructions)

- 서비스 설정
    - '/etc/nginx/sites-avilable/임의의_파일명'을 생성
    - 파일 내용
```
server {  
    listen 80;  
    server_name 서버 IP or 도메인주소;  

    location / {  
        proxy_pass http://127.0.0.1:node포트번호/;  
    }  
}
```

- /etc/nginx/nginx.conf 파일에서 파일 업로드 크기 제한 해제  
(기본 값은 1MB이다.)  
```conf:nginx.conf  
http{   
    client_max_body_size 0;  
    ...  
}
```

- 파일 업로드에 60초이상 걸린다면 시간제한도 풀어줘야 한다.
```conf:nginx.conf  
http{   
    client_max_body_size 0;  
    client_body_timeout 7d;  
    ...  
}
```    

## 2. pm2
- 설치
    - ```npm i -g pm2``` 명령어를 사용하여 설치.

- 설정파일
    - ```pm2 init simple``` 명령어를 사용하여 ```ecosystem.config.js```파일 생성
```ecosystem.config.js
module.exports = {
  apps : [{
    name   : "app",
    script : "./bin/www",
          error_file:"./logs/err.log",  // 에러스택경로
          out_file:"./logs/app.log",    // 로그파일경로
        
        // 클러스터 모드로 작동
          exce_mode:"cluster",
          instances:0,
  }]
}
```
- 로그관리
    - ```pm2 install pm2-logrotate```명령어를 사용하여 설정파일 생성
    - 명령어를 사용하여 로그 관리 방법을 설정한다.
    - ex
        - ```pm2 set pm2-logrotate:설정키 값```
    - 설정키
        - ```rotateModule``` (default : true) - pm2모듈의 로그를 회전시킬지 여부
        - ```max_size``` (default : 10M) - 로그파일의 크기가 이 값을 넘을 경우 새로운 로그 파일 생성한다. (값에 단위를 넣을 수 있다.)
            - 설정값 예) 10G, 10M, 10K, ...
        - ```retain``` (default : 30) - 남겨둘 로그파일의 개수
        - ```compress``` (default : false) - gzip압축 여부
        - ```dateFormat``` (default : YYYY-MM-DD_HH-mm-ss) - 로그파일명에 쓰일 파일명 포맷
        - ```TZ``` (default : system time) - 로그파일을 저장할 때 사용할 timezone설정
        - ```workerInterval``` (default : 30) - 로그의 파일크기를 체크하는 시간간격(초)
        - ```rotateInterval``` (default : '0 0 * * *') - node-schedule을 통해 관리된다.
            - '초(0~59;생략가능) 분(0~59) 시(0~23) 일(1~31) 월(1~12) 주요일(0~7; 0 또는 7은 일요일)'
            - 기본값은 매 0시 0분마다 강제로 로테이션시킨다.
            - *은 모든 값을 얘기한다.
            - */n 을 통해 n값마다 로테이션되게 할 수 있다.
            - ex
                - ```pm2 set pm2-logrotate:rotateInterval '*/1 * * * *'``` 이 명령어를 사용하면 매 분마다 강제로 로테이션하게 된다.
        