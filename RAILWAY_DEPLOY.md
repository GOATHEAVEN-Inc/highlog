# Railway 백엔드 배포 가이드 (하이면접)

이 문서는 사용자가 백엔드 두 레포(`HighLog-Server`, `highlog-ai`)를 본인 계정으로 fork한 뒤
Railway에 배포할 때 필요한 모든 정보를 정리한 시트입니다.

---

## 0. 준비

| 항목 | 상태 |
|---|---|
| Vercel 프론트 | https://highlog-liard.vercel.app (이미 배포됨) |
| Railway 계정 | 본인 |
| Railway CLI | 설치됨 (`/opt/homebrew/bin/railway`) — `railway login` 한 번 필요 |
| GitHub fork | `<YOUR_GH>/HighLog-Server` + `<YOUR_GH>/highlog-ai` 필요 |

`<YOUR_GH>` = 본인 GitHub 사용자명 (예: `mhojune`)

---

## 1. Railway 프로젝트 + 서비스 구성 (4개)

```
Railway Project: hi-interview-prod
├── postgres (pgvector enabled)
├── redis
├── highlog-server (Spring, port → $PORT)
└── highlog-ai (FastAPI, port → $PORT)
```

`docker-compose.yml`의 `nginx / prometheus / grafana / loki / promtail / node-exporter`는 **모두 제외**.
그 대신 Spring·FastAPI를 각각 Railway에서 도메인 노출.

---

## 2. Postgres 설정 (pgvector 포함)

Railway "Database" 플러그인의 기본 Postgres는 pgvector 확장이 없습니다.
**Docker 이미지 기반 커스텀 서비스**로 띄워야 합니다.

Railway 대시보드 → New Service → "Empty Service" → Settings:

- **Image**: `pgvector/pgvector:pg16`
- **Public Networking**: OFF (internal only)
- **Variables**:
  ```
  POSTGRES_DB=highlog
  POSTGRES_USER=hilog
  POSTGRES_PASSWORD=<랜덤 길게>  # Variables → "Generate" 추천
  POSTGRES_INITDB_ARGS=--encoding=UTF8
  PGDATA=/var/lib/postgresql/data/pgdata
  ```
- **Volume**: `/var/lib/postgresql/data` 마운트 (영속화)

서비스가 뜨면 한 번 shell 열어 pgvector 확장 활성화:
```sql
docker exec ... psql -U hilog -d highlog -c "CREATE EXTENSION IF NOT EXISTS vector;"
```
(또는 ai-service의 `Base.metadata.create_all()` 첫 호출 전에 별도 init 스크립트로)

Railway 제공 internal hostname (예: `postgres.railway.internal`)을 다른 서비스가 사용.

---

## 3. Redis 설정

Railway "Database" → "Redis" 플러그인 → 자동 셋업.
연결정보는 `REDIS_URL` 환경변수로 자동 노출됨. 내부 hostname 예: `redis.railway.internal`.

---

## 4. Spring (HighLog-Server) 배포

### 4-1. fork 후 본인 레포에 코드 수정 1개 필요

`src/main/resources/application.yml` 첫 줄:
```yaml
server:
  port: ${PORT:8080}    # ← Railway $PORT 동적 할당 받음
```

이 한 줄 PR/commit 후 push.

### 4-2. Railway에 서비스 추가

New Service → "Deploy from GitHub repo" → 본인의 fork 선택.
Railway가 `Dockerfile` 자동 감지 (이미 있음). 빌드 ~3분.

### 4-3. 환경변수

| 키 | 값 |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://${{postgres.RAILWAY_PRIVATE_DOMAIN}}:5432/highlog` |
| `SPRING_DATASOURCE_USERNAME` | `hilog` (Postgres 설정값) |
| `SPRING_DATASOURCE_PASSWORD` | `${{postgres.POSTGRES_PASSWORD}}` (참조) |
| `REDIS_HOST` | `${{redis.RAILWAY_PRIVATE_DOMAIN}}` |
| `REDIS_SERVER_PORT` | `6379` |
| `JWT_SECRET` | 강한 랜덤 문자열 (예: `openssl rand -base64 64`) |
| `JWT_ACCESS_TOKEN_EXPIRATIONS` | `86400000` |
| `JWT_REFRESH_TOKEN_EXPIRATIONS` | `1209600000` |
| `MAIL_USERNAME` | `.env`의 값 |
| `MAIL_PASSWORD` | `.env`의 값 |
| `ADMIN_EMAIL` | `admin@highlog.com` |
| `ADMIN_PASSWORD` | `admin123` (배포 후 변경 권장) |
| `SPRING_CLOUD_AWS_CREDENTIALS_ACCESS_KEY` | `.env`의 `AWS_ACCESS_KEY_ID` |
| `SPRING_CLOUD_AWS_CREDENTIALS_SECRET_KEY` | `.env`의 `AWS_SECRET_ACCESS_KEY` |
| `SPRING_CLOUD_AWS_REGION_STATIC` | `ap-chuncheon-1` |
| `SPRING_CLOUD_AWS_S3_BUCKET` | `GoatHeavenBucket` |
| `S3_ENDPOINT` | `.env`의 값 |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `cors_allow_origins` | `https://highlog-liard.vercel.app,http://localhost:5173` |
| `cors_allow_credentials` | `true` |
| `cors_allow_headers` | `*` |
| `cors_expose_headers` | `*` |
| `cors_allow_methods` | `GET,POST,PUT,DELETE,OPTIONS,PATCH` |

도메인 생성: Settings → Domains → "Generate Domain" → `hi-server-xxxx.up.railway.app`.

---

## 5. FastAPI (highlog-ai) 배포

### 5-1. google-credentials.json 처리

Railway는 secret file 마운트 지원 안 함 → **base64 환경변수**로 전달 후 컨테이너에서 디코드.

Dockerfile 수정 또는 entrypoint 스크립트 (둘 중 선택):

**옵션 A** (간단, 기존 Dockerfile 끝부분에 추가):
```dockerfile
CMD ["sh", "-c", "echo \"$GOOGLE_CREDENTIALS_B64\" | base64 -d > /app/google-credentials.json && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
```

**옵션 B** (start.sh 분리, 기존 `start.sh` 활용 가능):
```sh
#!/bin/sh
echo "$GOOGLE_CREDENTIALS_B64" | base64 -d > /app/google-credentials.json
exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}"
```

Dockerfile 마지막을 `CMD ["./start.sh"]`로 교체.

Base64 인코딩:
```bash
base64 -i /Users/chh/Downloads/google-credentials\ \(1\).json | pbcopy
```

### 5-2. Railway 서비스 추가

본인 fork 레포에서 "Deploy from GitHub repo".

### 5-3. 환경변수

| 키 | 값 |
|---|---|
| `DATABASE_URL` | `postgresql+psycopg2://hilog:${{postgres.POSTGRES_PASSWORD}}@${{postgres.RAILWAY_PRIVATE_DOMAIN}}:5432/highlog` |
| `aws_access_key_id` | `.env` 값 |
| `aws_secret_access_key` | `.env` 값 |
| `aws_region` | `ap-chuncheon-1` |
| `aws_s3_bucket` | `GoatHeavenBucket` |
| `aws_s3_endpoint` | `.env` 값 |
| `google_api_key` | `.env`의 `GOOGLE_API_KEY` |
| `GOOGLE_API_KEY` | 같은 값 (Spring과 변수명 통일용) |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/app/google-credentials.json` |
| `GOOGLE_CREDENTIALS_B64` | base64 인코딩한 json 전체 |
| `AZURE_SPEECH_KEY` | 빈 문자열 (미사용) |
| `AZURE_SPEECH_REGION` | `koreacentral` |
| `AZURE_SPEECH_VOICE_NAME` | `ko-KR-InJoonNeural` |
| `AZURE_SPEECH_LANGUAGE` | `ko-KR` |
| `jwt_secret` | Spring과 **반드시 같은 값** |
| `jwt_algorithm` | `HS384` |
| `jwt_access_token_expire_minutes` | `60` |
| `cors_origins` | `["https://highlog-liard.vercel.app","http://localhost:5173"]` |
| `LANGCHAIN_TRACING_V2` | `false` |
| `DEBUG` | `false` (production) |

도메인 생성 → `hi-ai-xxxx.up.railway.app`.

---

## 6. 프론트 (Vercel) 환경변수 업데이트

지금 프론트는 **단일** `VITE_API_URL`을 쓰지만, 백엔드가 분리되면 두 base URL이 필요합니다.

### 6-1. 프론트 코드 수정 (이미 준비됨)

`src/api/client.ts`에서 path prefix에 따라 두 URL로 분기:

```ts
const SPRING_BASE = import.meta.env.VITE_SPRING_API_URL ?? "";
const AI_BASE = import.meta.env.VITE_AI_API_URL ?? "";

export function resolveBaseUrl(path: string): string {
  if (path.startsWith("/ai/")) return AI_BASE;
  // /api/* 및 기타는 Spring으로
  return SPRING_BASE;
}
```

→ 모든 `fetch(\`${BASE_URL}${path}\`)`을 `fetch(\`${resolveBaseUrl(path)}${path}\`)`로 교체.

### 6-2. Vercel Variables

Vercel Dashboard → highlog 프로젝트 → Settings → Environment Variables:

```
VITE_SPRING_API_URL = https://hi-server-xxxx.up.railway.app
VITE_AI_API_URL     = https://hi-ai-xxxx.up.railway.app
```

저장 후 **재배포 필요** (vercel CLI: `vercel deploy --prod --yes`).

---

## 7. 첫 부트스트랩 (배포 후 한 번 실행)

ai-service가 처음 뜨면서 자동으로 `Base.metadata.create_all()`을 호출해 테이블 8개를 만듭니다.
하지만 pgvector 확장은 별도로 활성화 필요:

```bash
# Railway의 postgres 서비스 shell에서
psql -U hilog -d highlog -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

그 다음 ai-service를 한 번 redeploy하면 `interview_data` 등 vector 컬럼 가진 테이블이 정상 생성됩니다.

또한 notices/faqs/qna_history 테이블은 ai-service의 모델에 포함되어 자동 생성.

**admin 계정 생성**: Spring 부팅 시 `ADMIN_EMAIL`/`ADMIN_PASSWORD`로 자동 생성.

---

## 8. 검증 체크리스트

- [ ] postgres 서비스 healthy + pgvector 활성화
- [ ] redis 서비스 healthy
- [ ] highlog-server 도메인이 `/actuator/health`로 200 응답
- [ ] highlog-ai 도메인이 `/health`로 200 응답
- [ ] highlog-server에 `POST /api/auth/login` (admin) → 200 + accessToken
- [ ] highlog-ai에 `POST /ai/qna/answer` 익명 호출 → 200
- [ ] Vercel 프론트 → 로그인 → 질문 분석 → 결과 카드 → /qna/storage에 기록
- [ ] 생기부 업로드 (PDF) → 벡터화 → 질문 생성 (5 카테고리)

---

## 트러블슈팅

| 증상 | 원인·조치 |
|---|---|
| Spring 빌드 실패 (jOOQ 관련) | `src/generated/`가 push되었는지 확인. 안 됐으면 `.gitignore` 확인 후 commit |
| postgres 컨테이너 즉시 crash | volume이 비어있고 PGDATA가 잘못된 경우. PGDATA=`/var/lib/postgresql/data/pgdata`로 다시 |
| ai-service `type "vector" does not exist` | pgvector CREATE EXTENSION 안 됨. shell 진입 후 실행 |
| CORS 에러 | `cors_allow_origins` (Spring) / `cors_origins` (FastAPI)에 Vercel 도메인 정확히 매칭 (http vs https, trailing slash 주의) |
| 502 from FastAPI | Gemini API key 또는 모델 fallback chain. 로그 `docker logs` 또는 Railway logs 확인 |
| Spring이 PORT를 못 들음 | application.yml의 `server.port: ${PORT:8080}` 수정 commit 안 됨 |
