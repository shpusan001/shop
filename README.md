
# 질문과 답변
1. 테스트를 진행하시면서 개선되어야 할 점이 무엇이라고 생각하시나요?  
ㄴ 개선되야 할 점은 없어 보입니다. 문제가 모호하다고 생각도 했지만 오히려 자유롭다고 생각하고 문제를 해결 했습니다.   

2. 테스트를 진행하시면서 어떤 부분이 가장 까다로우셨나요?  
ㄴ Java가 주 개발언어 였습니다. 하루 아침에 다른 언어와 프레임워크를 사용했습니다. 타입스크립트, express, type orm은 모두 처음이었기 때문에 개발 환경 설정 부터 개발까지 까다롭지 않은게 없었습니다. 탄탄한 기본기로 인해서 러닝커브가 작았기 때문에 매우 빠른 속도로 학습하고 본 프로젝트에 적용했습니다. 구글링으로 대부분의 문제를 해결했는데, typeorm의 경우 구글링을 해도 자료가 부족해서 공식 document를 참고해서 코드를 작성했습니다.

3. 테스트 코드에서 가장 자신있는 부분은 어디인가요?  
ㄴ프로젝트 폴더의 구성이 전반적으로 깔끔한고 알아보기 쉽습니다. type orm을 적용해서 db에 와 통신할 때 db로 부터 받는 데이터를 객체로 바로 매핑시켜서 개발 효율성을 높게 했습니다. 전반적으로 모두 자신 있습니다.

# 실행 환경 구축
## DB서버 구축
1. 원하는 폴더에 docker-compose.yml 파일을 만들고 아래 코드를 작성합니다.

```
version: '3'
services:
  local-db:
    image: library/mysql:5.7
    container_name: local-db
    restart: always
    ports:
      - 13306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      TZ: Asia/Seoul
    volumes:
      - ./db/mysql/data:/var/lib/mysql
      - ./db/mysql/init:/docker-entrypoint-initdb.d
    platform: linux/x86_64
```

2. 아래 명령어를 실행합니다.

```
docker-compose up -d
```

3. 같은 폴더 내에 해당 파일을 압축을 풀어서 넣습니다.  
	[db 마운트 파일 다운로드 링크](https://drive.google.com/file/d/1FcT-dja6lN1MuxD0lW6GjLTJyWA8ZxME/view?usp=sharing)

4. 위 과정으로 만들어진 mysql 컨테이너는 실행 중이어야합니다.

## Node.js express 서버 구축
1. 해당 명령어 실행 후 해당 프로젝트 폴더로 들어갑니다.
```
git clone https://github.com/shpusan001/shop.git
```
2. 해당 명령어를 실행합니다.
```
npm install
npm start
```

# DB 스키마 설계
![image](https://user-images.githubusercontent.com/35298140/179865585-53b40804-7a3b-4454-b2b4-4e3954df9acb.png)
![image](https://user-images.githubusercontent.com/35298140/179865723-82e1d543-222e-4d4f-ad9b-b0824f4a087b.png)

# API 명세
![image](https://user-images.githubusercontent.com/35298140/179866885-50037d91-fa3a-411c-8d1b-3bccc9af2723.png)