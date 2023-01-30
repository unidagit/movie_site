# NETFLIX clone site

## 배포 URL

- URL : https://movie-site-xw2k.vercel.app
- 계정
  - `ID`: unida593@naver.com
  - `PassWord`: 123456

<br>

## 프로젝트 소개

themoviedb.org 오픈 API를 사용하여 넷플릭스 사이트를 구현했습니다.
React-Query와 Typescript 사용법을 알고 익숙해지고 싶어 이 프로젝트를 시작하게 되었습니다.

<br>

## ⚒ 개발 환경

### [기술 스택]

- React
- Typescript
  - 타입기반의 안전한 프로그래밍을 위하여 적용했습니다.
- React-Query
  - 데이터 Fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등 전역상태관리를 위해 적용했습니다.
- Styled Component
  - UI 컴포넌트를 작성하기 위해 적용했습니다.

<br>

## ⚒ 과정 기록

노션에 과정을 기록하였습니다.
https://www.notion.so/94648fb5e750458baa9e3e87a2da3ede

<br>

## ⚒ 구현 내용

![Honeycam 2022-11-14 18-21-55](https://user-images.githubusercontent.com/102465469/201623761-df118502-7f04-44b1-bd6d-6f5008670015.gif)

- React-Query로 최신영화와 티비프로그램을 themoviedb.org에서 실시간으로 받아옵니다.

<br/>

![Honeycam 2022-11-14 18-32-59](https://user-images.githubusercontent.com/102465469/201642335-4615e49e-33c6-4712-ac2f-5f330109ed2c.gif)

- framer-motion으로 슬라이더를 구현하였습니다

<br/>

![Honeycam 2022-11-14 19-54-59](https://user-images.githubusercontent.com/102465469/201642824-51b7df78-436b-4c91-b484-7321c71d68d4.gif)

- 영화를 클릭하면 상세정보를 보여주는 모달창이 뜹니다. 모달 창 밖이나 x버튼을 누르면 창이 닫힙니다.

<br/>

![Honeycam 2022-11-14 19-56-49](https://user-images.githubusercontent.com/102465469/201644829-62581baf-529a-47e0-b45b-1b3d69f09146.gif)

- 검색창에 영화 or 티비 프로그램을 검색하면 결과를 가져옵니다.

<br>

## ⚒ 추가 구현 사항

- 로그인 구현 완료

<br>

## ⚒ 파일 구조

```
📦src
 ┣ 📂Components
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜MovieCard.tsx
 ┃ ┣ 📜MovieSlider.tsx
 ┃ ┣ 📜Modal
 ┃ ┗ 📜Navbar
 ┣ 📂Routes
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Search.tsx
 ┃ ┗ 📜Tv.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┣ 📜styled.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📜api.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx

```
