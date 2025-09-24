// Datos de respaldo con DBA oficiales de Ciencias Naturales del MEN Colombia
// Basados en los Derechos Básicos de Aprendizaje más recientes

const DBA_CIENCIAS_NATURALES = {
    // PRIMARIA
    1: {
        dba: "DBA 1: Comprende que los sentidos le permiten percibir algunas características de los objetos que nos rodean (temperatura, sabor, sonidos, olor, color, texturas y formas).",
        estandares: "Identifico características de los seres vivos y objetos inertes, establezco semejanzas y diferencias entre ellos y los clasifico.",
        competencias: "Indagación: Observar y describir características. Explicación: Relacionar los sentidos con la percepción. Uso del conocimiento: Aplicar en situaciones cotidianas.",
        temas: ["Los cinco sentidos", "Características de los objetos", "Percepción del entorno", "Cuidado de los sentidos"],
        objetivos: ["Identificar los cinco sentidos y sus funciones", "Describir características de objetos usando los sentidos", "Reconocer la importancia del cuidado de los sentidos"],
        metodologia: "Exploración sensorial directa, juegos de percepción, experimentos sencillos con diferentes texturas, sabores y sonidos",
        actividades: ["Caja de texturas para explorar con el tacto", "Degustación de diferentes sabores", "Identificación de sonidos del entorno"],
        evaluacion: "Observación directa de la exploración sensorial, registro de descripciones, actividades lúdicas de identificación"
    },
    
    2: {
        dba: "DBA 2: Comprende que los seres vivos (plantas y animales) tienen características que los distinguen de los objetos no vivos y que pueden agruparse atendiendo a estas características.",
        estandares: "Identifico características de los seres vivos y objetos inertes, establezco semejanzas y diferencias entre ellos y los clasifico.",
        competencias: "Indagación: Formular preguntas sobre seres vivos. Explicación: Distinguir vivos de no vivos. Uso del conocimiento: Clasificar según características.",
        temas: ["Seres vivos y no vivos", "Características de plantas y animales", "Clasificación básica", "Necesidades de los seres vivos"],
        objetivos: ["Diferenciar seres vivos de objetos inertes", "Identificar características básicas de plantas y animales", "Agrupar seres vivos según criterios simples"],
        metodologia: "Observación directa en el entorno, comparación de características, clasificación con material concreto",
        actividades: ["Salida de campo para observar seres vivos", "Clasificación de imágenes", "Cuidado de una planta en el aula"],
        evaluacion: "Registro de observaciones, clasificaciones realizadas, explicaciones orales sobre diferencias"
    },

    3: {
        dba: "DBA 3: Comprende que los seres vivos se relacionan con su entorno intercambiando energía y que los cambios en el entorno afectan a los seres vivos.",
        estandares: "Identifico necesidades de los seres vivos y explico la importancia de un ambiente sano.",
        competencias: "Indagación: Observar relaciones ser vivo-ambiente. Explicación: Explicar intercambios de energía. Uso del conocimiento: Predecir efectos de cambios ambientales.",
        temas: ["Relaciones ser vivo-ambiente", "Intercambio de energía", "Adaptaciones al medio", "Cambios ambientales"],
        objetivos: ["Explicar cómo los seres vivos obtienen energía", "Identificar adaptaciones al medio ambiente", "Reconocer efectos de cambios ambientales"],
        metodologia: "Observación de ecosistemas locales, experimentos sobre necesidades de plantas, análisis de adaptaciones",
        actividades: ["Experimento de germinación en diferentes condiciones", "Observación de adaptaciones de animales", "Análisis de cadenas alimentarias simples"],
        evaluacion: "Informes de experimentos, dibujos explicativos, presentaciones sobre adaptaciones"
    },

    4: {
        dba: "DBA 4: Comprende que la magnitud y la dirección en que se aplique una fuerza puede producir cambios en la forma como se mueve un objeto.",
        estandares: "Identifico y describo la utilidad de algunos objetos y técnicas desarrollados por el ser humano y reconozco que somos agentes de cambio en el entorno y en la sociedad.",
        competencias: "Indagación: Experimentar con fuerzas y movimiento. Explicación: Relacionar fuerza con cambios de movimiento. Uso del conocimiento: Aplicar en situaciones cotidianas.",
        temas: ["Fuerzas y movimiento", "Dirección y magnitud de fuerzas", "Cambios en el movimiento", "Máquinas simples"],
        objetivos: ["Identificar diferentes tipos de fuerzas", "Explicar cómo las fuerzas cambian el movimiento", "Reconocer máquinas simples en el entorno"],
        metodologia: "Experimentación con objetos cotidianos, construcción de máquinas simples, análisis de movimientos",
        actividades: ["Experimentos con planos inclinados", "Construcción de palancas simples", "Análisis del movimiento de pelotas"],
        evaluacion: "Registro de experimentos, construcción de dispositivos, explicaciones sobre fuerzas observadas"
    },

    5: {
        dba: "DBA 5: Comprende que los sistemas del cuerpo humano están formados por órganos, tejidos y células y que la estructura de cada tipo de célula está relacionada con la función del tejido que forman.",
        estandares: "Explico la importancia de la célula como unidad básica de los seres vivos.",
        competencias: "Indagación: Observar estructuras microscópicas. Explicación: Relacionar estructura con función. Uso del conocimiento: Aplicar a cuidado del cuerpo.",
        temas: ["La célula como unidad básica", "Tejidos y órganos", "Sistemas del cuerpo humano", "Relación estructura-función"],
        objetivos: ["Identificar la célula como unidad básica de la vida", "Explicar la organización del cuerpo humano", "Relacionar estructura celular con función"],
        metodologia: "Observación microscópica, modelos anatómicos, experimentos sobre funciones corporales",
        actividades: ["Observación de células al microscopio", "Construcción de modelos de sistemas corporales", "Experimentos sobre digestión"],
        evaluacion: "Dibujos de observaciones microscópicas, modelos construidos, explicaciones sobre sistemas corporales"
    },

    // SECUNDARIA
    6: {
        dba: "DBA 1: Comprende que en los organismos existen diferentes niveles de organización celular (célula, tejido, órgano, sistema) y que estos se relacionan con las funciones que realizan.",
        estandares: "Explico la estructura de la célula y las funciones básicas de sus componentes.",
        competencias: "Indagación: Diseñar experimentos sobre función celular. Explicación: Explicar niveles de organización. Uso del conocimiento: Relacionar con salud humana.",
        temas: ["Niveles de organización celular", "Función de organelos", "Sistemas corporales", "Homeostasis"],
        objetivos: ["Explicar los niveles de organización en seres vivos", "Identificar funciones de organelos celulares", "Relacionar estructura con función en sistemas"],
        metodologia: "Laboratorio de microscopía, análisis de casos, construcción de modelos celulares",
        actividades: ["Observación de diferentes tipos de células", "Construcción de modelos de organelos", "Análisis de sistemas corporales"],
        evaluacion: "Informes de laboratorio, modelos celulares, análisis de casos sobre homeostasis"
    },

    7: {
        dba: "DBA 2: Comprende que los organismos cumplen distintas funciones en los ecosistemas y que las relaciones entre ellos pueden representarse en redes tróficas.",
        estandares: "Caracterizo ecosistemas y analizo el equilibrio dinámico entre sus poblaciones.",
        competencias: "Indagación: Investigar relaciones ecológicas. Explicación: Explicar flujos de energía. Uso del conocimiento: Proponer conservación de ecosistemas.",
        temas: ["Redes tróficas", "Flujos de energía", "Relaciones ecológicas", "Equilibrio ecológico"],
        objetivos: ["Construir redes tróficas de ecosistemas locales", "Explicar flujos de energía en ecosistemas", "Analizar impactos humanos en ecosistemas"],
        metodologia: "Trabajo de campo, construcción de redes tróficas, análisis de datos ecológicos",
        actividades: ["Estudio de ecosistema local", "Construcción de redes tróficas", "Análisis de impactos ambientales"],
        evaluacion: "Informes de campo, redes tróficas construidas, propuestas de conservación"
    },

    8: {
        dba: "DBA 3: Comprende que en los organismos se llevan a cabo procesos de intercambio de gases, transporte de nutrientes y eliminación de desechos y que estos procesos están relacionados entre sí.",
        estandares: "Identifico condiciones de cambio y de equilibrio en los seres vivos y en los ecosistemas.",
        competencias: "Indagación: Experimentar con procesos fisiológicos. Explicación: Explicar intercambios metabólicos. Uso del conocimiento: Aplicar a salud y enfermedad.",
        temas: ["Intercambio de gases", "Transporte de nutrientes", "Eliminación de desechos", "Integración de sistemas"],
        objetivos: ["Explicar procesos de intercambio gaseoso", "Describir transporte de sustancias", "Relacionar sistemas de eliminación de desechos"],
        metodologia: "Experimentos fisiológicos, análisis de casos clínicos, modelos de sistemas corporales",
        actividades: ["Experimentos sobre respiración celular", "Análisis de sistemas circulatorio y excretor", "Casos sobre enfermedades metabólicas"],
        evaluacion: "Informes experimentales, análisis de casos, modelos de procesos fisiológicos"
    },

    9: {
        dba: "DBA 4: Comprende que el comportamiento de un gas ideal está determinado por las relaciones entre temperatura, presión, cantidad de gas y volumen.",
        estandares: "Relaciono energía y movimiento.",
        competencias: "Indagación: Experimentar con variables de gases. Explicación: Aplicar leyes de gases. Uso del conocimiento: Resolver problemas cotidianos.",
        temas: ["Leyes de los gases", "Teoría cinética", "Comportamiento de gases", "Aplicaciones tecnológicas"],
        objetivos: ["Aplicar leyes de gases en experimentos", "Explicar comportamiento molecular de gases", "Resolver problemas usando leyes de gases"],
        metodologia: "Experimentación con gases, análisis gráfico, resolución de problemas",
        actividades: ["Experimentos con ley de Boyle", "Análisis de comportamiento de gases", "Aplicaciones en tecnología"],
        evaluacion: "Informes de laboratorio, resolución de problemas, análisis de gráficas"
    },

    10: {
        dba: "DBA 5: Comprende que la herencia es el resultado de la interacción de los genes (genotipo) y que estos se expresan en respuesta a los estímulos del ambiente generando un fenotipo particular.",
        estandares: "Establezco relaciones entre los genes, las proteínas y las funciones celulares.",
        competencias: "Indagación: Investigar patrones hereditarios. Explicación: Explicar expresión génica. Uso del conocimiento: Aplicar a mejoramiento genético.",
        temas: ["Genética mendeliana", "Expresión génica", "Interacción gen-ambiente", "Biotecnología"],
        objetivos: ["Explicar patrones de herencia mendeliana", "Relacionar genotipo con fenotipo", "Analizar aplicaciones biotecnológicas"],
        metodologia: "Análisis de pedigríes, experimentos genéticos, casos de biotecnología",
        actividades: ["Análisis de cruces genéticos", "Construcción de pedigríes", "Casos de ingeniería genética"],
        evaluacion: "Resolución de problemas genéticos, análisis de casos, proyectos de biotecnología"
    },

    11: {
        dba: "DBA 6: Comprende que la evolución de las especies es el resultado de interacciones entre factores genéticos y ambientales a lo largo del tiempo.",
        estandares: "Establezco relaciones entre el clima en las diferentes eras geológicas y las adaptaciones de los seres vivos.",
        competencias: "Indagación: Investigar evidencias evolutivas. Explicación: Explicar mecanismos evolutivos. Uso del conocimiento: Aplicar a conservación de biodiversidad.",
        temas: ["Teorías evolutivas", "Mecanismos de evolución", "Evidencias evolutivas", "Biodiversidad y conservación"],
        objetivos: ["Explicar mecanismos de evolución", "Analizar evidencias evolutivas", "Proponer estrategias de conservación"],
        metodologia: "Análisis de evidencias fósiles, estudios comparativos, proyectos de conservación",
        actividades: ["Análisis de evidencias evolutivas", "Construcción de árboles filogenéticos", "Proyectos de conservación"],
        evaluacion: "Análisis de evidencias, árboles filogenéticos, propuestas de conservación"
    }
};

export default DBA_CIENCIAS_NATURALES;