import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  isEditMode,
  letterDeleted,
  letterEdited,
  letterSet,
} from 'redux/modules/lettersSlice';
import styled from 'styled-components';

const TEXTAREA_LENGTH_LIMIT = 100;

function Detail() {
  const [textareaValue, setTextareaValue] = useState('');
  const { letters, isEditing } = useSelector((state) => state.letters);
  const { userId, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('letters') || Object.keys(params).length === 0) {
      alert('올바르지 않은 접근입니다. 홈 페이지로 이동합니다.');
      navigate('/');
    } else {
      const storageData = JSON.parse(localStorage.getItem('letters'));
      dispatch(letterSet(storageData));
    }
    return () => {
      // 무슨 일이 생겨서 Home 으로 이동하면 isEditing
      dispatch(isEditMode(false));
    };
  }, []);

  useEffect(() => {
    const stringifiedLetterMap = JSON.stringify(letters);
    localStorage.setItem('letters', stringifiedLetterMap);
  }, [letters]);

  const selectedId = params.id;
  console.log(userId, nickname);
  const selectedLetter = {
    ...letters.find((letter) => letter.id === selectedId),
  };

  // console.log(selectedLetter);

  const textareaChangeHandler = (e) => {
    setTextareaValue(e.target.value);
  };

  const editBtnClickHandler = (e) => {
    dispatch(isEditMode(true));
    setTextareaValue(selectedLetter.content);
  };

  const editCompleteBtnClickHandler = (e) => {
    if (selectedLetter?.content === textareaValue) {
      alert('수정 사항이 없습니다.');
    } else {
      dispatch(letterEdited({ selectedId, textareaValue }));
      dispatch(isEditMode(false));
    }
  };
  const editCancelBtnClickHandler = () => {
    dispatch(isEditMode(false));
  };

  const deleteBtnClickHandler = (e) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(letterDeleted(selectedId));
      setTimeout(() => navigate('/'), 0);
    }
  };
  const setEditedDate = () => {
    return (
      <span>
        {selectedLetter?.editedAt
          ? dayjs(selectedLetter?.editedAt).isSame(
              dayjs(selectedLetter?.createdAt),
              'day'
            )
            ? `같은 날 ${dayjs(selectedLetter?.editedAt).format(
                'hh:mm에 편집됨'
              )}`
            : dayjs(selectedLetter?.editedAt).format(
                'YYYY년 M월 D일 hh:mm에 편집됨'
              )
          : ''}
      </span>
    );
  };

  return (
    <div>
      <StBGContainer>
        <StDetailContainer>
          <h4>{`To. ${selectedLetter?.writedTo}`}</h4>
          {isEditing ? (
            <StTextareaContainer>
              <textarea
                ref={textareaRef}
                autoFocus
                required
                value={textareaValue}
                autoCorrect="off"
                id="textarea"
                name="textarea"
                rows={3}
                maxLength={TEXTAREA_LENGTH_LIMIT}
                onChange={textareaChangeHandler}
              />
              <StMaxLengthIndicator
                $isMax={textareaValue?.length < TEXTAREA_LENGTH_LIMIT}
              >
                {textareaValue?.length}/{TEXTAREA_LENGTH_LIMIT}
              </StMaxLengthIndicator>
            </StTextareaContainer>
          ) : (
            <p>{selectedLetter?.content}</p>
          )}
          <StDetailInfoWrapper>
            <img
              src={selectedLetter?.avatar}
              alt={selectedLetter?.nickname}
              width="199px"
            />
            <h3>{selectedLetter?.nickname}</h3>
            <p>
              {dayjs(selectedLetter?.createdAt).format(
                'YYYY년 M월 D일 hh:mm에 작성'
              )}
            </p>
            {setEditedDate()}
          </StDetailInfoWrapper>
        </StDetailContainer>
        {isEditing ? (
          <StBtnContainer>
            <button onClick={editCompleteBtnClickHandler}>수정 완료</button>
            <button onClick={editCancelBtnClickHandler}>취소</button>
          </StBtnContainer>
        ) : (
          <StBtnContainer>
            <button onClick={editBtnClickHandler}>수정</button>
            <button onClick={deleteBtnClickHandler}>삭제</button>
          </StBtnContainer>
        )}
      </StBGContainer>
    </div>
  );
}

export default Detail;

const StBGContainer = styled.div`
  background-color: #e3e2ce;
  height: calc(100vh - 320px);
`;

const StDetailContainer = styled.div`
  width: 600px;
  margin: 36px auto 16px;
  padding: 12px;
  min-width: 200px;
  border: 1px solid #0008;
  border-radius: 8px;
  height: fit-content;
  overflow: scroll;
  background-color: #eee;
  h4 {
    margin: 12px 16px;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
  }
`;

const StTextareaContainer = styled.div`
  position: relative;
  textarea {
    font-size: 1.2rem;
    font-style: italic;
    border: none;
    background-color: #eee;
  }
  textarea:focus {
    outline: none;
  }
`;

const StMaxLengthIndicator = styled.span`
  display: block;
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 0.75rem;
  text-align: right;
  color: ${(props) => (props.$isMax ? '#aaa' : '#f00a')};
`;

const StDetailInfoWrapper = styled.div`
  padding: 12px 0;
  gap: 6px;
  align-items: end;
  margin-top: auto;

  img {
    width: 64px;
    border-radius: 100%;
  }
  h3 {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.8em;
    margin-left: auto;
    line-height: 1.3;
    text-align: end;
  }
  span {
    display: block;
    font-size: 0.7rem;
    color: #0005;
  }
`;

const StBtnContainer = styled.div`
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  button {
    padding: 12px;
    border: 1px solid #0008;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.1s all;
    &:hover {
      background-color: #f9f984;
    }
  }
`;
