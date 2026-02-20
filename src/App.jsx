import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [abrirEnvelope, setAbrirEnvelope] = useState(false);
  const [botaoSecreto, setBotaoSecreto] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [texto, setTexto] = useState("");

  const [heartsData] = useState(() =>
    Array.from({ length: 80 }).map(() => ({
      left: Math.random() * 100,
      duration: 4 + Math.random() * 5,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 120,
      emoji: Math.random() > 0.5 ? "❤️" : "💖"
    }))
  );

  const mensagem = `Eu não preciso que compre coisas caras para mim.
Até porque você é meu presente de Deus mais caro que existe nesse mundo.
Eu só quero que você fique, e que seja eternamente meu amado. E não importa o quão difícil pareçam as coisas. Não importa como, a gente consegue. Porque eu vou te apoiar, e sou sua fã número 1. Não existe nada nha mor que você não consiga.
Meu bem é o homem da porra toda kerelhonnn, respeita 😌🫦. Eu te amo como quem ama o céu à noite: em meio a tantas constelações foi você a estrela mais bela que deu sentido a todo o meu universo💖`;

  useEffect(() => {
    if (!mostrarMensagem) return;

    let i = 0;
    const intervalo = setInterval(() => {
      setTexto(mensagem.slice(0, i + 1));
      i++;
      if (i >= mensagem.length) clearInterval(intervalo);
    }, 80);

    return () => clearInterval(intervalo);
  }, [mostrarMensagem]);

  return (
    <div className="container">
      {!abrirEnvelope && (
        <div
          className={`envelope ${abrirEnvelope ? "open" : ""}`}
          onClick={() => setAbrirEnvelope(true)}
        >
          <div className="flap"></div>
          <div className="letter">
            {!abrirEnvelope && <p>Clique para abrir 💌</p>}
          </div>
        </div>
      )}

      {abrirEnvelope && (
        <div className="card-wrapper">
          <div className="hearts">
            {heartsData.map((heart, i) => (
              <span
                key={i}
                style={{
                  left: heart.left + "%",
                  animationDuration: heart.duration + "s",
                  animationDelay: heart.delay + "s",
                  fontSize: heart.size + "px",
                  "--drift": heart.drift + "px"
                }}
              >
                {heart.emoji}
              </span>
            ))}
          </div>

          <div className="card">
            <div
              className="heart"
              onClick={() => setBotaoSecreto(true)}
              style={{ cursor: "pointer" }}
            >
              ❤️
            </div>

            {!mostrarMensagem && (
              <button onClick={() => setMostrarMensagem(true)}>
                Abrir meu coração
              </button>
            )}

            {mostrarMensagem && (
              <div className="mensagem">
                {texto.split(/(?<=\.)\s+/).map((linha, i) => (
                  <p key={i}>{linha}</p>
                ))}
              </div>
            )}

            {botaoSecreto && (
              <button className="btn-love">
                Te amo ❤️
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}