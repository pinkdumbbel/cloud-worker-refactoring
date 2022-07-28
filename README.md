# 🎬 프리온보딩 4차 과제 - Admin 개발

1. [프로젝트 소개](#1-프로젝트-소개)
2. [구현 기능](#2-구현-기능)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [역할](#4-역할)
5. [프로젝트 제작 과정](#5-프로젝트-제작-과정)
6. [프로젝트 설치 및 실행](#6-프로젝트-설치-및-실행)

<br/>

[🌍 배포 링크](https://github.com/wanted-running-sheep/cloud-worker)

<!-- 배포 후 수정 -->

<br />

## 1. 프로젝트 소개

- 개요: 원티드 프리온보딩 5기 4주차 팀 과제
- 주제: Cloud Worker - Apply, Admin 페이지 개발
- 기간: 2022.07.21 ~ 2022.07.27

<br />

## 2. 구현 기능

### 🔥 과제 요구 기능

**Apply) 정보 입력**

- [x] `이름 input` 한글만 직접 입력
- [x] `성별 radio` 복수 선택 불가
- [x] `생년월일 input` 숫자만 입력. YYYY.MM.DD 형식
- [x] `거주지역 modal` 클릭 시 > 거주지역 선택
  - [x] `X button` 클릭 시 > 정보 입력 창으로, 거주지역 정보 입력 안 됨.
  - [x] `시/도, 시/구/군` 스크롤 선택
  - [x] `확인 button` 거주지역 정보 입력됨.
- [x] `연락처 input` "-" 없이 숫자만 입력, 11자리 숫자
- [x] `이메일 input` "@", ".com" 필수로 포함
- [x] `교통수단 checkbox` 중복 선택 가능 항목
- [x] `이용약관 모두 동의 checkbox` 클릭 시 > 개인정보, 제3자 모두 체크 표시
- [x] `개인정보 처리 방침, 제3자 정보제공 동의 checkbox` 클릭 시 > 체크 표시
- [x] `개인정보 처리 방침, 제3자 정보제공 동의 우측 button` 클릭 시 > 각각 안내문으로 이동
  - [x] `뒤로 가기 button` 정보 입력 페이지로 돌아가기
- [x] `지원하기 submit` 사용자의 입력 데이터를 저장해서 `Admin`에서 열람할 수 있도록
  - [x] 지원 완료 후 랜딩 페이지로 이동

**Admin) 지원 현황**

- [x] `페이지 제목 h1` AI 학습용 교통 데이터 수집을 위한 크라우드 워커 지원 현황
- [x] `검색 기능 searchBar` 검색 필터: 지원날짜, 지원자명, 성별, 생년월일, 이용수단, 거주지
- [x] `1차, 2차모집 tab` 클릭 시 > 탭 이동. \*모집 회차 만큼 탭이 늘어날 수 있음.
- [x] `엑셀 다운로드 button` 클릭 시 > 현재 보고 있는 탭 CSV 다운로드
- [x] `당첨여부 checkBox` 클릭 시 > "v"표시. \*사용자가 직접 입력

<br />

## 3. 프로젝트 구조

```
📁 server
├── database
│   ├── db.json
│   └── region.json
├── index.js
└── writeDB.js
📁 src
├── @types
├── api
│   ├── http
│   ├── instance
│   └── models
├── assets/icons
├── components
│   ├── RegionModal
│   │   ├── RegionContentBox
│   │   └── TouchScroll
│   ├── UserList
│   │   ├── Pagination
│   │   ├── Tab
│   │   ├── Table
│   │   └── Tooltip
│   ├── AdminLayout
│   ├── Checkbox
│   ├── Content
│   ├── Input
│   ├── Label
│   ├── Loading
│   ├── Login
│   ├── MobileLayout
│   ├── Radio
│   ├── RoundButton
│   ├── SearchBar
│   ├── SelectBox
│   ├── Title
│   └── TransportationList
├── constants
│   ├── error
│   └── validation
├── hooks
│   ├── usePagination
│   ├── useSeearchUser
│   └── useToggleButton
├── pages
│   ├── AdminLoginPage
│   ├── AdminPage
│   ├── AgreementPage
│   ├── ApplyPage
│   └── LandingPage
├── routes
├── styles
│   ├── globalStyles
│   ├── media
│   ├── mixins
│   └── theme
├── utils
│   ├── excelDownload
│   └── formatString
│
├── App.tsx
└── index.tsx
```

<br />

## 4. 역할

| 성함                                     | 담당 역할                                                                                                                                                |
|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| [양아름](https://github.com/areumsheep)  | 지원하기 페이지 레이아웃, 로그인 페이지, 랜딩 페이지, Label, TransportationList, RoundButton, SearchBar 개발, Admin 페이지 구현, 이용약관                |
| [조현호](https://github.com/hajun2)      | Title, Content, Radio, Table 개발, Admin 페이지 구현, 이용약관 라우터                                                                                    |
| [최창열](https://github.com/pinkdumbbel) | json-server구축 및 api모듈 구현 및 호출, 유저 데이터 생성, Data fetching module 개발, Modal, TouchScroll, Pagination 컴포넌트 개발, 지원하기 페이지 구현 |
| [최중재](https://github.com/joong8812)   | 어드민 페이지 레이아웃, CSV 다운로드, Input, CheckBox 컴포넌트 개발, 지원하기 페이지 컴포넌트 병합                                                       |
<br />

## 5. 프로젝트 제작 과정

### [1] 컨벤션은 협의하여 아래와 같이 정의하였습니다 🥳

| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |
| ♻️ refactor | 코드 리팩토링                                    |
| 💩 chore    | 코드 수정 (JSON 데이터 포맷 변경 / scss 변경 등) |

자세한 내용은 [여기](https://github.com/wanted-running-sheep/cloud-worker/issues/1)에서 확인해주세요!

### [2] 각자 원하는 컴포넌트를 선택한 뒤 정해진 기한까지 작업한 뒤 병합하였습니다 🏃

- 화면에 필요한 기능을 기준으로 할 일을 나누고 각자 직접 원하는 기능을 선정하고 기한을 정함.
- 각자 코딩하는 과정에도 서로 작업중인 내용을 일정 관리 표, issue, PR을 통해 공유하며 진행함.

### [3] 지난 과제의 회고를 통해 돈독한 분위기를 다지고 부족한 부분을 충원하였습니다! 🔥
[저희의 회고가 궁금하시다면?🤔 여기를 클릭해보세요!](https://www.figma.com/file/LnRLpKYz2kyqVdnCQv7ATt/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%ED%9A%8C%EA%B3%A0?node-id=0%3A1)
![image](https://user-images.githubusercontent.com/48716298/181185326-45338f5c-cd0c-4196-988c-a10f35018348.png)


<br/>

## 6. 프로젝트 설치 및 실행

1. Git Clone

```command
$ git clone
```

2. 프로젝트 실행

```command
$ npm install
$ npm run dev
```
