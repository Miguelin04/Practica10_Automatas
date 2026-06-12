# Frontend - CFG Engine (React)

Interfaz de usuario para el analizador de lenguajes formales.

## Descripción

Aplicación React moderna que proporciona:
- Interfaz intuitiva para el análisis de cadenas
- Visualización de derivaciones
- Manejo robusto de errores
- Diseño responsivo

## Requisitos

- Node.js 16+
- npm o yarn

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   └── Parser.jsx          # Componente principal
│   ├── services/
│   │   └── api.js              # Cliente HTTP
│   ├── styles/
│   │   └── Parser.css          # Estilos
│   ├── App.jsx                 # Componente raíz
│   └── main.jsx                # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Instalación

```bash
cd frontend
npm install
```

## Ejecución Local

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

### Con proxy configurado
Si configuras el proxy en `vite.config.js`, las llamadas a `/api/**` se redirigirán automáticamente a `http://localhost:8080`.

## Build para Producción

```bash
npm run build
npm run preview
```

## Configuración

### Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```
VITE_API_URL=http://localhost:8080/api
```

## Tecnologías

- React 18.2
- Vite 4.3 (bundler)
- Axios (HTTP client)
- CSS Vanilla

## Características

- ✅ Interfaz limpia y moderna
- ✅ Soporte para temas claros
- ✅ Validación de entrada
- ✅ Manejo de errores
- ✅ Indicador de estado de conexión
- ✅ Diseño responsivo

## Desarrollo

### Componentes Principales

- **Parser.jsx**: Componente con formulario y visualización de resultados

### Servicios

- **api.js**: Cliente Axios configurado para conectar con el backend

## Testing

Actualmente no hay tests configurados. Se puede agregar:

```bash
npm install vitest @testing-library/react
```

## Troubleshooting

### "Cannot connect to server"
- Verificar que el backend está ejecutándose en `http://localhost:8080`
- Revisar la consola del navegador para más detalles
- Asegurar que CORS esté correctamente configurado en el backend
