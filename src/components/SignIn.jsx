import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { __getUser, __signIn } from 'redux/modules/authSlice';
import styled from 'styled-components';

function SignIn({ setMode }) {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      return;
      console.log('?n');
    }
    if (accessToken) {
      console.log('?g');
      dispatch(__getUser(JSON.parse(accessToken)));
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  const onInputChangeHandler = (e, mode) => {
    const value = e.target.value;
    switch (mode) {
      case 'id':
        setIdValue(value);
        setIsValidId(checkInputIsValid(value, 4, 10));
        break;
      case 'password':
        setPasswordValue(value);
        setIsValidPassword(checkInputIsValid(value, 4, 15));
        break;
      default:
        break;
    }
  };

  const checkInputIsValid = (value, min, max) => {
    return value.length >= min && value.length <= max ? true : false;
  };

  const onSignInBtnClickHandler = (e) => {
    e.preventDefault();
    dispatch(__signIn({ id: idValue, password: passwordValue }));
    // thunk 들어올 자리
  };

  const onGotoSignUpBtnClickHandler = (e) => {
    setMode('signup');
  };

  return (
    <>
      <StFormContainer>
        <h1>로그인</h1>
        <StForm action="">
          <label htmlFor="id">아이디</label>
          <input
            id="id"
            type="text"
            value={idValue}
            placeholder="4 ~ 10"
            onChange={(e) => onInputChangeHandler(e, 'id')}
          />
          <StSpan $isValid={isValidId}>
            아이디는 4~10글자 이내여야 합니다.
          </StSpan>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            type="password"
            value={passwordValue}
            placeholder="4 ~ 15"
            onChange={(e) => onInputChangeHandler(e, 'password')}
          />
          <StSpan $isValid={isValidPassword}>
            비밀번호는 4~15자 이내여야 합니다.
          </StSpan>
          <StSigninBtn
            disabled={!isValidId || !isValidPassword}
            $isValid={isValidId && isValidPassword}
            onClick={onSignInBtnClickHandler}
          >
            로그인
          </StSigninBtn>
          {/* TODO 로그인 활성화 및 비활성화 방법 고안 */}
        </StForm>
        <button onClick={onGotoSignUpBtnClickHandler}>회원가입</button>
        <ToastContainer />
      </StFormContainer>
    </>
  );
}

export default SignIn;

const StFormContainer = styled.div`
  max-width: 500px;
  width: 70%;
  height: 300px;
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
  gap: 4px;
  label {
    font-size: 0;
  }
  input {
    padding: 12px 8px;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #0003;
  }
  input:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const StSigninBtn = styled.button`
  width: 100%;
  height: 60px;
  display: block;
  font-size: 1rem;
  border: 1px solid #0003;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isValid ? '#ddd;' : '#eee')};
  }
  &:disabled {
    border: 1px solid #0001;
    color: #ddd;
    cursor: default;
  }
`;

const StSpan = styled.span`
  display: block;
  /* margin-top: 4px; */
  text-align: end;
  font-size: 0.8rem;
  opacity: ${(props) => (props.$isValid === true ? '0' : '1')};
  color: ${(props) => (props.$isValid === true ? '#000' : '#f30')};
`;
