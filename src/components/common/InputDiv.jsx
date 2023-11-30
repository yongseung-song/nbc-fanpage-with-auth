import { useState } from 'react';
import styled from 'styled-components';

function InputDiv({ id, text, minLetters, maxLetters, type }) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const message = '야하하!';

  const checkInputIsValid = () => {
    const result =
      inputValue.length >= minLetters - 1 && inputValue.length <= maxLetters - 1
        ? true
        : false;
    setIsValid(result);
  };
  const onInputChangeHandler = (e) => {
    console.log(e.target.value.length);
    setInputValue(e.target.value);
    checkInputIsValid();
  };
  console.log(minLetters, inputValue.length);
  return (
    <div>
      <StLabel htmlFor={id}>{text}</StLabel>
      <StInput
        id={id}
        type={type}
        value={inputValue}
        placeholder={`${text}(${minLetters} ~ ${maxLetters} 글자)`}
        onChange={onInputChangeHandler}
      />
      <StSpan
        $isValidated={isValid}
      >{`${text}(은)는 ${minLetters}자 이상 ${maxLetters}자 이하여야 합니다.`}</StSpan>
    </div>
  );
}

export default InputDiv;

const StLabel = styled.label`
  font-size: 0;
`;
const StInput = styled.input`
  padding: 12px 8px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #0003;
`;
const StSpan = styled.span`
  display: block;
  margin-top: 4px;
  text-align: end;
  font-size: 0.8rem;
  opacity: ${(props) => (props.$isValidated === true ? '0' : '1')};
  color: ${(props) => (props.$isValidated === true ? '#000' : '#f00')};
`;
