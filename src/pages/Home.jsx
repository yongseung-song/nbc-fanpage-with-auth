import LetterForm from 'components/LetterForm';
import LetterList from 'components/LetterList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { letterSet } from 'redux/modules/lettersSlice';
import styled from 'styled-components';
import bgBottom from '../assets/bgbottom.png';
import bgWall from '../assets/bgwall.png';

function Home() {
  const { letters } = useSelector((state) => state.letters);
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage의 "letters" 키에 데이터가 없을때
    if (!localStorage.getItem('letters')) {
      fetch('fakeData.json')
        .then((res) => res.json())
        .then((result) => dispatch(letterSet(result)));
      const stringifiedLetters = JSON.stringify(letters);
      localStorage.setItem('letters', stringifiedLetters);
      console.log(localStorage.getItem('letters'));
    } else {
      const storageData = JSON.parse(localStorage.getItem('letters'));
      dispatch(letterSet(storageData));
    }
  }, []);

  useEffect(() => {
    const stringifiedLetterMap = JSON.stringify(letters);
    localStorage.setItem('letters', stringifiedLetterMap);
  }, [letters]);

  return (
    <div>
      <StBGContainer>
        <StLetterContainer>
          <LetterForm />
          <LetterList />
        </StLetterContainer>
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
`;
const StLetterContainer = styled.div`
  height: calc(100vh - 332px);
  margin: 12px auto 0;
  min-width: 200px;
  width: 480px;
  padding-bottom: 28px;
`;
