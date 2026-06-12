# Backend - CFG Engine (Spring Boot)

API REST para procesamiento de lenguajes formales (Context-Free Grammars).

## Descripción

Motor de análisis sintáctico que utiliza:
- **JFlex** para tokenización (Lexer)
- **CUP** para análisis sintáctico (Parser)
- **Spring Boot** como framework web

## Requisitos

- Java 17+
- Maven 3.6+

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/unl/automatas/cfgengine/
│   │   │   ├── CfgEngineApplication.java
│   │   │   ├── ParseController.java
│   │   │   └── parser/
│   │   ├── cup/
│   │   │   └── grammar.cup
│   │   ├── jflex/
│   │   │   └── lexer.flex
│   │   └── resources/
│   └── test/
├── pom.xml
└── README.md
```

## Ejecución Local

### Compilar
```bash
mvn clean install
```

### Ejecutar
```bash
mvn spring-boot:run
```

La API estará disponible en: `http://localhost:8080`

## API Endpoints

### POST /api/parse
Analiza una cadena de entrada según la gramática definida.

**Request:**
```json
{
  "input": "cadena de entrada"
}
```

**Response (Éxito):**
```json
{
  "success": true,
  "derivations": [...]
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

## Configuración de CORS

El backend está configurado para aceptar solicitudes desde cualquier origen (configuración de desarrollo). 
Ajustar según necesidades en producción.

## Tecnologías

- Spring Boot 4.1.0
- Java Cup 11b
- JFlex 1.9.1
- Maven
