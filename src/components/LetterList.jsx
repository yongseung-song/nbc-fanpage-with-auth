import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Letter from './Letter';

const StLetterListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-top: 6px;
`;

const StEmptyListContainer = styled.div`
  background-color: #fff;
  padding: 12px;
  border: 1px solid #0008;
  border-radius: 12px;
  height: 160px;
  display: flex;
  justify-content: center;
  p {
    text-align: center;
  }
`;

function LetterList() {
  const letters = useSelector((state) => state.letters);
  const members = useSelector((state) => state.members);

  const letterEntries = Object.entries(letters.letters).reverse();
  const filterLetters = () => {
    return letterEntries.filter(
      (letter) => letter[1].writedTo === members.selectedMember
    );
  };

  return (
    <StLetterListContainer>
      <ul>
        {filterLetters().length ? (
          filterLetters().map((item) => {
            return <Letter key={item[0]} letter={item[1]} />;
          })
        ) : (
          <StEmptyListContainer>
            <p>{members.selectedMember}에게 남겨진 팬레터가 없습니다.</p>
          </StEmptyListContainer>
        )}
      </ul>
    </StLetterListContainer>
  );
}

export default LetterList;
