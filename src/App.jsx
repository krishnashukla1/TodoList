//App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';


function App() {
  const headStyle = {
    textAlign: "center",
  }
  return (
    <div>
      <h1 style={headStyle}>KP Todo List</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//npm i react-router-dom, axios