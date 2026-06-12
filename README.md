# CFG Engine - Analizador de Lenguajes Formales

Aplicación completa de análisis de lenguajes formales utilizando gramáticas libres de contexto (Context-Free Grammars).

## Estructura del Proyecto

```
Practica10_Automatas/
├── backend/                 # Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── frontend/                # React Web Application
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md                # Este archivo
```

## Requisitos

### Backend
- Java 17+
- Maven 3.6+

### Frontend
- Node.js 16+
- npm o yarn

## Instalación y Ejecución

### 1. Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El servidor estará disponible en: **http://localhost:8080**

#### API Endpoints

- `GET /api/health` - Verificar estado del servidor
- `POST /api/parse` - Analizar cadena de entrada

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

## Flujo de Uso

1. Abre el navegador en `http://localhost:3000`
2. Ingresa una cadena a analizar
3. Haz clic en "Analizar"
4. Visualiza los resultados o errores

## Arquitectura

```
Frontend (React)
    ↓ (HTTP requests)
Backend (Spring Boot)
    ↓
Parser (JFlex + CUP)
    ↓
Grammar Analysis Result
```

## Tecnologías

### Backend
- **Spring Boot 4.1.0** - Framework web
- **Java Cup** - Parser generator
- **JFlex** - Lexical analyzer generator
- **Maven** - Build tool

### Frontend
- **React 18.2** - UI Library
- **Vite 4.3** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling

## Configuración CORS

El backend está configurado para aceptar solicitudes desde:
- `http://localhost:3000` (React dev)
- `http://localhost:5173` (Vite alt port)

Para cambiar esto en producción, editar `backend/src/main/java/com/unl/automatas/cfgengine/config/CorsConfig.java`

## Desarrollo

### Backend

Estructura de código:
```
src/main/java/com/unl/automatas/cfgengine/
├── CfgEngineApplication.java    # Entrada de aplicación
├── ParseController.java          # REST Endpoints
├── config/
│   └── CorsConfig.java          # Configuración CORS
├── dto/
│   ├── ParseRequest.java        # DTO de entrada
│   └── ParseResponse.java       # DTO de respuesta
└── parser/                      # Lexer y Parser generados
```

### Frontend

Estructura de código:
```
src/
├── App.jsx                      # Componente raíz
├── main.jsx                     # Punto de entrada
├── components/
│   └── Parser.jsx               # Componente principal
├── services/
│   └── api.js                   # Cliente HTTP
└── styles/
    └── Parser.css               # Estilos globales
```

## Compilación para Producción

### Backend
```bash
cd backend
mvn clean package
# JAR estará en: target/cfg-engine-0.0.1-SNAPSHOT.jar
java -jar target/cfg-engine-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Build estará en: dist/
# Servir con: npm run preview o usar cualquier servidor HTTP
```

## Troubleshooting

### "Cannot connect to API"
1. Verificar que el backend está corriendo en puerto 8080
2. Revisar console de navegador (F12 → Console)
3. Revisar logs de Spring Boot

### "Cannot find module 'react'"
```bash
cd frontend
npm install
```

### Build Maven falla
```bash
cd backend
mvn clean
mvn install
```

## Logs

### Backend
Visible en consola de Spring Boot

### Frontend
Accesible en browser DevTools (F12)

## Contacto

Para reportar bugs o sugerencias:
- Backend: Ver logs en consola
- Frontend: Ver console en DevTools

## Licencia

MIT

---

**Proyecto Educativo** - Teoría de Autómatas - UNL
