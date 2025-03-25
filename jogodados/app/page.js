"use client";

import { useState } from "react";

const imagens = {
  1: "/dado1.png",
  2: "/dado2.png",
  3: "/dado3.png",
  4: "/dado4.png",
  5: "/dado5.png",
  6: "/dado6.png",
};

function Dado({ valor }) {
  return <img src={imagens[valor]} alt={`Dado mostrando ${valor}`} width={100} />;
}

const gerarNumeroDado = () => Math.floor(Math.random() * 6) + 1;

export default function Home() {
  const [rodada, setRodada] = useState(1);
  const [pontos, setPontos] = useState([0, 0]);
  const [dados, setDados] = useState([1, 1]);
  const [status, setStatus] = useState([false, false]);
  const [mensagem, setMensagem] = useState("Jogador 1 começa!");

  const jogarDado = (jogadorIndex) => {
    const valor = gerarNumeroDado();
    const novosDados = [...dados];
    novosDados[jogadorIndex] = valor;
    setDados(novosDados);

    const novosStatus = [...status];
    novosStatus[jogadorIndex] = true;
    setStatus(novosStatus);

    if (jogadorIndex === 0) {
      setMensagem("Jogador 2, sua vez!");
    } else {
      determinarVencedor();
    }
  };

  const determinarVencedor = () => {
    const [jogador1Valor, jogador2Valor] = dados;
    const vencedor = jogador1Valor > jogador2Valor ? 0 : jogador2Valor > jogador1Valor ? 1 : null;
    
    setTimeout(() => {
      if (vencedor !== null) {
        const novosPontos = [...pontos];
        novosPontos[vencedor] += 1;
        setPontos(novosPontos);
        setMensagem(`Jogador ${vencedor + 1} ganhou a rodada!`);
      } else {
        setMensagem("Empate!");
      }
    }, 1000);
  };

  const proximaRodada = () => {
    if (rodada < 5) {
      setRodada(rodada + 1);
      setStatus([false, false]);
      setMensagem(`Rodada ${rodada + 1}, Jogador 1 começa!`);
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setPontos([0, 0]);
    setDados([1, 1]);
    setStatus([false, false]);
    setMensagem("Jogador 1 começa!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Rodada {rodada}</h1>
      <p>{mensagem}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        {["Jogador 1", "Jogador 2"].map((jogador, index) => (
          <div key={index}>
            <h2>{jogador}</h2>
            <Dado valor={dados[index]} />
            <button
              onClick={() => jogarDado(index)}
              disabled={status[index]}
            >
              {status[index] ? "Já jogou" : "Rolar Dado"}
            </button>
          </div>
        ))}
      </div>
      <h2>Placar: {pontos[0]} X {pontos[1]}</h2>
      {rodada < 5 && status.every((status) => status) && (
        <button onClick={proximaRodada}>Próxima Rodada</button>
      )}
      {rodada === 5 && status.every((status) => status) && (
        <div>
          <h2>
            {pontos[0] > pontos[1]
              ? "🏆 Jogador 1 venceu!"
              : pontos[1] > pontos[0]
              ? "🏆 Jogador 2 venceu!"
              : "Empate!"}
          </h2>
          <button onClick={reiniciarJogo}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
}
