import React, { useState } from 'react';
import './Login.css';
import Cesta from '../assets/Cesta.png';
import Variedades from '../assets/Variedades.png';
import Oliva from '../assets/Oliva.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const usuario = event.target.elements.usuario.value;
    const senha = event.target.elements.senha.value;

    if (usuario === 'Renan Perini' && senha === '12345') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/adicionar-produto');
      setErro('');
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={Cesta} alt="Logo MemoMercado Cesta de Compras" />
        <h1>MemoMercado</h1>
        <input type="text" placeholder="Usuário" name="usuario" />
        <input type="password" placeholder="Senha" name="senha" />

        <div className="login-images"></div>

        <button type="submit">Entrar</button>

        {erro && <p className="mensagem-erro">{erro}</p>}
      </form>
      <img src={Variedades} alt="Imagem Variedades de Produtos" className="image-right-screen" />
      <img src={Oliva} alt="Imagem Decorativa de Oliva" className="image-left-screen" />
    </div>
  );
}

export default Login;