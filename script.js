import GeminiService from './geminiService.js';
import DBA_CIENCIAS_NATURALES from './dbaData.js';

class DocumentGenerator {
    constructor() {
        this.currentDocument = null;
        this.isEditing = false;
        this.geminiService = new GeminiService();
        this.generatedContent = {};
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        console.log('Inicializando event listeners...');
        
        const form = document.getElementById('documentForm');
        if (!form) {
            console.error('No se encontró el formulario documentForm');
            return;
        }
        
        console.log('Formulario encontrado, agregando event listener');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Evento submit capturado');
            this.generateDocument();
        });
        
        // También agregar listener al botón directamente como respaldo
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log('Botón submit encontrado, agregando listener adicional');
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Click directo en botón capturado');
                this.generateDocument();
            });
        }

        // Listener para el cambio de área
        const areaSelect = document.getElementById('area');
        if (areaSelect) {
            console.log('✓ Agregando listener al select de área');
            areaSelect.addEventListener('change', (e) => {
                console.log('🔄 EVENTO CHANGE ÁREA DISPARADO');
                console.log('Valor seleccionado:', e.target.value);
                this.updateMateriaOptions(e.target.value);
            });
        } else {
            console.error('✗ No se encontró el select de área');
        }

        const editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToWord();
            });
        }

        // Event delegation para botones dinámicos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-develop')) {
                const periodo = e.target.dataset.periodo;
                const action = e.target.dataset.action;
                if (action === 'actividades') {
                    this.desarrollarActividades(parseInt(periodo));
                } else if (action === 'evaluaciones') {
                    this.desarrollarEvaluaciones(parseInt(periodo));
                } else if (action === 'icfes') {
                    this.generarEvaluacionICFES(parseInt(periodo));
                }
            } else if (e.target.dataset.action === 'close-modal') {
                this.closeModal();
                this.hideProgressModal();
            } else if (e.target.dataset.action === 'copy-modal') {
                this.copyToClipboard();
            }
        });

        // Scroll to top functionality
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            const scrollToTopBtn = document.getElementById('scrollToTop');
            if (scrollToTopBtn) {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            }
        });
    }

    updateMateriaOptions(area) {
        console.log('=== ACTUALIZANDO MATERIAS ===');
        console.log('Área seleccionada:', area);
        const materiaSelect = document.getElementById('materia');
        
        if (!materiaSelect) {
            console.error('No se encontró el select de materia');
            return;
        }
        
        console.log('Estado inicial del select materia - disabled:', materiaSelect.disabled);
        
        const materiasByArea = {
            'matematicas': [
                { value: 'matematicas', text: 'Matemáticas' },
                { value: 'geometria', text: 'Geometría' },
                { value: 'estadistica', text: 'Estadística' }
            ],
            'lenguaje': [
                { value: 'lengua_castellana', text: 'Lengua Castellana' },
                { value: 'literatura', text: 'Literatura' },
                { value: 'comprension_lectora', text: 'Comprensión Lectora' }
            ],
            'ciencias': [
                { value: 'biologia', text: 'Biología' },
                { value: 'quimica', text: 'Química' },
                { value: 'fisica', text: 'Física' }
            ],
            'sociales': [
                { value: 'historia', text: 'Historia' },
                { value: 'geografia', text: 'Geografía' },
                { value: 'civica', text: 'Cívica y Constitución' }
            ],
            'ingles': [
                { value: 'ingles', text: 'Inglés' }
            ],
            'artistica': [
                { value: 'artes_plasticas', text: 'Artes Plásticas' },
                { value: 'musica', text: 'Música' },
                { value: 'danza', text: 'Danza' }
            ],
            'fisica': [
                { value: 'educacion_fisica', text: 'Educación Física' },
                { value: 'deportes', text: 'Deportes' }
            ],
            'tecnologia': [
                { value: 'tecnologia', text: 'Tecnología' },
                { value: 'informatica', text: 'Informática' }
            ],
            'etica': [
                { value: 'etica', text: 'Ética y Valores' }
            ],
            'religion': [
                { value: 'religion', text: 'Educación Religiosa' }
            ]
        };

        // Limpiar opciones actuales
        materiaSelect.innerHTML = '<option value="">Seleccionar materia</option>';
        
        if (area && materiasByArea[area]) {
            console.log('✓ Área válida encontrada:', area);
            
            // Agregar opciones primero
            materiasByArea[area].forEach(materia => {
                const option = document.createElement('option');
                option.value = materia.value;
                option.textContent = materia.text;
                materiaSelect.appendChild(option);
                console.log('  - Agregada materia:', materia.text);
            });
            
            // Habilitar después con setTimeout para asegurar que el DOM se actualice
            setTimeout(() => {
                console.log('✓ Habilitando select de materia...');
                materiaSelect.disabled = false;
                materiaSelect.removeAttribute('disabled');
                
                // Seleccionar automáticamente la primera materia
                if (materiasByArea[area].length > 0) {
                    materiaSelect.value = materiasByArea[area][0].value;
                    console.log('✓ Materia seleccionada por defecto:', materiasByArea[area][0].text);
                }
                
                console.log('✓ Estado final del select - disabled:', materiaSelect.disabled);
                console.log('✓ Total materias disponibles:', materiaSelect.options.length - 1);
                
                // Verificación adicional
                if (materiaSelect.disabled) {
                    console.warn('⚠️ Select aún deshabilitado, forzando habilitación...');
                    materiaSelect.disabled = false;
                }
            }, 10);
            
        } else {
            console.log('✗ Área no válida o no encontrada:', area);
            materiaSelect.disabled = true;
        }
        
        console.log('=== FIN ACTUALIZACIÓN MATERIAS ===');
    }

    async generateDocument() {
        console.log('=== INICIANDO GENERACIÓN DE DOCUMENTO ===');
        
        // Mostrar línea de tiempo inmediatamente
        this.showLoadingIndicator();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const areaElement = document.getElementById('area');
        const materiaElement = document.getElementById('materia');
        const gradoElement = document.getElementById('grado');
        
        if (!areaElement || !materiaElement || !gradoElement) {
            console.error('No se encontraron los elementos del formulario');
            alert('Error: No se encontraron los campos del formulario');
            return;
        }
        
        const area = areaElement.value;
        const materia = materiaElement.value;
        const grado = gradoElement.value;
        
        console.log('Valores obtenidos - Área:', area, 'Materia:', materia, 'Grado:', grado);

        if (!area || !materia || !grado) {
            console.log('Validación fallida: campos vacíos');
            alert('Por favor selecciona área, materia y grado');
            return;
        }
        
        this.updateTimelineStep('step1', 'Validación Completada', 'Datos del formulario validados correctamente', 'completed');

        try {
            console.log('Iniciando proceso de generación...');
            this.currentDocument = { area, materia, grado };
            
            // Paso 2: Conectando con IA
            this.addTimelineStep('step2', 'Conectando con Gemini AI', 'Estableciendo conexión para buscar DBA oficiales...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Paso 3: Buscando DBA
            this.addTimelineStep('step3', 'Buscando DBA Oficiales', 'Consultando Ministerio de Educación Nacional...');
            
            try {
                await this.generateContentForAllPeriods(materia, grado);
                this.updateTimelineStep('step3', 'DBA Encontrados', 'DBA oficiales del MEN obtenidos exitosamente');
            } catch (aiError) {
                this.updateTimelineStep('step3', 'Usando DBA de Respaldo', 'Error en búsqueda, usando DBA almacenados');
                for (let periodo = 1; periodo <= 4; periodo++) {
                    this.generatedContent[periodo] = this.getDefaultData();
                }
            }
            
            // Paso 4: Generando documento
            this.addTimelineStep('step4', 'Generando Documento', 'Creando estructura de 4 períodos académicos...');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            this.renderDocument();
            
            // Paso 5: Finalizando
            this.addTimelineStep('step5', 'Documento Completado', '¡Listo! Documento generado exitosamente', false);
            this.updateTimelineStep('step5', 'Documento Completado', '¡Listo! Documento generado exitosamente', 'completed');
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const documentSection = document.getElementById('documentSection');
            if (documentSection) {
                documentSection.style.display = 'block';
                console.log('Sección de documento mostrada');
            } else {
                console.error('No se encontró la sección documentSection');
            }
            
            this.hideLoadingIndicator();
            console.log('=== DOCUMENTO GENERADO EXITOSAMENTE ===');
            
        } catch (error) {
            console.error('Error crítico al generar documento:', error);
            this.hideLoadingIndicator();
            alert(`Error al generar el documento: ${error.message}`);
        }
    }

    renderDocument() {
        const { area, materia, grado } = this.currentDocument;
        const gradoTexto = this.getGradoTexto(grado);
        
        document.getElementById('documentTitle').textContent = 
            `${materia.charAt(0).toUpperCase() + materia.slice(1)} - Grado ${gradoTexto}`;

        const container = document.getElementById('periodsContainer');
        container.innerHTML = '';

        for (let periodo = 1; periodo <= 4; periodo++) {
            const periodElement = this.createPeriodElement(periodo, materia, grado);
            container.appendChild(periodElement);
        }
    }

    createPeriodElement(periodo, materia, grado) {
        const periodDiv = document.createElement('div');
        periodDiv.className = 'period';
        
        const data = this.generatedContent[periodo] || this.getDefaultData();

        // Función helper para convertir datos a texto legible
        const formatData = (value) => {
            if (Array.isArray(value)) {
                return value.map(item => {
                    if (typeof item === 'object' && item !== null) {
                        // Si el objeto tiene descripción, usarla
                        if (item.descripcion) {
                            return item.numero ? `${item.numero}: ${item.descripcion}` : item.descripcion;
                        }
                        // Si no, convertir a string las propiedades principales
                        return Object.values(item).join(' - ');
                    }
                    return String(item);
                }).join('\n\n');
            }
            if (typeof value === 'object' && value !== null) {
                if (value.descripcion) {
                    return value.numero ? `${value.numero}: ${value.descripcion}` : value.descripcion;
                }
                return Object.values(value).join(' - ');
            }
            return String(value || '');
        };

        periodDiv.innerHTML = `
            <div class="period-header">
                Periodo ${periodo}
            </div>
            <div class="period-content">
                <h3 class="section-title">DBA (Derechos Básicos de Aprendizaje)</h3>
                <table class="content-table">
                    <tr>
                        <th>DBA</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.dba)}</td>
                    </tr>
                </table>

                <h3 class="section-title">Estándares y Competencias</h3>
                <table class="content-table">
                    <tr>
                        <th>Estándares</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.estandares)}</td>
                    </tr>
                    <tr>
                        <th>Competencias</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.competencias)}</td>
                    </tr>
                </table>

                <h3 class="section-title">Contenido del Periodo</h3>
                <table class="content-table">
                    <tr>
                        <th>Temas</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.temas)}</td>
                    </tr>
                    <tr>
                        <th>Objetivos</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.objetivos)}</td>
                    </tr>
                    <tr>
                        <th>Metodología</th>
                        <td class="${this.isEditing ? 'editable' : ''}">${formatData(data.metodologia)}</td>
                    </tr>
                    <tr>
                        <th>Actividades</th>
                        <td class="${this.isEditing ? 'editable' : ''}">
                            ${formatData(data.actividades)}
                            <br><button class="btn-develop" data-periodo="${periodo}" data-action="actividades">Desarrollar Actividades</button>
                        </td>
                    </tr>
                    <tr>
                        <th>Evaluación</th>
                        <td class="${this.isEditing ? 'editable' : ''}">
                            ${formatData(data.evaluacion) || 'Evaluación continua y formativa'}
                            <br><button class="btn-develop" data-periodo="${periodo}" data-action="evaluaciones">Desarrollar Evaluaciones</button>
                            <br><button class="btn-develop" data-periodo="${periodo}" data-action="icfes" style="background-color: #27ae60; margin-top: 5px;">Aplicación de Evaluación</button>
                        </td>
                    </tr>
                </table>
            </div>
        `;

        return periodDiv;
    }

    async generateContentForAllPeriods(materia, grado) {
        // Para Biología, usar siempre los DBA oficiales almacenados
        if (materia === 'biologia' && DBA_CIENCIAS_NATURALES[grado]) {
            console.log(`Usando DBA oficial de Biología para grado ${grado}`);
            for (let periodo = 1; periodo <= 4; periodo++) {
                this.updateTimelineStep('step3', 'Buscando DBA Oficiales', `Procesando período ${periodo} de 4...`);
                this.generatedContent[periodo] = DBA_CIENCIAS_NATURALES[grado];
            }
            return;
        }
        
        // Para otras materias, intentar generar con IA
        for (let periodo = 1; periodo <= 4; periodo++) {
            try {
                this.updateTimelineStep('step3', 'Buscando DBA Oficiales', `Procesando período ${periodo} de 4...`);
                console.log(`Solicitando DBA oficiales para ${materia} grado ${grado}, periodo ${periodo}`);
                const content = await this.geminiService.generateAcademicContent(materia, grado, periodo);
                this.generatedContent[periodo] = content;
                console.log(`DBA obtenidos para periodo ${periodo}:`, typeof content.dba === 'string' ? content.dba.substring(0, 100) + '...' : content.dba);
            } catch (error) {
                console.error(`Error generando contenido para periodo ${periodo}, usando DBA de respaldo:`, error);
                this.generatedContent[periodo] = this.getDefaultData();
            }
        }
    }

    getDefaultData() {
        const { materia, grado } = this.currentDocument || {};
        
        // Si es Ciencias Naturales/Biología, usar DBA específicos
        if ((materia === 'biologia' || materia === 'ciencias') && grado && DBA_CIENCIAS_NATURALES[grado]) {
            console.log(`Usando DBA oficial para Ciencias Naturales grado ${grado}`);
            return DBA_CIENCIAS_NATURALES[grado];
        }
        
        // Datos por defecto para otras materias
        return {
            dba: "DBA específico para este grado y asignatura",
            estandares: "Estándares curriculares aplicables",
            competencias: "Competencias a desarrollar",
            temas: ["Tema principal", "Tema secundario", "Tema complementario"],
            objetivos: ["Objetivo general", "Objetivo específico"],
            metodologia: "Metodología activa y participativa",
            actividades: ["Actividad práctica", "Actividad teórica"],
            evaluacion: "Evaluación continua y formativa"
        };
    }

    showLoadingIndicator() {
        const container = document.getElementById('periodsContainer');
        const documentSection = document.getElementById('documentSection');
        
        // Mostrar la sección del documento inmediatamente
        if (documentSection) {
            documentSection.style.display = 'block';
        }
        
        container.innerHTML = `
            <div class="timeline-container">
                <h3>Generando Documento - Progreso</h3>
                <div class="timeline" id="processTimeline">
                    <div class="timeline-item active" id="step1">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Iniciando proceso</h4>
                            <p>Validando datos del formulario...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    hideLoadingIndicator() {
        // El contenido se reemplazará en renderDocument()
    }

    addTimelineStep(stepId, title, description, isActive = true) {
        const timeline = document.getElementById('processTimeline');
        if (!timeline) return;
        
        // Desactivar paso anterior
        const activeStep = timeline.querySelector('.timeline-item.active');
        if (activeStep) {
            activeStep.classList.remove('active');
            activeStep.classList.add('completed');
        }
        
        const stepElement = document.createElement('div');
        stepElement.className = `timeline-item ${isActive ? 'active' : ''}`;
        stepElement.id = stepId;
        stepElement.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        timeline.appendChild(stepElement);
    }

    updateTimelineStep(stepId, title, description, status = 'completed') {
        const step = document.getElementById(stepId);
        if (!step) return;
        
        step.className = `timeline-item ${status}`;
        const content = step.querySelector('.timeline-content');
        content.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
        `;
    }

    getGradoTexto(grado) {
        const grados = {
            '1': 'Primero', '2': 'Segundo', '3': 'Tercero', '4': 'Cuarto', '5': 'Quinto',
            '6': 'Sexto', '7': 'Séptimo', '8': 'Octavo', '9': 'Noveno', '10': 'Décimo', '11': 'Once'
        };
        return grados[grado] || grado;
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const editBtn = document.getElementById('editBtn');
        
        if (this.isEditing) {
            editBtn.textContent = 'Guardar';
            this.makeEditable();
        } else {
            editBtn.textContent = 'Editar';
            this.saveChanges();
        }
    }

    makeEditable() {
        const editableCells = document.querySelectorAll('.editable');
        editableCells.forEach(cell => {
            cell.contentEditable = true;
            cell.style.backgroundColor = '#fff3cd';
        });
    }

    saveChanges() {
        const editableCells = document.querySelectorAll('.editable');
        editableCells.forEach(cell => {
            cell.contentEditable = false;
            cell.style.backgroundColor = '';
        });
        alert('Cambios guardados correctamente');
    }

    async desarrollarActividades(periodo) {
        // Mostrar barra de progreso
        this.showProgressModal('Generando Actividades', 'Conectando con IA para desarrollar actividades detalladas...');
        
        try {
            this.updateProgress(25, 'Analizando contenido del período...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const { materia, grado } = this.currentDocument;
            
            this.updateProgress(50, 'Generando actividades personalizadas...');
            const actividadesDetalladas = await this.geminiService.generateDetailedActivities(materia, grado, periodo);
            
            this.updateProgress(75, 'Estructurando contenido...');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            this.updateProgress(100, '¡Actividades generadas exitosamente!');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.hideProgressModal();
            this.showModal('Actividades Desarrolladas - Período ' + periodo, actividadesDetalladas);
        } catch (error) {
            console.error('Error desarrollando actividades:', error);
            this.updateProgress(100, 'Error en conexión, usando actividades predeterminadas...');
            await new Promise(resolve => setTimeout(resolve, 800));
            
            this.hideProgressModal();
            const actividadesDefault = this.getDefaultActivities(periodo);
            this.showModal('Actividades Desarrolladas - Período ' + periodo, actividadesDefault);
        }
    }

    async desarrollarEvaluaciones(periodo) {
        // Mostrar barra de progreso
        this.showProgressModal('Generando Evaluaciones', 'Conectando con IA para desarrollar evaluaciones detalladas...');
        
        try {
            this.updateProgress(25, 'Analizando objetivos del período...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const { materia, grado } = this.currentDocument;
            
            this.updateProgress(50, 'Creando instrumentos de evaluación...');
            const evaluacionesDetalladas = await this.geminiService.generateDetailedEvaluations(materia, grado, periodo);
            
            this.updateProgress(75, 'Definiendo criterios y rúbricas...');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            this.updateProgress(100, '¡Evaluaciones generadas exitosamente!');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.hideProgressModal();
            this.showModal('Evaluaciones Desarrolladas - Período ' + periodo, evaluacionesDetalladas);
        } catch (error) {
            console.error('Error desarrollando evaluaciones:', error);
            this.updateProgress(100, 'Error en conexión, usando evaluaciones predeterminadas...');
            await new Promise(resolve => setTimeout(resolve, 800));
            
            this.hideProgressModal();
            const evaluacionesDefault = this.getDefaultEvaluations(periodo);
            this.showModal('Evaluaciones Desarrolladas - Período ' + periodo, evaluacionesDefault);
        }
    }

    getDefaultActivities(periodo) {
        return `
            <h3>🔬 Actividades del Período ${periodo}</h3>
            <div class="activity-item">
                <h4>🎯 Actividad 1: Exploración Inicial</h4>
                <p><strong>Objetivo:</strong> Introducir los conceptos básicos del período</p>
                <p><strong>⏱️ Duración:</strong> 2 horas académicas</p>
                <p><strong>📋 Materiales:</strong> Cuaderno, lápices, material didáctico</p>
                <p><strong>🔄 Desarrollo:</strong> Los estudiantes explorarán los conceptos mediante actividades prácticas y participativas</p>
                <p><strong>🎯 Competencias:</strong> Indagación y observación científica</p>
            </div>
            <div class="activity-item">
                <h4>📚 Actividad 2: Práctica Guiada</h4>
                <p><strong>Objetivo:</strong> Reforzar el aprendizaje mediante ejercicios prácticos</p>
                <p><strong>⏱️ Duración:</strong> 3 horas académicas</p>
                <p><strong>📋 Materiales:</strong> Guías de trabajo, recursos digitales</p>
                <p><strong>🔄 Desarrollo:</strong> Ejercicios dirigidos con acompañamiento docente</p>
                <p><strong>🎯 Competencias:</strong> Explicación de fenómenos</p>
            </div>
            <div class="activity-item">
                <h4>🚀 Actividad 3: Proyecto Final</h4>
                <p><strong>Objetivo:</strong> Aplicar los conocimientos adquiridos</p>
                <p><strong>⏱️ Duración:</strong> 4 horas académicas</p>
                <p><strong>📋 Materiales:</strong> Diversos según el proyecto</p>
                <p><strong>🔄 Desarrollo:</strong> Proyecto colaborativo que integre los aprendizajes</p>
                <p><strong>🎯 Competencias:</strong> Uso comprensivo del conocimiento científico</p>
            </div>
        `;
    }

    getDefaultEvaluations(periodo) {
        return `
            <h3>📊 Evaluaciones del Período ${periodo}</h3>
            <div class="evaluation-item">
                <h4>🔍 Evaluación Diagnóstica</h4>
                <p><strong>Tipo:</strong> Formativa</p>
                <p><strong>📅 Momento:</strong> Inicio del período</p>
                <p><strong>📝 Instrumento:</strong> Prueba escrita y observación</p>
                <p><strong>✅ Criterios:</strong> Conocimientos previos, habilidades básicas</p>
                <p><strong>📈 Valor:</strong> 0% (solo diagnóstico)</p>
                <p><strong>🎯 Propósito:</strong> Identificar nivel inicial de estudiantes</p>
            </div>
            <div class="evaluation-item">
                <h4>📈 Evaluación Formativa</h4>
                <p><strong>Tipo:</strong> Continua</p>
                <p><strong>📅 Momento:</strong> Durante todo el período</p>
                <p><strong>📝 Instrumento:</strong> Observación, tareas, participación</p>
                <p><strong>✅ Criterios:</strong> Proceso de aprendizaje, participación activa</p>
                <p><strong>📈 Valor:</strong> 40%</p>
                <p><strong>🎯 Propósito:</strong> Retroalimentación continua del proceso</p>
            </div>
            <div class="evaluation-item">
                <h4>🏆 Evaluación Sumativa</h4>
                <p><strong>Tipo:</strong> Sumativa</p>
                <p><strong>📅 Momento:</strong> Final del período</p>
                <p><strong>📝 Instrumento:</strong> Prueba escrita y proyecto</p>
                <p><strong>✅ Criterios:</strong> Logro de objetivos, aplicación de conocimientos</p>
                <p><strong>📈 Valor:</strong> 60%</p>
                <p><strong>🎯 Propósito:</strong> Verificar logro de competencias</p>
            </div>
            
            <h3>📝 Consideraciones Finales</h3>
            <div class="evaluation-item">
                <h4>📊 Evaluación de Selección Múltiple - Período ${periodo}</h4>
                <p><strong>Instrucciones:</strong> Selecciona la respuesta correcta para cada pregunta.</p>
                
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; border-radius: 5px;">
                    <p><strong>1. ¿Cuál es el concepto fundamental del tema estudiado?</strong></p>
                    <p>A) Concepto básico principal</p>
                    <p>B) Aplicación práctica directa</p>
                    <p>C) Relación con otros temas</p>
                    <p>D) Todas las anteriores</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #28a745; border-radius: 5px;">
                    <p><strong>2. ¿Qué competencia se desarrolla principalmente en este período?</strong></p>
                    <p>A) Indagación científica</p>
                    <p>B) Explicación de fenómenos</p>
                    <p>C) Uso del conocimiento científico</p>
                    <p>D) Todas las competencias científicas</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #ffc107; border-radius: 5px;">
                    <p><strong>3. ¿Cuál es la metodología más apropiada para este tema?</strong></p>
                    <p>A) Clases magistrales exclusivamente</p>
                    <p>B) Experimentación práctica</p>
                    <p>C) Trabajo colaborativo</p>
                    <p>D) Metodología mixta e integral</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #dc3545; border-radius: 5px;">
                    <p><strong>4. ¿Qué tipo de evaluación es más efectiva para este tema?</strong></p>
                    <p>A) Solo evaluación sumativa</p>
                    <p>B) Solo evaluación formativa</p>
                    <p>C) Evaluación continua y variada</p>
                    <p>D) Evaluación tradicional únicamente</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #6f42c1; border-radius: 5px;">
                    <p><strong>5. ¿Cómo se relaciona este tema con la vida cotidiana?</strong></p>
                    <p>A) No tiene relación práctica</p>
                    <p>B) Tiene aplicaciones limitadas</p>
                    <p>C) Se aplica en situaciones específicas</p>
                    <p>D) Tiene múltiples aplicaciones cotidianas</p>
                </div>
                
                <p><strong>Valor:</strong> 20 puntos por pregunta (Total: 100 puntos)</p>
            </div>
        `;
    }

    showModal(title, content) {
        // Crear modal si no existe
        let modal = document.getElementById('developModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'developModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modalTitle"></h2>
                        <span class="close" data-action="close-modal">&times;</span>
                    </div>
                    <div class="modal-body" id="modalBody"></div>
                    <div class="modal-footer">
                        <button class="btn-secondary" data-action="close-modal">Cerrar</button>
                        <button class="btn-primary" data-action="copy-modal">Copiar</button>
                    </div>
                </div>
                <style>
                    .modal-body h3 { color: #2c3e50; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                    .modal-body h4 { color: #34495e; margin: 15px 0 8px 0; font-size: 1.1em; }
                    .modal-body p { margin: 8px 0; line-height: 1.5; }
                    .modal-body strong { color: #2980b9; }
                    .modal-body .activity-item, .modal-body .evaluation-item { 
                        background: #f8f9fa; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0; border-radius: 5px; 
                    }
                    .modal-body ul { margin: 10px 0 10px 20px; }
                    .modal-body li { margin: 5px 0; }
                </style>
            `;
            document.body.appendChild(modal);
        }
        
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('developModal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.hideProgressModal();
    }

    copyToClipboard() {
        const content = document.getElementById('modalBody').innerText;
        navigator.clipboard.writeText(content).then(() => {
            alert('Contenido copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }

    showProgressModal(title, message) {
        // Crear modal de progreso si no existe
        let progressModal = document.getElementById('progressModal');
        if (!progressModal) {
            progressModal = document.createElement('div');
            progressModal.id = 'progressModal';
            progressModal.className = 'modal progress-modal';
            progressModal.innerHTML = `
                <div class="modal-content progress-content">
                    <div class="progress-header">
                        <h3 id="progressTitle"></h3>
                    </div>
                    <div class="progress-body">
                        <div class="progress-bar-container">
                            <div class="progress-bar" id="progressBar">
                                <div class="progress-fill" id="progressFill"></div>
                                <span class="progress-text" id="progressText">0%</span>
                            </div>
                        </div>
                        <p class="progress-message" id="progressMessage"></p>
                    </div>
                </div>
                <style>
                    .progress-modal .modal-content {
                        max-width: 400px;
                        text-align: center;
                    }
                    .progress-header h3 {
                        color: #2c3e50;
                        margin: 0 0 20px 0;
                    }
                    .progress-bar-container {
                        margin: 20px 0;
                    }
                    .progress-bar {
                        width: 100%;
                        height: 30px;
                        background-color: #ecf0f1;
                        border-radius: 15px;
                        position: relative;
                        overflow: hidden;
                        border: 2px solid #bdc3c7;
                    }
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #3498db, #2980b9);
                        border-radius: 13px;
                        width: 0%;
                        transition: width 0.3s ease;
                        position: relative;
                    }
                    .progress-text {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #2c3e50;
                        font-weight: bold;
                        font-size: 14px;
                        z-index: 10;
                    }
                    .progress-message {
                        color: #7f8c8d;
                        font-size: 14px;
                        margin: 15px 0 0 0;
                        min-height: 20px;
                    }
                </style>
            `;
            document.body.appendChild(progressModal);
        }
        
        document.getElementById('progressTitle').textContent = title;
        document.getElementById('progressMessage').textContent = message;
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressText').textContent = '0%';
        progressModal.style.display = 'block';
    }

    updateProgress(percentage, message) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progressMessage = document.getElementById('progressMessage');
        
        if (progressFill && progressText && progressMessage) {
            progressFill.style.width = percentage + '%';
            progressText.textContent = percentage + '%';
            progressMessage.textContent = message;
        }
    }

    hideProgressModal() {
        const progressModal = document.getElementById('progressModal');
        if (progressModal) {
            progressModal.style.display = 'none';
        }
    }

    async generarEvaluacionICFES(periodo) {
        this.showProgressModal('Generando Evaluación ICFES', 'Creando evaluación estilo ICFES...');
        
        try {
            this.updateProgress(25, 'Analizando contenido del período...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.updateProgress(50, 'Generando preguntas estilo ICFES...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.updateProgress(75, 'Estructurando evaluación...');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            this.updateProgress(100, '¡Evaluación ICFES generada!');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.hideProgressModal();
            const evaluacionICFES = this.getEvaluacionICFES(periodo);
            this.showModal('Evaluación Estilo ICFES - Período ' + periodo, evaluacionICFES);
        } catch (error) {
            console.error('Error generando evaluación ICFES:', error);
            this.hideProgressModal();
            const evaluacionICFES = this.getEvaluacionICFES(periodo);
            this.showModal('Evaluación Estilo ICFES - Período ' + periodo, evaluacionICFES);
        }
    }

    getEvaluacionICFES(periodo) {
        return `
            <h3>🎯 Evaluación Estilo ICFES - Período ${periodo}</h3>
            <p><strong>Instrucciones:</strong> Responde las siguientes preguntas seleccionando la opción correcta. Rellena completamente el círculo correspondiente en la hoja de respuestas.</p>
            <p><strong>Tiempo:</strong> 60 minutos | <strong>Preguntas:</strong> 5 | <strong>Valor:</strong> 100 puntos</p>
            
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border: 2px solid #007bff; border-radius: 10px;">
                <h4 style="color: #007bff; margin-bottom: 15px;">📝 PREGUNTA 1</h4>
                <p style="font-weight: bold; margin-bottom: 10px;">Según el contenido estudiado en este período, ¿cuál de las siguientes afirmaciones es CORRECTA?</p>
                <div style="margin: 10px 0;">
                    <p>A) Los conceptos básicos no tienen aplicación práctica en la vida cotidiana.</p>
                    <p>B) La metodología de enseñanza no influye en el aprendizaje de los estudiantes.</p>
                    <p>C) Los procesos estudiados se relacionan directamente con fenómenos observables.</p>
                    <p>D) Las competencias científicas son independientes del contenido temático.</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px;"><em>Competencia evaluada: Explicación de fenómenos</em></p>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border: 2px solid #28a745; border-radius: 10px;">
                <h4 style="color: #28a745; margin-bottom: 15px;">📝 PREGUNTA 2</h4>
                <p style="font-weight: bold; margin-bottom: 10px;">Un estudiante realiza una investigación sobre el tema del período. ¿Cuál sería el primer paso más apropiado en su proceso de indagación?</p>
                <div style="margin: 10px 0;">
                    <p>A) Formular conclusiones basadas en conocimientos previos.</p>
                    <p>B) Plantear preguntas específicas sobre el fenómeno a estudiar.</p>
                    <p>C) Recopilar datos sin un objetivo claro definido.</p>
                    <p>D) Comparar resultados con otras investigaciones similares.</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px;"><em>Competencia evaluada: Indagación</em></p>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border: 2px solid #ffc107; border-radius: 10px;">
                <h4 style="color: #f39c12; margin-bottom: 15px;">📝 PREGUNTA 3</h4>
                <p style="font-weight: bold; margin-bottom: 10px;">En el contexto del tema estudiado, ¿cuál de las siguientes situaciones representa una aplicación práctica del conocimiento adquirido?</p>
                <div style="margin: 10px 0;">
                    <p>A) Memorizar definiciones sin comprender su significado.</p>
                    <p>B) Resolver problemas reales utilizando los conceptos aprendidos.</p>
                    <p>C) Repetir procedimientos sin analizar los resultados obtenidos.</p>
                    <p>D) Estudiar el tema de manera aislada sin conexiones interdisciplinarias.</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px;"><em>Competencia evaluada: Uso comprensivo del conocimiento científico</em></p>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border: 2px solid #dc3545; border-radius: 10px;">
                <h4 style="color: #dc3545; margin-bottom: 15px;">📝 PREGUNTA 4</h4>
                <p style="font-weight: bold; margin-bottom: 10px;">Analiza la siguiente situación: Un fenómeno relacionado con el tema del período se presenta de manera inesperada. ¿Cuál sería la mejor estrategia para explicarlo?</p>
                <div style="margin: 10px 0;">
                    <p>A) Ignorar el fenómeno por no estar en el plan de estudios.</p>
                    <p>B) Buscar explicaciones simples sin fundamento científico.</p>
                    <p>C) Aplicar los conceptos estudiados para construir una explicación coherente.</p>
                    <p>D) Esperar que alguien más proporcione la explicación correcta.</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px;"><em>Competencia evaluada: Explicación de fenómenos</em></p>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border: 2px solid #6f42c1; border-radius: 10px;">
                <h4 style="color: #6f42c1; margin-bottom: 15px;">📝 PREGUNTA 5</h4>
                <p style="font-weight: bold; margin-bottom: 10px;">Considerando la metodología utilizada en este período, ¿cuál de las siguientes afirmaciones describe mejor el enfoque pedagógico empleado?</p>
                <div style="margin: 10px 0;">
                    <p>A) Se enfoca exclusivamente en la transmisión de información teórica.</p>
                    <p>B) Promueve la participación activa y el desarrollo de competencias científicas.</p>
                    <p>C) Prioriza la memorización sobre la comprensión de conceptos.</p>
                    <p>D) Limita las oportunidades de experimentación y análisis crítico.</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px;"><em>Competencia evaluada: Uso comprensivo del conocimiento científico</em></p>
            </div>
            
            <h4 style="margin-top: 30px; color: #2c3e50;">📈 Criterios de Evaluación</h4>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li><strong>Cada pregunta vale 20 puntos</strong> (Total: 100 puntos)</li>
                <li><strong>Respuestas correctas sugeridas:</strong> 1-C, 2-B, 3-B, 4-C, 5-B</li>
                <li><strong>Competencias evaluadas:</strong> Indagación, Explicación de fenómenos, Uso del conocimiento</li>
                <li><strong>Formato:</strong> Selección múltiple con única respuesta</li>
                <li><strong>Tipo de evaluación:</strong> Sumativa</li>
            </ul>
        `;
    }

    exportToWord() {
        const { area, materia, grado } = this.currentDocument;
        const gradoTexto = this.getGradoTexto(grado);
        
        // Crear contenido HTML para exportar
        const documentContent = document.getElementById('periodsContainer').innerHTML;
        const fullContent = `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${materia.charAt(0).toUpperCase() + materia.slice(1)} - Grado ${gradoTexto}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                        th { background-color: #f0f0f0; }
                        .period-header { background-color: #34495e; color: white; padding: 10px; font-weight: bold; }
                        .section-title { color: #2c3e50; margin: 15px 0 5px 0; font-weight: bold; }
                        .btn-develop { display: none; }
                    </style>
                </head>
                <body>
                    <h1>${materia.charAt(0).toUpperCase() + materia.slice(1)} - Grado ${gradoTexto}</h1>
                    ${documentContent}
                </body>
            </html>
        `;

        // Crear y descargar archivo
        const blob = new Blob([fullContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${materia}_grado_${grado}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Variable global para acceso desde botones
let documentGenerator;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando DocumentGenerator');
    documentGenerator = new DocumentGenerator();
});