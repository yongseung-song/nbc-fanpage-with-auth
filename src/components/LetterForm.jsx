import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { __getUser } from 'redux/modules/authSlice';
import { __addLetter } from 'redux/modules/lettersSlice';
import { setSelectedMember } from 'redux/modules/membersSlice';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import defaultAvatar from '../assets/avatar.jpg';

const CONTENT_LIMIT = 100;
const BORDER_COLOR = '#0008';
const BACKGROUND_COLOR = '#feffd0bf';

function LetterForm() {
  const [textareaValue, setTextareaValue] = useState('');
  const { letters } = useSelector((state) => state.letters);
  const { selectedMember } = useSelector((state) => state.members);
  const { userId, avatar, nickname, isLoggedIn, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  const inputRef = useRef();
  const textareaRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, [selectedMember, letters]);

  console.log(isLoggedIn);

  const letterSubmitHandler = (e) => {
    e.preventDefault();

    if (textareaRef.current.value) {
      const submittedLetter = {
        id: uuid(),
        createdAt: dayjs().toJSON(),
        content: textareaRef.current.value,
        writedTo: selectRef.current.value,
        avatar: avatar ?? defaultAvatar,
        userId,
        nickname,
      };
      dispatch(__getUser(JSON.parse(accessToken)));
      dispatch(__addLetter(submittedLetter));
      // dispatch(__addLetter(...submittedLetter));
      // dispatch(letterAdded(submittedLetter));
      dispatch(setSelectedMember(selectRef.current.value));

      setTextareaValue('');
    } else {
      alert('닉네임과 내용을 입력해주세요.');
    }
  };

  const onTextareaChangeHandler = () => {
    setTextareaValue(textareaRef.current.value);
  };
  const onSelectChangeHandler = () => {};

  return (
    <StLetterFormContainer>
      <StNicknameContainer>
        <dt>닉네임 :</dt>
        <dd>{nickname}</dd>
      </StNicknameContainer>
      <form action="">
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
            onChange={onTextareaChangeHandler}
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
        <ToastContainer />
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

const StNicknameContainer = styled.dl`
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  margin-bottom: 12px;
  dd {
    text-decoration: underline #0003;
    text-underline-offset: 3px;
    font-weight: 700;
  }
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
