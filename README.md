# Peppertones fan page with auth and profile

## Description

팬레터 페이지에 auth와 profile 기능을 추가한 팬레터 페이지 만들기의 레포지토리입니다.

### Features

- State management using Redux
- Asynchronous networking with server using redux thunk
- Write letters to the members of a band
- Perform CRD operations on each letter, currently working on Updating letters
- List of letters are fetched via json-server

### Dependencies

- `react`
- `react-router-dom`
- `redux`
- `react-redux`
- `reduxjs/toolkit`
- `json-server`
- `react-toastify`
- `styled-components`
- `styled-reset`
- `uuid`
- `dayjs`

### File tree

```
📦src
 ┣ 📂assets
 ┃ ┣ 📜avatar.jpg
 ┃ ┣ 📜bannerBg.png
 ┃ ┣ 📜bannerLogo.png
 ┃ ┣ 📜bgbottom.png
 ┃ ┗ 📜bgwall.png
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜InputDiv.jsx
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜Layout.jsx
 ┃ ┣ 📜Footer.jsx
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜Letter.jsx
 ┃ ┣ 📜LetterForm.jsx
 ┃ ┣ 📜LetterList.jsx
 ┃ ┣ 📜SignIn.jsx
 ┃ ┗ 📜SignUp.jsx
 ┣ 📂pages
 ┃ ┣ 📜Detail.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┣ 📜Login.jsx
 ┃ ┣ 📜NotFound.jsx
 ┃ ┗ 📜Profile.jsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.js
 ┃ ┗ 📂modules
 ┃ ┃ ┣ 📜authSlice.js
 ┃ ┃ ┣ 📜lettersSlice.js
 ┃ ┃ ┗ 📜membersSlice.js
 ┣ 📂shared
 ┃ ┣ 📜Router.jsx
 ┃ ┗ 📜data.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜GlobalStyle.jsx
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```

### Usage

1. `git clone` : clone repository
2. `npm install`, `yarn install` : install dependencies modules from `package.json`
3. `yarn start` : open page in development server(localHost)
