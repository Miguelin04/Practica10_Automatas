import { useState } from 'react';
import { parseInput } from '../services/api';
import '../styles/Parser.css';

const EXAMPLES = [
  {
    name: "Receta Válida Simple",
    code: "INGREDIENT: 200 GRAMS OF Flour;\nSTEP 1: BOIL Water FOR 10 MINUTES;\nSTEP 2: ADD Flour;"
  },
  {
    name: "Receta Válida con MIX",
    code: "INGREDIENT: 100 GRAMS OF Sugar;\nSTEP 1: MIX Sugar AND Water;\nSTEP 2: BOIL Mixture FOR 5 MINUTES;"
  },
  {
    name: "Receta Inválida (Error de Sintaxis)",
    code: "INGREDIENT: 200 GRAMS Flour;\nSTEP 1: BOIL Water 10 MINUTES;"
  }
];

function tokenize(input) {
  const tokens = [];
  const regex = /\s+|([a-zA-Z_][a-zA-Z0-9_]*)|([0-9]+)|(:)|(;)|(.)/g;
  let match;
  let line = 1;
  let col = 1;
  
  const keywords = ["INGREDIENT", "GRAMS", "OF", "STEP", "FOR", "MINUTES", "SECONDS", "BOIL", "ADD", "MIX", "AND"];
  
  while ((match = regex.exec(input)) !== null) {
    const text = match[0];
    if (/^\s+$/.test(text)) {
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') { line++; col = 1; } 
        else { col++; }
      }
      continue;
    }
    
    let type = "ERROR";
    if (match[1]) {
      if (keywords.includes(match[1])) type = "KEYWORD";
      else type = "IDENTIFIER";
    } else if (match[2]) {
      type = "NUMBER";
    } else if (match[3]) {
      type = "COLON";
    } else if (match[4]) {
      type = "SEMICOLON";
    }
    
    tokens.push({ text, type, line, col });
    col += text.length;
  }
  return tokens;
}

export default function Parser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Por favor ingresa una entrada válida');
      return;
    }

    setLoading(true);
    setError(null);
    setTokens(tokenize(input));
    
    try {
      const response = await parseInput(input);
      setResult(response);
      if (!response.success) setError(response.error);
    } catch (err) {
      setError('Error al conectar con el servidor: ' + err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError(null);
    setTokens([]);
  };

  return (
    <div className="parser-container">
      <header className="parser-header">
        <h1>Motor CFG - Analizador de Recetas</h1>
        <p>Validador sintáctico interactivo para el dominio de recetas de cocina inteligentes.</p>
      </header>
      
      <div className="examples-container">
        {EXAMPLES.map((ex, idx) => (
          <button 
            key={idx} 
            className="example-btn" 
            onClick={() => { setInput(ex.code); handleClear(); setInput(ex.code); }}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="parser-form">
        <div className="form-group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu receta aquí..."
            rows="6"
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Analizando...' : 'Ejecutar Análisis'}
          </button>
          <button type="button" onClick={handleClear} disabled={loading} className="btn btn-secondary">
            Limpiar Todo
          </button>
        </div>
      </form>

      {error && (
        <div className="result-box error">
          <h3>❌ Error Sintáctico / Léxico detectado</h3>
          <p>{error}</p>
        </div>
      )}

      {tokens.length > 0 && (
        <div className="analysis-section">
          <h3>1. Flujo de Tokens (Análisis Léxico)</h3>
          <div className="table-responsive">
            <table className="token-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Lexema</th>
                  <th>Línea</th>
                  <th>Columna</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t, i) => (
                  <tr key={i} className={t.type === 'ERROR' ? 'token-error' : ''}>
                    <td><span className={`badge badge-${t.type.toLowerCase()}`}>{t.type}</span></td>
                    <td className="lexema">{t.text}</td>
                    <td>{t.line}</td>
                    <td>{t.col}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && result.success && (
        <div className="analysis-section derivation-section">
          <h3>2. Árbol de Derivación (Análisis Sintáctico)</h3>
          <div className="derivation-list">
            {result.derivations.map((der, idx) => (
              <div key={idx} className="derivation-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                <span className="step-num">{result.derivations.length - idx}</span>
                <code>{der}</code>
              </div>
            ))}
            <div className="derivation-success">
              ✅ La receta fue validada y estructurada exitosamente por el Autómata LALR.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
