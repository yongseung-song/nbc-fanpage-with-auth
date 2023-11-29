import { Provider } from 'react-redux';
import store from 'redux/config/configStore';
import GlobalStyle from './GlobalStyle';
import Router from './shared/Router';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}
export default App;
