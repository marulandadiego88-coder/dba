import API_CONFIG from './config.js';
import DBA_CIENCIAS_NATURALES from './dbaData.js';

class GeminiService {
    constructor() {
        this.apiKey = API_CONFIG.GEMINI_API_KEY;
        this.apiUrl = API_CONFIG.GEMINI_API_URL;
        console.log('GeminiService inicializado para búsqueda en INTERNET de DBA oficiales del MEN Colombia (grados 6°-11°)');
    }

    async generateAcademicContent(materia, grado, periodo) {
        console.log(`Generando contenido IA para ${materia}, grado ${grado}, periodo ${periodo}...`);
        this.currentGrado = grado; // Guardar para uso en fallback
        const prompt = this.createPrompt(materia, grado, periodo);
        
        try {
            console.log('Realizando petición a Gemini API para buscar DBA oficiales...');
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,  // Menor temperatura para respuestas más precisas
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048
                    }
                })
            });

            console.log('Respuesta recibida, status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en respuesta API:', errorText);
                throw new Error(`Error HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Datos JSON recibidos con DBA oficiales:', data);
            return this.parseResponse(data);
        } catch (error) {
            console.error(`Error al generar contenido para periodo ${periodo}:`, error);
            
            // Si es un error de CORS o red, informar al usuario
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.warn('Posible error de CORS o conectividad. Usando contenido de respaldo con DBA básicos.');
            }
            
            throw error;
        }
    }

    createPrompt(materia, grado, periodo) {
        // Prompt específico para Ciencias Naturales-Biología
        if (materia === 'biologia' || materia === 'ciencias') {
            return `Proporciona los Derechos Básicos de Aprendizaje (DBA) oficiales del Ministerio de Educación Nacional de Colombia para Ciencias Naturales, específicamente para grado ${grado}° y periodo académico ${periodo}.

Usa tu conocimiento sobre DBA oficiales del MEN Colombia:
- DBA de Ciencias Naturales grados 6° a 11°
- Estándares básicos de competencias
- Competencias científicas: indagación, explicación, uso del conocimiento

PARA GRADO ${grado}° PERIODO ${periodo} de 4 periodos académicos:
1. DBA específico con número y descripción exacta
2. Estándares de competencias correspondientes
3. Competencias científicas del MEN
4. Contenidos apropiados para este periodo específico

Genera contenido para PERIODO ${periodo}:

{
    "dba": "DBA oficial exacto del MEN para grado ${grado}° (incluye número del DBA, ej: DBA 1, DBA 2, etc. y descripción textual completa tal como aparece en el documento oficial)",
    "estandares": "Estándares básicos de competencias en Ciencias Naturales para grado ${grado}° según documento oficial del MEN",
    "competencias": "Las tres competencias científicas oficiales del MEN: 1) Indagación, 2) Explicación de fenómenos, 3) Uso comprensivo del conocimiento científico",
    "temas": ["temas específicos basados en los DBA encontrados", "conceptos científicos del DBA", "contenidos curriculares oficiales"],
    "objetivos": ["objetivos alineados con DBA oficial", "metas de aprendizaje del MEN", "logros esperados según DBA"],
    "metodologia": "Metodología de enseñanza de las ciencias basada en indagación científica según lineamientos MEN",
    "actividades": ["actividades experimentales sugeridas en DBA", "prácticas de laboratorio", "proyectos de investigación escolar"],
    "evaluacion": "Evaluación por competencias científicas según Decreto 1290 y lineamientos MEN para Ciencias Naturales"
}

IMPORTANTE: 
- BUSCA Y USA información actualizada directamente de fuentes oficiales del MEN Colombia
- Incluye el número exacto del DBA (DBA 1, DBA 2, etc.) y su descripción completa
- Verifica que sea para grado ${grado}° específicamente
- Usa terminología oficial del Ministerio de Educación Nacional`;
        }
        
        // Prompt general para otras materias
        return `Genera contenido académico para:
- Materia: ${materia}
- Grado: ${grado}
- Periodo: ${periodo}

Proporciona el contenido en formato JSON con esta estructura exacta:
{
    "dba": "Derechos Básicos de Aprendizaje específicos",
    "estandares": "Estándares curriculares aplicables",
    "competencias": "Competencias a desarrollar",
    "temas": ["tema1", "tema2", "tema3"],
    "objetivos": ["objetivo1", "objetivo2", "objetivo3"],
    "metodologia": "Metodología pedagógica apropiada",
    "actividades": ["actividad1", "actividad2", "actividad3"],
    "evaluacion": "Criterios y métodos de evaluación"
}

El contenido debe ser apropiado para el sistema educativo colombiano y seguir los lineamientos del Ministerio de Educación Nacional.`;
    }

    parseResponse(data) {
        try {
            const content = data.candidates[0].content.parts[0].text;
            console.log('Contenido recibido de Gemini:', content);
            
            // Extraer JSON del texto de respuesta
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                // Limpiar caracteres de control antes de parsear
                const cleanJson = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, '');
                const parsedContent = JSON.parse(cleanJson);
                console.log('DBA extraídos exitosamente:', parsedContent.dba);
                return parsedContent;
            }
            throw new Error('No se pudo extraer JSON de la respuesta');
        } catch (error) {
            console.error('Error al parsear respuesta, usando contenido de respaldo con DBA básicos:', error);
            // Intentar extraer el grado del contexto si está disponible
            const grado = this.currentGrado || 5;
            return this.getFallbackContent(grado);
        }
    }

    async generateDetailedActivities(materia, grado, periodo) {
        console.log(`Generando actividades detalladas para periodo ${periodo}...`);
        const prompt = this.createActivitiesPrompt(materia, grado, periodo);
        
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }

            const data = await response.json();
            return this.parseActivitiesResponse(data);
        } catch (error) {
            console.error('Error generando actividades:', error);
            throw error;
        }
    }

    async generateDetailedEvaluations(materia, grado, periodo) {
        console.log(`Generando evaluaciones detalladas para periodo ${periodo}...`);
        const prompt = this.createEvaluationsPrompt(materia, grado, periodo);
        
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }

            const data = await response.json();
            return this.parseEvaluationsResponse(data);
        } catch (error) {
            console.error('Error generando evaluaciones:', error);
            throw error;
        }
    }

    createActivitiesPrompt(materia, grado, periodo) {
        if (materia === 'biologia' || materia === 'ciencias') {
            return `BUSCA EN INTERNET los DBA oficiales de Ciencias Naturales del Ministerio de Educación Nacional de Colombia para grado ${grado}° y genera actividades pedagógicas específicas para el periodo ${periodo}.

Consulta fuentes oficiales:
- mineducacion.gov.co (DBA Ciencias Naturales grados 6°-11°)
- colombiaaprende.edu.co
- Documentos curriculares oficiales MEN

Basado en los DBA oficiales encontrados, crea 3-4 actividades experimentales:
- Título (relacionado con DBA específico encontrado)
- Objetivo alineado con el DBA oficial
- Duración estimada
- Materiales de laboratorio necesarios
- Desarrollo del método científico paso a paso
- Competencias científicas MEN: indagación, explicación, uso del conocimiento
- Criterios de evaluación por competencias

Incluye actividades de:
- Observación y experimentación científica
- Análisis de datos y gráficas
- Formulación de hipótesis
- Comunicación de resultados

Formato HTML basado en lineamientos oficiales MEN para Ciencias Naturales grado ${grado}°.`;
        }
        
        return `Genera actividades pedagógicas detalladas para:
- Materia: ${materia}
- Grado: ${grado}
- Periodo: ${periodo}

Crea 3-4 actividades completas con:
- Título de la actividad
- Objetivo específico
- Duración estimada
- Materiales necesarios
- Desarrollo paso a paso
- Criterios de evaluación

Formato HTML con estructura clara y profesional para educación colombiana.`;
    }

    createEvaluationsPrompt(materia, grado, periodo) {
        if (materia === 'biologia' || materia === 'ciencias') {
            return `BUSCA EN INTERNET los DBA oficiales de Ciencias Naturales del Ministerio de Educación Nacional de Colombia para grado ${grado}° y genera un sistema de evaluación por competencias científicas para el periodo ${periodo}.

Consulta fuentes oficiales MEN:
- DBA Ciencias Naturales grados 6°-11° (mineducacion.gov.co)
- Decreto 1290 de evaluación
- Lineamientos de evaluación por competencias MEN

Basado en DBA oficiales encontrados, incluye evaluación de las tres competencias científicas oficiales MEN:
1. Indagación (formular preguntas, hipótesis, diseñar experimentos)
2. Explicación de fenómenos (usar conocimiento científico)
3. Uso comprensivo del conocimiento científico (aplicar en contextos)

Sistema de evaluación oficial MEN:
- Evaluación diagnóstica (conocimientos previos)
- Evaluación formativa (proceso de indagación)
- Evaluación sumativa (aplicación conocimiento)

Para cada evaluación especifica:
- Competencia científica MEN evaluada
- Instrumentos oficiales: informes laboratorio, bitácoras, proyectos investigación
- Criterios basados en DBA específicos encontrados
- Rúbricas competencias científicas MEN
- Porcentajes Decreto 1290

Formato HTML según lineamientos oficiales MEN para evaluación Ciencias Naturales grado ${grado}°.`;
        }
        
        return `Genera un sistema de evaluación detallado para:
- Materia: ${materia}
- Grado: ${grado}
- Periodo: ${periodo}

Incluye:
- Evaluación diagnóstica
- Evaluación formativa (continua)
- Evaluación sumativa (final)

Para cada evaluación especifica:
- Tipo y momento
- Instrumentos de evaluación
- Criterios de evaluación
- Porcentaje de calificación
- Rúbricas básicas

Formato HTML con estructura clara para el sistema educativo colombiano.`;
    }

    parseActivitiesResponse(data) {
        try {
            let content = data.candidates[0].content.parts[0].text;
            
            // Extraer solo el contenido HTML del bloque de código
            const htmlMatch = content.match(/```html([\s\S]*?)```/);
            if (htmlMatch) {
                content = htmlMatch[1].trim();
            }
            
            // Si no hay HTML, limpiar markdown y formatear
            if (!content.includes('<')) {
                content = this.convertMarkdownToHTML(content);
            }
            
            return content;
        } catch (error) {
            console.error('Error al parsear actividades:', error);
            throw error;
        }
    }

    parseEvaluationsResponse(data) {
        try {
            let content = data.candidates[0].content.parts[0].text;
            
            // Extraer solo el contenido HTML del bloque de código
            const htmlMatch = content.match(/```html([\s\S]*?)```/);
            if (htmlMatch) {
                content = htmlMatch[1].trim();
            }
            
            // Si no hay HTML, limpiar markdown y formatear
            if (!content.includes('<')) {
                content = this.convertMarkdownToHTML(content);
            }
            
            return content;
        } catch (error) {
            console.error('Error al parsear evaluaciones:', error);
            throw error;
        }
    }

    convertMarkdownToHTML(text) {
        return text
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\* ([^\n]+)/g, '<li>$1</li>')
            .replace(/^### ([^\n]+)/gm, '<h3>$1</h3>')
            .replace(/^## ([^\n]+)/gm, '<h2>$1</h2>')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')
            .replace(/<p><li>/g, '<ul><li>')
            .replace(/<\/li><\/p>/g, '</li></ul>');
    }

    getFallbackContent(grado = 5) {
        // Usar DBA oficiales si están disponibles para el grado
        if (DBA_CIENCIAS_NATURALES[grado]) {
            console.log(`Usando DBA oficial de respaldo para grado ${grado}`);
            return DBA_CIENCIAS_NATURALES[grado];
        }
        
        // Contenido genérico si no hay DBA específico
        return {
            dba: "DBA de Ciencias Naturales - Comprende que los sistemas del cuerpo humano están formados por órganos, tejidos y células y que la estructura de cada tipo de célula está relacionada con la función del tejido que forman",
            estandares: "Estándares de Ciencias Naturales: Identifico estructuras de los seres vivos que les permiten desarrollarse en un entorno y que puedo utilizar como criterios de clasificación",
            competencias: "Competencias científicas: Indagación (formular preguntas y plantear hipótesis), Explicación de fenómenos (usar conocimiento científico), Uso comprensivo del conocimiento científico",
            temas: ["Estructura celular y función", "Sistemas del cuerpo humano", "Clasificación de seres vivos"],
            objetivos: ["Identificar la relación estructura-función en células y tejidos", "Explicar la organización de los sistemas corporales", "Clasificar seres vivos según criterios científicos"],
            metodologia: "Metodología de enseñanza de las ciencias basada en indagación, experimentación y método científico",
            actividades: ["Observación microscópica de células", "Experimentos sobre sistemas corporales", "Clasificación de especímenes biológicos"],
            evaluacion: "Evaluación por competencias científicas: informes de laboratorio (40%), proyectos de investigación (30%), pruebas de aplicación (30%)"
        };
    }
}

export default GeminiService;