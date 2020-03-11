import React from 'react';
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
// import File from './File'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MainRouter/>
      </BrowserRouter>
     {/* <File/> */}
    </div>
  );
}

export default App;
