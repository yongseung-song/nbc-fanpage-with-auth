import { combineReducers } from "redux";
import { createStore } from "redux";
import member from "redux/modules/member";
import letters from "redux/modules/letters";

const rootReducer = combineReducers({
  member,
  letters,
});
const store = createStore(rootReducer);

export default store;
