import React, { useState, useEffect } from 'react';
import './FormularioItem.css';
import verdurasImage from '../assets/Verduras.png';
import paoImage from '../assets/Pao.png';
import diversosImage from '../assets/Diversos.png';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'memoMercadoListas';

function FormularioItem() {
  const navigate = useNavigate();
  const [itens, setItens] = useState({
    'frutas-e-verduras': [],
    'padaria': [],
    'diversos': [],
  });
  const [isLoading, setIsLoading] = useState(true); // Novo estado de carregamento
  const [novoItem, setNovoItem] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('frutas-e-verduras');

  useEffect(() => {
    const storedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLists) {
      try {
        setItens(JSON.parse(storedLists));
      } catch (error) {
        console.error('Erro ao analisar JSON do localStorage:', error);
      }
    }
    setIsLoading(false); // Marca o carregamento como concluído
  }, []);

  useEffect(() => {
    if (!isLoading) { // Salva apenas se o carregamento inicial estiver concluído
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itens));
    }
  }, [itens, isLoading]);

  const handleInputChange = (event) => {
    setNovoItem(event.target.value);
  };

  const handleAdicionarItem = () => {
    if (novoItem.trim() !== '') {
      setItens(prevItens => ({
        ...prevItens,
        [categoriaSelecionada]: [...prevItens[categoriaSelecionada], { nome: novoItem, realizado: false, id: Date.now() }],
      }));
      setNovoItem('');
    }
  };

  const handleMarcarRealizado = (categoria, id) => {
    setItens(prevItens => ({
      ...prevItens,
      [categoria]: prevItens[categoria].map(item =>
        item.id === id ? { ...item, realizado: !item.realizado } : item
      ),
    }));
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSelecionada(event.target.value);
  };

  const handleRemoverItem = (categoria, id) => {
    setItens(prevItens => ({
      ...prevItens,
      [categoria]: prevItens[categoria].filter(item => item.id !== id),
    }));
  };

  const handleVoltarClick = () => {
    navigate('/');
  };

  return (
    <div className="formulario-item-container">
      <div className="boas-vindas-container">
        <span className="memo-mercado-text">MemoMercado</span>
        <h1 className="boas-vindas">Olá novamente Renan! O que vamos comprar hoje?</h1>
        <button className="voltar-login-button" onClick={handleVoltarClick}>
          Vamos voltar?
        </button>
      </div>
      <div className="adicionar-item-container">
        <input
          type="text"
          placeholder="Adicionar item"
          value={novoItem}
          onChange={handleInputChange}
        />
        <select value={categoriaSelecionada} onChange={handleCategoriaChange}>
          <option value="frutas-e-verduras">Frutas e Verduras</option>
          <option value="padaria">Padaria</option>
          <option value="diversos">Diversos</option>
        </select>
        <button onClick={handleAdicionarItem}>Adicionar</button>
      </div>

      <div className="listas-paralelas-container">
        {Object.keys(itens).map(categoria => (
          <div key={categoria} className="lista-categoria">
            <h2>
              {categoria === 'frutas-e-verduras' && <>Frutas e Verduras <img src={verdurasImage} alt="Ícone de Verduras" className="categoria-icone" /></>}
              {categoria === 'padaria' && <>Padaria <img src={paoImage} alt="Ícone de Pão" className="categoria-icone" /></>}
              {categoria === 'diversos' && <>Diversos <img src={diversosImage} alt="Ícone de Diversos" className="categoria-icone" /></>}
            </h2>
            <ul className="lista-de-itens">
              {itens[categoria].map((item) => (
                <li key={item.id} className={`item-da-lista ${item.realizado ? 'realizado' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.realizado}
                    onChange={() => handleMarcarRealizado(categoria, item.id)}
                  />
                  <span>{item.nome}</span>
                  <button
                    className="remover-item-button"
                    onClick={() => handleRemoverItem(categoria, item.id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormularioItem;