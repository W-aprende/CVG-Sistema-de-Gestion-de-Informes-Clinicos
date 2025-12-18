
/* ===============================================
   CLINICA VIRGEN DE GUADALUPE - Sistema de Informes
   =============================================== */

// Constantes y configuración ¿investigarmas?
const APP_CONFIG = {
  DB_NAME: 'onlyone_pro_db',
  STORE_REPORTS: 'saved_reports',
  STORE_HISTORY: 'report_history',
  AUTO_SAVE_DELAY: 30000,
  LOGO_URL: "LogoPrincipal.png",
  CLAVE_SECRETA: "@stalossantospierdenlapaciencia",
  DURACION_DIAS: 60,
  CLAVE_INICIO: "inicio_sistema",
  CLAVE_BLOQUEO: "sistema_bloqueado"
};

// Plantillas predefinidas
const TEMPLATES = {
  completo: {//plantilla de emergencia
    reports: ['parasitologia_gota', 'inmunologia', 'urinalysis', 'pruebas_rapidas'],
    sections: {
      parasitologia_gota: ['malaria', 'filaria'],
      inmunologia: ['tumorales'],
      urinalysis: ['macroscopico', 'quimico', 'microscopico'],
      pruebas_rapidas: ['PruebasRapidas']
    }
  },
  basico: {
    reports: ['hematologia'],
    sections: {
      hematologia: ['coagulograma_minimo', 'vsg']
    }
  }
};

// Detalles de los informes 
const REPORTS = {
  hematologia: {
    id: "hematologia", icon: "🩸", title: "HEMATOLOGÍA",
    sections: {
      coagulograma_completo: {
        title: "COAGULOGRAMA COMPLETO", params: [
          { k: "Fibrinógeno", unit: "Mg/dL", normal: "200-400" },
          { k: "Tiempo de Protrombina", unit: "Segundos", normal: "10-14" },
          { k: "INR", unit: "---------", normal: "0.8-1.2" },
          { k: "TTPA", unit: "Segundos", normal: "25-45" },
          { k: "Tiempo de Trombina", unit: "Segundos", normal: "9-35" },
          { k: "Dímero D", unit: "ng/mL", normal: "< 500" }
        ]
      },
      coagulograma_minimo: {
        title: "COAGULOGRAMA MINIMO", params: [
          { k: "Recuento de plaquetas", unit: "Plaquetas/mL", normal: "150.000-450.000" },
          { k: "Tiempo de sangrado (Duke)", unit: "Minutos", normal: "3-7" },
          { k: "Tiempo de coagulación (Lee-White)", unit: "Minutos", normal: "5-10" }
        ]
      },
      vsg: {
        title: "VELOCIDAD DE SEDIMENTACION GLOBULAR", params: [
          { k: "1ª Hora", unit: "mm/h", normal: "Hombres:0-15/h, [[br]]Mujer:0-20/h, [[br]]Niños:0-10/h" },
          { k: "2ª Hora", unit: "mm/h", normal: "Hombres:0-15/h, [[br]]Mujer:0-20/h, [[br]]Niños:0-10/h" }
        ]
      },
      reticulocitos: {
        title: "RETICULOCITOS", params: [
          { k: "Conteo de Reticulocitos", unit: "%", normal: "0.5 - 2.0" }
        ]
      },
      lamina: {
        title: "LAMINA PERIFERICA",
        params: [
          { k: "GLOBULOS ROJOS", unit: "", normal: "", type: "text", readonly: true },
          { k: "Hematocrito", unit: "%", normal: "Hombres: 41-53, [[br]]Mujeres: 36-46", type: "text" },
          { k: "Hemoglobina", unit: "g/dL", normal: "Hombres: 13.5-17.5, [[br]]Mujeres: 12.0-15.5", type: "text" },
          { k: "Tamaño", unit: "", normal: "", type: "select", options: ["Normal", "Microcítica", "Macrocítica", "Normocítica"] },
          { k: "Forma", unit: "", normal: "", type: "select", options: ["Normal", "Anisocitosis", "Poiquilocitosis", "Mixtas"] },
          { k: "Color", unit: "", normal: "", type: "select", options: ["Normal", "Hipocrómico", "Hipercromático", "Policromático"] },
          { k: "Presencia de inclusiones", unit: "", normal: "", type: "select", options: ["Ausentes", "Howell-Jolly", "Punteado basófilo", "Cuerpos de Heinz"] },
          { k: "Recuento de eritrocitos", unit: "millones/µL", normal: "Hombres: 4.7-6.1, [[br]]Mujeres: 4.2-5.4" },
          { k: "Índices eritrocitarios", unit: "", normal: "", type: "text", readonly: true },
          { k: "VCM", unit: "fL", normal: "80-100", type: "text" },
          { k: "HCM", unit: "pg", normal: "27-33", type: "text" },
          { k: "CHCM", unit: "g/dL", normal: "32-36", type: "text" },
          { k: "Morfología de los glóbulos rojos", unit: "", normal: "", type: "text", readonly: true },
          { k: "Distribución del tamaño de los glóbulos rojos (RDW)", unit: "%", normal: "11.5 - 14.5" },
          { k: "Anomalías morfológicas observadas", unit: "", normal: "", type: "text", placeholder: "Ej: Presencia de esferocitos, eliptocitos, etc." },
          { k: "Reticulocitos", unit: "%", normal: "0.5 - 2.0", type: "text" },
          { k: "Recuento de reticulocitos", unit: "millones/µL", normal: "25,000 - 75,000", type: "text" },

          { k: "GLOBULOS BLANCOS (Recuento diferencial)", unit: "", normal: "", type: "text", readonly: true },
          { k: "Neutrófilos (segmentados, bandas)", unit: "%", normal: "55 - 65", type: "text" },
          { k: "Linfocitos", unit: "%", normal: "23 - 35", type: "text" },
          { k: "Monocitos", unit: "%", normal: "4 - 8", type: "text" },
          { k: "Eosinófilos", unit: "%", normal: "0.5 - 4", type: "text" },
          { k: "Basófilos", unit: "%", normal: "0 - 2", type: "text" },
          { k: "Morfología de cada tipo celular", unit: "", normal: "", type: "text", placeholder: "Ej: Neutrófilos con toxicidad moderada" },
          { k: "PLAQUETAS", unit: "", normal: "", type: "text", readonly: true },
          { k: "Tamaño", unit: "", normal: "", type: "select", options: ["Normal", "Pequeñas", "Grandes", "Variado"] },
          { k: "Agregación", unit: "", normal: "", type: "select", options: ["Normal", "Disminuida", "Aumentada"] },
          { k: "Comentario final/Conclusión", unit: "", normal: "", type: "text", placeholder: "Conclusión final de la lámina periférica" }
        ]
      },
      tipo_sangre: {
        title: "TIPO DE SANGRE", params: [
          { k: "Grupo ABO", unit: "", normal: "A/B/AB/O", type: "select", options: ["A", "B", "AB", "O"] },
          { k: "Factor RH", unit: "", normal: "Positivo/Negativo", type: "select", options: ["Positivo", "Negativo"] }
        ]
      },
      hemoglobina: {
        title: "ELECTROFORESIS CUANTITATIVA DE HEMOGLOBINA", params: [
          { k: "Hemoglobina A1 HbA1", unit: "%", normal: "95-98", type: "text" },
          { k: "Hemoglobina A2 HbA2", unit: "%", normal: "2-3", type: "text" },
          { k: "Hemoglobina F HbF", unit: "%", normal: "Menos del 1-2", type: "text" },
          { k: "Hemoglobina E HbE", unit: "%", normal: "Ausente", type: "text" },
          { k: "Hemoglobina C HbC", unit: "%", normal: "Ausente", type: "text" },
          { k: "Hemoglobina S HbS", unit: "%", normal: "Ausente", type: "text" },
          { k: "Resultado Final", unit: "", normal: "", type: "select", options: ["HbAA", "HbAC", "HbAS", "HbSS", "HbSC", "HbCC"] },
          { k: "Comentarios/sugerencias ", unit: "", normal: "", type: "text", placeholder: "" }
        ]
      },
      hemoglobinaC: {
        title: "ELECTROFORESIS  CUALITATIVA DE HEMOGLOBINA", params: [
          { k: "Hemoglobina Cualitativa A HbA", unit: "", normal: "", type: "select", options: ["Presente", "Ausente"] },
          { k: "Hemoglobina Cualitativa C HbC", unit: "", normal: "", type: "select", options: ["Presente", "Ausente"] },
          { k: "Hemoglobina Cualitativa S HbS", unit: "", normal: "", type: "select", options: ["Presente", "Ausente"] },
          { k: "Resultado Final", unit: "", normal: "", type: "select", options: ["HbAA", "HbAC", "HbAS", "HbSS", "HbSC", "HbCC"] },
          { k: "Comentarios/sugerencias ", unit: "", normal: "", type: "text", placeholder: "" }
        ]
      }
    }
  },
  inmunologia: {
    id: "inmunologia", icon: "🔬", title: "INMUNOLOGIA / MARCADORES TUMORALES",
    sections: {
      tumorales: {
        title: "MARCADORES TUMORALES", params: [
          { k: "PSA - TOTAL", unit: "ng/mL", normal: "< 4", type: "text" },
          { k: "PSA - LIBRE", unit: "ng/mL", normal: "0.0 - 1.5", type: "text" },
          { k: "ALFA-FETOPROTEINA (AFP)", unit: "ng/mL", normal: "< 10", type: "text" },
          { k: "ANTIGENO CARCINOEMBRIONARIO (CEA)", unit: "ng/mL", normal: "< 5", type: "text" },
          { k: "ANTIGENO CARBOHIDRATO 125 (CA 125)", unit: "U/mL", normal: "< 35", type: "text" },
          { k: "ANTIGENO CARBOHIDRATO 19.9 (CA 19.9)", unit: "U/mL", normal: "< 37", type: "text" },
          { k: "ANTIGENO CARBOHIDRATO 15.3 (CA 15.3)", unit: "U/mL", normal: "< 35", type: "text" },
          { k: "ANTIGENO CARBOHIDRATO 72.4 (CA 72.4)", unit: "U/mL", normal: "5.6 - 8.2", type: "text" },
          { k: "Hepatitis B / (HBsAg)-Determinación cuantitativa del antígeno de superficie", unit: "COI", normal: "< 0.90 (Negativo) [[br]]≥0.90 a < 1.0 (Limítrofe/Indeterminado) [[br]]≥ 1.0 (Positivo)", type: "text" },
          { k: "Hepatitis C / (VHC)-Determinación cuantitativa  del anticuerpo del virus", unit: "COI", normal: "< 0.90 (Negativo) [[br]]≥0.90 a < 1.0 (Limítrofe/Indeterminado) [[br]]≥ 1.0 (Positivo)", type: "text" },
          { k: "TIROTROPINA (TSH)", unit: "µUI/mL", normal: "0.270-4.20", type: "text" },
          { k: "TIROXINA TOTAL (T4)", unit: "nmol/mL", normal: "65.6 - 181.5", type: "text" },
          { k: "TIROXINA LIBRE (FT4)", unit: "nmol/mL", normal: "11.97 - 21.88", type: "text" },
          { k: "TRIYODOTIRONINA TOTAL (T3)", unit: "nmol/mL", normal: "0.9 - 2.8", type: "text" },
          { k: "TRIYODOTIRONINA LIBRE (FT3)", unit: "nmol/mL", normal: "2.0 - 7.0", type: "text" },
          { k: "FERRITINA", unit: "ng/mL", normal: "Hombres: 30-400 [[br]]Mujeres: 13-150", type: "text" }
        ]
      }
    }
  },
  parasitologia_gota: {
    id: "parasitologia_gota", icon: "🦠", title: "PARASITOLOGIA SANGINEA",
    sections: {
      malaria: {
        title: "Malaria", params: [
          { k: "Gota gruesa/Extensión", unit: "", normal: "Negativo: No se observan formas parasitarias de Plasmodium.", type: "select", options: ["Negativo"] },
          { k: "Gota gruesa/Extension", unit: "", normal: "", type: "select", options: ["Positivo"] },
          { k: "Densidad parasitaria", unit: "", normal: "Positivo:[[br]]+ = 1 – 10 parasito por 100 campos[[br]]++ = 11-100 parasito por 100 campos[[br]]+++ = 1 – 10 parásitos en un solo campo[[br]]++++ =  > 10 parásitos en un solo campo.", type: "select", options: ["Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] },
          { k: "Especie", unit: "", normal: "", type: "select", options: ["Plasmodium falciparum", "Plasmodium vivax", "Plasmodium malariae", "Plasmodium ovale", "No identificado"] }
        ]
      },
      filaria: {
        title: "Filaria", params: [
          { k: "Gota gruesa/Extensión", unit: "", normal: "Negativo: No se observan formas parasitarias de Plasmodium.", type: "select", options: ["Negativo"] },
          { k: "Gota gruesa/Extension", unit: "", normal: "", type: "select", options: ["Positivo"] },
          { k: "Especie", unit: "", normal: "", type: "select", options: ["Plasmodium falciparum", "Plasmodium vivax", "Plasmodium malariae", "Plasmodium ovale", "No identificado"] },
          { k: "Comentario", unit: "", normal: "", type: "text", placeholder: "Cualquier otro hallazgo" }
        ]
      }
    }
  },
  parasitologia_heces: {
    id: "parasitologia_heces", icon: "💩", title: "PARASITOLOGIA / HECES",
    sections: {
      coprologico: {
        title: "Coprológico", params: [
          { k: "Método", unit: "", normal: "", type: "select", options: ["Preparación directa"] },
          { k: "Color", unit: "", normal: "", type: "select", options: ["Marrón", "Amarillo", "Verde", "Negro", "Rojizo", "Blanquecino"] },
          { k: "Consistencia", unit: "", normal: "", type: "select", options: ["Formada", "Blanda", "Líquida", "Dura", "Pastosa"] },
          { k: "Moco", unit: "", normal: "", type: "select", options: ["Ausente", "Escaso", "Moderado", "Abundante"] },
          { k: "Sangre", unit: "", normal: "", type: "select", options: ["Ausente", "Escasa", "Moderada", "Abundante"] },
          { k: "Resultado", unit: "", normal: " Negativo/No se observa ninguna etapa parasitaria", type: "select", options: ["Negativo"] },
          { k: "Resultado Heces", unit: "", normal: "Positivo (presencia de huevo, quiste, trofozoito o larva)", type: "select", options: ["Positivo"] },
          { k: "Especie", unit: "", normal: "", type: "select", options: ["Ascaris lumbricoides", "Trichuris trichiura", "Enterobius vermicularis", "Taenia solium", "Taenia saginata", "Hymenolepis nana", "Giardia lamblia", "Entamoeba histolytica", "Cryptosporidium", "Balantidium coli", "Levadura"] },
          { k: "Etapa", unit: "", normal: "", type: "select", options: ["Huevo", "Quiste", "Trofozoito", "Larva", "Adulto"] },
          { k: "Cantidad", unit: "", normal: "", type: "select", options: ["Escasos (+)", "Moderados (++)", "Abundantes (+++)"] },
          { k: "Leucocitos", unit: "", normal: "", type: "select", options: ["Escasos (+)", "Moderados (++)", "Abundantes (+++)"] },
          { k: "Hematies", unit: "", normal: "", type: "select", options: ["Escasos (+)", "Moderados (++)", "Abundantes (+++)"] },
          { k: "Otros hallazgos", unit: "", normal: "", type: "text", placeholder: "Cualquier otro hallazgo" }
        ]
      }
    }
  },
  exudado: {
    id: "exudado", icon: "🧫", title: "EXUDADO VAGINAL",
    sections: {
      fresco: {
        title: "Examen fresco", params: [
          { k: "Células epiteliales", unit: "", normal: "Ausente/Escasas", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Leucocitos", unit: "", normal: "2-4/campo", type: "text" },
          { k: "Levaduras", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Trichomonas vaginalis", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Bacterias", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Células clave/Clue cells", unit: "", normal: "No se observaron", type: "select", options: ["Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Hematíes", unit: "", normal: "Ausentes/No se observan", type: "text" },
          { k: "PH", unit: "", normal: "3.8 - 4.5", type: "text" },
          { k: "Test de Aminas", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] }
        ]
      },
      gram: {
        title: "Tinción de Gram", params: [
          { k: "Bacterias", unit: "", normal: "Resultados normales: Indican la ausencia de bacterias/levaduras. [[br]]Resultados anormales: La presencia de bacterias (cocos o bacilos), la forma de bacterias (cocos o bacilos), su agrupación (cadenas o pares)  o presencia de levaduras.", type: "text", placeholder: "Ej: Gram positivas en cadenas" },
          { k: "Levaduras", unit: "", normal: "Resultados normales: Indican la ausencia de bacterias/levaduras. [[br]]Resultados anormales: La presencia de bacterias (cocos o bacilos), su agrupación (cadenas o pares)  o presencia de levaduras.", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Clue cells", unit: "", normal: "No se observaron, escasas, moderadas o abundantes", type: "select", options: ["No se observan", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] }
        ]
      },
      antigenos: {
        title: "Prueba de detección de antígenos", params: [
          { k: "Candida albicans", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Trichomonas vaginalis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Gardnerella vaginalis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Chlamydia trachomatis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Otros Hallazgos", unit: "", normal: "---------------", type: "text" },
          { k: "Diagnostico/comentario final:", unit: "", normal: "Normal: No se detectan signos de infección o microorganismos anormales. ,[[br]]Anormal: Se reporta la presencia de bacterias, levaduras, trichomonas,chlamydia, células clave, un recuento elevado de glóbulos blancos, un pH elevado o un olor a pescado. ", type: "text" }
        ]
      }
    }
  },
  exudadoU: {
    id: "exudadoU", icon: "🧫", title: "EXUDADO URETRAL",
    sections: {
      frescoU: {
        title: "Examen fresco", params: [
          { k: "Células epiteliales", unit: "", normal: "Ausente/Escasas", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Leucocitos", unit: "", normal: "2-4/campo", type: "text" },
          { k: "Levaduras", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Trichomonas vaginalis", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Bacterias", unit: "", normal: "Ausentes/No se observan", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Células clave/Clue cells", unit: "", normal: "No se observaron", type: "select", options: ["Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Hematíes", unit: "", normal: "Ausentes/No se observan", type: "text" },
          { k: "PH", unit: "", normal: "3.8 - 4.5", type: "text" },
          { k: "Test de Aminas", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] }
        ]
      },
      gramU: {
        title: "Tinción de Gram", params: [
          { k: "Bacterias", unit: "", normal: "Resultados normales: Indican la ausencia de bacterias/levaduras. [[br]]Resultados anormales: La presencia de bacterias (cocos o bacilos), su agrupación (cadenas o pares)  o presencia de levaduras.", type: "text", placeholder: "Ej: Gram positivas en cadenas" },
          { k: "Levaduras", unit: "", normal: "Resultados normales: Indican la ausencia de bacterias/levaduras. [[br]]Resultados anormales: La presencia de bacterias (cocos o bacilos), su agrupación (cadenas o pares)  o presencia de levaduras.", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Clue cells", unit: "", normal: "No se observaron, escasas, moderadas o abundantes", type: "select", options: ["No se observan", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] }
        ]
      },
      antigenosU: {
        title: "Prueba de detección de antígenos", params: [
          { k: "Candida albicans", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Trichomonas vaginalis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Gardnerella vaginalis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Chlamydia trachomatis", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Otros Hallazgos", unit: "", normal: "---------------", type: "text" },
          { k: "Diagnostico/comentario final:", unit: "", normal: "Normal: No se detectan signos de infección o microorganismos anormales. ,[[br]]Anormal: Se reporta la presencia de bacterias, levaduras, trichomonas,chlamydia, células clave, un recuento elevado de glóbulos blancos, un pH elevado o un olor a pescado. ", type: "text" }
        ]
      }
    }
  },

  urinalysis: {
    id: "urinalysis", icon: "🧪", title: "ORINA",
    sections: {
      macroscopico: {
        title: "I. Macroscópico", params: [
          { k: "Color", unit: "", normal: "Amarillo claro/ámbar", type: "select", options: ["Transparente", "Amarillo pálido", "Amarillo claro", "Ámbar", "Naranja", "Marrón oscuro", "Rojizo/Rosa", "Verde/Azul", "Turbio/Lechoso", "Negro", "Otro"], bind: "colorMacro" },
          { k: "Aspecto", unit: "", normal: "Transparente/Claro", type: "select", options: ["Transparente", "Claro", "Turbio", "Poco turbio", "muy turbio", "Opalescente"] },
        ]
      },
      quimico: {
        title: "II. Químico", params: [
          { k: "Gravedad Específica", unit: "", normal: "1.003-1.035", type: "text" },
          { k: "pH", unit: "", normal: "5.0-7.0", type: "text" },
          { k: "Leucocitos", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)", "Traza"] },
          { k: "Nitratos", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Proteínas", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Traza", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] },
          { k: "Glucosa", unit: "", normal: "Normal", type: "select", options: ["Normal", "Anormal", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] },
          { k: "Cetonas", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] },
          { k: "Urobilinógeno", unit: "", normal: "Normal", type: "select", options: ["Normal", "Elevado", "Bajo", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Otro"], bind: "urobilinogeno" },
          { k: "Bilirrubina", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] },
          { k: "Sangre", unit: "", normal: "Negativo", type: "select", options: ["Negativo", "Positivo", "Hemólisis", "Positivo (+)", "Positivo (++)", "Positivo (+++)", "Positivo (++++)"] }
        ]
      },
      microscopico: {
        title: "III. Microscópico", params: [
          { k: "Leucocitos", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Eritrocitos", unit: "", normal: "0-2 por campo", type: "text" },
          { k: "Células Epiteliales", unit: "", normal: "Ausentes/Escasas", type: "select", options: ["Ausentes", "Escasas", "Moderadas", "Abundantes"] },
          { k: "Bacteria", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Trichomonas", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Levaduras", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Escasas (+)", "Moderadas (++)", "Abundantes (+++)"] },
          { k: "Cristales", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Oxalato", "Fosfatos", "Urato", "Cistina"] },
          { k: "Cilindros", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Hialinos", "Granulosos", "Leucocitarios", "Eritrocitarios"] },
          { k: "Filamento mucoso", unit: "", normal: "Ausentes", type: "select", options: ["Ausentes", "Escasos", "Moderados", "Abundantes"] },
          { k: "Otros hallazgos", unit: "", normal: "", type: "text", placeholder: "Cualquier otro hallazgo" }
        ]
      }
    }
  },

  pruebas_rapidas: {
    id: "pruebas_rapidas", icon: "⚡", title: "INMUNOLOGIA RAPIDA",
    sections: {
      PruebasRapidas: {
        title: "Pruebas Rapidas", params: [
          { k: "Chlamydia trachomatis", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo"] },
          { k: "Rubeola", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo"] },
          { k: "Salmonella/Tifoidea", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo"] },
          { k: "Toxoplasmosis", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo"] },
          { k: "Tuberculosis", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo"] },
          { k: "Helicobacter pylori", unit: "", normal: "", type: "select", options: ["IgG Positivo", "IgM Positivo", "IgG e IgM Positivos", "Negativo", "Positivo"] },
          { k: "Troponina", unit: "", normal: "", type: "select", options: ["Positivo", "Negativo"] },
          { k: "Factor Reumatoide (FR)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)"] },
          { k: "Antiestreptolisina O (ASO)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)"] },
          { k: "Proteína C Reactiva cualitativa (PCR)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)"] },
          { k: "Sangre oculta en heces fecales (FOB)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Embarazo/hormona Gonadotropina Coriónica Humana (hCG)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Hepatitis B / (HBsAg)-Detección cualitativa del antígeno de Superficie", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Hepatitis C / (VHC)-Detección cualitativa del anticuerpo del virus", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Brucella abortus", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)"] },
          { k: "VIH (Virus de Inmunodeficiencia Humana) / Detección cualitativa del anticuerpo de VIH", unit: "", normal: "", type: "select", options: ["Negativo"] },
          { k: "VIH (Virus de Inmunodeficiencia Humana) / Confirmación cualitativa del anticuerpo de VIH", unit: "", normal: "Resultado confirmado: [[br]]PRUEBA DE DETERMINE (Positivo) -  VIH[[br]]PRUEBA DE UNI-GOLD (Positivo)  - VIH[[br]]PRUEBA DE BIOLINE ABOTT - VIH (Positivo)", type: "select", options: ["POSITIVO - TIPO 1", "POSITIVO - TIPO 2", "POSITIVO - TIPO 1 y 2"] },
          { k: "Sífilis / Prueba Treponémica (Determinación de anticuerpos)-PT", unit: "", normal: "PT (+) y PNT (+): sugiere una infección de sífilis activa. [[br]]PT (+) y PNT (-): sugiere una infección de sífilis reciente o tratada. [[br]]PT (-) y PNT (-): Indica ausencia de infección por sífilis.", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Sífilis / Prueba no Treponémica (RPR)-PNT", unit: "", normal: "PT (+) y PNT (+): sugiere una infección de sífilis activa. [[br]]PT (+) y PNT (-): sugiere una infección de sífilis reciente o tratada. [[br]]PT (-) y PNT (-): Indica ausencia de infección por sífilis.", type: "select", options: ["Negativo", "Positivo (+)", "Positivo (++)", "Positivo (+++)"] }
        ]
      }
    }
  },
  drogas: {
    id: "drogas", icon: "💊", title: "TEST-ABUSO DE DROGAS EN ORINA",
    sections: {
      panel_drogas: {
        title: "Panel de Drogas", params: [
          { k: "Anfetamina (AMP)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Etilglucurónido (ETG)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Metanfetamina (MET)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Cocaína (COC)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "D-Amphetamine (MAMP)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Morfina (MOR)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Marihuana (THC)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Benzodiacepina (BZD/BZO)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Barbitúricos (BAR)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Éxtasis (XTC)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Fenciclidina (PCP)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Methadone (MTD)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] },
          { k: "Tricyclic Antidepressant (TCA)", unit: "", normal: "", type: "select", options: ["Negativo", "Positivo"] }
        ]
      }
    }
  },
  diabetis: {
    id: "diabetis", icon: "🩸🍬", title: "ESTUDIO DE DIABETIS",
    sections: {
      glucosa: {
        title: "Curva de Tolerancia a la Glucosa - en Ayunas y Post Carga", params: [
          { k: "Glicemia en ayunas/basal", unit: "mg/dL", normal: "<105(Mujer Embarazada)", type: "text" },
          { k: "Glicemia a la primera hora post carga de 75 grs", unit: "mg/dL", normal: "≤180", type: "text" },
          { k: "Glicemia a la segunda hora post carga 75 grs", unit: "mg/dL", normal: "<140", type: "text" }
        ]
      },
      glicemia: {
        title: "Determinación de Glicemia en Ayunas y Post Prandial", params: [
          { k: "Glicemia en ayunas", unit: "mg/dL", normal: "<100", type: "text" },
          { k: "Glicemia postprandial (2 horas después de comer)", unit: "mg/dL", normal: "<140", type: "text" }
        ]
      }
    }
  },
  biologicos: {
    id: "biologicos", icon: "🧪", title: "LIQUIDOS BIOLOGICOS",
    sections: {
      cefalorraquideo: {
        title: "LIQUIDO CEFALORRAQUIDEO (LCR)", params: [
          { k: "I.	EXAMEN MACROSCOPICO", unit: "", normal: "", type: "" },
          { k: "Aspecto", unit: "", normal: "Claro y cristalino", type: "select", options: ["Normal", "Claro", "Claro y cristalino", "Turbio", "Poco turbio", "muy turbio", "Lechoso", "Sanguinolento"] },
          { k: "Color", unit: "", normal: "Incoloro", type: "select", options: ["Xantocromico", "Anaranjado", "Amarillo", "Rosa", "Rojo", "Marrón", "Incoloro"] },
          { k: "II. EXAMEN MICROCOSPICO (análisis citológico)", unit: "", normal: "", type: "" },
          { k: "Hematíes", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Leucocitos", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Diferencial de leucocitos", unit: "", normal: "Linfocitos 60-70% [[br]]Monocitos 20-30% [[br]]Neutrófilos 0-10%", type: "text" },
          { k: "Tinción de Gram", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Tinta China/Antigenos de Cryptococcus", unit: "", normal: "", type: "select" },
          { k: "Tincion de Giemsa", unit: "", normal: "", type: "select" },
          { k: "Otras células", unit: "", normal: "", type: "text" },
          { k: "III.	EXAMEN QUIMICO", unit: "", normal: "", type: "" },
          { k: "Proteínas totales", unit: "mg/dL", normal: "15.0-40.0", type: "text" },
          { k: "Albumina", unit: "mg/dL", normal: "17.7-25.1", type: "text" },
          { k: "Glucosa", unit: "mg/dL", normal: "60-80 (niños) [[br]]40-70 (adultos)", type: "text" },
          { k: "Lactato", unit: "mEq/L", normal: "10-22", type: "text" },
          { k: "Glutamina", unit: "mg/dL", normal: "8-19", type: "text" },
          { k: "Indice de albumina", unit: "", normal: "", type: "text" },
          { k: "COMENTARIOS", unit: "", normal: "", type: "text" },
        ]
      },
      sinovial: {
        title: "LIQUIDO SINOVIAL", params: [
          { k: "I.	EXAMEN MACROSCOPICO", unit: "", normal: "", type: "" },
          { k: "Aspecto", unit: "", normal: "Claro y cristalino", type: "select", options: ["Normal", "Claro", "Claro y cristalino", "Turbio", "Poco turbio", "muy turbio", "Lechoso", "Sanguinolento"] },
          { k: "Color", unit: "", normal: "Amarillo Palido", type: "select", options: ["Amarillo pálido", "Amarillo claro", "Ámbar", "Naranja", "Marrón oscuro", "Rojizo/Rosa", "Verde/Azul", "Turbio/Lechoso", "Negro"] },
          { k: "Viscosidad (cm)", unit: "", normal: "3-6", type: "text" },
          { k: "Volumen (ml)", unit: "", normal: "<3.5", type: "text" },
          { k: "pH", unit: "", normal: "", type: "text" },
          { k: "Densidad", unit: "", normal: "", type: "text" },
          { k: "II. EXAMEN MICROCOSPICO (análisis citológico)", unit: "", normal: "", type: "" },
          { k: "Hematíes", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Leucocitos", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Cristales", unit: "", normal: "", type: "select", options: ["Ausentes", "Oxalato", "Fosfatos", "Urato", "Cistina"] },
          { k: "Diferencial de leucocitos", unit: "", normal: "Linfocitos 60-70% [[br]]Monocitos 20-30% [[br]]Neutrófilos 0-10%", type: "text" },
          { k: "Tinción de Gram", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Otras células", unit: "", normal: "", type: "text" },
          { k: "III.	EXAMEN QUIMICO", unit: "", normal: "", type: "" },
          { k: "Proteínas totales", unit: "mg/dL", normal: "1-3", type: "text" },
          { k: "Glucosa", unit: "mg/dL", normal: "0-20", type: "text" },
          { k: "Ácido úrico", unit: "mg/dL", normal: "6-8", type: "text" },
          { k: "COMENTARIOS", unit: "", normal: "", type: "text" },
        ]
      },
      pleural: {
        title: "LIQUIDO PLEURAL", params: [
          { k: "I.	EXAMEN MACROSCOPICO", unit: "", normal: "", type: "" },
          { k: "Aspecto", unit: "", normal: "Claro y cristalino", type: "select", options: ["Purulento", "Claro y cristalino", "Hemático", "Lipemico", "Viscoso "] },
          { k: "Color", unit: "", normal: "", type: "select", options: ["Amarillo pálido", "Amarillo claro", "Ámbar", "Naranja", "Marrón oscuro", "Rojizo/Rosa", "Verde/Azul", "Turbio/Lechoso", "Negro"] },
          { k: "Volumen (ml)", unit: "", normal: "7.5", type: "text" },
          { k: "pH", unit: "", normal: "", type: "text" },
          { k: "II. EXAMEN MICROCOSPICO (análisis citológico)", unit: "", normal: "", type: "" },
          { k: "Hematíes", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Leucocitos", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Diferencial de leucocitos", unit: "", normal: "Linfocitos 60-70% [[br]]Monocitos 20-30% [[br]]Neutrófilos 0-10%", type: "text" },
          { k: "Tinción de Gram", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Otras células", unit: "", normal: "", type: "text" },
          { k: "III.	EXAMEN QUIMICO", unit: "", normal: "", type: "" },
          { k: "Proteínas totales (PT)", unit: "g/dL", normal: "1-3", type: "text" },
          { k: "Lactato deshidrogenasa (LDH)", unit: "UI/L", normal: "", type: "text" },
          { k: "Cociente de PT", unit: "", normal: "< 0.5 = Transudado [[br]]> 0.5 = Exudado", type: "text" },
          { k: "Cociente de LDH", unit: "", normal: "< 0.6 = Transudado [[br]]> 0.6 = Exudado", type: "text" },
          { k: "Amilasa", unit: "mg/dL", normal: "6-8", type: "text" },
          { k: "Glucosa", unit: "mg/dL", normal: "", type: "text" },
          { k: "COMENTARIOS", unit: "", normal: "", type: "text" },
        ]
      },
      ascitico: {
        title: "LIQUIDO ASCITICO", params: [
          { k: "I.	EXAMEN MACROSCOPICO", unit: "", normal: "", type: "" },
          { k: "Aspecto", unit: "", normal: "Claro y cristalino", type: "select", options: ["Purulento", "Claro y cristalino", "Hemático", "Lipemico", "Viscoso", "Transparente"] },
          { k: "Color", unit: "", normal: "Amarillo Pálido", type: "select", options: ["Amarillo pálido", "Amarillo claro", "Ámbar", "Naranja", "Marrón oscuro", "Rojizo/Rosa", "Verde/Azul", "Turbio/Lechoso", "Negro"] },
          { k: "Volumen (ml)", unit: "", normal: "7.5", type: "text" },
          { k: "pH", unit: "", normal: "", type: "text" },
          { k: "II. EXAMEN MICROCOSPICO (análisis citológico)", unit: "", normal: "", type: "" },
          { k: "Hematíes", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Leucocitos", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Diferencial de leucocitos", unit: "", normal: "Linfocitos 60-70% [[br]]Monocitos 20-30% [[br]]Neutrófilos 0-10%", type: "text" },
          { k: "Tinción de Gram", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Otras células", unit: "", normal: "", type: "text" },
          { k: "III.	EXAMEN QUIMICO", unit: "", normal: "", type: "" },
          { k: "Proteínas totales (PT)", unit: "g/dL", normal: "< 2.5 = Transudado [[br]]≥ 2.5 = Exusudado", type: "text" },
          { k: "Lactato deshidrogenasa (LDH)", unit: "UI/L", normal: "", type: "text" },
          { k: "Gradiente Seroascítico de Albúmina (GASA)", unit: "mg/dL", normal: "≥ 1.1 g/dL (sugiere hipertensión portal) [[br]]< 1.1 g/dL (sugiere otras causas como pérdida de proteínas o enfermedad peritoneal).", type: "text" },
          { k: "Cociente de LDH", unit: "", normal: "< 0.6 = Transudado [[br]]> 0.6 = Exudado  [[br]]> 1 (sugiere infección o neoplasia).", type: "text" },
          { k: "albumina", unit: "mg/dL", normal: "", type: "text" },
          { k: "Glucosa", unit: "mg/dL", normal: "Valor similar al del suero/plasma.", type: "text" },
          { k: "COMENTARIOS", unit: "", normal: "", type: "text" },
        ]
      },
      amniotico: {
        title: "LIQUIDO AMNIOTICO", params: [
          { k: "I.	EXAMEN MACROSCOPICO", unit: "", normal: "", type: "" },
          { k: "Aspecto", unit: "", normal: "Claro y cristalino", type: "select", options: ["Purulento", "Claro y cristalino", "Hemático", "Lipemico", "Viscoso", "Transparente"] },
          { k: "Color", unit: "", normal: "Amarillo Pálido", type: "select", options: ["Amarillo pálido", "Amarillo fuerte", "Verde", "Naranja", "Marrón oscuro", "Rosado", "rojizo", "Rojo", "Negro"] },
          { k: "II. EXAMEN MICROCOSPICO (análisis citológico)", unit: "", normal: "", type: "" },
          { k: "Células anaranjadas", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Tinción de Gram", unit: "", normal: "0-5 por campo", type: "text" },
          { k: "Otras células", unit: "", normal: "", type: "text" },
          { k: "III.	EXAMEN QUIMICO", unit: "", normal: "", type: "" },
          { k: "Fosfolipidos", unit: "", normal: "", type: "text" },
          { k: "Glucosa", unit: "mg/dL", normal: "< 16 (nivel indicativo de infección)", type: "text" },
          { k: "Bilirrubina total", unit: "mg/d", normal: "10-30 (0.01-0.03)", type: "text" },
          { k: "COMENTARIOS", unit: "", normal: "", type: "text" },
        ]
      },
      seminal: {
        title: "ESPERMOGRAMA", params: [
          { k: "I. DATOS DE LA MUESTRA", unit: "", normal: "", type: "" },
          { k: "Fecha/Hora de Toma Muestra", unit: "", normal: "", type: "text" },
          { k: "Hora de Inicio de Analisis", unit: "", normal: "", type: "text" },
          { k: "Días de abstinencia", unit: "Días", normal: "3-5 días", type: "text" },
          { k: "II. EXAMEN MACROSCÓPICO", unit: "", normal: "", type: "" },
          { k: "Licuefacción", unit: "", normal: "30 a 60 minutos/37°C", type: "text" },
          { k: "Color", unit: "", normal: "Blanquecino", type: "select", options: ["Blanquecino", "Amarillo", "Verde", "Marrón", "Rojo", "Transparente"] },
          { k: "Volumen", unit: "ml", normal: "≥2.5 ml", type: "text" },
          { k: "Aspecto", unit: "", normal: "Gris-opalescente", type: "text" },
          { k: "Viscosidad", unit: "cm", normal: "<2 cm", type: "text" },
          { k: "pH", unit: "", normal: "7.2-8.0", type: "text" },

          { k: "III. EXAMEN MICROSCÓPICO EN FRESCO - MOVILIDAD ESPERMÁTICA", unit: "", normal: "", type: "" },
          { k: "Tipo A (Rápida y progresiva)", unit: "%", normal: "Valores de normalidad a los 60 min", type: "text" },
          { k: "Tipo B (Progresiva lenta o perezosa)", unit: "%", normal: "Tipo A + B ≥ 50%", type: "text" },
          { k: "Tipo C (No progresiva)", unit: "%", normal: "Tipo A ≥ 25%", type: "text" },
          { k: "Tipo D (Inmóvil)", unit: "%", normal: "", type: "text" },
          { k: "Presencia de Aglutinaciones y Agregaciones", unit: "", normal: "<10% (+)", type: "text" },

          { k: "IV. EXAMEN MICROSCÓPICO EN FRESCO - VITALIDAD ESPERMÁTICA", unit: "", normal: "", type: "" },
          { k: "Espermatozoides vivos", unit: "%", normal: ">75%", type: "text" },

          { k: "V. EXAMEN MICROSCÓPICO EN FRESCO - CONCENTRACIÓN DE ESPERMATOZOIDES", unit: "", normal: "", type: "" },
          { k: "Concentración de Espermatozoides", unit: "mill/ml", normal: "≥20 mill/ml", type: "text" },

          { k: "VI. EXAMEN MICROSCÓPICO EN FRESCO - MORFOLOGÍA ESPERMÁTICA", unit: "", normal: "", type: "" },
          { k: "Formas Normales", unit: "%", normal: ">15%", type: "text" },
          { k: "Anomalías Observadas", unit: "", normal: "", type: "text" },

          { k: "VII. EXAMEN MICROSCÓPICO EN FRESCO - CANTIDAD/PRESENCIA DE OTRAS CÉLULAS Y OTRAS INCLUSIONES", unit: "", normal: "", type: "" },
          { k: "Leucocitos", unit: "/C", normal: "", type: "text" },
          { k: "Eritrocitos", unit: "", normal: "Ausente", type: "text" },
          { k: "Otras inclusiones", unit: "", normal: "Ausente", type: "text" },

          { k: "CONCLUSIONES", unit: "", normal: "", type: "select", options: ["Normozoospermia: Eyaculado normal definido por los valores de referencia.", "Oligozoospermia: Concentración espermática menor a los valores de referencia.", "Astenozoospermia: Movilidad menor al valor de referencia.", "Teratozoospermia Morfología menor al valor de referencia.", "Oligoastenoterato zoospermia: Significa alteraciones en tres variables. (También seusarla combinación de 2 prefijos).", "Azoospermia: Ausencia de espermatozoides en el Eyaculado. Aspermia Ausencia de eyaculado.", "Cryptozoospermia: Espermatozoides ausentes en el preparado examinado al fresco pero presentes en el pellet.", "Hemospermia: Hematospermia; Presencia de eritrocitos en el eyaculado.", "Leucospermia: Leucocitospermia, Piospermia; Presencia de leucocitos en el eyaculado por sobre el valor de referencia.", "Necrozoospermia: Porcentaje de espermatozoides vivos menor al valor de referencia.", "Teratoastenzoospermia: Alteración en la morfología y movilidad espermática.", "Aspermia: Ausencia de eyaculado.", "Terastospermia o teratozoospermia: ocurre en casos en los que el porcentaje de espermatozoides con forma anomala es mayor al 96%", "Oligoasthenoteratozoospermia: Alteración en las tres variables (concentración, movilidad y morfología).", "Astenospermia o astenozoospermia: Movilidad espermática menor al valor de referencia.", "Oligospermia u oligozoospermia: Concentración espermática menor a los valores de referencia."] },
          { k: "COMENTARIOS/SUGERENCIAS", unit: "", normal: "", type: "text" }
        ]
      }
    }
  },

};

// Estado de la aplicación
const state = {
  selectedReports: new Set(),
  selectedSections: {},
  selectedParams: {}
};

// Inicializar estado
Object.keys(REPORTS).forEach(r => {
  state.selectedSections[r] = new Set();
  state.selectedParams[r] = {};
  Object.keys(REPORTS[r].sections).forEach(s => {
    state.selectedParams[r][s] = new Set();
  });
});

// Variables globales
let dbInstance = null;
let autoSaveTimer = null;
let hasUnsavedChanges = false;
let drawing = false, lastX = 0, lastY = 0;
let savedSigDataUrl = '';
let _lastPreviewBlobURL = null;

// Referencias a elementos DOM
const reportsGrid = document.getElementById('reportsGrid');
const sectionsContainer = document.getElementById('sectionsContainer');
const paramsContainer = document.getElementById('paramsContainer');
const btnOpenPreview = document.getElementById('btnOpenPreview');
const btnOpenPreview2 = document.getElementById('btnOpenPreview2');
const modalPreview = document.getElementById('modalPreview');
const previewFrame = document.getElementById('previewFrame');
const modalClose = document.getElementById('modalClose');
const modalPrint = document.getElementById('modalPrint');
const btnNew = document.getElementById('btnNew');
const selectAllSections = document.getElementById('selectAllSections');
const deselectAllSections = document.getElementById('deselectAllSections');
const statusBox = document.getElementById('statusBox');
const sigCanvas = document.getElementById('sigCanvas');
const sigCtx = sigCanvas.getContext('2d');

// Configuración del canvas de firma
sigCtx.strokeStyle = "#0b3954";
sigCtx.lineWidth = 2;
sigCtx.lineJoin = 'round';
sigCtx.lineCap = 'round';

// ===============================================
// FUNCIONES DE UTILIDAD
// ===============================================

// Función para abrir la base de datos
function openDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) return resolve(dbInstance);
    const req = indexedDB.open(APP_CONFIG.DB_NAME, 2);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(APP_CONFIG.STORE_REPORTS)) {
        db.createObjectStore(APP_CONFIG.STORE_REPORTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(APP_CONFIG.STORE_HISTORY)) {
        const historyStore = db.createObjectStore(APP_CONFIG.STORE_HISTORY, { keyPath: 'id', autoIncrement: true });
        historyStore.createIndex('fecha', 'fechaGeneracion', { unique: false });
        historyStore.createIndex('profesional', 'profesional.nombre', { unique: false });
      }
    };

    req.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };

    req.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// Función para escapar HTML
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "&#x2F;");
}

// Función para validar entrada de usuario
function validateUserInput(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

// Función para generar slug
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/^|_$/g, '');
}

// Función para optimizar imágenes
function optimizeImage(imageSrc, maxWidth = 200, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = imageSrc;
  });
}

// Función para generar código QR
function generateQRCodeDataURL(data) {
  if (typeof QRCode === 'undefined') {
    console.warn('Biblioteca QRCode no disponible en este contexto');
    return '';
  }
  try {
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    document.body.appendChild(tempContainer);

    const qr = new QRCode(tempContainer, {
      text: data,
      width: 96,
      height: 96,
      colorDark: '#0b3954',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    if (qr.makeCode) {
      qr.makeCode(data);
    }

    const img = tempContainer.querySelector('img');
    const canvas = tempContainer.querySelector('canvas');
    let dataUrl = '';
    if (img && img.src) dataUrl = img.src;
    else if (canvas) dataUrl = canvas.toDataURL('image/png');

    tempContainer.remove();
    return dataUrl;
  } catch (err) {
    console.error('Error generando QR embebido:', err);
    return '';
  }
}

// ✅ Limpiar y acortar el texto para que el QR siempre se genere
function prepararTextoQR(texto) {
  // Quita acentos, emojis, saltos de línea y deja solo lo esencial
  const limpio = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^\w\-.,;:/\s]/g, "") // quita emojis y caracteres raros
    .replace(/\s+/g, " ") // reduce espacios
    .trim();

  // ✅ Acorta a 100 caracteres máximo (más que suficiente para QR estándar)
  return limpio.slice(0, 100);
}

//funcion para mostrar la descripcion del sistema
function mostrarDescripcionSistema() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      padding: 30px;
      border-radius: 16px;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      position: relative;
    ">
      <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
      ">✕</button>
      
      <h2 style="
        color: #0b3954;
        margin-top: 0;
        margin-bottom: 20px;
        text-align: center;
        font-size: 24px;
      ">Sobre el Sistema</h2>
      
      <div style="
        color: #333;
        line-height: 1.6;
        font-size: 14px;
      ">
        <p style="margin-bottom: 15px;"><strong>Sistema de Gestión de Informes de Laboratorio Clínico v1.2.2</strong></p>
        
        <p style="margin-bottom: 15px;">Una solución integral desarrollada específicamente para <strong>Hospital Wong</strong> que permite:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ Creación y gestión digital de informes de laboratorio</li>
          <li style="margin-bottom: 8px;">✓ Personalización de informes con múltiples secciones y parámetros</li>
          <li style="margin-bottom: 8px;">✓ Generación de PDF profesionales con firmas digitales</li>
          <li style="margin-bottom: 8px;">✓ Sistema de plantillas predefinidas para agilizar el trabajo</li>
          <li style="margin-bottom: 8px;">✓ Almacenamiento seguro de historial de informes</li>
          <li style="margin-bottom: 8px;">✓ Interfaz intuitiva y optimizada para uso clínico diario</li>
        </ul>
        
        <p style="margin: 20px 0 15px 0; text-align: center; font-style: italic; color: #666;">
          Desarrollado con tecnologías web modernas para garantizar un rendimiento óptimo y una experiencia de usuario fluida.
        </p>
        
        <div style="
          text-align: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #888;
        ">
          © 2025 Ángel Nicolás Esono WONG MODJO
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

//funcion para mostrar la politica de privacidad del sistema
function mostrarPoliticaPrivacidad() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    overflow-y: auto;
    padding: 20px;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      padding: 30px;
      border-radius: 16px;
      max-width: 700px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    ">
      <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        transition: color 0.2s;
      " onmouseover="this.style.color='#333'" onmouseout="this.style.color='#999'">✕</button>
      
      <h2 style="
        color: #0b3954;
        margin-top: 0;
        margin-bottom: 20px;
        text-align: center;
        font-size: 24px;
      ">Política de Privacidad</h2>
      
      <div style="
        color: #333;
        line-height: 1.6;
        font-size: 14px;
      ">
        <p style="margin-bottom: 15px;"><strong>Última actualización:</strong> Enero 2025</p>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">1. Información que Recopilamos</h3>
        
        <p style="margin-bottom: 15px;">En Hospital Wong, nos comprometemos a proteger tu privacidad. Nuestro Sistema de Gestión de Informes Clínicos recopila únicamente los datos necesarios para la prestación de nuestros servicios:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ <strong>Datos de identificación del paciente:</strong> Nombre, historial clínico, edad, género</li>
          <li style="margin-bottom: 8px;">✓ <strong>Información médica:</strong> Resultados de laboratorio, informes clínicos</li>
          <li style="margin-bottom: 8px;">✓ <strong>Datos de contacto:</strong> Información necesaria para la comunicación</li>
          <li style="margin-bottom: 8px;">✓ <strong>Firmas digitales:</strong> Para la validación de informes</li>
        </ul>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">2. Uso de la Información</h3>
        
        <p style="margin-bottom: 15px;">Utilizamos la información recopilada exclusivamente para:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ Generar y gestionar informes de laboratorio</li>
          <li style="margin-bottom: 8px;">✓ Mantener un historial clínico actualizado</li>
          <li style="margin-bottom: 8px;">✓ Proporcionar servicios médicos de calidad</li>
          <li style="margin-bottom: 8px;">✓ Cumplir con requisitos legales y regulatorios</li>
        </ul>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">3. Protección de Datos</h3>
        
        <p style="margin-bottom: 15px;">Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ <strong>Cifrado de datos:</strong> Toda la información se almacena cifrada</li>
          <li style="margin-bottom: 8px;">✓ <strong>Control de acceso:</strong> Autenticación requerida para acceder al sistema</li>
          <li style="margin-bottom: 8px;">✓ <strong>Almacenamiento seguro:</strong> Base de datos protegida con copias de seguridad</li>
          <li style="margin-bottom: 8px;">✓ <strong>Transmisión segura:</strong> Conexiones cifradas mediante HTTPS</li>
        </ul>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">4. Compartición de Información</h3>
        
        <p style="margin-bottom: 15px;">No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ Cuando sea requerido por ley</li>
          <li style="margin-bottom: 8px;">✓ Con tu consentimiento explícito</li>
          <li style="margin-bottom: 8px;">✓ Para proteger nuestros derechos legales</li>
          <li style="margin-bottom: 8px;">✓ Con proveedores de servicios que cumplen con nuestras políticas de privacidad</li>
        </ul>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">5. Derechos del Usuario</h3>
        
        <p style="margin-bottom: 15px;">Como usuario, tienes los siguientes derechos sobre tus datos personales:</p>
        
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">✓ <strong>Derecho de acceso:</strong> Solicitar una copia de tus datos</li>
          <li style="margin-bottom: 8px;">✓ <strong>Derecho de rectificación:</strong> Corregir datos inexactos</li>
          <li style="margin-bottom: 8px;">✓ <strong>Derecho de supresión:</strong> Eliminar tus datos cuando sea posible</li>
          <li style="margin-bottom: 8px;">✓ <strong>Derecho de portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
          <li style="margin-bottom: 8px;">✓ <strong>Derecho de oposición:</strong> Oponerte al procesamiento de tus datos</li>
        </ul>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">6. Retención de Datos</h3>
        
        <p style="margin-bottom: 15px;">Conservamos tus datos personales solo durante el tiempo necesario para los fines para los que fueron recopilados, cumpliendo con los plazos legales aplicables y los requisitos de conservación de registros médicos.</p>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">7. Cambios en esta Política</h3>
        
        <p style="margin-bottom: 15px;">Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas o por requisitos legales. Te notificaremos cualquier cambio significativo a través de nuestro sistema.</p>
        
        <h3 style="color: #0f9d8e; margin: 25px 0 15px 0; font-size: 18px;">8. Contacto</h3>
        
        <p style="margin-bottom: 15px;">Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tus datos personales, por favor contáctanos:</p>
        
        <p style="margin-bottom: 15px;"><strong>Email:</strong> <a href="mailto:wongaprende@gmail.com" style="color: #0f9d8e;">wongaprende@gmail.com</a></p>
        <p style="margin-bottom: 15px;"><strong>Teléfono:</strong> +240 222 282 835</p>
        <p style="margin-bottom: 15px;"><strong>Dirección:</strong> Sumco · MALABO</p>
        
        <div style="
          text-align: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #888;
        ">
          © 2025 Hospital Wong. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
// Exponer al ámbito global
window.mostrarDescripcionSistema = mostrarDescripcionSistema;
window.mostrarPoliticaPrivacidad = mostrarPoliticaPrivacidad;



// ===============================================
// FUNCIONES DE RENDERIZADO
// ===============================================

// Función para renderizar informes, es decir, que los informes esten en segundo plano mientras que no se aya selecionado
function renderReports() {
  reportsGrid.innerHTML = '';
  const searchTerm = document.getElementById('searchReports').value.toLowerCase();

  Object.values(REPORTS).forEach(r => {
    if (searchTerm && !r.title.toLowerCase().includes(searchTerm)) {
      return;
    }

    const el = document.createElement('div');
    el.className = 'report-card ' + (state.selectedReports.has(r.id) ? '' : 'inactive');
    el.innerHTML = `
      <div style="display:flex;gap:10px;align-items:center">
        <div style="font-size:22px">${r.icon}</div>
        <div style="flex:1"><h3 style="margin:0">${r.title}</h3><div class="small">${Object.keys(r.sections).length} secciones</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end">
          <label class="checkbox"><input type="checkbox" class="report-chk" data-report="${r.id}" ${state.selectedReports.has(r.id) ? 'checked' : ''}></label>
        </div>
      </div>`;
    reportsGrid.appendChild(el);
  });

  reportsGrid.querySelectorAll('.report-chk').forEach(cb => {
    cb.addEventListener('change', e => {
      const id = e.target.dataset.report;
      if (e.target.checked) {
        state.selectedReports.add(id);
        ensureReportInState(id);
      } else {
        state.selectedReports.delete(id);
        state.selectedSections[id] = new Set();
        Object.keys(REPORTS[id].sections).forEach(sid => state.selectedParams[id][sid] = new Set());
      }
      renderAll();
    });
  });
}

// Función para renderizar secciones
function renderSectionSelectors() {
  sectionsContainer.innerHTML = '';
  const selectedReports = Array.from(state.selectedReports).map(id => REPORTS[id]);

  if (selectedReports.length === 0) {
    sectionsContainer.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666; background: #f9fbff; border-radius: 8px; border: 2px dashed #d0e4f0;">
        <p style="margin: 0; font-size: 14px;">
          <strong>ⓘ No hay informes seleccionados</strong><br>
          Por favor, selecciona al menos un informe en la sección anterior para ver sus secciones aquí.
        </p>
      </div>
    `;
    return;
  }

  const mainAccordion = document.createElement('div');
  mainAccordion.className = 'sections-accordion';
  mainAccordion.style.cssText = 'padding:0;margin:0';

  selectedReports.forEach(r => {
    const reportAccordion = document.createElement('div');
    reportAccordion.className = 'accordion-item';
    reportAccordion.style.borderBottom = '1px solid #e6eef8';
    reportAccordion.style.marginBottom = '8px';

    const header = document.createElement('div');
    header.className = 'accordion-header-report';
    header.style.cssText = `
      padding: 12px;
      background: linear-gradient(90deg, #00c0c6 0%, #44f0e8 60%, #9ef6f6 100%);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      transition: all 0.18s ease;
      border-radius: 6px;
    `;

    header.innerHTML = `
      <div style="display:flex;gap:10px;align-items:center;flex:1">
        <span style="font-size:18px">${r.icon}</span>
        <strong style="color:#0b3954">${r.title}</strong>
        <span style="font-size:12px;color:#0f9d8e">✓ Activo</span>
        <span style="font-size:12px;color:#999">(${Object.keys(r.sections).length} secciones)</span>
      </div>
      <span class="accordion-toggle-report" style="font-size:18px;transition:transform 0.18s">▼</span>
    `;

    const content = document.createElement('div');
    content.className = 'accordion-content-sections';
    content.style.cssText = `
      padding: 0 0 10px 0;
      max-height: 420px;
      overflow-y: auto;
      display: block;
      background: transparent;
      margin-top: 8px;
    `;

    const sectionsWrapper = document.createElement('div');
    sectionsWrapper.style.cssText = 'padding: 8px 12px; display: flex; flex-direction: column; gap: 8px;';

    if (Object.keys(r.sections).length > 0) {
      const selectAllBtn = document.createElement('button');
      selectAllBtn.className = 'select-all';
      selectAllBtn.textContent = '☑ Seleccionar todas las secciones';
      selectAllBtn.style.cssText = `
        background: linear-gradient(90deg,#0ba4dc,#0f9d8e);
        color:#fff;border:none;padding:8px;border-radius:6px;cursor:pointer;font-weight:600;
      `;
      selectAllBtn.addEventListener('click', () => {
        Object.keys(r.sections).forEach(sid => state.selectedSections[r.id].add(sid));
        renderAll();
        saveAppState();
      });
      sectionsWrapper.appendChild(selectAllBtn);
    }

    Object.entries(r.sections).forEach(([sid, s]) => {
      const lab = document.createElement('label');
      lab.className = 'sect-item-accordion';
      lab.style.cssText = `
        display:flex;align-items:center;gap:10px;padding:10px;border-radius:6px;
        background:#fff;border:1px solid #eaf6ff;cursor:pointer;
      `;

      const isChecked = state.selectedSections[r.id].has(sid);

      lab.innerHTML = `
        <input type="checkbox" data-report="${r.id}" data-section="${sid}" ${isChecked ? 'checked' : ''} style="cursor:pointer;width:18px;height:18px">
        <span style="flex:1;font-weight:500;color:#0b3954">${escapeHtml(s.title)}</span>
        <span style="font-size:11px;color:#999">${s.params.length} parámetros</span>
      `;

      lab.addEventListener('mouseenter', () => { lab.style.background = '#f3fbff'; });
      lab.addEventListener('mouseleave', () => { lab.style.background = 'white'; });

      sectionsWrapper.appendChild(lab);
    });

    content.appendChild(sectionsWrapper);

    header.addEventListener('click', () => {
      const isOpen = content.style.display === 'block';
      content.style.display = isOpen ? 'none' : 'block';
      const toggle = header.querySelector('.accordion-toggle-report');
      toggle.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    reportAccordion.appendChild(header);
    reportAccordion.appendChild(content);
    mainAccordion.appendChild(reportAccordion);
  });

  sectionsContainer.appendChild(mainAccordion);

  sectionsContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', e => {
      const rep = e.target.dataset.report;
      const sec = e.target.dataset.section;
      if (e.target.checked) {
        state.selectedSections[rep].add(sec);
      } else {
        state.selectedSections[rep].delete(sec);
        state.selectedParams[rep][sec] = new Set();
      }
      renderParameterForms();
      saveAppState();
    });
  });
}

// Función para renderizar parámetros
function renderParameterForms() {
  paramsContainer.innerHTML = '';

  const mainAccordion = document.createElement('div');
  mainAccordion.className = 'card';
  mainAccordion.style.padding = '0';

  Object.values(REPORTS).forEach(r => {
    const selected = Array.from(state.selectedSections[r.id]);
    if (selected.length === 0) return;

    selected.forEach(secId => {
      const sec = r.sections[secId];
      if (!sec) return;

      const sectionAccordion = document.createElement('div');
      sectionAccordion.className = 'accordion-item';
      sectionAccordion.style.borderBottom = '1px solid #e6eef8';

      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.style.cssText = `
        padding: 14px;
        background: linear-gradient(90deg, #f38b02);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        transition: all 0.2s ease;
      `;
      header.innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;flex:1">
          <span style="font-size:18px">${r.icon}</span>
          <strong style="color:#00000">${r.title} → ${sec.title}</strong>
          <span style="font-size:12px;color:#0f9d8e">(${sec.params.length} parámetros)</span>
        </div>
        <span class="accordion-toggle" style="font-size:20px;transition:transform 0.2s">▼</span>
      `;

      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.style.cssText = `
        padding: 0;
        max-height: 500px;
        overflow-y: auto;
        display: none;
      `;

      const tbl = document.createElement('table');
      tbl.style.cssText = 'width:100%;border-collapse:separate;border-spacing:0;margin:0';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.style.background = '#0f9d8e';

      const headerCell = document.createElement('th');
      headerCell.style.cssText = 'padding:8px;border-bottom:2px solid #0f9d8e;cursor:pointer;text-align:center';

      const selectAllCheckbox = document.createElement('input');
      selectAllCheckbox.type = 'checkbox';
      selectAllCheckbox.style.cssText = 'cursor:pointer;width:18px;height:18px';
      selectAllCheckbox.id = `selectall_${r.id}_${secId}`;
      selectAllCheckbox.dataset.reportId = r.id;
      selectAllCheckbox.dataset.sectionId = secId;

      headerCell.appendChild(selectAllCheckbox);
      headerRow.appendChild(headerCell);

      const paramHeaderCell = document.createElement('th');
      paramHeaderCell.style.cssText = 'padding:8px;border-bottom:2px solid #0f9d8e';
      paramHeaderCell.textContent = 'PARÁMETRO';
      headerRow.appendChild(paramHeaderCell);

      const resultHeaderCell = document.createElement('th');
      resultHeaderCell.style.cssText = 'padding:8px;border-bottom:2px solid #0b0b0b;text-align:center';
      resultHeaderCell.textContent = 'RESULTADO';
      headerRow.appendChild(resultHeaderCell);

      const unitHeaderCell = document.createElement('th');
      unitHeaderCell.style.cssText = 'padding:8px;border-bottom:2px solid #0b0b0b;text-align:center';
      unitHeaderCell.textContent = 'UNIDAD';
      headerRow.appendChild(unitHeaderCell);

      const normalHeaderCell = document.createElement('th');
      normalHeaderCell.style.cssText = 'padding:8px;border-bottom:2px solid #0b0b0b';
      normalHeaderCell.textContent = 'VALOR NORMAL/INTERPRETACION';
      headerRow.appendChild(normalHeaderCell);

      thead.appendChild(headerRow);
      tbl.appendChild(thead);

      const tbody = document.createElement('tbody');
      sec.params.forEach((p, idx) => {
        const idSafe = `inp_${r.id}_${secId}_${slugify(p.k)}`;
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #edf5ff';
        let inputHtml = '';

        if (p.type === 'select' && p.options) {
          const storageKey = `custom_options_${r.id}_${secId}_${slugify(p.k)}`;
          let customOptions = JSON.parse(localStorage.getItem(storageKey) || '[]');
          let allOptions = [...new Set([...p.options, ...customOptions])];

          inputHtml = `
            <div style="display:flex;gap:6px;align-items:center">
              <select id="${idSafe}" class="param-input" style="flex:1;padding:8px;border-radius:6px;border:1px solid #d0eaf2" data-meta='${encodeURIComponent(JSON.stringify({ report: r.id, section: secId, key: p.k, unit: p.unit, normal: p.normal }))}'>
                ${allOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </select>
              <div style="display:flex;gap:6px;align-items:center">
                <button type="button" class="btn-add-option" data-key="${storageKey}" data-target="${idSafe}" title="Añadir nueva opción" style="background:#0f9d8e;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px">➕</button>
                <button type="button" class="btn-remove-option" data-key="${storageKey}" data-target="${idSafe}" title="Eliminar opción personalizada" style="background:#dc3545;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px">🗑️</button>
              </div>
            </div>`;
        } else {
          inputHtml = `<input id="${idSafe}" class="param-input" type="${p.type || 'text'}" ${p.readonly ? 'readonly' : ''} placeholder="${p.placeholder || ''}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #d0eaf2" data-meta='${encodeURIComponent(JSON.stringify({ report: r.id, section: secId, key: p.k, unit: p.unit, normal: p.normal }))}'>`;
        }

        const checked = state.selectedParams[r.id][secId].has(p.k) ? 'checked' : '';
        const paramCheckboxId = `param_${r.id}_${secId}_${idx}`;

        tr.innerHTML = `
          <td style="padding:8px;text-align:center"><input type="checkbox" id="${paramCheckboxId}" data-report="${r.id}" data-section="${secId}" data-param="${p.k}" ${checked}></td>
          <td style="padding:8px"><strong>${escapeHtml(p.k)}</strong></td>
          <td style="padding:8px">${inputHtml}</td>
          <td style="padding:8px;text-align:center"><strong>${escapeHtml(p.unit || '')}</strong></td>
          <td style="padding:8px"><strong>${escapeHtml((p.normal || '').replace(/\[\[br\]\]/g, '<br>'))}</strong></td>`;
        tbody.appendChild(tr);
      });
      tbl.appendChild(tbody);
      content.appendChild(tbl);

      header.addEventListener('click', () => {
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        const toggle = header.querySelector('.accordion-toggle');
        toggle.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });

      header.addEventListener('mouseenter', () => {
        header.style.background = 'linear-gradient(90deg, #0d8872, #e6f3ff)';
      });
      header.addEventListener('mouseleave', () => {
        header.style.background = 'linear-gradient(90deg, #0d8872, #f1f8ff)';
      });

      sectionAccordion.appendChild(header);
      sectionAccordion.appendChild(content);
      mainAccordion.appendChild(sectionAccordion);
    });
  });

  paramsContainer.appendChild(mainAccordion);

  // Eventos para checkboxes de parámetros individuales
  paramsContainer.querySelectorAll('input[id^="param_"]').forEach(paramCb => {
    paramCb.addEventListener('change', (e) => {
      const rep = e.target.dataset.report;
      const sec = e.target.dataset.section;
      const param = e.target.dataset.param;

      if (e.target.checked) {
        state.selectedParams[rep][sec].add(param);
      } else {
        state.selectedParams[rep][sec].delete(param);
      }

      // Actualizar selectAll checkbox
      const selectAllCb = document.getElementById(`selectall_${rep}_${sec}`);
      const allParamCbs = paramsContainer.querySelectorAll(`input[id^="param_${rep}_${sec}_"]`);

      if (selectAllCb && allParamCbs.length > 0) {
        const allChecked = Array.from(allParamCbs).every(cb => cb.checked);
        const someChecked = Array.from(allParamCbs).some(cb => cb.checked);

        selectAllCb.checked = allChecked;
        selectAllCb.indeterminate = someChecked && !allChecked;
      }

      saveAppState();
    });
  });

  // Evento para checkbox selectAll
  paramsContainer.querySelectorAll('input[id^="selectall_"]').forEach(selectAllCb => {
    selectAllCb.addEventListener('change', (e) => {
      const reportId = e.target.dataset.reportId;
      const sectionId = e.target.dataset.sectionId;
      const isChecked = e.target.checked;

      const paramCheckboxes = paramsContainer.querySelectorAll(`input[id^="param_${reportId}_${sectionId}_"]`);

      paramCheckboxes.forEach(cb => {
        cb.checked = isChecked;
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  // Eventos para botones de agregar/eliminar opciones personalizadas
  paramsContainer.querySelectorAll('.btn-add-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const targetId = btn.dataset.target;
      const select = document.getElementById(targetId);
      const newOption = prompt('Escribe la nueva opción a añadir:');
      if (!newOption || !newOption.trim()) return;

      const optionValue = newOption.trim();
      const existing = Array.from(select.options).map(o => o.value);
      if (existing.includes(optionValue)) {
        alert('Esta opción ya existe.');
        return;
      }

      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue;
      select.appendChild(option);
      select.value = optionValue;

      let stored = JSON.parse(localStorage.getItem(key) || '[]');
      stored.push(optionValue);
      localStorage.setItem(key, JSON.stringify(stored));
    });
  });

  paramsContainer.querySelectorAll('.btn-remove-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const targetId = btn.dataset.target;
      const select = document.getElementById(targetId);
      if (!select) return;
      const selected = select.value;
      if (!selected) {
        alert('Selecciona la opción a eliminar en el desplegable.');
        return;
      }

      let stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (!Array.isArray(stored) || stored.length === 0) {
        alert('No hay opciones personalizadas para eliminar.');
        return;
      }
      if (!stored.includes(selected)) {
        alert('No se puede eliminar una opción predeterminada.');
        return;
      }
      if (!confirm(`¿Eliminar la opción personalizada "${selected}"?`)) return;

      stored = stored.filter(o => o !== selected);
      localStorage.setItem(key, JSON.stringify(stored));

      const opt = Array.from(select.options).find(o => o.value === selected);
      if (opt) opt.remove();
      select.value = select.options.length ? select.options[0].value : '';

      if (typeof statusBox !== 'undefined' && statusBox) statusBox.textContent = 'Opción personalizada eliminada';
    });
  });
}

// Función para renderizar todo
function renderAll() {
  renderReports();
  renderSectionSelectors();
  renderParameterForms();
}

// ===============================================
// FUNCIONES DE PDF Y VISTA PREVIA
// ===============================================

// Función para construir HTML combinado
function buildCombinedHTML() {
  const fecha = document.getElementById('p_fecha').value || new Date().toLocaleDateString();
  const historial = document.getElementById('p_historial').value || 'SN';
  const nombre = document.getElementById('p_nombre').value || '';
  const edad = document.getElementById('p_edad').value || '';
  const sexo = document.getElementById('p_sexo').value || '';
  const registro = document.getElementById('p_reg').value || '';
  const professional = document.getElementById('professionalSelect').value || '';
  const title = document.getElementById('professionalTitle').value || '';
  const notes = document.getElementById('finalNotes').value || '';
  const sig = savedSigDataUrl || sigCanvas.toDataURL();

  // CSS mejorado para el PDF
  const css = `
    <style>
      @page {
        size: A4;
        margin: 6mm 8mm;
      }
      body {
        font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
        color: #0b3954;
        margin: 0;
        padding: 0;
        background: #fff;
        font-size: 12px;
      }
      .paper {
        padding: 8mm 10mm;
        max-width: 210mm;
        margin: 0 auto;
        background: #fff;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #0b3954;
        padding-bottom: 10px;
        margin-bottom: 12px;
      }
      h1 {
        margin: 0;
        font-size: 22px;
        color: #0b3954;
      }
      .meta {
        font-size: 12px;
        color: #555;
      }
      .patient-box {
        background: #f4fbff;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 12px;
        font-size: 13px;
      }
      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-top: 5px;
        font-size: 10px;
        border: 2px solid #0b0b0b;
        border-radius: 6px;
        background: #fff;
      }
      th, td {
        padding: 3px 5px;
        text-align: left;
        font-size: 10px;
        line-height: 1.2;
        border: none;
      }
      th {
        background: #f6f7fb;
        color: #0b0b0b;
        font-weight: 700;
        border: 1px solid #0b0b0b;
        border-radius: 4px;
        box-shadow: inset 0 0 0 1px #ffffff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .section {
        margin-bottom: 16px;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .section h2 {
        font-size: 16px;
        color: #000000;
        margin: 0 0 4px 0;
      }
      .section h3 {
        font-size: 13px;
        color: #000000;
        margin: 0 0 4px 0;
      }
      .sig {
        margin-top: 18px;
        border-top: 2px dashed #d0e4f0;
        padding-top: 10px;
        display: flex;
        gap: 16px;
        align-items: center;
        font-weight: 700;
      }
      .sig img {
        max-width: 200px;
        height: auto;
        border: 1px solid #d0e4f0;
        background: #fff;
        padding: 4px;
        border-radius: 6px;
      }
      .notes {
        margin-top: 10px;
        padding: 10px;
        border-left: 3px solid #0f9d8e;
        background: #f9fdff;
        font-size: 12px;
      }
      .final-block {
        page-break-inside: avoid;
        break-inside: avoid;
        margin-top: 14px;
      }
      footer {
        font-size: 9px;
        color: #777;
        text-align: center;
        margin-top: 6mm;
      }
      @media print {
        body {
          padding: 0;
          margin: 0;
          font-size: 11px;
        }
        .paper {
          margin: 0 auto;
          padding: 6mm 8mm;
        }
        th, td {
          font-size: 13px;
          padding: 2px 4px;
        }
        header {
          margin-bottom: 8px;
          padding-bottom: 8px;
        }
        .patient-box {
          margin-bottom: 10px;
          padding: 7px;
          font-size: 12px;
        }
        .notes {
          font-size: 11px;
        }
        .sig img {
          max-width: 180px;
        }
        footer {
          margin-top: 3mm;
        }
      }
    </style>
  `;

  let html = '<!doctype html><html><head><meta charset="utf-8"><title>Informe de Laboratorio</title>' + css + '</head><body>';
  html += `<div class="paper">`;

  // Encabezado con logo
  html += `
    <header>
      <div style="display:flex;gap:15px;align-items:center;margin-bottom:20px;">
        <div style="width:100px;height:92px;">
          <img src="${APP_CONFIG.LOGO_URL}" alt="Logo Clínica" style="width:100%;height:100%;object-fit:contain;">
        </div>
        <div>
          <h1>Hospital Wong</h1>
          <div class="meta">Sumco Malabo ·Tel +240 222 182 839</div>
        </div>
      </div>
      <div style="text-align:right">
        <div><strong>Fecha:</strong> ${escapeHtml(fecha)}</div>
        <div><strong>Generado:</strong> ${escapeHtml(new Date().toLocaleString())}</div>
      </div>
    </header>`;

  // Información del paciente con QR
  const qrRaw = JSON.stringify({ f: fecha, h: historial, n: nombre, e: edad, s: sexo, r: registro });
  const qrData = prepararTextoQR(qrRaw);
  const qrImage = generateQRCodeDataURL(qrData);

  html += `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:20px;">
      <div class="patient-box" style="flex:1; font-size:14px; line-height:1.3; min-height:90px; display:flex; flex-direction:column; justify-content:center;">
        <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:space-between;">
          <div style="flex:1; min-width:220px;">
            |&nbsp;<strong>Historial:</strong> ${escapeHtml(historial)} &nbsp;<br><br>
            |&nbsp;<strong>Paciente:</strong> ${escapeHtml(nombre)} &nbsp;<br><br>
            |&nbsp;<strong>Edad:</strong> ${escapeHtml(edad)} &nbsp;
          </div>
          <div style="flex:1; min-width:220px; text-align:right; margin-left:auto;">
            |&nbsp;<strong>Género:</strong> ${escapeHtml(sexo)} &nbsp;<br><br>
            |&nbsp;<strong>Registro:</strong> ${escapeHtml(registro)} &nbsp;
          </div>
        </div>
      </div>
      <div style="width:96px; height:96px; border:1px solid #d0e4f0; background:#fff; padding:4px; border-radius:6px; display:flex; align-items:center; justify-content:center;">
        ${qrImage ? `<img src="${qrImage}" alt="Código QR del paciente" style="width:100%;height:100%;object-fit:contain;">`
      : `<div style="font-size:10px;color:#999;text-align:center;">QR<br>Code</div>`}
      </div>
    </div>`;

  html += `<div><center><h1>INFORME DE LABORATORIO CLÍNICO</h1></center></div><br>`;

  // Secciones de informes
  Object.values(REPORTS).forEach(r => {
    const sel = Array.from(state.selectedSections[r.id]);
    if (sel.length === 0) return;

    html += `<div class="section"><h2>${escapeHtml(r.title)}</h2>`;

    sel.forEach(secId => {
      const sec = r.sections[secId];
      if (!sec) return;

      html += `<center><h3>${escapeHtml(sec.title)}</h3></center>`;
      html += `<table><thead><tr><th>PARÁMETRO</th><th><center>RESULTADO</center></th><th><center>UNIDAD</center></th><th>VALOR NORMAL/INTERPRETACION</th></tr></thead><tbody>`;

      sec.params.forEach(p => {
        const idSafe = `inp_${r.id}_${secId}_${slugify(p.k)}`;
        const el = document.getElementById(idSafe);
        if (!state.selectedParams[r.id][secId].has(p.k)) return;

        const val = el ? el.value : '';
        const escapedNormal = escapeHtml(p.normal || '');
        const htmlNormal = escapedNormal.replace(/\[\[br\]\]/g, '<br>');

        html += `<tr>
          <td><strong>${escapeHtml(p.k)}</strong></td>
          <td><center><strong>${escapeHtml(val)}</strong></center></td>
          <td><strong><center>${escapeHtml(p.unit || '')}</center></strong></td>
          <td><strong>${htmlNormal}</strong></td>
        </tr>`;
      });

      html += `</tbody></table>`;
    });

    html += `</div>`;
  });

  // Notas y firma
  html += `<div class="final-block">`;
  if (notes) {
    html += `<div class="notes"><strong>Observaciones:</strong><div>${escapeHtml(notes).replace(/\n/g, '<br>')}</div></div>`;
  }

  html += `<div class="sig">
    <div>
      <strong>${escapeHtml(professional)}</strong>
      <div>${escapeHtml(title)}</div>
    </div>
    <div>
      <img src="${sig}" alt="firma">
    </div>
  </div>`;

  html += `</div></body></html>`;

  return html;
}

// Función para construir JSON combinado del informe
function buildCombinedJSON() {
  const data = {
    meta: {
      fecha: document.getElementById('p_fecha').value || new Date().toISOString().split('T')[0],
      paciente: {
        historial: document.getElementById('p_historial').value || 'SN',
        nombre: document.getElementById('p_nombre').value || '',
        edad: document.getElementById('p_edad').value || '',
        sexo: document.getElementById('p_sexo').value || '',
        registro: document.getElementById('p_reg').value || ''
      },
      profesional: {
        nombre: document.getElementById('professionalSelect').value || '',
        cargo: document.getElementById('professionalTitle').value || ''
      },
      notas: document.getElementById('finalNotes').value || ''
    },
    informes: []
  };

  Object.values(REPORTS).forEach(r => {
    const selSections = Array.from(state.selectedSections[r.id] || []);
    if (selSections.length === 0) return;

    const informe = {
      id: r.id,
      title: r.title,
      secciones: []
    };

    selSections.forEach(secId => {
      const sec = r.sections[secId];
      if (!sec) return;

      const seccion = {
        id: secId,
        title: sec.title,
        parametros: []
      };

      sec.params.forEach(p => {
        if (!state.selectedParams[r.id][secId].has(p.k)) return;
        const idSafe = `inp_${r.id}_${secId}_${slugify(p.k)}`;
        const el = document.getElementById(idSafe);
        seccion.parametros.push({
          nombre: p.k,
          valor: el ? el.value : '',
          unidad: p.unit || '',
          normal: p.normal || ''
        });
      });

      informe.secciones.push(seccion);
    });

    data.informes.push(informe);
  });

  return data;
}

// Función para abrir modal de vista previa
async function openPreviewModal() {
  const haySecciones = Object.values(state.selectedSections).some(s => s.size > 0);
  if (!haySecciones) {
    alert('Marca al menos una sección de algún informe para generar la vista previa.');
    return;
  }

  try {
    await guardarInformeEnHistorial();
  } catch (e) {
    console.error('Error al exportar JSON automático:', e);
  }

  const html = buildCombinedHTML();

  if (_lastPreviewBlobURL) {
    URL.revokeObjectURL(_lastPreviewBlobURL);
    _lastPreviewBlobURL = null;
  }

  const blob = new Blob([html], { type: 'text/html' });
  const blobURL = URL.createObjectURL(blob);
  _lastPreviewBlobURL = blobURL;

  previewFrame.src = blobURL;
  modalPreview.classList.add('open');
  modalPreview.setAttribute('aria-hidden', 'false');

  previewFrame.onload = () => {
    conectarEventoImprimir();
    statusBox.textContent = 'Vista previa generada';
  };
}

// Función para conectar evento de impresión
function conectarEventoImprimir() {
  const btnImprimir = document.getElementById('modalPrint');
  if (btnImprimir) {
    btnImprimir.replaceWith(btnImprimir.cloneNode(true));
    const nuevoBtn = document.getElementById('modalPrint');
    nuevoBtn.addEventListener('click', imprimirVistaPrevia);
  }
}

// Función para imprimir vista previa
async function imprimirVistaPrevia() {
  statusBox.textContent = 'Preparando impresión...';
  try {
    const html = buildCombinedHTML();
    const ventanaImpresion = window.open('', '_blank', 'width=800,height=600');
    if (!ventanaImpresion) {
      alert('Por favor permite ventanas emergentes para imprimir');
      return;
    }

    ventanaImpresion.document.write(html);
    ventanaImpresion.document.close();

    setTimeout(() => {
      try {
        ventanaImpresion.focus();
        ventanaImpresion.print();
        statusBox.textContent = 'Diálogo de impresión abierto';
      } catch (error) {
        console.error('Error al imprimir:', error);
        statusBox.textContent = 'Error al imprimir';
      }
    }, 500);
  } catch (error) {
    console.error('Error al preparar impresión:', error);
    statusBox.textContent = 'Error al preparar impresión';
    alert('Error al intentar imprimir. Intenta guardar como PDF en su lugar.');
  }
}

// Función para guardar PDF *+FALTA SOLUCIONAR AUN SE TIENE QUE INVESTIGAR
async function savePDF() {
  const haySecciones = Object.values(state.selectedSections).some(s => s.size > 0);
  if (!haySecciones) {
    alert('Selecciona al menos una sección para guardar el informe.');
    return;
  }

  const nombre = document.getElementById('p_nombre').value || 'SinNombre';
  const historial = document.getElementById('p_historial').value || 'SN';
  const fecha = document.getElementById('p_fecha').value || new Date().toISOString().split('T')[0];
  const nombreArchivo = `historial-${nombre.replace(/\s+/g, '_')}-${fecha}.pdf`;

  statusBox.textContent = 'Generando PDF...';

  try {
    await guardarInformeEnHistorial();
    const html = buildCombinedHTML();

    const opt = {
      margin: 6,
      filename: nombreArchivo,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.width = '210mm';
    element.innerHTML = html;
    document.body.appendChild(element);

    await new Promise(resolve => setTimeout(resolve, 500));

    await html2pdf()
      .set(opt)
      .from(element)
      .save();

    document.body.removeChild(element);
    statusBox.textContent = `PDF guardado: ${nombreArchivo}`;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    statusBox.textContent = 'Error al generar PDF';
    alert('Ocurrió un error al generar el PDF. Por favor, intenta nuevamente.');
  }
}

// ===============================================
// FUNCIONES DE FIRMA
// ===============================================

// Funciones para el canvas de firma
function startDraw(e) {
  drawing = true;
  const rect = sigCanvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  lastX = x;
  lastY = y;
}

function draw(e) {
  if (!drawing) return;
  const rect = sigCanvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  sigCtx.beginPath();
  sigCtx.moveTo(lastX, lastY);
  sigCtx.lineTo(x, y);
  sigCtx.stroke();
  lastX = x;
  lastY = y;
}

function endDraw() {
  drawing = false;
}

// Event listeners para el canvas de firma
sigCanvas.addEventListener('mousedown', startDraw);
sigCanvas.addEventListener('touchstart', startDraw);
sigCanvas.addEventListener('mousemove', draw);
sigCanvas.addEventListener('touchmove', draw, { passive: false });
sigCanvas.addEventListener('mouseup', endDraw);
sigCanvas.addEventListener('mouseout', endDraw);
sigCanvas.addEventListener('touchend', endDraw);

// Event listener para cargar firma desde archivo
document.getElementById('sigFile').addEventListener('change', async (e) => {
  const f = e.target.files[0];
  if (!f) return;

  const reader = new FileReader();
  reader.onload = async function (ev) {
    try {
      const optimizedImage = await optimizeImage(ev.target.result);
      const img = new Image();
      img.onload = function () {
        // sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
        sigCtx.drawImage(img, 0, 0, sigCanvas.width, sigCanvas.height);
        //savedSigDataUrl = optimizedImage;
        statusBox.textContent = 'Firma cargada y optimizada';
      };
      img.src = optimizedImage;
    } catch (error) {
      console.error('Error al optimizar imagen:', error);
      statusBox.textContent = 'Error al procesar la imagen';
    }
  };
  reader.readAsDataURL(f);
});

// Event listeners para botones de firma
//document.getElementById('clearSig').addEventListener('click', () => {
//sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
//savedSigDataUrl = '';
//});

document.getElementById('saveSig').addEventListener('click', () => {
  savedSigDataUrl = sigCanvas.toDataURL('image/png');
  alert('Firma guardada para el informe (aparecerá en la vista previa/PDF).');
});

// ===============================================
// FUNCIONES DE GUARDADO Y CARGA
// ===============================================

// Función para guardar informe en historial +NECESITA REVISION+
async function guardarInformeEnHistorial() {
  try {
    const db = await openDB();
    const informeData = buildCombinedJSON();
    const registroHistorial = {
      id: Date.now(),
      fechaGeneracion: new Date().toISOString(),
      datosPaciente: informeData.meta.paciente,
      informesSeleccionados: informeData.informes.map(i => ({
        id: i.id,
        titulo: i.title,
        secciones: i.secciones.map(s => ({
          id: s.id,
          titulo: s.title,
          cantidadParametros: s.parametros.length
        }))
      })),
      profesional: informeData.meta.profesional,
      notas: informeData.meta.notas,
      totalParametros: informeData.informes.reduce((total, inf) =>
        total + inf.secciones.reduce((sum, sec) => sum + sec.parametros.length, 0), 0)
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(APP_CONFIG.STORE_HISTORY, 'readwrite');
      const store = tx.objectStore(APP_CONFIG.STORE_HISTORY);
      store.add(registroHistorial);
      tx.oncomplete = () => {
        statusBox.textContent = 'Informe guardado en historial';
        resolve(true);
      };
      tx.onerror = (e) => {
        statusBox.textContent = 'Error al guardar en historial';
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('Error en guardarInformeEnHistorial:', error);
    statusBox.textContent = 'Error al guardar historial';
  }
}

// Función para guardar estado de la aplicación
function saveAppState() {
  const appState = {
    selectedReports: Array.from(state.selectedReports),
    selectedSections: {},
    selectedParams: {}
  };

  Object.keys(state.selectedSections).forEach(k => {
    appState.selectedSections[k] = Array.from(state.selectedSections[k]);
  });

  Object.keys(state.selectedParams).forEach(r => {
    appState.selectedParams[r] = {};
    Object.keys(state.selectedParams[r]).forEach(s => {
      appState.selectedParams[r][s] = Array.from(state.selectedParams[r][s]);
    });
  });

  localStorage.setItem('appState', JSON.stringify(appState));
}

// Función para cargar estado de la aplicación
function loadAppState() {
  const savedState = localStorage.getItem('appState');
  if (!savedState) return;

  try {
    const appState = JSON.parse(savedState);

    state.selectedReports = new Set(appState.selectedReports || ['hematologia']);

    Object.keys(appState.selectedSections || {}).forEach(k => {
      state.selectedSections[k] = new Set(appState.selectedSections[k]);
    });

    Object.keys(appState.selectedParams || {}).forEach(r => {
      state.selectedParams[r] = {};
      Object.keys(appState.selectedParams[r]).forEach(s => {
        state.selectedParams[r][s] = new Set(appState.selectedParams[r][s]);
      });
    });
  } catch (error) {
    console.error('Error al cargar estado:', error);
  }
}

// Función para autoguardado
function scheduleAutoSave() {
  hasUnsavedChanges = true;
  statusBox.textContent = 'Cambios detectados...';

  if (autoSaveTimer) clearTimeout(autoSaveTimer);

  autoSaveTimer = setTimeout(() => {
    if (hasUnsavedChanges) {
      saveAppState();
      statusBox.textContent = 'Autoguardado: ' + new Date().toLocaleTimeString();
      hasUnsavedChanges = false;
    }
  }, APP_CONFIG.AUTO_SAVE_DELAY);
}

// ===============================================
// FUNCIONES DE PLANTILLAS
// ===============================================

// Función para cargar plantilla
function loadTemplate(templateName) {
  const template = TEMPLATES[templateName];
  if (!template) return;

  state.selectedReports = new Set();
  Object.keys(state.selectedSections).forEach(k => state.selectedSections[k] = new Set());

  template.reports.forEach(reportId => {
    state.selectedReports.add(reportId);
    if (template.sections[reportId]) {
      template.sections[reportId].forEach(sectionId => {
        state.selectedSections[reportId].add(sectionId);
      });
    }
  });

  renderAll();
  statusBox.textContent = `Plantilla "${templateName}" cargada`;
}
// Exponer al ámbito global
window.loadTemplate = loadTemplate;

// Función para guardar como plantilla
function saveAsTemplate() {
  const templateName = prompt('Nombre para la nueva plantilla:');
  if (!templateName) return;

  const template = {
    reports: Array.from(state.selectedReports),
    sections: {}
  };

  state.selectedReports.forEach(reportId => {
    template.sections[reportId] = Array.from(state.selectedSections[reportId]);
  });

  const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
  savedTemplates[templateName] = template;
  localStorage.setItem('customTemplates', JSON.stringify(savedTemplates));

  statusBox.textContent = `Plantilla "${templateName}" guardada`;
}
// Exponer al ámbito global
window.saveAsTemplate = saveAsTemplate;

// ===============================================
// FUNCIONES DE MODALES
// ===============================================

// Función para abrir modal
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}
// Exponer al ámbito global
window.openModal = openModal;

// Función para cerrar modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  const modal = document.getElementById(modalId);
  modal.querySelectorAll('input[type="text"], textarea, select').forEach(el => el.value = '');
  modal.querySelectorAll('[id^="message"]').forEach(el => el.innerHTML = '');
}
// Exponer al ámbito global
window.closeModal = closeModal;

// Event listeners para modales
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal.id);
  });
});

// ===============================================
// FUNCIONES DE INFORMES +CREATE-UPDATE-DROP+
// ===============================================

// Función para asegurar informe en estado
function ensureReportInState(reportId) {
  if (!state.selectedSections[reportId]) {
    state.selectedSections[reportId] = new Set();
    state.selectedParams[reportId] = {};
    Object.keys(REPORTS[reportId].sections).forEach(s => {
      state.selectedParams[reportId][s] = new Set();
    });
  }
}

// Función para guardar configuración de informes
function saveReportsConfigToLocal() {
  localStorage.setItem('reportsConfig', JSON.stringify(REPORTS));
}

// Función para añadir campo de sección
function addSectionField(containerId) {
  const container = document.getElementById(containerId);
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'section-container';
  sectionDiv.innerHTML = `
    <div class="section-input-group">
      <input type="text" placeholder="Nombre de sección (ej. Perfil Lipídico)" class="section-title" required>
      <input type="text" placeholder="ID (ej. perfil_lipidico)" class="section-id" required style="flex: 0.8;">
      <button type="button" onclick="this.parentElement.parentElement.remove()" class="btn-remove-section">✕</button>
    </div>
    <div class="param-options">
      <div style="font-size: 12px; font-weight: 600; color: #0b3954; margin-bottom: 8px;">Parámetros de esta sección:</div>
      <div class="params-list"></div>
      <button type="button" onclick="window.addParamField(this.closest('.param-options'))" class="btn-add-section" style="margin-top: 8px; font-size: 12px; padding: 8px 12px;">+ Parámetro</button>
    </div>
  `;
  container.appendChild(sectionDiv);
}
// Exponer al ámbito global
window.addSectionField = addSectionField;

// Función para añadir campo de parámetro
function addParamField(container) {
  const paramsList = container.querySelector('.params-list');
  const paramDiv = document.createElement('div');
  paramDiv.className = 'param-option-item';
  paramDiv.innerHTML = `
    <input type="text" placeholder="Nombre parámetro" class="param-name" required style="flex: 1;">
    <input type="text" placeholder="Unidad" class="param-unit" style="flex: 0.6;">
    <input type="text" placeholder="Normal" class="param-normal" style="flex: 0.6;">
    <button type="button" onclick="this.parentElement.remove()" style="background: #dc3545; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">✕</button>
  `;
  paramsList.appendChild(paramDiv);
}
// Exponer al ámbito global
window.addParamField = addParamField;

// Función para manejar añadir informe
function handleAddReport(event) {
  event.preventDefault();
  const title = document.getElementById('addReportTitle').value.trim();
  const id = document.getElementById('addReportId').value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  const icon = document.getElementById('addReportIcon').value.trim() || '🧪';
  const messageDiv = document.getElementById('messageAddReport');

  if (!title || !id) {
    messageDiv.innerHTML = '<div class="error-message">❌ Completa todos los campos requeridos</div>';
    return;
  }

  if (REPORTS[id]) {
    messageDiv.innerHTML = '<div class="error-message">❌ Ya existe un informe con ese ID</div>';
    return;
  }

  const sections = {};
  let sectionCount = 0;

  document.querySelectorAll('#addReportSections .section-container').forEach(secContainer => {
    const secTitle = secContainer.querySelector('.section-title').value.trim();
    const secId = secContainer.querySelector('.section-id').value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

    if (!secTitle || !secId) {
      messageDiv.innerHTML = '<div class="error-message">❌ Completa todos los IDs y títulos de secciones</div>';
      return;
    }

    const params = [];
    secContainer.querySelectorAll('.param-option-item').forEach(paramItem => {
      const name = paramItem.querySelector('.param-name').value.trim();
      const unit = paramItem.querySelector('.param-unit').value.trim() || '';
      const normal = paramItem.querySelector('.param-normal').value.trim() || '';

      if (name) {
        params.push({ k: name, unit, normal });
      }
    });

    if (params.length === 0) {
      messageDiv.innerHTML = '<div class="error-message">❌ Cada sección debe tener al menos un parámetro</div>';
      return;
    }

    sections[secId] = { title: secTitle, params };
    sectionCount++;
  });

  if (sectionCount === 0) {
    messageDiv.innerHTML = '<div class="error-message">❌ Debes crear al menos una sección</div>';
    return;
  }

  REPORTS[id] = { id, icon, title, sections };
  ensureReportInState(id);
  state.selectedReports.add(id);
  saveReportsConfigToLocal();
  renderAll();

  messageDiv.innerHTML = '<div class="success-message">✅ Informe creado exitosamente</div>';
  setTimeout(() => closeModal('modalAddReport'), 1500);
  statusBox.textContent = `Informe "${title}" añadido`;
}

// Función para cargar opciones de actualización de informe +NECESITA REVISION
function loadUpdateReportOptions() {
  const select = document.getElementById('updateReportSelect');
  select.innerHTML = '<option value="">-- Selecciona un informe --</option>';
  Object.entries(REPORTS).forEach(([id, report]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `${report.icon} ${report.title}`;
    select.appendChild(option);
  });
}
// Exponer al ámbito global
window.loadUpdateReportOptions = loadUpdateReportOptions;

// Función para alternar campos de actualización
function toggleUpdateFields() {
  const mode = document.getElementById('updateMode').value;
  const reportId = document.getElementById('updateReportSelect').value;
  const container = document.getElementById('updateFieldsContainer');

  if (!reportId) {
    container.innerHTML = '';
    return;
  }

  const report = REPORTS[reportId];
  container.innerHTML = '';

  if (mode === 'informe') {
    container.innerHTML = `
      <div class="form-group">
        <label>Nuevo Título</label>
        <input type="text" id="updateTitle" value="${report.title}">
      </div>
      <div class="form-group">
        <label>Nuevo Icono</label>
        <input type="text" id="updateIcon" value="${report.icon}" maxlength="2">
      </div>
    `;
  } else if (mode === 'seccion') {
    const secSelect = document.createElement('select');
    secSelect.id = 'updateSectionSelect';
    secSelect.required = true;
    secSelect.innerHTML = '<option value="">-- Selecciona una sección --</option>';
    Object.entries(report.sections).forEach(([secId, section]) => {
      const opt = document.createElement('option');
      opt.value = secId;
      opt.textContent = section.title;
      secSelect.appendChild(opt);
    });

    container.innerHTML = '<div class="form-group"><label>Sección a actualizar *</label></div>';
    container.querySelector('.form-group').appendChild(secSelect);

    secSelect.addEventListener('change', () => {
      const secId = secSelect.value;
      if (secId) {
        const section = report.sections[secId];
        document.getElementById('updateFieldsContainer').innerHTML += `
          <div class="form-group">
            <label>Nuevo Título de Sección</label>
            <input type="text" id="updateSectionTitle" value="${section.title}">
          </div>
        `;
      }
    });
  } else if (mode === 'parametro') {
    const secSelect = document.createElement('select');
    secSelect.id = 'deleteParamSectionSelect';
    secSelect.required = true;
    secSelect.innerHTML = '<option value="">-- Selecciona sección --</option>';
    Object.entries(report.sections).forEach(([secId, section]) => {
      const opt = document.createElement('option');
      opt.value = secId;
      opt.textContent = section.title;
      secSelect.appendChild(opt);
    });

    container.innerHTML = '<div class="form-group"><label>Sección *</label></div>';
    container.querySelector('.form-group').appendChild(secSelect);

    secSelect.addEventListener('change', () => {
      const secId = secSelect.value;
      if (secId) {
        const section = report.sections[secId];
        const paramSelect = document.createElement('select');
        paramSelect.id = 'updateParamSelect';
        paramSelect.required = true;
        paramSelect.innerHTML = '<option value="">-- Selecciona parámetro --</option>';
        section.params.forEach((param, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          opt.textContent = param.k;
          paramSelect.appendChild(opt);
        });

        document.getElementById('updateFieldsContainer').innerHTML += `
          <div class="form-group">
            <label>Parámetro *</label>
          </div>
        `;
        document.querySelector('.form-group:last-child').appendChild(paramSelect);

        paramSelect.addEventListener('change', () => {
          const paramIdx = paramSelect.value;
          if (paramIdx !== '') {
            const param = section.params[paramIdx];
            document.getElementById('updateFieldsContainer').innerHTML += `
              <div class="form-group">
                <label>Nuevo Nombre</label>
                <input type="text" id="updateParamName" value="${param.k}">
              </div>
              <div class="form-group">
                <label>Nueva Unidad</label>
                <input type="text" id="updateParamUnit" value="${param.unit || ''}">
              </div>
              <div class="form-group">
                <label>Nuevo Valor Normal/Interpretacion</label>
                <input type="text" id="updateParamNormal" value="${param.normal || ''}">
              </div>
            `;
          }
        });
      }
    });
  }
}

// Función para manejar actualización de informe
function handleUpdateReport(event) {
  event.preventDefault();
  const reportId = document.getElementById('updateReportSelect').value;
  const mode = document.getElementById('updateMode').value;
  const report = REPORTS[reportId];
  const messageDiv = document.getElementById('messageUpdateReport');

  if (!reportId) {
    messageDiv.innerHTML = '<div class="error-message">❌ Selecciona un informe</div>';
    return;
  }

  try {
    if (mode === 'informe') {
      report.title = document.getElementById('updateTitle').value.trim();
      report.icon = document.getElementById('updateIcon').value.trim();
    } else if (mode === 'seccion') {
      const secId = document.getElementById('updateSectionSelect').value;
      const newTitle = document.getElementById('updateSectionTitle').value.trim();
      if (secId && newTitle) {
        report.sections[secId].title = newTitle;
      }
    } else if (mode === 'parametro') {
      const secId = document.getElementById('updateParamSectionSelect').value;
      const paramIdx = document.getElementById('updateParamSelect').value;
      if (secId && paramIdx !== '') {
        const param = report.sections[secId].params[paramIdx];
        param.k = document.getElementById('updateParamName').value.trim();
        param.unit = document.getElementById('updateParamUnit').value.trim();
        param.normal = document.getElementById('updateParamNormal').value.trim();
      }
    }

    saveReportsConfigToLocal();
    renderAll();
    messageDiv.innerHTML = '<div class="success-message">✅ Actualización exitosa</div>';
    setTimeout(() => closeModal('modalUpdateReport'), 1500);
    statusBox.textContent = 'Configuración actualizada';
  } catch (error) {
    messageDiv.innerHTML = '<div class="error-message">❌ Error al actualizar</div>';
  }
}

// Función para cargar opciones de eliminación de informe +REQUIERE REVISION
function loadDeleteReportOptions() {
  const select = document.getElementById('deleteReportSelect');
  select.innerHTML = '<option value="">-- Selecciona un informe --</option>';
  Object.entries(REPORTS).forEach(([id, report]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `${report.icon} ${report.title}`;
    select.appendChild(option);
  });
}
// Exponer al ámbito global
window.loadDeleteReportOptions = loadDeleteReportOptions;

// Función para alternar campos de eliminación
function toggleDeleteFields() {
  const mode = document.getElementById('deleteMode').value;
  const reportId = document.getElementById('deleteReportSelect').value;
  const container = document.getElementById('deleteFieldsContainer');

  container.innerHTML = '';

  if (!reportId) return;

  const report = REPORTS[reportId];

  if (mode === 'seccion') {
    const secSelect = document.createElement('select');
    secSelect.id = 'deleteSectionSelect';
    secSelect.required = true;
    secSelect.innerHTML = '<option value="">-- Selecciona sección --</option>';
    Object.entries(report.sections).forEach(([secId, section]) => {
      const opt = document.createElement('option');
      opt.value = secId;
      opt.textContent = section.title;
      secSelect.appendChild(opt);
    });
    container.innerHTML = '<div class="form-group"><label>Sección a eliminar *</label></div>';
    container.querySelector('.form-group').appendChild(secSelect);
  } else if (mode === 'parametro') {
    const secSelect = document.createElement('select');
    secSelect.id = 'deleteParamSectionSelect';
    secSelect.required = true;
    secSelect.innerHTML = '<option value="">-- Selecciona sección --</option>';
    Object.entries(report.sections).forEach(([secId, section]) => {
      const opt = document.createElement('option');
      opt.value = secId;
      opt.textContent = section.title;
      secSelect.appendChild(opt);
    });

    container.innerHTML = '<div class="form-group"><label>Sección *</label></div>';
    container.querySelector('.form-group').appendChild(secSelect);

    secSelect.addEventListener('change', () => {
      const secId = secSelect.value;
      if (secId) {
        const section = report.sections[secId];
        const paramSelect = document.createElement('select');
        paramSelect.id = 'deleteParamSelect';
        paramSelect.required = true;
        paramSelect.innerHTML = '<option value="">-- Selecciona parámetro --</option>';
        section.params.forEach((param, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          opt.textContent = param.k;
          paramSelect.appendChild(opt);
        });
        document.getElementById('deleteFieldsContainer').innerHTML += `
          <div class="form-group">
            <label>Parámetro a eliminar *</label>
          </div>
        `;
        document.querySelector('.form-group:last-child').appendChild(paramSelect);
      }
    });
  }
}

// Función para manejar eliminación de informe
function handleDeleteReport(event) {
  event.preventDefault();
  const reportId = document.getElementById('deleteReportSelect').value;
  const mode = document.getElementById('deleteMode').value;
  const messageDiv = document.getElementById('messageDeleteReport');

  if (!reportId) {
    messageDiv.innerHTML = '<div class="error-message">❌ Selecciona un informe</div>';
    return;
  }

  if (!confirm('⚠️ ¿ESTÁS SEGURO? Esta acción no se puede deshacer.')) {
    return;
  }

  try {
    if (mode === 'informe') {
      delete REPORTS[reportId];
      delete state.selectedSections[reportId];
      delete state.selectedParams[reportId];
      state.selectedReports.delete(reportId);
    } else if (mode === 'seccion') {
      const secId = document.getElementById('deleteSectionSelect').value;
      delete REPORTS[reportId].sections[secId];
      state.selectedSections[reportId].delete(secId);
    } else if (mode === 'parametro') {
      const secId = document.getElementById('deleteParamSectionSelect').value;
      const paramIdx = document.getElementById('deleteParamSelect').value;
      REPORTS[reportId].sections[secId].params.splice(paramIdx, 1);
    }

    saveReportsConfigToLocal();
    renderAll();
    messageDiv.innerHTML = '<div class="success-message">✅ Eliminado exitosamente</div>';
    setTimeout(() => closeModal('modalDeleteReport'), 1500);
    statusBox.textContent = 'Elemento eliminado';
  } catch (error) {
    messageDiv.innerHTML = '<div class="error-message">❌ Error al eliminar</div>';
  }
}

// ===============================================
// FUNCIONES DE LOGIN Y SEGURIDAD
// ===============================================

// Función para manejar login + CREAR NIVELES DE SEGURIDAD 
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('loginError');

  if (username === 'admin' && password === 'laboratorio') {
    document.getElementById('loginScreen').style.display = 'none';
    statusBox.textContent = 'Acceso concedido. Bienvenido.';
  } else {
    error.textContent = 'Usuario o contraseña incorrectos.';
  }
}
// Exponer al ámbito global
window.handleLogin = handleLogin;

// Función para mostrar/ocultar contraseña
function togglePassword() {
  const input = document.getElementById('password');
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
}
// Exponer al ámbito global
window.togglePassword = togglePassword;

// Función para cerrar sesión
document.getElementById('btnLogout').addEventListener('click', () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').textContent = '';
    statusBox.textContent = 'Sesión cerrada.';
  }
});

// Función para calcular días desde una fecha
function diasDesde(fecha) {
  const hoy = new Date();
  const diferencia = hoy - new Date(fecha);
  return Math.floor(diferencia / (1000 * 60 * 60 * 24));
}

// Función para bloquear sistema 
function bloquearSistema() {
  document.body.innerHTML = `
    <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#f4f8fb;font-family:sans-serif;">
      <div style="background:white;padding:40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);text-align:center;">
        <center><h2 style="color:#dc3545;">Sistema bloqueado</h2></center>
        <p>El Período de Prueba ha Expirado. Contacta al administrador WONG IT +240 222 182-839.</p>
        <input id="claveDesbloqueo" type="password" placeholder="Ingresa la clave" style="padding:10px;width:100%;margin-top:10px;">
        <button onclick="intentarDesbloqueo()" style="margin-top:10px;padding:10px 20px;background:#0f9d8e;color:white;border:none;border-radius:6px;cursor:pointer;">Desbloquear</button>
        <p id="errorClave" style="color:red;margin-top:10px;"></p>
      </div>
    </div>
  `;
  localStorage.setItem(APP_CONFIG.CLAVE_BLOQUEO, "true");
}

// Función para intentar desbloqueo
function intentarDesbloqueo() {
  const input = document.getElementById('claveDesbloqueo').value;
  const error = document.getElementById('errorClave');
  if (input === APP_CONFIG.CLAVE_SECRETA) {
    localStorage.removeItem(APP_CONFIG.CLAVE_BLOQUEO);
    localStorage.removeItem(APP_CONFIG.CLAVE_INICIO);
    alert('Sistema desbloqueado. Recarga la página.');
    location.reload();
  } else {
    error.textContent = 'Clave incorrecta.';
  }
}
// Exponer al ámbito global
window.intentarDesbloqueo = intentarDesbloqueo;

// ===============================================
// INICIALIZACIÓN
// ===============================================

// Event listeners para botones principales
document.getElementById('btnNew').addEventListener('click', () => {
  if (!confirm('Limpiar todo y empezar nuevo informe?')) return;
  state.selectedReports = new Set(['hematologia']);
  Object.keys(state.selectedSections).forEach(k => state.selectedSections[k] = new Set());
  Object.keys(state.selectedParams).forEach(r => {
    Object.keys(state.selectedParams[r]).forEach(s => state.selectedParams[r][s] = new Set());
  });
  document.getElementById('p_historial').value = '';
  document.getElementById('p_nombre').value = '';
  document.getElementById('p_edad').value = '';
  document.getElementById('p_sexo').value = '';
  document.getElementById('p_reg').value = '';
  document.getElementById('p_fecha').valueAsDate = new Date();
  document.getElementById('finalNotes').value = '';
  document.getElementById('professionalSelect').value = '';
  document.getElementById('professionalTitle').value = '';
  //sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  //savedSigDataUrl = '';
  renderAll();
  statusBox.textContent = 'Nuevo informe listo';
});

document.getElementById('btnSavePDF').addEventListener('click', savePDF);
btnOpenPreview.addEventListener('click', openPreviewModal);
btnOpenPreview2.addEventListener('click', openPreviewModal);

modalClose.addEventListener('click', () => {
  previewFrame.src = 'about:blank';
  modalPreview.classList.remove('open');
  modalPreview.setAttribute('aria-hidden', 'true');
});

selectAllSections.addEventListener('click', () => {
  Object.keys(REPORTS).forEach(rid => {
    if (state.selectedReports.has(rid)) {
      Object.keys(REPORTS[rid].sections).forEach(sid => state.selectedSections[rid].add(sid));
    }
  });
  renderAll();
});

deselectAllSections.addEventListener('click', () => {
  Object.keys(REPORTS).forEach(rid => state.selectedSections[rid] = new Set());
  renderAll();
});

// Event listeners para botones de informes
document.getElementById('btnAddReport').addEventListener('click', () => {
  document.getElementById('addReportSections').innerHTML = '';
  document.getElementById('messageAddReport').innerHTML = '';
  openModal('modalAddReport');
});

document.getElementById('btnUpdateReport').addEventListener('click', () => {
  loadUpdateReportOptions();
  document.getElementById('updateReportSelect').value = '';
  document.getElementById('updateMode').value = 'informe';
  document.getElementById('updateFieldsContainer').innerHTML = '';
  document.getElementById('messageUpdateReport').innerHTML = '';
  openModal('modalUpdateReport');
});

document.getElementById('btnDeleteReport').addEventListener('click', () => {
  loadDeleteReportOptions();
  document.getElementById('deleteReportSelect').value = '';
  document.getElementById('deleteMode').value = 'informe';
  document.getElementById('deleteFieldsContainer').innerHTML = '';
  document.getElementById('messageDeleteReport').innerHTML = '';
  openModal('modalDeleteReport');
});

// Event listener para búsqueda de informes
document.getElementById('searchReports').addEventListener('input', renderReports);

// Event listeners para autoguardado
document.addEventListener('input', (e) => {
  if (!document.body.contains(e.target)) return;
  scheduleAutoSave();
});

// Event listeners para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('report-card') ||
      focusedElement.classList.contains('accordion-header-report') ||
      focusedElement.classList.contains('sect-item-accordion')) {
      focusedElement.click();
    }
  }

  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});

// Hacer elementos interactivos enfocables
document.querySelectorAll('.report-card, .accordion-header-report, .sect-item-accordion').forEach(el => {
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
  }
});

// Validación de entradas de usuario
document.querySelectorAll('input[type="text"], textarea').forEach(input => {
  input.addEventListener('blur', () => {
    input.value = validateUserInput(input.value);
  });
});

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('p_fecha').valueAsDate = new Date();

  // Cargar estado guardado
  loadAppState();

  // Renderizar interfaz
  renderAll();

  // Configurar event listeners para modales
  const updateReportSelect = document.getElementById('updateReportSelect');
  const updateMode = document.getElementById('updateMode');
  const deleteReportSelect = document.getElementById('deleteReportSelect');
  const deleteMode = document.getElementById('deleteMode');

  if (updateReportSelect) {
    updateReportSelect.addEventListener('change', toggleUpdateFields);
  }

  if (updateMode) {
    updateMode.addEventListener('change', toggleUpdateFields);
  }

  if (deleteReportSelect) {
    deleteReportSelect.addEventListener('change', toggleDeleteFields);
  }

  if (deleteMode) {
    deleteMode.addEventListener('change', toggleDeleteFields);
  }

  // Verificar estado de bloqueo del sistema
  const bloqueado = localStorage.getItem(APP_CONFIG.CLAVE_BLOQUEO) === "true";
  const inicio = localStorage.getItem(APP_CONFIG.CLAVE_INICIO);

  if (bloqueado) {
    bloquearSistema();
    return;
  }

  if (!inicio) {
    localStorage.setItem(APP_CONFIG.CLAVE_INICIO, new Date().toISOString());
  } else {
    const dias = diasDesde(inicio);
    if (dias >= APP_CONFIG.DURACION_DIAS) {
      bloquearSistema();
    }
  }
});

// ===============================================
// EXPORTACIONES GLOBALES PARA GITHUB PAGES
// ===============================================
// Exponer funciones críticas al ámbito global para compatibilidad con GitHub Pages
window.handleAddReport = handleAddReport;
window.handleUpdateReport = handleUpdateReport;
window.handleDeleteReport = handleDeleteReport;
window.toggleUpdateFields = toggleUpdateFields;
window.toggleDeleteFields = toggleDeleteFields;

