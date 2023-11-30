import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import InputDiv from './common/InputDiv';

function SignIn({ setMode }) {
  const onSignInBtnClickHandler = (e) => {
    e.preventDefault();
    toast.success('회원가입 완료', {
      position: toast.TYPE.SUCCESS,
    });
  };
  const onSignupBtnClickHandler = (e) => {
    setMode('signup');
  };
  return (
    <StSignInWrapper>
      <ToastContainer />
      <StFormContainer>
        <h1>로그인</h1>
        <StForm action="">
          <InputDiv
            id={'id'}
            text={'아이디'}
            minLetters={4}
            maxLetters={10}
            type={'text'}
          />
          <InputDiv
            id={'password'}
            text={'비밀번호'}
            minLetters={4}
            maxLetters={15}
            type={'password'}
          />
          <button onClick={onSignInBtnClickHandler}>로그인</button>
          {/* TODO 로그인 활성화 및 비활성화 방법 고안 */}
        </StForm>
        <button onClick={onSignupBtnClickHandler}>회원가입</button>
      </StFormContainer>
    </StSignInWrapper>
  );
}

export default SignIn;

const StSignInWrapper = styled.div`
  background-color: #e3e2ce;
  width: 100vw;
  height: 100vh;
  /* display: flex; */
  /* justify-content: start; */
  padding-top: 20vh;
  align-items: center;
`;

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
    display: flex;
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
  justify-content: space-between;
  gap: 12px;
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
  button {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: 1px solid #0005;
    background-color: #eee;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
`;