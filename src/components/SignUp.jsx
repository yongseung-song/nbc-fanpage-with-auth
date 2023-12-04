import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { __signUp } from 'redux/modules/authSlice';
import styled from 'styled-components';

function SignUp({ setMode }) {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nicknameValue, setNickNameValue] = useState('');
  const [isValid, setIsValid] = useState('');
  const navigate = useNavigate();
  const { success, message, isError, isLoggedIn, error } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isLoggedIn) navigate('/');
  // }, [isLoggedIn]);
  const dispatch = useDispatch();
  // console.log(isLoggedIn);
  const onSignUpBtnClickHandler = (e) => {
    e.preventDefault();
    dispatch(
      __signUp({
        id: idValue,
        password: passwordValue,
        nickname: nicknameValue,
      })
    );
    setMode('signin');
  };

  const onGotoSignInBtnClickHandler = () => {
    setMode('signin');
  };

  const onInputChangeHandler = (e, mode) => {
    switch (mode) {
      case 'id':
        setIdValue(e.target.value);
        break;
      case 'password':
        setPasswordValue(e.target.value);
        break;
      case 'nickname':
        setNickNameValue(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <StFormContainer>
      <h1>회원가입</h1>
      <StForm action="">
        <StLabel htmlFor="id">아이디</StLabel>
        <StInput
          id="id"
          type="text"
          value={idValue}
          placeholder="4 ~ 10"
          onChange={(e) => onInputChangeHandler(e, 'id')}
        />
        <StLabel htmlFor="password">패스워드</StLabel>
        <StInput
          id="password"
          type="password"
          value={passwordValue}
          placeholder="4 ~ 15"
          onChange={(e) => onInputChangeHandler(e, 'password')}
        />
        <StLabel htmlFor="nickname">닉네임</StLabel>
        <StInput
          id="nickname"
          type="text"
          value={nicknameValue}
          placeholder="1 ~ 10"
          onChange={(e) => onInputChangeHandler(e, 'nickname')}
        />
        <button onClick={onSignUpBtnClickHandler}>회원가입</button>
      </StForm>
      <button onClick={onGotoSignInBtnClickHandler}>로그인</button>
      <ToastContainer />
    </StFormContainer>
  );
}

export default SignUp;

const StFormContainer = styled.div`
  max-width: 500px;
  width: 70%;
  height: 400px;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0px 4px 18px #0003;
  h1 {
    width: 100%;
    text-align: start;
  }
  form + button {
    color: #aaa;
    cursor: pointer;
  }
  form + button:hover {
    color: #000;
  }
`;

const StForm = styled.form`
  width: 100%;
  height: 80%;
  margin-bottom: 12px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  label {
    font-size: 0;
  }
  input {
    padding: 12px 8px;
    font-size: 1rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #0003;
  }
  input:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
  button {
    width: 100%;
    height: 60px;
    display: block;
    font-size: 1rem;
    border: 1px solid #0005;
    background-color: #eee;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
`;

const StLabel = styled.label`
  font-size: 0;
`;
const StInput = styled.input`
  padding: 12px 8px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #0003;
`;
const StSpan = styled.span`
  display: block;
  margin-top: 4px;
  text-align: end;
  font-size: 0.8rem;
  /* opacity: ${(props) => (props.$isValidated === true ? '0' : '1')};
  color: ${(props) => (props.$isValidated === true ? '#000' : '#f00')}; */
`;
