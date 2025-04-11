import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import FormularioItem from './componentes/FormularioItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adicionar-produto" element={<FormularioItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;