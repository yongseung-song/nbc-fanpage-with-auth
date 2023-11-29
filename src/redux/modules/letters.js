// >>> 액션 타입
const SET_LETTER = "letters/SET_LETTER";
const ADD_LETTER = "letters/ADD_LETTER";
const EDIT_LETTER = "letters/EDIT_LETTER";
const DELETE_LETTER = "letters/DELETE_LETTER";
const ON_EDIT_MODE = "letters/ON_EDIT_MODE";

// >>> 액션 크리에이터
export const setLetters = (payload) => {
  return {
    type: SET_LETTER,
    payload,
  };
};
export const addLetters = (payload) => {
  return {
    type: ADD_LETTER,
    payload,
  };
};
export const editLetters = (payload) => {
  return {
    type: EDIT_LETTER,
    payload,
  };
};
export const deleteLetters = (payload) => {
  return {
    type: DELETE_LETTER,
    payload,
  };
};
export const editMode = (payload) => {
  return {
    type: ON_EDIT_MODE,
    payload,
  };
};

// >>> 초기값 정의
const initialState = {
  letters: {},
  isEditing: false,
};

// >>> 리듀서 정의
const letters = (state = initialState, action) => {
  switch (action.type) {
    case SET_LETTER:
      return {
        ...state,
        letters: {
          ...action.payload,
        },
      };

    case ADD_LETTER:
      return {
        ...state,
        letters: {
          ...state.letters,
          [action.payload?.id]: { ...action.payload },
        },
      };
    case EDIT_LETTER:
      return {
        ...state,
        letters: {
          ...state.letters,
          ...action.payload,
        },
      };
    case DELETE_LETTER:
      const { [action.payload?.id]: deletedLetter, ...restOfLetters } =
        state.letters;
      return {
        ...state,
        letters: restOfLetters,
      };
    case ON_EDIT_MODE:
      return {
        ...state,
        isEditing: action.payload,
      };
    default:
      return state;
  }
};

export default letters;
