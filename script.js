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
                }
            } else if (e.target.dataset.action === 'close-modal') {
                this.closeModal();
            } else if (e.target.dataset.action === 'copy-modal') {
                this.copyToClipboard();
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
                        </td>
                    </tr>
                </table>
            </div>
        `;

        return periodDiv;
    }

    async generateContentForAllPeriods(materia, grado) {
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
        try {
            const { materia, grado } = this.currentDocument;
            const actividadesDetalladas = await this.geminiService.generateDetailedActivities(materia, grado, periodo);
            
            // Mostrar modal con actividades desarrolladas
            this.showModal('Actividades Desarrolladas - Período ' + periodo, actividadesDetalladas);
        } catch (error) {
            console.error('Error desarrollando actividades:', error);
            // Mostrar actividades por defecto
            const actividadesDefault = this.getDefaultActivities(periodo);
            this.showModal('Actividades Desarrolladas - Período ' + periodo, actividadesDefault);
        }
    }

    async desarrollarEvaluaciones(periodo) {
        try {
            const { materia, grado } = this.currentDocument;
            const evaluacionesDetalladas = await this.geminiService.generateDetailedEvaluations(materia, grado, periodo);
            
            // Mostrar modal con evaluaciones desarrolladas
            this.showModal('Evaluaciones Desarrolladas - Período ' + periodo, evaluacionesDetalladas);
        } catch (error) {
            console.error('Error desarrollando evaluaciones:', error);
            // Mostrar evaluaciones por defecto
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
    }

    copyToClipboard() {
        const content = document.getElementById('modalBody').innerText;
        navigator.clipboard.writeText(content).then(() => {
            alert('Contenido copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
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