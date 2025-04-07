# IoT 기기 관리 시스템

## 개요

이 프로젝트는 **NestJS, gRPC, RabbitMQ, MongoDB**를 사용하여 IoT 기기를 인증 및 관리하는 백엔드 시스템입니다.
두 개의 주요 서비스로 구성됩니다.

1. **IoT 기기 백엔드 서버**

   - gRPC를 통해 IoT 기기와 직접 통신
   - MongoDB에 기기 데이터를 저장
   - RabbitMQ 메시지를 받아 gRPC 요청 수행

2. **모니터링 백엔드 서버**
   - IoT 기기 정보를 조회 및 관리
   - RabbitMQ를 통해 IoT 기기 백엔드 서버와 통신

---

## 기술 스택

- **NestJS** - 백엔드 프레임워크
- **gRPC** - IoT 기기와의 통신
- **RabbitMQ** - 서비스 간 메시지 큐
- **MongoDB** - 기기 데이터 저장

---

## 실행 방법

### 1. 필수 서비스 실행 (RabbitMQ & MongoDB)

```bash
docker-compose up -d
```

### 2. IoT 기기 백엔드 실행

```bash
cd iot-device-backend
npm install
npm run start:dev
```

### 3. 모니터링 백엔드 실행

```bash
cd monitoring-backend
npm install
npm run start:dev
```

---

## 주요 기능

### IoT 기기 백엔드 (gRPC + RabbitMQ)

| 기능           | 설명                                         |
| -------------- | -------------------------------------------- |
| 기기 등록      | MongoDB에 IoT 기기 등록                      |
| 기기 인증      | gRPC를 통해 인증 요청 수행                   |
| 기기 상태 변경 | RabbitMQ 메시지 수신 후 gRPC 요청            |
| 기기 강제 중지 | RabbitMQ 메시지를 받아 gRPC로 기기 정지 요청 |

### 모니터링 백엔드 (HTTP + RabbitMQ)

| 기능               | 설명                                   |
| ------------------ | -------------------------------------- |
| 기기 목록 조회     | IoT 기기 백엔드에서 데이터 조회        |
| 기기 상태 업데이트 | RabbitMQ를 통해 IoT 기기 백엔드로 요청 |
| 기기 작동 중지     | RabbitMQ 메시지 전송 -> gRPC 요청 수행 |
| 강제 인증 설정     | 인증을 강제 승인하는 요청 수행         |

---

## 동작 흐름

1. **기기 백엔드가 MongoDB에서 기기 정보를 관리**
2. **모니터링 서버가 HTTP API를 통해 사용자 요청을 처리**
3. **RabbitMQ를 통해 IoT 기기 백엔드로 요청 전달**
4. **IoT 기기 백엔드가 gRPC를 통해 IoT 기기와 통신**

### 예제 흐름 (기기 정지)

```
[사용자 요청] → (HTTP) → [모니터링 서버]
 → (RabbitMQ 메시지) → [IoT 기기 백엔드]
 → (gRPC 요청) → [IoT 기기]
```

---
