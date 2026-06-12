import { useEffect, useState } from 'react';
import Parser from './components/Parser';
import { checkHealth } from './services/api';

function App() {
  const [apiHealthy, setApiHealthy] = useState(null);

  useEffect(() => {
    const checkApi = async () => {
      try {
        await checkHealth();
        setApiHealthy(true);
      } catch (error) {
        console.error('API no disponible:', error);
        setApiHealthy(false);
      }
    };

    checkApi();
  }, []);

  return (
    <div className="app">
      {apiHealthy === false && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: '#fee2e2',
          color: '#991b1b',
          padding: '15px 20px',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          fontSize: '14px',
          zIndex: 1000
        }}>
          ⚠️ No se puede conectar al servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:8080
        </div>
      )}
      <Parser />
    </div>
  );
}

export default App;
