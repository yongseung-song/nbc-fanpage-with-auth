import dayjs from 'dayjs';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import defaultAvatar from '../assets/avatar.jpg';

const StLetterContainer = styled.li`
  padding: 12px;
  border: 1px solid #0008;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const StImg = styled.img`
  background-color: #aaa;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  margin-right: 12px;
  border-radius: 100%;
`;

const StLetterContents = styled.div`
  width: 80%;
  padding: 8px 0 6px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StLetterDate = styled.p`
  font-size: 0.65rem;
  font-weight: 400;
  color: #888;
`;

const StLetterMsg = styled.p`
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 6px;
  padding: 4px 0;
`;

function Letter({ letter }) {
  const navigate = useNavigate();
  const letterRef = useRef();
  const letterClickHandler = () => {
    const id = letterRef.current.id;
    navigate(`details/${id}`);
  };

  return (
    <StLetterContainer
      ref={letterRef}
      id={letter?.id}
      onClick={letterClickHandler}
    >
      <StImg src={letter?.avatar || defaultAvatar} alt={letter?.nickname} />
      <StLetterContents>
        <div>
          <h3>{letter?.nickname}</h3>
          <StLetterDate>
            {`${dayjs(letter?.createdAt).format('YYYY년 MM월 DD일 h:mm')}`}
          </StLetterDate>
        </div>
        <StLetterMsg>{letter?.content}</StLetterMsg>
      </StLetterContents>
    </StLetterContainer>
  );
}

export default Letter;
