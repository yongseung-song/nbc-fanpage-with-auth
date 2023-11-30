import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { letterAdded } from 'redux/modules/lettersSlice';
import { setSelectedMember } from 'redux/modules/membersSlice';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import defaultAvatar from '../assets/avatar.jpg';

const NICKNAME_LIMIT = 20;
const CONTENT_LIMIT = 100;
const BORDER_COLOR = '#0008';
const BACKGROUND_COLOR = '#feffd0bf';

function LetterForm() {
  const [textareaValue, setTextareaValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { letters } = useSelector((state) => state.letters);
  const { selectedMember } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const inputRef = useRef();
  const textareaRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedMember, letters]);

  const letterSubmitHandler = (e) => {
    e.preventDefault();

    if (inputRef.current.value && textareaRef.current.value) {
      const submittedLetter = {
        id: uuid(),
        createdAt: dayjs().toJSON(),
        nickname: inputRef.current.value,
        content: textareaRef.current.value,
        writedTo: selectRef.current.value,
        avatar: defaultAvatar,
      };

      dispatch(letterAdded(submittedLetter));
      dispatch(setSelectedMember(selectRef.current.value));

      setTextareaValue('');
      setInputValue('');
    } else {
      alert('닉네임과 내용을 입력해주세요.');
    }
  };

  const onTextChangeHandler = () => {
    setTextareaValue(textareaRef.current.value);
    setInputValue(inputRef.current.value);
  };
  const onSelectChangeHandler = () => {};

  return (
    <StLetterFormContainer>
      <form action="">
        <StInputContainer>
          <label htmlFor="text">닉네임 :</label>
          <input
            ref={inputRef}
            required
            value={inputValue}
            autoFocus
            autoComplete="off"
            id="text"
            type="text"
            maxLength={NICKNAME_LIMIT}
            onChange={onTextChangeHandler}
          />
          <StMaxLengthIndicator $isMax={inputValue.length < NICKNAME_LIMIT}>
            {inputValue.length}/{NICKNAME_LIMIT}
          </StMaxLengthIndicator>
        </StInputContainer>
        <StInputContainer>
          <label htmlFor="textarea">내용 :</label>
          <textarea
            ref={textareaRef}
            required
            value={textareaValue}
            autoCorrect="off"
            id="textarea"
            name="textarea"
            rows={4}
            maxLength={CONTENT_LIMIT}
            onChange={onTextChangeHandler}
          />
          <StMaxLengthIndicator $isMax={textareaValue.length < CONTENT_LIMIT}>
            {textareaValue.length}/{CONTENT_LIMIT}
          </StMaxLengthIndicator>
        </StInputContainer>
        <StSelectContainer>
          <label htmlFor="member-select">누구에게 보내실 건가요?</label>
          <select
            ref={selectRef}
            id="member-select"
            value={selectedMember}
            name="member-select"
            onChange={onSelectChangeHandler}
          >
            <option value="이장원">이장원</option>
            <option value="신재평">신재평</option>
          </select>
        </StSelectContainer>
        <StBtnContainer>
          <StSubmitBtn onClick={letterSubmitHandler}>팬레터 등록</StSubmitBtn>
        </StBtnContainer>
      </form>
    </StLetterFormContainer>
  );
}

export default LetterForm;
const StLetterFormContainer = styled.div`
  min-width: 200px;
  max-width: 520px;
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 12px;
  background-color: white;
`;

const StInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
  font-size: 0.8rem;
  label {
    padding-top: 6px;
  }
  input {
    width: 89%;
    padding: 4px 2px;
    border: 1px solid ${BORDER_COLOR};
  }
  textarea {
    border: 1px solid ${BORDER_COLOR};
  }
  input:focus {
    outline: none;
    background-color: ${BACKGROUND_COLOR};
  }
  textarea:focus {
    outline: none;
    background-color: ${BACKGROUND_COLOR};
  }
`;

const StSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 12px;
  label {
    margin-top: 2px;
  }
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StSubmitBtn = styled.button`
  cursor: pointer;
  background-color: white;
  text-align: center;
  border: 1px solid ${BORDER_COLOR};
  padding: 6px;
  border-radius: 6px;
  &:hover {
    background-color: yellow;
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
