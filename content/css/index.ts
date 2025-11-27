import type { Cheatcode } from '../types'

export const cssCheatcode: Cheatcode = {
  metadata: {
    id: 'css',
    title: 'CSS3',
    language: 'CSS',
    category: 'styling',
    tags: ['css', 'frontend'],
    version: 'CSS3',
    description: 'Guía completa de CSS3: selectores, Flexbox, Grid, animaciones, variables y más',
    lastUpdated: '2024-11-25',
    logo: '/logos/css.svg',
    color: '#1572B6',
    difficulty: 'beginner',
  },
  sections: [
    // ============================================
    // SINTAXIS BÁSICA
    // ============================================
    {
      id: 'basic-syntax',
      title: 'Sintaxis Básica de CSS',
      type: 'code',
      code: {
        title: 'Estructura de una Regla CSS',
        language: 'css',
        description: 'Anatomía de una declaración CSS con selector, propiedad y valor.',
        code: `/* Estructura básica */
selector {
  propiedad: valor;
  otra-propiedad: otro-valor;
}

/* Ejemplo práctico */
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
}

/* Múltiples selectores */
h1, h2, h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Comentarios */
/* Este es un comentario de una línea */
/*
  Este es un comentario
  de múltiples líneas
*/`,
      },
    },

    // ============================================
    // SELECTORES BÁSICOS
    // ============================================
    {
      id: 'basic-selectors',
      title: 'Selectores Básicos',
      type: 'table',
      table: {
        title: 'Tipos de Selectores Fundamentales',
        headers: ['Selector', 'Ejemplo', 'Descripción'],
        rows: [
          { Selector: 'Universal', Ejemplo: '*', Descripción: 'Selecciona todos los elementos' },
          { Selector: 'Elemento', Ejemplo: 'p', Descripción: 'Selecciona todos los <p>' },
          { Selector: 'Clase', Ejemplo: '.clase', Descripción: 'Elementos con class="clase"' },
          { Selector: 'ID', Ejemplo: '#id', Descripción: 'Elemento con id="id"' },
          { Selector: 'Atributo', Ejemplo: '[type="text"]', Descripción: 'Elementos con atributo específico' },
          { Selector: 'Descendiente', Ejemplo: 'div p', Descripción: 'Todos los <p> dentro de <div>' },
          { Selector: 'Hijo directo', Ejemplo: 'div > p', Descripción: 'Solo <p> hijos directos de <div>' },
          { Selector: 'Hermano adyacente', Ejemplo: 'h1 + p', Descripción: 'Primer <p> después de <h1>' },
          { Selector: 'Hermanos generales', Ejemplo: 'h1 ~ p', Descripción: 'Todos los <p> después de <h1>' },
          { Selector: 'Agrupación', Ejemplo: 'h1, h2, h3', Descripción: 'Múltiples selectores' },
        ],
      },
    },

    // ============================================
    // SELECTORES DE ATRIBUTO
    // ============================================
    {
      id: 'attribute-selectors',
      title: 'Selectores de Atributo',
      type: 'code',
      code: {
        title: 'Selectores Basados en Atributos',
        language: 'css',
        description: 'Seleccionar elementos según sus atributos HTML.',
        code: `/* Tiene el atributo */
[disabled] { opacity: 0.5; }

/* Atributo con valor exacto */
[type="email"] { border-color: blue; }

/* Valor que comienza con */
[href^="https"] { color: green; }

/* Valor que termina con */
[href$=".pdf"] { background: url('pdf-icon.png'); }

/* Valor que contiene */
[class*="btn"] { cursor: pointer; }

/* Valor en lista separada por espacios */
[class~="active"] { font-weight: bold; }

/* Valor exacto o seguido de guión */
[lang|="es"] { font-family: 'Georgia'; }

/* Combinaciones */
input[type="text"][required] {
  border: 2px solid red;
}

/* Case insensitive (i) */
[href$=".PDF" i] { color: red; }`,
      },
    },

    // ============================================
    // PSEUDO-CLASES
    // ============================================
    {
      id: 'pseudo-classes',
      title: 'Pseudo-clases',
      type: 'code',
      code: {
        title: 'Estados y Posiciones con Pseudo-clases',
        language: 'css',
        description: 'Seleccionar elementos en estados específicos o posiciones.',
        code: `/* Estados de enlaces */
a:link { color: blue; }         /* No visitado */
a:visited { color: purple; }    /* Visitado */
a:hover { color: red; }         /* Mouse encima */
a:active { color: orange; }     /* Siendo clickeado */
a:focus { outline: 2px solid; } /* Con foco */

/* Estados de formularios */
input:focus { border-color: blue; }
input:disabled { background: #eee; }
input:enabled { background: white; }
input:checked { accent-color: green; }
input:required { border-left: 3px solid red; }
input:optional { border-left: 3px solid gray; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:placeholder-shown { font-style: italic; }
input:read-only { background: #f5f5f5; }

/* Posición entre hermanos */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(2) { color: red; }       /* Segundo elemento */
li:nth-child(odd) { background: #f5f5f5; }  /* Impares */
li:nth-child(even) { background: white; }   /* Pares */
li:nth-child(3n) { color: blue; }     /* Cada 3 elementos */
li:nth-child(3n+1) { font-size: 1.2em; }
li:nth-last-child(2) { font-style: italic; }
li:only-child { list-style: none; }

/* Por tipo */
p:first-of-type { font-size: 1.5em; }
p:last-of-type { margin-bottom: 0; }
p:nth-of-type(2) { color: gray; }
p:only-of-type { text-align: center; }

/* Negación y otros */
:not(.active) { opacity: 0.7; }
:empty { display: none; }
:root { --color-primary: #3498db; }
:target { background: yellow; }

/* Nuevas pseudo-clases */
:is(h1, h2, h3) { line-height: 1.2; }
:where(article, section) p { margin: 1em 0; }
:has(img) { padding: 10px; }  /* Padre que contiene img */`,
      },
    },

    // ============================================
    // PSEUDO-ELEMENTOS
    // ============================================
    {
      id: 'pseudo-elements',
      title: 'Pseudo-elementos',
      type: 'code',
      code: {
        title: 'Crear y Estilizar Partes de Elementos',
        language: 'css',
        description: 'Pseudo-elementos para contenido generado y partes específicas.',
        code: `/* Contenido antes y después */
.quote::before {
  content: '"';
  font-size: 2em;
  color: #ccc;
}

.quote::after {
  content: '"';
  font-size: 2em;
  color: #ccc;
}

/* Íconos con pseudo-elementos */
.external-link::after {
  content: ' ↗';
  font-size: 0.8em;
}

.required::after {
  content: ' *';
  color: red;
}

/* Primera línea y letra */
p::first-line {
  font-weight: bold;
  text-transform: uppercase;
}

p::first-letter {
  font-size: 3em;
  float: left;
  margin-right: 5px;
  line-height: 1;
}

/* Selección de texto */
::selection {
  background: #3498db;
  color: white;
}

/* Placeholder de inputs */
::placeholder {
  color: #999;
  font-style: italic;
}

/* Marcadores de listas */
li::marker {
  color: #3498db;
  font-weight: bold;
}

/* Scrollbar personalizado (webkit) */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}`,
      },
    },

    // ============================================
    // ESPECIFICIDAD
    // ============================================
    {
      id: 'specificity',
      title: 'Especificidad y Cascada',
      type: 'table',
      table: {
        title: 'Peso de Especificidad CSS',
        headers: ['Selector', 'Especificidad', 'Ejemplo'],
        rows: [
          { Selector: 'Inline styles', Especificidad: '1,0,0,0', Ejemplo: 'style="color: red"' },
          { Selector: 'ID', Especificidad: '0,1,0,0', Ejemplo: '#header' },
          { Selector: 'Clase/Atributo/Pseudo-clase', Especificidad: '0,0,1,0', Ejemplo: '.btn, [type], :hover' },
          { Selector: 'Elemento/Pseudo-elemento', Especificidad: '0,0,0,1', Ejemplo: 'div, ::before' },
          { Selector: 'Universal (*)', Especificidad: '0,0,0,0', Ejemplo: '*' },
          { Selector: '!important', Especificidad: 'Máxima', Ejemplo: 'color: red !important' },
        ],
      },
    },

    // ============================================
    // BOX MODEL
    // ============================================
    {
      id: 'box-model',
      title: 'Modelo de Caja (Box Model)',
      type: 'code',
      code: {
        title: 'Control del Box Model',
        language: 'css',
        description: 'Propiedades que controlan el tamaño y espaciado de elementos.',
        code: `/* Box sizing - RECOMENDADO usar border-box */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Margin (espacio exterior) */
.elemento {
  margin: 10px;                    /* Todos los lados */
  margin: 10px 20px;               /* Vertical | Horizontal */
  margin: 10px 20px 15px;          /* Top | Horizontal | Bottom */
  margin: 10px 20px 15px 25px;     /* Top | Right | Bottom | Left */
  margin-top: 10px;
  margin-inline: auto;             /* Centrar horizontalmente */
  margin-block: 20px;              /* Vertical (lógico) */
}

/* Padding (espacio interior) */
.elemento {
  padding: 20px;
  padding: 10px 20px;
  padding-left: 15px;
  padding-inline: 20px;            /* Horizontal (lógico) */
  padding-block: 10px;             /* Vertical (lógico) */
}

/* Border */
.elemento {
  border: 1px solid #333;
  border-width: 2px;
  border-style: solid;             /* solid, dashed, dotted, double, none */
  border-color: #333;
  border-radius: 8px;              /* Esquinas redondeadas */
  border-radius: 50%;              /* Círculo */
  border-radius: 10px 0 10px 0;    /* Esquinas individuales */
  border-top: 2px dashed red;
}

/* Outline (no afecta el layout) */
.elemento:focus {
  outline: 2px solid blue;
  outline-offset: 4px;
}

/* Dimensiones */
.elemento {
  width: 300px;
  height: 200px;
  min-width: 100px;
  max-width: 100%;
  min-height: 50px;
  max-height: 500px;
  aspect-ratio: 16 / 9;           /* Relación de aspecto */
}`,
      },
    },

    // ============================================
    // DISPLAY
    // ============================================
    {
      id: 'display',
      title: 'Display y Visibilidad',
      type: 'table',
      table: {
        title: 'Valores de Display',
        headers: ['Valor', 'Comportamiento', 'Uso común'],
        rows: [
          { Valor: 'block', Comportamiento: 'Ocupa todo el ancho, nueva línea', Uso: 'div, p, h1-h6' },
          { Valor: 'inline', Comportamiento: 'Fluye con el texto, no acepta width/height', Uso: 'span, a, strong' },
          { Valor: 'inline-block', Comportamiento: 'Inline pero acepta dimensiones', Uso: 'Botones, badges' },
          { Valor: 'none', Comportamiento: 'Oculto completamente', Uso: 'Esconder elementos' },
          { Valor: 'flex', Comportamiento: 'Contenedor flexible', Uso: 'Layouts 1D' },
          { Valor: 'inline-flex', Comportamiento: 'Flex pero inline', Uso: 'Flex en línea' },
          { Valor: 'grid', Comportamiento: 'Contenedor de cuadrícula', Uso: 'Layouts 2D' },
          { Valor: 'inline-grid', Comportamiento: 'Grid pero inline', Uso: 'Grid en línea' },
          { Valor: 'contents', Comportamiento: 'Solo hijos, sin caja', Uso: 'Wrappers semánticos' },
          { Valor: 'flow-root', Comportamiento: 'Block con BFC', Uso: 'Clearfix moderno' },
        ],
      },
    },

    // ============================================
    // FLEXBOX
    // ============================================
    {
      id: 'flexbox',
      title: 'Flexbox',
      type: 'code',
      code: {
        title: 'Layout Flexible con Flexbox',
        language: 'css',
        description: 'Sistema de layout unidimensional para alinear y distribuir elementos.',
        code: `/* Contenedor Flex */
.flex-container {
  display: flex;

  /* Dirección */
  flex-direction: row;            /* row | row-reverse | column | column-reverse */

  /* Wrap */
  flex-wrap: wrap;                /* nowrap | wrap | wrap-reverse */

  /* Shorthand */
  flex-flow: row wrap;

  /* Alineación eje principal */
  justify-content: flex-start;    /* flex-start | flex-end | center |
                                     space-between | space-around | space-evenly */

  /* Alineación eje cruzado */
  align-items: stretch;           /* stretch | flex-start | flex-end |
                                     center | baseline */

  /* Alineación de múltiples líneas */
  align-content: flex-start;      /* flex-start | flex-end | center |
                                     space-between | space-around | stretch */

  /* Gap entre elementos */
  gap: 20px;                      /* Espacio entre items */
  row-gap: 10px;
  column-gap: 20px;
}

/* Items Flex */
.flex-item {
  /* Crecimiento */
  flex-grow: 1;                   /* Proporción de espacio extra */

  /* Encogimiento */
  flex-shrink: 0;                 /* 0 = no encoge */

  /* Tamaño base */
  flex-basis: 200px;              /* Tamaño inicial */

  /* Shorthand */
  flex: 1;                        /* grow shrink basis */
  flex: 1 0 auto;
  flex: none;                     /* 0 0 auto */

  /* Orden */
  order: -1;                      /* Menor = primero */

  /* Alineación individual */
  align-self: center;             /* auto | flex-start | flex-end | center |
                                     baseline | stretch */
}

/* Patrones comunes */
.centrado-perfecto {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-layout {
  display: flex;
}
.sidebar { flex: 0 0 250px; }
.main { flex: 1; }`,
      },
    },

    // ============================================
    // CSS GRID
    // ============================================
    {
      id: 'grid',
      title: 'CSS Grid',
      type: 'code',
      code: {
        title: 'Layout de Cuadrícula con Grid',
        language: 'css',
        description: 'Sistema de layout bidimensional para layouts complejos.',
        code: `/* Contenedor Grid */
.grid-container {
  display: grid;

  /* Columnas */
  grid-template-columns: 200px 1fr 200px;
  grid-template-columns: repeat(3, 1fr);          /* 3 columnas iguales */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  /* Filas */
  grid-template-rows: 100px auto 50px;
  grid-auto-rows: minmax(100px, auto);           /* Filas implícitas */

  /* Gap */
  gap: 20px;
  row-gap: 10px;
  column-gap: 20px;

  /* Áreas nombradas */
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";

  /* Alineación de items */
  justify-items: stretch;         /* start | end | center | stretch */
  align-items: stretch;           /* start | end | center | stretch */

  /* Alineación del grid */
  justify-content: start;         /* start | end | center | stretch |
                                     space-around | space-between | space-evenly */
  align-content: start;
}

/* Items Grid */
.grid-item {
  /* Posicionamiento por líneas */
  grid-column: 1 / 3;             /* Línea inicio / línea fin */
  grid-column: 1 / span 2;        /* Desde línea 1, ocupa 2 */
  grid-row: 2 / 4;

  /* Shorthand */
  grid-area: 1 / 1 / 3 / 4;       /* row-start / col-start / row-end / col-end */

  /* Usando áreas nombradas */
  grid-area: header;

  /* Alineación individual */
  justify-self: center;
  align-self: end;
}

/* Layout Holy Grail */
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }

/* Grid responsivo automático */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}`,
      },
    },

    // ============================================
    // POSICIONAMIENTO
    // ============================================
    {
      id: 'positioning',
      title: 'Posicionamiento',
      type: 'code',
      code: {
        title: 'Position y Propiedades Relacionadas',
        language: 'css',
        description: 'Controlar la posición de elementos en el documento.',
        code: `/* Position static (por defecto) */
.static {
  position: static;  /* Flujo normal del documento */
}

/* Position relative */
.relative {
  position: relative;
  top: 10px;         /* Desplazamiento desde posición original */
  left: 20px;
  /* El espacio original se mantiene */
}

/* Position absolute */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Relativo al ancestro posicionado más cercano */
  /* Sale del flujo del documento */
}

/* Position fixed */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* Relativo al viewport, no se mueve al hacer scroll */
}

/* Position sticky */
.sticky {
  position: sticky;
  top: 0;
  /* Se comporta como relative hasta scroll, luego como fixed */
}

/* Z-index (solo funciona con position != static) */
.overlay {
  position: fixed;
  inset: 0;          /* Shorthand: top, right, bottom, left = 0 */
  z-index: 1000;
}

/* Centrar con position absolute */
.centrado-absoluto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Inset (shorthand para top/right/bottom/left) */
.cover {
  position: absolute;
  inset: 0;                       /* Todos = 0 */
  inset: 10px;                    /* Todos = 10px */
  inset: 10px 20px;               /* Vertical | Horizontal */
  inset: 10px 20px 30px;          /* Top | Horizontal | Bottom */
  inset: 10px 20px 30px 40px;     /* Top | Right | Bottom | Left */
}`,
      },
    },

    // ============================================
    // TIPOGRAFÍA
    // ============================================
    {
      id: 'typography',
      title: 'Tipografía',
      type: 'code',
      code: {
        title: 'Propiedades de Texto y Fuentes',
        language: 'css',
        description: 'Controlar la apariencia del texto.',
        code: `/* Familia de fuentes */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, sans-serif;
}

code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
}

/* Tamaño de fuente */
.texto {
  font-size: 16px;
  font-size: 1rem;               /* Relativo al root (16px default) */
  font-size: 1.2em;              /* Relativo al padre */
  font-size: clamp(1rem, 2.5vw, 2rem);  /* Responsivo con límites */
}

/* Peso de fuente */
.titulo {
  font-weight: bold;             /* normal (400) | bold (700) */
  font-weight: 600;              /* 100-900 */
}

/* Estilo y variantes */
.italic { font-style: italic; }
.caps { font-variant: small-caps; }

/* Altura de línea */
p {
  line-height: 1.6;              /* Multiplicador (sin unidad) */
  line-height: 24px;             /* Valor fijo */
}

/* Espaciado de letras y palabras */
.heading {
  letter-spacing: -0.02em;       /* Tracking */
  word-spacing: 0.1em;
}

/* Alineación */
.texto {
  text-align: left;              /* left | right | center | justify */
  text-align-last: center;       /* Última línea */
}

/* Decoración */
a { text-decoration: none; }
.subrayado {
  text-decoration: underline;
  text-decoration-color: blue;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.tachado { text-decoration: line-through; }

/* Transformación */
.mayusculas { text-transform: uppercase; }
.minusculas { text-transform: lowercase; }
.capitalizar { text-transform: capitalize; }

/* Sombra de texto */
h1 {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Truncar texto */
.truncar {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Truncar multilínea */
.truncar-multilinea {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Web fonts */
@font-face {
  font-family: 'MiFuente';
  src: url('fuente.woff2') format('woff2'),
       url('fuente.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;            /* Evita FOIT */
}`,
      },
    },

    // ============================================
    // COLORES
    // ============================================
    {
      id: 'colors',
      title: 'Colores y Fondos',
      type: 'code',
      code: {
        title: 'Formatos de Color y Propiedades de Fondo',
        language: 'css',
        description: 'Diferentes formas de especificar colores y configurar fondos.',
        code: `/* Formatos de color */
.colores {
  color: red;                            /* Palabra clave */
  color: #ff0000;                        /* Hexadecimal */
  color: #f00;                           /* Hex corto */
  color: #ff000080;                      /* Hex con alpha */
  color: rgb(255, 0, 0);                 /* RGB */
  color: rgba(255, 0, 0, 0.5);           /* RGBA */
  color: hsl(0, 100%, 50%);              /* HSL */
  color: hsla(0, 100%, 50%, 0.5);        /* HSLA */
  color: currentColor;                   /* Color actual heredado */
  color: transparent;                    /* Transparente */
}

/* Nuevos formatos CSS */
.colores-modernos {
  color: rgb(255 0 0 / 50%);             /* RGB moderno */
  color: hsl(0 100% 50% / 0.5);          /* HSL moderno */
  color: oklch(70% 0.15 200);            /* OKLCH (perceptual) */
  color: lab(50% 40 60);                 /* LAB */
  color: color-mix(in srgb, red 50%, blue);
}

/* Fondo de color */
.fondo {
  background-color: #3498db;
  background: linear-gradient(to right, #3498db, #9b59b6);
}

/* Gradientes */
.gradientes {
  /* Lineal */
  background: linear-gradient(45deg, red, blue);
  background: linear-gradient(to bottom right, #fff, #000);
  background: linear-gradient(90deg, red 0%, blue 50%, green 100%);

  /* Radial */
  background: radial-gradient(circle, red, blue);
  background: radial-gradient(ellipse at top left, red, blue);

  /* Cónico */
  background: conic-gradient(red, yellow, green, blue, red);
  background: conic-gradient(from 90deg, red, blue);

  /* Repetido */
  background: repeating-linear-gradient(45deg, #fff 0 10px, #000 10px 20px);
}

/* Imágenes de fondo */
.imagen-fondo {
  background-image: url('imagen.jpg');
  background-size: cover;                /* cover | contain | 100% 100% */
  background-position: center center;
  background-repeat: no-repeat;          /* no-repeat | repeat | repeat-x | repeat-y */
  background-attachment: fixed;          /* scroll | fixed | local */

  /* Shorthand */
  background: url('img.jpg') center/cover no-repeat fixed;

  /* Múltiples fondos */
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('imagen.jpg') center/cover;
}

/* Opacidad */
.elemento {
  opacity: 0.8;                          /* 0 = invisible, 1 = visible */
}`,
      },
    },

    // ============================================
    // BORDES Y SOMBRAS
    // ============================================
    {
      id: 'borders-shadows',
      title: 'Bordes, Sombras y Efectos',
      type: 'code',
      code: {
        title: 'Decoración de Elementos',
        language: 'css',
        description: 'Bordes avanzados, sombras y efectos visuales.',
        code: `/* Border radius avanzado */
.rounded {
  border-radius: 8px;                    /* Todos los lados */
  border-radius: 10px 20px 30px 40px;    /* TL TR BR BL */
  border-radius: 50%;                    /* Círculo */
  border-radius: 100px / 50px;           /* Elipse */
  border-top-left-radius: 20px;
}

/* Box shadow */
.sombra {
  /* offset-x | offset-y | blur | spread | color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Sombra interna */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Múltiples sombras */
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24);

  /* Sombra para elevación */
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

/* Border image */
.border-imagen {
  border: 10px solid transparent;
  border-image: url('border.png') 30 round;
  border-image: linear-gradient(45deg, gold, red) 1;
}

/* Filtros */
.filtros {
  filter: blur(5px);
  filter: brightness(1.2);
  filter: contrast(1.5);
  filter: grayscale(100%);
  filter: hue-rotate(90deg);
  filter: invert(100%);
  filter: saturate(2);
  filter: sepia(100%);
  filter: drop-shadow(2px 2px 4px black);

  /* Múltiples filtros */
  filter: contrast(1.2) brightness(1.1);
}

/* Backdrop filter (fondo difuminado) */
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Blend modes */
.mezcla {
  background-blend-mode: multiply;
  mix-blend-mode: overlay;
  /* normal | multiply | screen | overlay | darken |
     lighten | color-dodge | color-burn | hard-light |
     soft-light | difference | exclusion | hue |
     saturation | color | luminosity */
}

/* Clip path */
.recorte {
  clip-path: circle(50%);
  clip-path: ellipse(50% 30% at 50% 50%);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);  /* Triángulo */
  clip-path: inset(10px 20px 30px 40px round 10px);
}

/* Mask */
.mascara {
  mask-image: url('mascara.svg');
  mask-image: linear-gradient(to bottom, black 50%, transparent);
}`,
      },
    },

    // ============================================
    // VARIABLES CSS
    // ============================================
    {
      id: 'css-variables',
      title: 'Variables CSS (Custom Properties)',
      type: 'code',
      code: {
        title: 'Variables CSS Nativas',
        language: 'css',
        description: 'Crear y usar variables CSS para estilos reutilizables.',
        code: `/* Definir variables (generalmente en :root) */
:root {
  /* Colores */
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  --color-text: #333;
  --color-bg: #fff;

  /* Tipografía */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-lg: 1.25rem;
  --font-size-sm: 0.875rem;

  /* Espaciado */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Bordes */
  --border-radius: 8px;
  --border-color: #ddd;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 20px rgba(0,0,0,0.15);

  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}

/* Usar variables */
.button {
  background-color: var(--color-primary);
  font-family: var(--font-family);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

/* Valor por defecto (fallback) */
.card {
  color: var(--color-text, #333);
  padding: var(--card-padding, 20px);
}

/* Sobrescribir en contexto */
.dark-theme {
  --color-text: #fff;
  --color-bg: #1a1a1a;
  --border-color: #333;
}

/* Variables en media queries */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #fff;
    --color-bg: #121212;
  }
}

/* Variables dinámicas con JS */
/* document.documentElement.style.setProperty('--color-primary', '#ff0000'); */

/* Cálculos con variables */
.elemento {
  width: calc(100% - var(--spacing-lg) * 2);
  font-size: calc(var(--font-size-base) * 1.5);
}`,
      },
    },

    // ============================================
    // TRANSICIONES
    // ============================================
    {
      id: 'transitions',
      title: 'Transiciones',
      type: 'code',
      code: {
        title: 'Animaciones de Transición',
        language: 'css',
        description: 'Crear transiciones suaves entre estados.',
        code: `/* Sintaxis básica */
.button {
  background: #3498db;
  transition: background 0.3s ease;
}

.button:hover {
  background: #2980b9;
}

/* Transición completa */
.card {
  /* property | duration | timing-function | delay */
  transition: transform 0.3s ease-in-out 0s;

  /* Múltiples propiedades */
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    box-shadow 0.3s ease;

  /* Todas las propiedades */
  transition: all 0.3s ease;
}

/* Timing functions */
.timing {
  transition-timing-function: ease;          /* Por defecto */
  transition-timing-function: linear;        /* Velocidad constante */
  transition-timing-function: ease-in;       /* Lento al inicio */
  transition-timing-function: ease-out;      /* Lento al final */
  transition-timing-function: ease-in-out;   /* Lento inicio y final */
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-timing-function: steps(4);      /* Pasos discretos */
}

/* Ejemplos prácticos */

/* Hover con elevación */
.card {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

/* Fade in/out */
.modal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

/* Underline animado */
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}`,
      },
    },

    // ============================================
    // ANIMACIONES
    // ============================================
    {
      id: 'animations',
      title: 'Animaciones (@keyframes)',
      type: 'code',
      code: {
        title: 'Animaciones CSS Complejas',
        language: 'css',
        description: 'Crear animaciones con @keyframes.',
        code: `/* Definir animación */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Aplicar animación */
.elemento {
  /* name | duration | timing | delay | iteration | direction | fill | play */
  animation: fadeIn 1s ease-out;

  /* Propiedades individuales */
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;    /* número o infinite */
  animation-direction: alternate;         /* normal | reverse | alternate | alternate-reverse */
  animation-fill-mode: forwards;          /* none | forwards | backwards | both */
  animation-play-state: running;          /* running | paused */
}

/* Múltiples animaciones */
.elemento {
  animation:
    fadeIn 0.5s ease-out,
    slideIn 0.5s ease-out 0.2s;
}

/* Spinner de carga */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Skeleton loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Pausar en hover */
.animated:hover {
  animation-play-state: paused;
}`,
      },
    },

    // ============================================
    // TRANSFORMS
    // ============================================
    {
      id: 'transforms',
      title: 'Transformaciones',
      type: 'code',
      code: {
        title: 'Transform 2D y 3D',
        language: 'css',
        description: 'Transformar elementos en 2D y 3D.',
        code: `/* Transformaciones 2D */
.elemento {
  /* Trasladar */
  transform: translate(50px, 100px);
  transform: translateX(50px);
  transform: translateY(100px);

  /* Rotar */
  transform: rotate(45deg);
  transform: rotate(-90deg);

  /* Escalar */
  transform: scale(1.5);
  transform: scale(2, 0.5);        /* X, Y */
  transform: scaleX(2);

  /* Inclinar */
  transform: skew(10deg, 5deg);
  transform: skewX(10deg);

  /* Múltiples transformaciones */
  transform: translate(50px, 0) rotate(45deg) scale(1.2);
}

/* Origen de transformación */
.elemento {
  transform-origin: center center;   /* Por defecto */
  transform-origin: top left;
  transform-origin: 100% 100%;
  transform-origin: 50px 50px;
}

/* Transformaciones 3D */
.contenedor-3d {
  perspective: 1000px;               /* Perspectiva del padre */
  perspective-origin: center;
}

.elemento-3d {
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: rotateZ(45deg);         /* Igual que rotate() */
  transform: rotate3d(1, 1, 0, 45deg);

  transform: translateZ(100px);
  transform: translate3d(50px, 100px, 200px);

  transform: scaleZ(2);
  transform: scale3d(1, 1, 2);

  /* Preservar 3D para hijos */
  transform-style: preserve-3d;

  /* Visibilidad del reverso */
  backface-visibility: hidden;
}

/* Flip card */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}`,
      },
    },

    // ============================================
    // RESPONSIVE DESIGN
    // ============================================
    {
      id: 'responsive',
      title: 'Diseño Responsivo',
      type: 'code',
      code: {
        title: 'Media Queries y Unidades Responsivas',
        language: 'css',
        description: 'Crear diseños que se adaptan a diferentes dispositivos.',
        code: `/* Media Queries - Mobile First */
/* Base: móvil */
.container {
  width: 100%;
  padding: 15px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Desktop grande */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}

/* Orientación */
@media (orientation: landscape) {
  .hero { height: 50vh; }
}

@media (orientation: portrait) {
  .hero { height: 70vh; }
}

/* Preferencias del usuario */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #121212;
    --color-text: #fff;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}

/* Hover solo en dispositivos que lo soportan */
@media (hover: hover) {
  .card:hover {
    transform: translateY(-5px);
  }
}

/* Unidades responsivas */
.responsive {
  /* Viewport units */
  width: 100vw;                    /* 100% viewport width */
  height: 100vh;                   /* 100% viewport height */
  min-height: 100dvh;              /* Dynamic viewport (móvil) */
  width: 50vmin;                   /* 50% del lado menor */
  width: 50vmax;                   /* 50% del lado mayor */

  /* Contenedor queries (moderno) */
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  padding: clamp(1rem, 5%, 3rem);
}

/* Container Queries */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

/* Imágenes responsivas */
img {
  max-width: 100%;
  height: auto;
}`,
      },
    },

    // ============================================
    // UNIDADES CSS
    // ============================================
    {
      id: 'units',
      title: 'Unidades CSS',
      type: 'table',
      table: {
        title: 'Todas las Unidades CSS',
        headers: ['Unidad', 'Tipo', 'Descripción'],
        rows: [
          { Unidad: 'px', Tipo: 'Absoluta', Descripción: 'Píxeles (1/96 de pulgada)' },
          { Unidad: 'em', Tipo: 'Relativa', Descripción: 'Relativo al font-size del padre' },
          { Unidad: 'rem', Tipo: 'Relativa', Descripción: 'Relativo al font-size del root (html)' },
          { Unidad: '%', Tipo: 'Relativa', Descripción: 'Porcentaje del elemento padre' },
          { Unidad: 'vw', Tipo: 'Viewport', Descripción: '1% del ancho del viewport' },
          { Unidad: 'vh', Tipo: 'Viewport', Descripción: '1% del alto del viewport' },
          { Unidad: 'dvh', Tipo: 'Viewport', Descripción: 'Dynamic viewport height (móvil)' },
          { Unidad: 'svh', Tipo: 'Viewport', Descripción: 'Small viewport height' },
          { Unidad: 'lvh', Tipo: 'Viewport', Descripción: 'Large viewport height' },
          { Unidad: 'vmin', Tipo: 'Viewport', Descripción: '1% del lado menor del viewport' },
          { Unidad: 'vmax', Tipo: 'Viewport', Descripción: '1% del lado mayor del viewport' },
          { Unidad: 'ch', Tipo: 'Relativa', Descripción: 'Ancho del carácter "0"' },
          { Unidad: 'ex', Tipo: 'Relativa', Descripción: 'Altura de la "x" de la fuente' },
          { Unidad: 'lh', Tipo: 'Relativa', Descripción: 'Line-height del elemento' },
          { Unidad: 'fr', Tipo: 'Flexible', Descripción: 'Fracción del espacio disponible (Grid)' },
          { Unidad: 'deg', Tipo: 'Ángulo', Descripción: 'Grados (360 = círculo completo)' },
          { Unidad: 'turn', Tipo: 'Ángulo', Descripción: 'Vueltas (1turn = 360deg)' },
          { Unidad: 'ms', Tipo: 'Tiempo', Descripción: 'Milisegundos' },
          { Unidad: 's', Tipo: 'Tiempo', Descripción: 'Segundos' },
        ],
      },
    },

    // ============================================
    // FUNCIONES CSS
    // ============================================
    {
      id: 'css-functions',
      title: 'Funciones CSS',
      type: 'code',
      code: {
        title: 'Funciones Útiles de CSS',
        language: 'css',
        description: 'Funciones para cálculos y valores dinámicos.',
        code: `/* calc() - Cálculos matemáticos */
.elemento {
  width: calc(100% - 40px);
  height: calc(100vh - 80px);
  font-size: calc(1rem + 0.5vw);
  margin: calc(var(--spacing) * 2);
}

/* min(), max(), clamp() */
.responsive {
  /* Mínimo entre dos valores */
  width: min(100%, 800px);

  /* Máximo entre dos valores */
  width: max(300px, 50%);

  /* Valor entre un mínimo y máximo */
  font-size: clamp(1rem, 2.5vw, 2rem);
  width: clamp(200px, 50%, 600px);
}

/* url() - Recursos externos */
.fondo {
  background-image: url('imagen.jpg');
  background-image: url('../images/bg.png');
}

/* var() - Variables CSS */
.color {
  color: var(--color-primary);
  color: var(--color-text, #333);    /* Con fallback */
}

/* attr() - Valor de atributo */
.tooltip::after {
  content: attr(data-tooltip);
}

/* counter() - Contadores */
ol {
  counter-reset: item;
}
li::before {
  counter-increment: item;
  content: counter(item) ". ";
}

/* Funciones de color */
.colores {
  color: rgb(255, 0, 0);
  color: rgba(255, 0, 0, 0.5);
  color: hsl(120, 100%, 50%);
  color: hsla(120, 100%, 50%, 0.5);
  color: color-mix(in srgb, red 50%, blue);
}

/* Funciones de forma */
.forma {
  clip-path: circle(50%);
  clip-path: ellipse(50% 30%);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  clip-path: inset(10px round 5px);
}

/* Funciones de gradiente */
.gradiente {
  background: linear-gradient(to right, red, blue);
  background: radial-gradient(circle, red, blue);
  background: conic-gradient(red, yellow, green, blue);
}

/* repeat() para Grid */
.grid {
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* minmax() para Grid */
.grid {
  grid-template-columns: minmax(100px, 1fr) 2fr;
  grid-auto-rows: minmax(100px, auto);
}`,
      },
    },

    // ============================================
    // OVERFLOW Y SCROLL
    // ============================================
    {
      id: 'overflow-scroll',
      title: 'Overflow y Scroll',
      type: 'code',
      code: {
        title: 'Control de Contenido Desbordado',
        language: 'css',
        description: 'Manejar contenido que excede su contenedor.',
        code: `/* Overflow básico */
.contenedor {
  overflow: visible;              /* Por defecto, se desborda */
  overflow: hidden;               /* Oculta contenido extra */
  overflow: scroll;               /* Siempre muestra scrollbars */
  overflow: auto;                 /* Scrollbars solo si es necesario */
  overflow: clip;                 /* Como hidden pero sin scroll programático */

  /* Por eje */
  overflow-x: hidden;
  overflow-y: auto;
}

/* Scroll snap */
.scroll-container {
  scroll-snap-type: x mandatory;  /* x | y | both + mandatory | proximity */
  overflow-x: auto;
}

.scroll-item {
  scroll-snap-align: start;       /* start | center | end */
  scroll-snap-stop: always;       /* normal | always */
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;        /* Scroll suave para anclas */
}

/* Scrollbar styling (webkit) */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Firefox scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;          /* auto | thin | none */
  scrollbar-color: #888 #f1f1f1;  /* thumb track */
}

/* Scroll margin/padding */
.section {
  scroll-margin-top: 80px;        /* Espacio al hacer scroll a ancla */
  scroll-padding: 20px;
}

/* Overscroll behavior */
.modal {
  overscroll-behavior: contain;   /* auto | contain | none */
}`,
      },
    },

    // ============================================
    // ASPECT RATIO Y OBJECT FIT
    // ============================================
    {
      id: 'aspect-object',
      title: 'Aspect Ratio y Object Fit',
      type: 'code',
      code: {
        title: 'Control de Proporciones e Imágenes',
        language: 'css',
        description: 'Mantener proporciones y ajustar imágenes/videos.',
        code: `/* Aspect ratio */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square {
  aspect-ratio: 1;                /* 1 / 1 */
  width: 200px;
}

.portrait {
  aspect-ratio: 3 / 4;
}

/* Object fit para imágenes/videos */
.imagen {
  width: 100%;
  height: 300px;

  object-fit: cover;              /* Recorta para cubrir */
  object-fit: contain;            /* Escala para caber */
  object-fit: fill;               /* Estira (deforma) */
  object-fit: none;               /* Tamaño original */
  object-fit: scale-down;         /* El menor entre none y contain */

  object-position: center center; /* Posición del contenido */
  object-position: top left;
  object-position: 50% 25%;
}

/* Avatar circular */
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Card con imagen de fondo */
.card-image {
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
}

/* Galería con aspect ratio consistente */
.gallery img {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
}`,
      },
    },

    // ============================================
    // @LAYER Y CASCADE
    // ============================================
    {
      id: 'cascade-layers',
      title: 'Cascade Layers (@layer)',
      type: 'code',
      code: {
        title: 'Control de la Cascada con Layers',
        language: 'css',
        description: 'Organizar estilos en capas para mejor control de especificidad.',
        code: `/* Definir orden de capas */
@layer reset, base, components, utilities;

/* Estilos de reset */
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

/* Estilos base */
@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  h1, h2, h3 {
    line-height: 1.2;
  }
}

/* Componentes */
@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .card {
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

/* Utilidades (mayor prioridad) */
@layer utilities {
  .text-center { text-align: center; }
  .mt-4 { margin-top: 1rem; }
  .hidden { display: none; }
}

/* Importar con layer */
@import url('framework.css') layer(framework);

/* Estilos sin layer tienen la mayor prioridad */
.override {
  color: red;
}`,
      },
    },

    // ============================================
    // PRINT STYLES
    // ============================================
    {
      id: 'print',
      title: 'Estilos de Impresión',
      type: 'code',
      code: {
        title: 'CSS para Impresión (@media print)',
        language: 'css',
        description: 'Optimizar páginas para impresión.',
        code: `@media print {
  /* Ocultar elementos no necesarios */
  nav,
  .sidebar,
  .no-print,
  footer,
  .ads {
    display: none !important;
  }

  /* Ajustes generales */
  body {
    font-size: 12pt;
    line-height: 1.4;
    color: #000;
    background: #fff;
  }

  /* Ancho completo */
  .container {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
  }

  /* Enlaces - mostrar URL */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Control de saltos de página */
  h1, h2, h3 {
    page-break-after: avoid;
    break-after: avoid;
  }

  p, li {
    orphans: 3;                    /* Mínimo líneas al final */
    widows: 3;                     /* Mínimo líneas al inicio */
  }

  table, figure, img {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Forzar salto de página */
  .page-break {
    page-break-before: always;
    break-before: page;
  }

  /* Imprimir fondos */
  .print-bg {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Tamaño de página */
  @page {
    size: A4;
    margin: 2cm;
  }

  @page :first {
    margin-top: 3cm;
  }
}`,
      },
    },

    // ============================================
    // BUENAS PRÁCTICAS
    // ============================================
    {
      id: 'best-practices',
      title: 'Buenas Prácticas CSS',
      type: 'list',
      items: [
        'Usar box-sizing: border-box en todos los elementos',
        'Seguir metodología de nombres (BEM, SMACSS, etc.)',
        'Evitar selectores con alta especificidad innecesaria',
        'Organizar CSS: reset, base, layout, components, utilities',
        'Usar variables CSS para valores reutilizables',
        'Mobile-first: diseñar primero para móvil',
        'Usar rem/em para tipografía, px para bordes y sombras',
        'Preferir Flexbox para 1D, Grid para layouts 2D',
        'Evitar !important excepto en utilities',
        'Usar transform y opacity para animaciones (GPU)',
        'Agrupar media queries al final o junto a componentes',
        'Minificar CSS en producción',
        'Usar autoprefixer para compatibilidad',
        'Implementar prefers-reduced-motion para accesibilidad',
        'Lazy load CSS no crítico',
        'Usar will-change con moderación para optimizar animaciones',
        'Validar CSS con herramientas como stylelint',
        'Documentar variables y componentes complejos',
      ],
    },
  ],
}
