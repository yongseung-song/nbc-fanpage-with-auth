import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Letter from './Letter';

function LetterList() {
  const { letters } = useSelector((state) => state.letters);
  const { selectedMember } = useSelector((state) => state.members);

  const filteredLettersInDescendingOrder = letters?.filter(
    (letter) => letter.writedTo === selectedMember
  );
  return (
    <StLetterListContainer>
      <ul>
        {filteredLettersInDescendingOrder.length ? (
          filteredLettersInDescendingOrder.map((letter) => {
            return <Letter key={letter.id} letter={letter} />;
          })
        ) : (
          <StEmptyListContainer>
            <p>{selectedMember}에게 남겨진 팬레터가 없습니다.</p>
          </StEmptyListContainer>
        )}
      </ul>
    </StLetterListContainer>
  );
}

export default LetterList;

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
