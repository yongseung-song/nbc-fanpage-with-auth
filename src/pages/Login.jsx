import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import { useState } from 'react';
import styled from 'styled-components';

function Login() {
  const [mode, setMode] = useState('signin');

  return (
    <StLoginWrapper>
      {mode === 'signin' ? (
        <SignIn setMode={setMode} />
      ) : (
        <SignUp setMode={setMode} />
      )}
    </StLoginWrapper>
  );
}
const StLoginWrapper = styled.div`
  background-color: #e3e2ce;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: start;
  padding-top: 20vh;
  align-items: center;
  flex-direction: column;
`;
export default Login;
