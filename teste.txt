import React, { useState } from 'react';
import Dado from './components/Dado';

function App() {
  const [numeroJogador1, setNumeroJogador1] = useState(1);
  const [numeroJogador2, setNumeroJogador2] = useState(1);
  const [rodada, setRodada] = useState(1);
  const [placarJogador1, setPlacarJogador1] = useState(0);
  const [placarJogador2, setPlacarJogador2] = useState(0);
  const [mensagem, setMensagem] = useState('');

  const rolarDados = () => {
    if (rodada > 5) return;

    const novoNumero1 = Math.floor(Math.random() * 6) + 1;
    const novoNumero2 = Math.floor(Math.random() * 6) + 1;

    setNumeroJogador1(novoNumero1);
    setNumeroJogador2(novoNumero2);

    if (novoNumero1 > novoNumero2) {
      setPlacarJogador1(placarJogador1 + 1);
    } else if (novoNumero2 > novoNumero1) {
      setPlacarJogador2(placarJogador2 + 1);
    }

    if (rodada === 5) {
      if (placarJogador1 > placarJogador2) {
        setMensagem('Jogador 1 venceu o jogo!!!!🥳🥇');
      } else if (placarJogador2 > placarJogador1) {
        setMensagem('Jogador 2 venceu o jogo!!!!🥳🥇');
      } else {
        setMensagem('Empate no jogo!🤝🏻⚖️');
      }
    }

    setRodada(rodada + 1);
  };

  const jogarNovamente = () => {
    setRodada(1);
    setNumeroJogador1(1);
    setNumeroJogador2(1);
    setPlacarJogador1(0);
    setPlacarJogador2(0);
    setMensagem('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Jogo de Dados 🎲</h1>
      <h2>Rodada {rodada <= 5 ? rodada : 5}/5</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px' }}>
        <div>
          <h3>Jogador 1</h3>
          <Dado numero={numeroJogador1} />
        </div>

        <div>
          <h3>Jogador 2</h3>
          <Dado numero={numeroJogador2} />
        </div>
      </div>

      {rodada <= 5 && (
        <button onClick={rolarDados} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Rolar Dados
        </button>
      )}

      <h3>Placar</h3>
      <p>Jogador 1: {placarJogador1} x Jogador 2: {placarJogador2}</p>

      {mensagem && (
        <>
          <h2>{mensagem}</h2>
          <button onClick={jogarNovamente} style={{ padding: '10px 20px', marginTop: '20px' }}>
            Jogar Novamente
          </button>
        </>
      )}
    </div>
  );
}

export default App;