import { useState } from 'react';
import { parseInput } from '../services/api';
import '../styles/Parser.css';

export default function Parser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Por favor ingresa una entrada válida');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await parseInput(input);
      setResult(response);
      
      if (!response.success) {
        setError(response.error);
      }
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
  };

  return (
    <div className="parser-container">
      <h1>CFG Engine - Analizador de Lenguajes Formales</h1>
      
      <form onSubmit={handleSubmit} className="parser-form">
        <div className="form-group">
          <label htmlFor="input">Ingresa una cadena para analizar:</label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej: a b c"
            rows="4"
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Analizando...' : 'Analizar'}
          </button>
          <button type="button" onClick={handleClear} disabled={loading} className="btn btn-secondary">
            Limpiar
          </button>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <h3>❌ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && result.success && (
        <div className="result-box success">
          <h3>✅ Análisis Exitoso</h3>
          <div className="result-content">
            <h4>Derivaciones:</h4>
            <pre>{JSON.stringify(result.derivations, null, 2)}</pre>
          </div>
        </div>
      )}

      {result && !result.success && (
        <div className="result-box error">
          <h3>⚠️ Análisis Rechazado</h3>
          <p>La cadena no pertenece a la gramática.</p>
        </div>
      )}
    </div>
  );
}
