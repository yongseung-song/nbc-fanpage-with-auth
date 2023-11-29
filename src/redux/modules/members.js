const SET_SELECTED_MEMBER = 'members/SET_SELECTED_MEMBER';

export const setSelectedMember = (payload) => {
  return {
    type: SET_SELECTED_MEMBER,
    payload,
  };
};

const initialState = {
  selectedMember: '이장원',
};

const members = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MEMBER:
      return {
        selectedMember: action.payload,
      };
    default:
      return state;
  }
};

export default members;
