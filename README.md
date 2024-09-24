# Taxi App

## Taxi App 프로젝트 소개
- 유저는 출발지와 목적지를 입력하고, 유저의 배차 요청을 서버에 저장하며, 서버에서는 유저에게 택시를 배차해주는 기능이 포함

## 기능
- 핵심 기능
1. 지도 : 지도를 보여주고, 출발지, 도착지를 지정하는 용도
2. 콜 목록 : 내가 호출한 콜의 상태를 확인할 수 있는 페이지

- 다중 사용자 지원
1. 회원가입 : 사용자가 자신의 식별자(ID)를 등록하는 페이지
2. 로그인 : 사용자가 자신의 식별자를 사용할 수 있도록 인증하는 페이지

- 그 외 일반적인 앱이 가지고 있는 기능
1. 환경설정 : 로그아웃, 닉네임 설정 등의 기능이 나열된 페이지
2. 인트로 : 앱의 초기화 및 로그인 과정 스킵 여부를 결정하는 페이지

## Taxi App 화면 구성도
![diagram](https://github.com/user-attachments/assets/e790aed2-7b93-428d-b10f-37d4b3278948)

## 개발환경
1. 프로젝트 환경설정 설치 : `npx react-native init taxi` <br />
2. Stack Navigation을 사용하기 위한 라이브러리[클라이언트] : `npm i @react-navigation/native` <br />
3. Stack Navigation을 사용하기 위한 라이브러리[클라이언트] : `npm i @react-navigation/stack` <br />
4. 추가적인 라이브러리[클라이언트] : `npm i react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view` <br />
5. 탭 네비게이션을 화면 아래에 표시하기 위한 라이브러리[클라이언트] : `npm i @react-navigation/bottom-tabs` <br />
6. 아이콘 라이브러리[클라이언트] : `npm i react-native-vector-icons` <br />
7. 화면 크기의 퍼센테이지로 화면의 크기 위치를 결정할 수 있도록 도와주는 라이브러리[클라이언트] : `npm i react-native-responsive-screen` <br />
8. 로그인 상태 여부를 체크할 수 있는 저장 장소, 자동 로그인 구현 라이브러리[클라이언트] : `npm i @react-native-async-storage/async-storage` <br />
9. RestAPI, 즉 http를 이용해서 서버에 접속할 때 사용하는 라이브러리[클라이언트] : `npm i axios` <br />

## 공식문서들
1. AsyncStorage : `https://react-native-async-storage.github.io/async-storage/` <br />