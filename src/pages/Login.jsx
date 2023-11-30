import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import { useState } from 'react';

function Login() {
  const [mode, setMode] = useState('signin');

  return (
    <>
      {mode === 'signin' ? (
        <SignIn setMode={setMode} />
      ) : (
        <SignUp setMode={setMode} />
      )}
    </>
  );
}

export default Login;
