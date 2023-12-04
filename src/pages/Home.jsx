import LetterForm from 'components/LetterForm';
import LetterList from 'components/LetterList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { __fetchLetters } from 'redux/modules/lettersSlice';
import styled from 'styled-components';
import bgBottom from '../assets/bgbottom.png';
import bgWall from '../assets/bgwall.png';

function Home() {
  const { letters } = useSelector((state) => state.letters);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__fetchLetters());
  }, []);

  // useEffect(() => {
  //   dispatch(__fetchLetters());
  // }, [letters]);

  return (
    <div>
      <StBGContainer>
        <StLetterContainer>
          <LetterForm />
          <LetterList />
        </StLetterContainer>
        <ToastContainer />
      </StBGContainer>
    </div>
  );
}

export default Home;
const StBGContainer = styled.div`
  background: url(${bgBottom}), url(${bgWall}), #e3e2ce;
  background-repeat: no-repeat, no-repeat;
  background-position: calc(50% + 300px) calc(100% + 20px),
    calc(50% - 335px) 50%;
  background-size: 400px auto, 300px auto, 100% auto;
  padding-top: 12px;
`;
const StLetterContainer = styled.div`
  height: calc(100vh - 332px);
  margin: 12px auto 0;
  min-width: 200px;
  width: 480px;
  padding-bottom: 28px;
  display: flex;
  flex-direction: column;
`;
