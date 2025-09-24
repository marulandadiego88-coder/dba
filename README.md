# Generador de Documentos Académicos

Aplicación web para generar y organizar documentos académicos de manera automática y personalizada para docentes y directivos escolares.

## 🚀 Características

- **Selección de asignatura y grado**: Configura documentos por materia y nivel escolar
- **Estructura en 4 períodos académicos**: Organización por períodos del año escolar
- **Contenido académico completo**:
  - DBA (Derechos Básicos de Aprendizaje)
  - Estándares y competencias oficiales
  - Temas y objetivos por período
  - Metodologías de enseñanza
  - Actividades prácticas y didácticas
- **Formato en tablas editables**: Contenido organizado y fácil de modificar
- **Exportación a Word**: Documentos editables independientes
- **Gestión digital**: Guardar, editar y compartir documentos

## 📁 Estructura del Proyecto

```
proyecto/
├── config.js              # Configuración API Gemini
├── dbaData.js             # Base de datos académicos
├── gemini-stream.js       # Servicio de streaming Gemini
├── geminiService.js       # Servicio API Gemini
├── index.html             # Interfaz principal HTML
├── script.js              # Lógica de negocio JavaScript
├── styles.css             # Estilos y diseño responsivo
└── README.md             # Documentación
```

## 🏗️ Arquitectura HTML

### Estructura Principal
- **Header**: Título y descripción de la aplicación
- **Form Section**: Formulario de configuración con selectores de asignatura y grado
- **Document Section**: Área de visualización del documento generado con 4 períodos académicos

### Componentes HTML
```html
<div class="container">
  <header>                    <!-- Encabezado -->
  <main>
    <section class="form-section">     <!-- Formulario de configuración -->
    <section class="document-section"> <!-- Documento generado -->
      <div class="periods-container">  <!-- Contenedor de períodos -->
```

## 🎨 Diseño CSS

### Sistema de Estilos
- **Reset CSS**: Normalización de estilos base
- **Layout Responsivo**: Diseño adaptable con media queries
- **Componentes Modulares**: Estilos organizados por secciones
- **Paleta de Colores**: Esquema profesional con azules y grises

### Características Visuales
- Tarjetas con sombras y bordes redondeados
- Tablas editables con indicadores visuales
- Botones con estados hover y transiciones
- Diseño mobile-first responsivo

## ⚙️ Lógica de Negocio JavaScript

### Clase Principal: DocumentGenerator
```javascript
class DocumentGenerator {
  constructor()     // Inicialización y eventos
  generateDocument() // Generación del documento
  renderDocument()   // Renderizado de períodos
  toggleEditMode()   // Modo edición
  exportToWord()     // Exportación a Word
}
```

### Estructura de Datos

#### academicData
```javascript
{
  asignatura: {
    grado: {
      dba: "Derechos Básicos de Aprendizaje",
      estandares: "Estándares curriculares",
      competencias: "Competencias específicas"
    }
  }
}
```

#### periodData
```javascript
{
  periodo: {
    temas: ["Lista de temas"],
    objetivos: ["Objetivos específicos"],
    metodologia: "Metodología de enseñanza",
    actividades: ["Actividades prácticas"]
  }
}
```

### Flujo de la Aplicación

1. **Inicialización**
   - Carga del DOM
   - Configuración de event listeners
   - Preparación de la interfaz

2. **Selección de Parámetros**
   - Usuario selecciona asignatura y grado
   - Validación de campos requeridos
   - Activación del botón generar

3. **Generación del Documento**
   - Consulta de datos académicos
   - Creación de 4 períodos académicos
   - Renderizado de tablas con contenido

4. **Modo Edición**
   - Activación de contentEditable
   - Indicadores visuales de campos editables
   - Guardado de cambios en tiempo real

5. **Exportación**
   - Generación de HTML completo
   - Creación de blob con formato Word
   - Descarga automática del archivo

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **API**: Google Gemini AI (configurada)
- **Exportación**: Blob API para documentos Word
- **Arquitectura**: SPA (Single Page Application)
- **Patrón**: Orientado a objetos con clases ES6

## ⚡ Instalación

1. Clona o descarga el proyecto
2. Configura tu API key de Gemini en `config.js`
3. Abre `index.html` en tu navegador

## 🎯 Uso

1. Selecciona la asignatura y grado
2. Ingresa datos de la institución y docente
3. Genera el documento académico
4. Edita el contenido si es necesario
5. Exporta a Word o guarda digitalmente

## 🧠 Lógica de Negocio Detallada

### Gestión de Datos Académicos

#### Sistema de Asignaturas
- **Matemáticas**: Números, operaciones, geometría, medidas
- **Lenguaje**: Comprensión lectora, producción textual, comunicación
- **Ciencias Naturales**: Método científico, seres vivos, materia
- **Ciencias Sociales**: Historia, geografía, convivencia
- **Inglés**: Competencias comunicativas en segunda lengua

#### Estructura por Grados (1° a 11°)
Cada grado tiene contenido específico adaptado al nivel cognitivo:
- **Primaria (1°-5°)**: Conceptos básicos y fundamentales
- **Secundaria (6°-9°)**: Profundización y aplicación
- **Media (10°-11°)**: Preparación para educación superior

### Algoritmo de Generación

```javascript
// Proceso de generación de documento
1. Validar selección (asignatura + grado)
2. Consultar academicData[asignatura][grado]
3. Iterar 4 períodos académicos
4. Combinar datos base + datos específicos del período
5. Renderizar tablas HTML con contenido estructurado
6. Aplicar estilos y funcionalidades de edición
```

### Funcionalidades Avanzadas

#### Modo Edición Interactivo
- **Activación**: Click en botón "Editar"
- **Indicadores**: Fondo amarillo en celdas editables
- **Persistencia**: Cambios guardados en DOM
- **UX**: Feedback visual inmediato

#### Sistema de Exportación
- **Formato**: HTML convertido a .doc
- **Estilos**: CSS embebido para mantener formato
- **Compatibilidad**: Microsoft Word y LibreOffice
- **Nomenclatura**: `asignatura_grado_X.doc`

### Estructura de Períodos

Cada período académico contiene:

| Componente | Descripción | Fuente de Datos |
|------------|-------------|----------------|
| **DBA** | Derechos Básicos de Aprendizaje | `academicData` |
| **Estándares** | Estándares curriculares MEN | `academicData` |
| **Competencias** | Competencias específicas | `academicData` |
| **Temas** | Contenidos temáticos | `periodData` |
| **Objetivos** | Objetivos de aprendizaje | `periodData` |
| **Metodología** | Estrategias pedagógicas | `periodData` |
| **Actividades** | Actividades prácticas | `periodData` |

## 🔑 Configuración

### API Gemini
```javascript
// config.js
const API_CONFIG = {
    GEMINI_API_KEY: '<your_gemini_api_key>',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
```

#### Ejemplo de uso con curl
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: GEMINI_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
```

### Extensibilidad
- **Nuevas Asignaturas**: Agregar en `academicData`
- **Más Grados**: Expandir estructura de datos
- **Períodos Personalizados**: Modificar `periodData`
- **Campos Adicionales**: Extender tablas HTML

## 📝 Valor Agregado

### Para Docentes
- ✅ Ahorra 80% del tiempo en planeación
- ✅ Garantiza cumplimiento curricular
- ✅ Formato estándar institucional
- ✅ Contenido editable y personalizable

### Para Instituciones
- ✅ Unificación de documentos académicos
- ✅ Trazabilidad del proceso educativo
- ✅ Facilita supervisión académica
- ✅ Base de datos de metodologías

### Características Técnicas
- ✅ Sin dependencias externas
- ✅ Funciona offline (datos locales)
- ✅ Responsive design
- ✅ Exportación nativa a Word