# Peppertones fan page

## Description

내일배움캠프 React 트랙 개인과제인 팬페터 페이지 만들기의 레포지토리입니다.

### Features

- Write letters to the members of a band
- Perform CRUD operations on each letter
- List of letters is preserved on refresh

### Dependencies

- `dayjs`
- `react-router-dom`
- `redux`
- `react-redux`
- `styled-components`
- `uuid`

### File tree

```
📦src
┣ 📂assets
┣ 📂components
┃ ┣ 📜Footer.jsx
┃ ┣ 📜Header.jsx
┃ ┣ 📜Letter.jsx
┃ ┣ 📜LetterForm.jsx
┃ ┗ 📜LetterList.jsx
┣ 📂pages
┃ ┣ 📜Detail.jsx
┃ ┗ 📜Home.jsx
┣ 📂redux
┃ ┣ 📂config
┃ ┃ ┗ 📜configStore.js
┃ ┗ 📂modules
┃ ┃ ┣ 📜letters.js
┃ ┃ ┗ 📜member.js
┣ 📂shared
┃ ┣ 📜Router.jsx
┃ ┗ 📜data.js
┣ 📜App.css
┣ 📜App.js
┣ 📜App.test.js
┣ 📜GlobalStyle.jsx
┣ 📜index.css
┗ 📜index.js
```

### Usage

1. `git clone` : clone repository
2. `npm install`, `yarn install` : install dependencies modules from `package.json`
3. `yarn start` : open page in development server(localHost)
