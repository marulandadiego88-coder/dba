// Datos de respaldo con DBA oficiales de Ciencias Naturales del MEN Colombia
// Basados en los Derechos Básicos de Aprendizaje más recientes

const DBA_CIENCIAS_NATURALES = {
    // PRIMARIA
    1: {
        dba: "DBA 1: Comprende que los seres vivos tienen características que los distinguen de los objetos no vivos y que se pueden agrupar atendiendo a sus características.",
        estandares: "Identifico características de los seres vivos y objetos inertes, establezco semejanzas y diferencias entre ellos y los clasifico.",
        competencias: "Indagación: Observar seres vivos. Explicación: Distinguir vivos de no vivos. Uso del conocimiento: Clasificar seres vivos.",
        temas: ["Características de seres vivos", "Diferencias entre vivos y no vivos", "Clasificación básica", "Necesidades básicas"],
        objetivos: ["Identificar características de seres vivos", "Diferenciar seres vivos de objetos", "Agrupar seres vivos por características"],
        metodologia: "Observación directa, comparación de características, clasificación con material concreto",
        actividades: ["Exploración de seres vivos del entorno", "Clasificación de imágenes", "Cuidado de plantas y animales"],
        evaluacion: "Observación de clasificaciones, registro de características, explicaciones sobre diferencias"
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
        dba: "DBA 3: Comprende que las plantas tienen partes que les permiten realizar sus funciones básicas (raíz, tallo, hojas, flor y fruto).",
        estandares: "Identifico estructuras de los seres vivos que les permiten desarrollarse en un entorno y que puedo utilizar como criterios de clasificación.",
        competencias: "Indagación: Observar partes de las plantas. Explicación: Relacionar estructura con función. Uso del conocimiento: Aplicar al cuidado de plantas.",
        temas: ["Partes de las plantas", "Funciones de cada parte", "Cuidado de plantas", "Importancia de las plantas"],
        objetivos: ["Identificar partes de las plantas", "Explicar funciones de cada parte", "Reconocer la importancia de las plantas"],
        metodologia: "Observación directa de plantas, experimentos con semillas, cuidado de plantas en el aula",
        actividades: ["Disección de flores", "Germinación de semillas", "Observación de raíces y tallos"],
        evaluacion: "Dibujos de partes de plantas, experimentos de germinación, cuidado de plantas"
    },

    4: {
        dba: "DBA 4: Comprende que los seres vivos se desarrollan en un ciclo de vida que inicia con el nacimiento, crecimiento, reproducción, envejecimiento y muerte.",
        estandares: "Describo características de los seres vivos y objetos inertes, establezco semejanzas y diferencias entre ellos y los clasifico.",
        competencias: "Indagación: Observar ciclos de vida. Explicación: Describir etapas del desarrollo. Uso del conocimiento: Aplicar al cuidado de seres vivos.",
        temas: ["Ciclos de vida", "Etapas del desarrollo", "Crecimiento y reproducción", "Cuidado de seres vivos"],
        objetivos: ["Identificar etapas del ciclo de vida", "Comparar ciclos de vida de diferentes seres vivos", "Reconocer la importancia del cuidado en cada etapa"],
        metodologia: "Observación de seres vivos, seguimiento de ciclos, comparación de etapas de desarrollo",
        actividades: ["Observación del ciclo de vida de mariposas", "Seguimiento del crecimiento de plantas", "Comparación de ciclos de vida animal"],
        evaluacion: "Registro de observaciones, diagramas de ciclos de vida, comparaciones entre especies"
    },

    5: {
        dba: "DBA 5: Comprende que el cuerpo humano está formado por sistemas que cumplen funciones vitales (digestivo, respiratorio, circulatorio, nervioso, óseo-muscular).",
        estandares: "Represento los diversos sistemas de órganos del ser humano y explico su función.",
        competencias: "Indagación: Explorar funciones corporales. Explicación: Describir sistemas del cuerpo. Uso del conocimiento: Aplicar al cuidado de la salud.",
        temas: ["Sistemas del cuerpo humano", "Funciones vitales", "Cuidado del cuerpo", "Hábitos saludables"],
        objetivos: ["Identificar sistemas del cuerpo humano", "Explicar funciones de cada sistema", "Promover hábitos saludables"],
        metodologia: "Modelos anatómicos, experimentos sobre funciones corporales, análisis de hábitos saludables",
        actividades: ["Construcción de modelos de sistemas", "Experimentos sobre digestión y respiración", "Análisis de hábitos alimenticios"],
        evaluacion: "Modelos construidos, experimentos realizados, propuestas de hábitos saludables"
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
        dba: "DBA 4: Comprende que la reproducción (sexual y asexual) es un proceso mediante el cual los seres vivos perpetúan su especie y que existen mecanismos de herencia que permiten la transmisión de características de padres a hijos.",
        estandares: "Establezco relaciones entre los genes, las proteínas y las funciones celulares.",
        competencias: "Indagación: Investigar tipos de reproducción. Explicación: Explicar mecanismos hereditarios. Uso del conocimiento: Aplicar a mejoramiento de especies.",
        temas: ["Reproducción sexual y asexual", "Gametogénesis", "Fecundación", "Herencia mendeliana", "Variabilidad genética"],
        objetivos: ["Comparar tipos de reproducción en seres vivos", "Explicar procesos de gametogénesis", "Analizar patrones de herencia"],
        metodologia: "Observación microscópica de gametos, análisis de cruces genéticos, comparación de estrategias reproductivas",
        actividades: ["Observación de células reproductivas", "Análisis de problemas de genética", "Comparación de ciclos reproductivos"],
        evaluacion: "Informes de laboratorio, resolución de problemas genéticos, análisis comparativos"
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