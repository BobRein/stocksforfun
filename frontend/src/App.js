import React from 'react';

import { getTicker } from './axios/stockCalls.js';
function App() {
  getTicker().then((response) => {
    console.log(response.data.symbol + ': ' + response.data.price);
}).catch((error) => {
    console.log('Stock error',error.response);
});
  return (
    <div className="App">
      testing. check console
    </div>
  );
}

export default App;
