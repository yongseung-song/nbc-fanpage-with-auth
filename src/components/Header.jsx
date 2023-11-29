import React from "react";
import styled from "styled-components";
import bannerBg from "../assets/bannerBg.png";
import bannerLogo from "../assets/bannerLogo.png";
import { membersMap, members } from "pages/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMember } from "redux/modules/member";

const StHeader = styled.div`
  background: url(${bannerLogo}), url(${bannerBg});
  background-position: 50% 0%, 50% 50%;
  background-size: auto 140px, 100% 204px;
  background-repeat: no-repeat;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 12px;
  box-sizing: border-box;
`;

const StNavBtn = styled.button`
  width: fit-content;
  border: none;
  padding: 12px 18px 6px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? "#e3e2ce" : "#c8c7ad")};
  transition: 0.1s all;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-variation-settings: "wght" 750;
  font-size: 1.2rem;
  letter-spacing: 1px;
  box-shadow: 0 0 4px #555f;
  &:hover {
    background-color: #ecebca;
  }
`;
function Header() {
  const member = useSelector((state) => state.member);
  const letters = useSelector((state) => state.letters);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 위치
  const curPage = location.pathname.includes("detail") ? "detail" : "home";

  const selectButtonHandler = (e) => {
    e.preventDefault();
    const id = +e.target.id;
    dispatch(setSelectedMember(membersMap.get(id)));
  };

  const homeButtonHandler = (e) => {
    e.preventDefault();
    if (letters.isEditing) {
      if (
        window.confirm("수정중인 내용이 사라집니다. 홈으로 이동하시겠습니까?")
      ) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <StHeader>
        {curPage === "home" ? (
          members.map((item, idx) => {
            return (
              <StNavBtn
                $isSelected={item === member.selectedMember}
                id={idx}
                key={idx}
                onClick={selectButtonHandler}
              >
                {item}
              </StNavBtn>
            );
          })
        ) : (
          <StNavBtn $isSelected="true" onClick={homeButtonHandler}>
            홈페이지로
          </StNavBtn>
        )}
      </StHeader>
    </>
  );
}
export default Header;
