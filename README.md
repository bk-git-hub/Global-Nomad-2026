# Global Nomad 2026

사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다.

## 배포 링크
<a>https://global-nomad-2026.vercel.app/</a>

## 기술 스택

- **Framework**: Next.js 16.1.1
- **Library**: React 19.2.3
- **Authentication**: Auth.js (NextAuth v5)
- **Styling**: Tailwind CSS v4
- **Validation**: Zod
- **Components**: Shadcn UI(Radix UI), Lucide React

## 주요 기능

- **메인 페이지**: 키워드 검색, 배너 슬라이더, 카테고리별 활동 필터링 및 인기 활동 목록 제공
- **상세 페이지**: 활동 상세 정보 조회, 이미지 캐러셀, 사용자 리뷰 목록 및 평점 요약/page.tsx]
- **사용자 인증**: Next-auth 기반 Credentials 로그인 및 회원가입
- **데이터 검증**: Zod를 활용한 클라이언트 및 서버 측 입력값 검증

## 시작하기

### 패키지 설치
```bash
pnpm install
```
### 개발 서버 실행
```bash
pnpm dev
```

### 빌드 및 시작
```bash
pnpm build
pnpm start
```
