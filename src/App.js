import * as React from 'react';
import Lottery from './component/lottery';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <Lottery />
    </Provider>
  );
}

export default App;
