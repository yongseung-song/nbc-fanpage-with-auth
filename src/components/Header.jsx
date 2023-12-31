import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSelectedMember } from 'redux/modules/membersSlice';
import styled from 'styled-components';
import bannerBg from '../assets/bannerBg.png';
import bannerLogo from '../assets/bannerLogo.png';

function Header() {
  const { members, selectedMember } = useSelector((state) => state.members);
  const letters = useSelector((state) => state.letters);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 위치
  const currentPage = location.pathname.includes('detail') ? 'detail' : 'home';

  const selectButtonHandler = (e) => {
    e.preventDefault();
    const id = e.target.id;
    dispatch(setSelectedMember(id));
  };

  const gotoListsButtonHandler = (e) => {
    e.preventDefault();
    if (letters.isEditing) {
      if (
        window.confirm('수정중인 내용이 사라집니다. 홈으로 이동하시겠습니까?')
      ) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const gotoHomeButtonHandler = () => {
    navigate('/');
  };

  return (
    <>
      <StHeader>
        <StNavBar>
          <button onClick={gotoHomeButtonHandler}>Home</button>
          <div>
            <button>내 프로필</button>
            <button>로그아웃</button>
          </div>
        </StNavBar>
        <StMemberSelectBtnContainer>
          {currentPage === 'home' ? (
            members.map((item, idx) => {
              return (
                <StMemberSelectBtn
                  $isSelected={item === selectedMember}
                  id={item}
                  key={idx}
                  onClick={selectButtonHandler}
                >
                  {item}
                </StMemberSelectBtn>
              );
            })
          ) : (
            <StMemberSelectBtn
              $isSelected="true"
              onClick={gotoListsButtonHandler}
            >
              목록 보기
            </StMemberSelectBtn>
          )}
        </StMemberSelectBtnContainer>
      </StHeader>
    </>
  );
}
export default Header;

const StHeader = styled.div`
  background: url(${bannerLogo}), url(${bannerBg});
  background-position: 50% 20%, 50% 50%;
  background-size: auto 140px, 100% 204px;
  background-repeat: no-repeat;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const StNavBar = styled.nav`
  /* background: #e3e2ce; */
  width: 100%;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-blend-mode: darken;
  /* border-bottom: 1px solid black; */
  div {
    display: flex;
    gap: 12px;
  }
  button {
    padding: 12px;
    width: fit-content;
    background-color: #fff0;
    background: #e3e2ce;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 0 4px #555f;
    cursor: pointer;
  }
`;
const StMemberSelectBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
const StMemberSelectBtn = styled.button`
  width: fit-content;
  border: none;
  padding: 12px 18px 6px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? '#e3e2ce' : '#c8c7ad')};
  transition: 0.1s all;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-variation-settings: 'wght' 750;
  font-size: 1.2rem;
  letter-spacing: 1px;
  box-shadow: 0 0 4px #555f;
  &:hover {
    background-color: #ecebca;
  }
`;
