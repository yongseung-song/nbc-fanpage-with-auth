// >>> 액션 타입
const SET_SELECTED_MEMBER = "member/SET_SELECTED_MEMBER";

// >>> 액션 크리에이터
export const setSelectedMember = (payload) => {
  return {
    type: SET_SELECTED_MEMBER,
    payload,
  };
};

// >>> 초기값 정의
const initialState = {
  selectedMember: "이장원",
};

// >>> 리듀서 정의
const member = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MEMBER:
      return {
        selectedMember: action.payload,
      };
    default:
      return state;
  }
};

export default member;
