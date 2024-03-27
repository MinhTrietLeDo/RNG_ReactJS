import * as React from 'react';
import Lottery from './component/lottery';
import {NativeBaseProvider, } from 'native-base';
function App() {

  return (
    <NativeBaseProvider>
      <Lottery />
    </NativeBaseProvider>
  );
}

export default App;
