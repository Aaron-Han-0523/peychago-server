# .env 파일 설정
- NODE_ENV
    - 서버 실행환경(개발환경 시 생략가능)
    - 개발환경 : development
    - 테스트환경 : test
    - 배포서버환경 : production
- JWT_SECRET_KEY
    - JWT 비밀키 값(임의의 문자열)  
- JWT_MAXAGE
    - JWT 인증 지속시간(분)  
- salt
    - 비밀번호 해싱 salt값(임의의 문자열)  
- stretching_num
    - 비밀번호 해싱 stretching값(임의의 수)  
- cookie_secure
    - 생략가능
    - https여부
    - https를 안 쓸 경우 이 항목을 아예 생략하는 것이 좋다.
    - 우분투의 경우 숫자로 문자열로 읽어드림....
- UPLOADFILES_ROOT
    - 업로드 경로(앱경로 기준)
- FILE_MAX_SIZE
    - 업로드 파일 크기 제한(MB)
- insttCode
    - 자동차 첨부형 API 제공기관 코드 (운영자 지침서 참고)
- svcCodeArr
    - 자동차 첨부형 API 서비스 코드 배열 (운영자 지침서 참고)
- TS_API_SECRET_KEY
    - 자동차 첨부형 API 암호화 키 (운영자 지침서 참고)

## 예시
> JWT_SECRET_KEY=wewunvb34097bh%(%)9dm348n  
JWT_MAXAGE=240  
salt=kkkwwwzz  
stretching_num=4848  
UPLOADFILES_ROOT=uploads  
FILE_MAX_SIZE=5  
insttCode=()  
svcCodeArr=  
TS_API_SECRET_KEY=  

<br/>

# config/config.json 생성  
- config 디렉토리를 생성한 후 config.json 파일을 예시와 같이 작성하여 생성해준다.  
## 예시
```json
{  
  "NODE_ENV값": {  
    "username": "YourUserId",  
    "password": "YourPassword",  
    "database": "DatabaseName",  
    "host": "127.0.0.1",  
    "dialect": "mysql"  
  }  
}
```
<hr/>

<br/>

# 웹서버 운용
## 1. nginx
- ### 설치
    - [설치 참조 링크](http://nginx.org/en/linux_packages.html#instructions)

<br/>

- ### 서비스 설정
    - ```'/etc/nginx/sites-avilable/임의의_파일명'```을 생성  
#### **파일 내용**
```
server {  
    listen 80;  
    server_name 서버 IP or 도메인주소;  

    location / {  
        proxy_pass http://127.0.0.1:node포트번호/;  
    }  
}
```

<br/>

- ## 환경설정
```'/etc/nginx/nginx.conf'``` 파일에서 파일 업로드 크기 제한 해제  
(기본 값은 1MB이다.)  
```conf:nginx.conf  
http{   
    client_max_body_size 0; // 이 부분 추가  
    ...  
}
```

파일 업로드에 60초이상 걸린다면 시간제한도 풀어줘야 한다.  

```conf:nginx.conf  
http{   
    client_max_body_size 0;  
    client_body_timeout 7d; // 이 부분 추가  
    ...  
}
```    

<br/>

## 2. pm2
- ### 설치
    - ```npm i -g pm2``` 명령어를 사용하여 설치.

<br/>

- ### 환경설정
    - ```pm2 init simple``` 명령어를 사용하여 ```ecosystem.config.js```파일 생성  
#### **ecosystem.config.js 파일 내용**
```
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
- ### 로그관리
    - ```pm2 install pm2-logrotate```명령어를 사용하여 설정파일 생성
    - 명령어를 사용하여 로그 관리 방법을 설정한다.
    - 로그관리 설정 명령어 형식
        - ```pm2 set pm2-logrotate:설정키 값```  

<br/>

- ### 설정키 종류
    - ```rotateModule``` (default : true) - pm2모듈의 로그를 회전시킬지 여부  
    - ```max_size``` (default : 10M) - 로그파일의 크기가 이 값을 넘을 경우 새로운 로그 파일 생성한다. (값에 단위를 넣을 수 있다.)  
        - 설정값 예) 10G, 10M, 10K, ...
    - ```retain``` (default : 30) - 남겨둘 로그파일의 개수
    - ```compress``` (default : false) - gzip압축 여부
    - ```dateFormat``` (default : YYYY-MM-DD_HH-mm-ss) - 로그파일명에 쓰일 파일명 포맷
    - ```TZ``` (default : system time) - 로그파일을 저장할 때 사용할 timezone설정
    - ```workerInterval``` (default : 30) - 로그의 파일크기를 체크하는 시간간격(초)
    - ```rotateInterval``` (default : '0 0 * * *') - node-schedule을 통해 관리된다.
        - '초(0-59;생략가능) 분(0-59) 시(0-23) 일(1-31) 월(1-12) 주요일(0-7; 0 또는 7은 일요일)'
        - 기본값은 매 0시 0분마다 강제로 로테이션시킨다.
        - *은 모든 값을 얘기한다.
        - */n 을 통해 n값마다 로테이션되게 할 수 있다.
        - ex
            - ```pm2 set pm2-logrotate:rotateInterval '*/1 * * * *'``` 이 명령어를 사용하면 매 분마다 강제로 로테이션하게 된다.
        