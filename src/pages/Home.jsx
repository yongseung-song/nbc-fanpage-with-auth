import Footer from "components/Footer";
import Header from "components/Header";
import LetterForm from "components/LetterForm";
import LetterList from "components/LetterList";
import bgBottom from "../assets/bgbottom.png";
import bgWall from "../assets/bgwall.png";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addLetters, setLetters } from "redux/modules/letters";

export const members = ["이장원", "신재평"];
export const membersMap = new Map(members.entries());

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

function Home() {
  const letters = useSelector((state) => state.letters);
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage의 "letters" 키에 데이터가 없을때
    if (!localStorage.getItem("letters")) {
      fetch("fakeData.json")
        .then((res) => res.json())
        .then((result) =>
          result.forEach((item) => {
            dispatch(addLetters(item));
          })
        );
      const stringifiedLetterMap = JSON.stringify(letters.letters);
      localStorage.setItem("letters", stringifiedLetterMap);
    } else {
      const storageData = JSON.parse(localStorage.getItem("letters"));
      dispatch(setLetters(storageData));
    }
  }, []);

  useEffect(() => {
    const stringifiedLetterMap = JSON.stringify(letters.letters);
    localStorage.setItem("letters", stringifiedLetterMap);
  }, [letters.letters]);

  return (
    <div>
      <Header />
      <StBGContainer>
        <StLetterContainer>
          <LetterForm />
          <LetterList />
        </StLetterContainer>
      </StBGContainer>
      <Footer />
    </div>
  );
}

export default Home;
