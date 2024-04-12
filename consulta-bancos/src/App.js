import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilo.css';

function App() {
  const [bancos, setBancos] = useState([]);
  const [codigoCompensacao, setCodigoCompensacao] = useState('');
  const [bancosIniciais, setBancosIniciais] = useState([]);

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bancos');
        setBancosIniciais(response.data);
        setBancos(response.data);
      } catch (error) {
        console.error('Erro ao buscar bancos:', error);
      }
    };

    fetchBancos();
  }, []);

  const handleBuscarBanco = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/banco/${codigoCompensacao}`);
      setBancos([response.data]);
    } catch (error) {
      console.error('Erro ao buscar banco:', error);
    }
  };

  return (
    <div className="App">
      <h1>Consulta de Bancos</h1>
      <label>
        Insira aqui o código de compensação do Banco:
        <input type="text" value={codigoCompensacao} onChange={(e) => setCodigoCompensacao(e.target.value)} />
      </label>
      <button onClick={handleBuscarBanco}>Buscar</button>
      {bancos.length > 0 && bancos !== bancosIniciais && (
        <ul>
          {bancos.map((banco) => (
            <li className="banco-item" key={banco.codigo_compensacao}>
              <div className="banco-nome">{banco.nome_instituicao}</div>
              <div className="banco-codigo">{banco.codigo_compensacao}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;