import type { Cheatcode } from '../types'

export const htmlCheatcode: Cheatcode = {
  metadata: {
    id: 'html',
    title: 'HTML5',
    language: 'HTML',
    category: 'markup',
    tags: ['html', 'frontend'],
    version: 'HTML5',
    description: 'Guía completa de HTML5: estructura, elementos semánticos, formularios, multimedia y más',
    lastUpdated: '2024-11-25',
    logo: '/logos/html.svg',
    color: '#E34F26',
    difficulty: 'beginner',
  },
  sections: [
    // ============================================
    // ESTRUCTURA BÁSICA
    // ============================================
    {
      id: 'basic-structure',
      title: 'Estructura Básica del Documento',
      type: 'code',
      code: {
        title: 'Plantilla HTML5 Completa',
        language: 'html',
        description: 'Estructura fundamental de un documento HTML5 con todas las etiquetas esenciales.',
        code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descripción de la página">
  <meta name="keywords" content="palabras, clave, SEO">
  <meta name="author" content="Nombre del autor">
  <title>Título de la Página</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
  <header><!-- Encabezado --></header>
  <nav><!-- Navegación --></nav>
  <main><!-- Contenido principal --></main>
  <aside><!-- Contenido lateral --></aside>
  <footer><!-- Pie de página --></footer>
  <script src="script.js"></script>
</body>
</html>`,
      },
    },

    // ============================================
    // META TAGS
    // ============================================
    {
      id: 'meta-tags',
      title: 'Meta Tags Esenciales',
      type: 'code',
      code: {
        title: 'Meta Tags para SEO y Redes Sociales',
        language: 'html',
        description: 'Meta tags importantes para SEO, Open Graph (Facebook) y Twitter Cards.',
        code: `<!-- Meta Tags Básicos -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Descripción para SEO (150-160 caracteres)">
<meta name="robots" content="index, follow">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Título para compartir">
<meta property="og:description" content="Descripción para redes sociales">
<meta property="og:image" content="https://ejemplo.com/imagen.jpg">
<meta property="og:url" content="https://ejemplo.com/pagina">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título para Twitter">
<meta name="twitter:description" content="Descripción para Twitter">
<meta name="twitter:image" content="https://ejemplo.com/imagen.jpg">

<!-- Otros Meta Tags Útiles -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#ffffff">
<link rel="canonical" href="https://ejemplo.com/pagina">`,
      },
    },

    // ============================================
    // ELEMENTOS SEMÁNTICOS
    // ============================================
    {
      id: 'semantic-elements',
      title: 'Elementos Semánticos HTML5',
      type: 'table',
      table: {
        title: 'Elementos de Estructura Semántica',
        headers: ['Elemento', 'Descripción', 'Uso'],
        rows: [
          { Elemento: '<header>', Descripción: 'Encabezado de página o sección', Uso: 'Logo, navegación principal, título' },
          { Elemento: '<nav>', Descripción: 'Sección de navegación', Uso: 'Menús, enlaces de navegación' },
          { Elemento: '<main>', Descripción: 'Contenido principal único', Uso: 'Solo uno por página' },
          { Elemento: '<article>', Descripción: 'Contenido independiente', Uso: 'Posts, noticias, comentarios' },
          { Elemento: '<section>', Descripción: 'Sección temática', Uso: 'Agrupar contenido relacionado' },
          { Elemento: '<aside>', Descripción: 'Contenido relacionado', Uso: 'Sidebars, información extra' },
          { Elemento: '<footer>', Descripción: 'Pie de página o sección', Uso: 'Copyright, enlaces, contacto' },
          { Elemento: '<figure>', Descripción: 'Contenido autocontenido', Uso: 'Imágenes, diagramas, código' },
          { Elemento: '<figcaption>', Descripción: 'Leyenda de figure', Uso: 'Descripción de figura' },
          { Elemento: '<mark>', Descripción: 'Texto resaltado', Uso: 'Destacar texto relevante' },
          { Elemento: '<time>', Descripción: 'Fecha/hora', Uso: 'Fechas legibles por máquinas' },
          { Elemento: '<details>', Descripción: 'Detalles expandibles', Uso: 'Acordeones, FAQ' },
          { Elemento: '<summary>', Descripción: 'Título de details', Uso: 'Texto visible del acordeón' },
        ],
      },
    },

    // ============================================
    // ENCABEZADOS Y TEXTO
    // ============================================
    {
      id: 'headings-text',
      title: 'Encabezados y Formato de Texto',
      type: 'code',
      code: {
        title: 'Jerarquía de Encabezados y Elementos de Texto',
        language: 'html',
        description: 'Uso correcto de encabezados (h1-h6) y elementos de formato de texto.',
        code: `<!-- Encabezados (solo un h1 por página) -->
<h1>Título Principal de la Página</h1>
<h2>Subtítulo de Sección</h2>
<h3>Subsección</h3>
<h4>Título de nivel 4</h4>
<h5>Título de nivel 5</h5>
<h6>Título de nivel 6</h6>

<!-- Formato de Texto -->
<p>Párrafo de texto normal.</p>
<strong>Texto importante (negrita semántica)</strong>
<b>Texto en negrita (sin énfasis)</b>
<em>Texto enfatizado (cursiva semántica)</em>
<i>Texto en cursiva (sin énfasis)</i>
<u>Texto subrayado</u>
<s>Texto tachado</s>
<del>Texto eliminado</del>
<ins>Texto insertado</ins>
<small>Texto pequeño</small>
<sub>Subíndice</sub>
<sup>Superíndice</sup>
<code>Código en línea</code>
<pre>Texto preformateado</pre>
<kbd>Entrada de teclado</kbd>
<samp>Salida de programa</samp>
<var>Variable matemática</var>
<abbr title="HyperText Markup Language">HTML</abbr>
<blockquote cite="fuente">Cita en bloque</blockquote>
<q>Cita en línea</q>
<cite>Título de obra citada</cite>`,
      },
    },

    // ============================================
    // ENLACES
    // ============================================
    {
      id: 'links',
      title: 'Enlaces y Navegación',
      type: 'code',
      code: {
        title: 'Tipos de Enlaces',
        language: 'html',
        description: 'Diferentes tipos de enlaces y sus atributos.',
        code: `<!-- Enlace básico -->
<a href="https://ejemplo.com">Enlace externo</a>

<!-- Enlace en nueva pestaña (con seguridad) -->
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">
  Abrir en nueva pestaña
</a>

<!-- Enlace interno (ancla) -->
<a href="#seccion-id">Ir a sección</a>
<section id="seccion-id">Destino del ancla</section>

<!-- Enlace de correo electrónico -->
<a href="mailto:correo@ejemplo.com?subject=Asunto&body=Mensaje">
  Enviar correo
</a>

<!-- Enlace de teléfono -->
<a href="tel:+34600000000">Llamar</a>

<!-- Enlace de descarga -->
<a href="archivo.pdf" download="nombre-archivo.pdf">
  Descargar PDF
</a>

<!-- Enlace con título (tooltip) -->
<a href="/pagina" title="Descripción del enlace">
  Enlace con tooltip
</a>

<!-- Enlace a WhatsApp -->
<a href="https://wa.me/34600000000?text=Hola">
  Contactar por WhatsApp
</a>`,
      },
    },

    // ============================================
    // LISTAS
    // ============================================
    {
      id: 'lists',
      title: 'Listas',
      type: 'code',
      code: {
        title: 'Tipos de Listas en HTML',
        language: 'html',
        description: 'Listas ordenadas, no ordenadas y de definición.',
        code: `<!-- Lista no ordenada -->
<ul>
  <li>Elemento 1</li>
  <li>Elemento 2</li>
  <li>Elemento 3</li>
</ul>

<!-- Lista ordenada -->
<ol>
  <li>Primer paso</li>
  <li>Segundo paso</li>
  <li>Tercer paso</li>
</ol>

<!-- Lista ordenada con atributos -->
<ol type="A" start="3" reversed>
  <li>Elemento C</li>
  <li>Elemento B</li>
  <li>Elemento A</li>
</ol>

<!-- Lista de definición -->
<dl>
  <dt>HTML</dt>
  <dd>Lenguaje de marcado para estructurar contenido web.</dd>

  <dt>CSS</dt>
  <dd>Lenguaje de estilos para diseñar páginas web.</dd>

  <dt>JavaScript</dt>
  <dd>Lenguaje de programación para interactividad.</dd>
</dl>

<!-- Lista anidada -->
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>PHP</li>
    </ul>
  </li>
</ul>`,
      },
    },

    // ============================================
    // IMÁGENES Y MULTIMEDIA
    // ============================================
    {
      id: 'images-media',
      title: 'Imágenes y Multimedia',
      type: 'code',
      code: {
        title: 'Elementos de Imagen y Multimedia',
        language: 'html',
        description: 'Imágenes responsivas, video, audio y elementos multimedia.',
        code: `<!-- Imagen básica (siempre incluir alt) -->
<img src="imagen.jpg" alt="Descripción de la imagen"
     width="800" height="600">

<!-- Imagen responsiva con srcset -->
<img src="imagen-800.jpg"
     srcset="imagen-400.jpg 400w,
             imagen-800.jpg 800w,
             imagen-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Imagen responsiva">

<!-- Picture para diferentes formatos -->
<picture>
  <source srcset="imagen.avif" type="image/avif">
  <source srcset="imagen.webp" type="image/webp">
  <img src="imagen.jpg" alt="Imagen con fallback">
</picture>

<!-- Figura con leyenda -->
<figure>
  <img src="grafico.png" alt="Gráfico de ventas 2024">
  <figcaption>Fig. 1: Ventas del año 2024</figcaption>
</figure>

<!-- Video HTML5 -->
<video controls width="640" height="360" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  Tu navegador no soporta video HTML5.
</video>

<!-- Audio HTML5 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Tu navegador no soporta audio HTML5.
</audio>

<!-- Iframe (videos externos, mapas) -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        width="560" height="315"
        title="Título del video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>`,
      },
    },

    // ============================================
    // TABLAS
    // ============================================
    {
      id: 'tables',
      title: 'Tablas',
      type: 'code',
      code: {
        title: 'Estructura de Tablas HTML',
        language: 'html',
        description: 'Tablas semánticas con encabezados, cuerpo y pie.',
        code: `<!-- Tabla completa y accesible -->
<table>
  <caption>Ventas Trimestrales 2024</caption>

  <thead>
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Producto A</th>
      <td>$1,000</td>
      <td>$1,200</td>
      <td>$1,100</td>
      <td>$1,500</td>
    </tr>
    <tr>
      <th scope="row">Producto B</th>
      <td>$800</td>
      <td>$900</td>
      <td>$850</td>
      <td>$1,000</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$1,800</td>
      <td>$2,100</td>
      <td>$1,950</td>
      <td>$2,500</td>
    </tr>
  </tfoot>
</table>

<!-- Celdas que abarcan filas/columnas -->
<table>
  <tr>
    <th colspan="2">Encabezado que abarca 2 columnas</th>
  </tr>
  <tr>
    <td rowspan="2">Celda que abarca 2 filas</td>
    <td>Celda normal</td>
  </tr>
  <tr>
    <td>Otra celda</td>
  </tr>
</table>`,
      },
    },

    // ============================================
    // FORMULARIOS BÁSICOS
    // ============================================
    {
      id: 'forms-basic',
      title: 'Formularios: Estructura Básica',
      type: 'code',
      code: {
        title: 'Estructura de Formulario',
        language: 'html',
        description: 'Formulario completo con todos los elementos básicos.',
        code: `<form action="/api/enviar" method="POST" enctype="multipart/form-data">
  <!-- Campo de texto -->
  <div>
    <label for="nombre">Nombre completo:</label>
    <input type="text" id="nombre" name="nombre"
           placeholder="Tu nombre" required
           minlength="2" maxlength="100">
  </div>

  <!-- Email -->
  <div>
    <label for="email">Correo electrónico:</label>
    <input type="email" id="email" name="email"
           placeholder="tu@correo.com" required>
  </div>

  <!-- Contraseña -->
  <div>
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password"
           minlength="8" required
           pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
  </div>

  <!-- Área de texto -->
  <div>
    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" name="mensaje"
              rows="4" cols="50"
              placeholder="Escribe tu mensaje..."></textarea>
  </div>

  <!-- Select -->
  <div>
    <label for="pais">País:</label>
    <select id="pais" name="pais" required>
      <option value="">Selecciona un país</option>
      <optgroup label="Europa">
        <option value="es">España</option>
        <option value="fr">Francia</option>
      </optgroup>
      <optgroup label="América">
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
      </optgroup>
    </select>
  </div>

  <!-- Botones -->
  <button type="submit">Enviar</button>
  <button type="reset">Limpiar</button>
</form>`,
      },
    },

    // ============================================
    // TIPOS DE INPUT
    // ============================================
    {
      id: 'input-types',
      title: 'Tipos de Input HTML5',
      type: 'table',
      table: {
        title: 'Todos los Tipos de Input',
        headers: ['Tipo', 'Descripción', 'Ejemplo'],
        rows: [
          { Tipo: 'text', Descripción: 'Texto de una línea', Ejemplo: '<input type="text">' },
          { Tipo: 'email', Descripción: 'Correo electrónico', Ejemplo: '<input type="email">' },
          { Tipo: 'password', Descripción: 'Contraseña oculta', Ejemplo: '<input type="password">' },
          { Tipo: 'number', Descripción: 'Números', Ejemplo: '<input type="number" min="0" max="100">' },
          { Tipo: 'tel', Descripción: 'Teléfono', Ejemplo: '<input type="tel">' },
          { Tipo: 'url', Descripción: 'URL', Ejemplo: '<input type="url">' },
          { Tipo: 'search', Descripción: 'Campo de búsqueda', Ejemplo: '<input type="search">' },
          { Tipo: 'date', Descripción: 'Fecha', Ejemplo: '<input type="date">' },
          { Tipo: 'time', Descripción: 'Hora', Ejemplo: '<input type="time">' },
          { Tipo: 'datetime-local', Descripción: 'Fecha y hora local', Ejemplo: '<input type="datetime-local">' },
          { Tipo: 'month', Descripción: 'Mes y año', Ejemplo: '<input type="month">' },
          { Tipo: 'week', Descripción: 'Semana', Ejemplo: '<input type="week">' },
          { Tipo: 'color', Descripción: 'Selector de color', Ejemplo: '<input type="color">' },
          { Tipo: 'range', Descripción: 'Control deslizante', Ejemplo: '<input type="range" min="0" max="100">' },
          { Tipo: 'file', Descripción: 'Subir archivos', Ejemplo: '<input type="file" accept=".pdf,.jpg">' },
          { Tipo: 'checkbox', Descripción: 'Casilla de verificación', Ejemplo: '<input type="checkbox">' },
          { Tipo: 'radio', Descripción: 'Botón de opción', Ejemplo: '<input type="radio" name="grupo">' },
          { Tipo: 'hidden', Descripción: 'Campo oculto', Ejemplo: '<input type="hidden" name="token">' },
        ],
      },
    },

    // ============================================
    // FORMULARIOS AVANZADOS
    // ============================================
    {
      id: 'forms-advanced',
      title: 'Formularios: Elementos Avanzados',
      type: 'code',
      code: {
        title: 'Checkbox, Radio, Range y Datalist',
        language: 'html',
        description: 'Elementos de formulario adicionales con ejemplos de uso.',
        code: `<!-- Checkboxes -->
<fieldset>
  <legend>Intereses:</legend>
  <label>
    <input type="checkbox" name="intereses" value="tech"> Tecnología
  </label>
  <label>
    <input type="checkbox" name="intereses" value="music"> Música
  </label>
  <label>
    <input type="checkbox" name="intereses" value="sports"> Deportes
  </label>
</fieldset>

<!-- Radio buttons -->
<fieldset>
  <legend>Género:</legend>
  <label>
    <input type="radio" name="genero" value="m" required> Masculino
  </label>
  <label>
    <input type="radio" name="genero" value="f"> Femenino
  </label>
  <label>
    <input type="radio" name="genero" value="o"> Otro
  </label>
</fieldset>

<!-- Range con output -->
<label for="volumen">Volumen: <output id="vol-output">50</output>%</label>
<input type="range" id="volumen" name="volumen"
       min="0" max="100" value="50"
       oninput="document.getElementById('vol-output').value = this.value">

<!-- Datalist (autocompletado) -->
<label for="navegador">Navegador favorito:</label>
<input list="navegadores" id="navegador" name="navegador">
<datalist id="navegadores">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>

<!-- Input con pattern -->
<label for="codigo">Código postal (5 dígitos):</label>
<input type="text" id="codigo" name="codigo"
       pattern="[0-9]{5}"
       title="Introduce 5 dígitos"
       required>

<!-- Subir múltiples archivos -->
<label for="fotos">Subir fotos:</label>
<input type="file" id="fotos" name="fotos"
       accept="image/*" multiple>`,
      },
    },

    // ============================================
    // ATRIBUTOS DE VALIDACIÓN
    // ============================================
    {
      id: 'form-validation',
      title: 'Validación de Formularios',
      type: 'table',
      table: {
        title: 'Atributos de Validación HTML5',
        headers: ['Atributo', 'Descripción', 'Ejemplo'],
        rows: [
          { Atributo: 'required', Descripción: 'Campo obligatorio', Ejemplo: '<input required>' },
          { Atributo: 'minlength', Descripción: 'Longitud mínima', Ejemplo: '<input minlength="3">' },
          { Atributo: 'maxlength', Descripción: 'Longitud máxima', Ejemplo: '<input maxlength="100">' },
          { Atributo: 'min', Descripción: 'Valor mínimo', Ejemplo: '<input type="number" min="0">' },
          { Atributo: 'max', Descripción: 'Valor máximo', Ejemplo: '<input type="number" max="100">' },
          { Atributo: 'step', Descripción: 'Incremento', Ejemplo: '<input type="number" step="0.5">' },
          { Atributo: 'pattern', Descripción: 'Patrón regex', Ejemplo: '<input pattern="[A-Za-z]{3}">' },
          { Atributo: 'placeholder', Descripción: 'Texto de ayuda', Ejemplo: '<input placeholder="Escribe aquí">' },
          { Atributo: 'autocomplete', Descripción: 'Autocompletado', Ejemplo: '<input autocomplete="email">' },
          { Atributo: 'autofocus', Descripción: 'Enfoque automático', Ejemplo: '<input autofocus>' },
          { Atributo: 'disabled', Descripción: 'Deshabilitado', Ejemplo: '<input disabled>' },
          { Atributo: 'readonly', Descripción: 'Solo lectura', Ejemplo: '<input readonly>' },
        ],
      },
    },

    // ============================================
    // ACCESIBILIDAD
    // ============================================
    {
      id: 'accessibility',
      title: 'Accesibilidad (a11y)',
      type: 'code',
      code: {
        title: 'Atributos ARIA y Buenas Prácticas',
        language: 'html',
        description: 'Hacer tu sitio web accesible para todos los usuarios.',
        code: `<!-- Roles ARIA -->
<nav role="navigation" aria-label="Menú principal">
  <ul>
    <li><a href="/" aria-current="page">Inicio</a></li>
    <li><a href="/productos">Productos</a></li>
  </ul>
</nav>

<!-- Landmarks -->
<header role="banner">...</header>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>

<!-- Imágenes accesibles -->
<img src="grafico.png" alt="Gráfico de barras mostrando ventas">
<img src="decorativo.png" alt="" role="presentation">

<!-- Enlaces accesibles -->
<a href="/pdf" aria-label="Descargar informe en PDF">
  <img src="pdf-icon.png" alt="">
  Descargar
</a>

<!-- Formularios accesibles -->
<label for="email">Email:</label>
<input type="email" id="email"
       aria-describedby="email-help"
       aria-required="true">
<span id="email-help">Usaremos tu email para notificaciones</span>

<!-- Estados dinámicos -->
<button aria-expanded="false" aria-controls="menu">
  Menú
</button>
<ul id="menu" aria-hidden="true">...</ul>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  Mensaje actualizado dinámicamente
</div>

<!-- Skip link -->
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>

<!-- Contenido solo para lectores de pantalla -->
<span class="sr-only">Información adicional</span>`,
      },
    },

    // ============================================
    // DATOS Y APIs
    // ============================================
    {
      id: 'data-attributes',
      title: 'Atributos de Datos y APIs HTML5',
      type: 'code',
      code: {
        title: 'Data Attributes y APIs del Navegador',
        language: 'html',
        description: 'Almacenar datos personalizados y usar APIs HTML5.',
        code: `<!-- Data Attributes -->
<article data-id="123"
         data-category="tech"
         data-author="Juan">
  <h2>Título del artículo</h2>
</article>

<!-- Acceder con JavaScript -->
<script>
const article = document.querySelector('article');
console.log(article.dataset.id);       // "123"
console.log(article.dataset.category); // "tech"
</script>

<!-- Drag and Drop -->
<div draggable="true"
     ondragstart="drag(event)"
     id="elemento">
  Arrástrame
</div>
<div ondrop="drop(event)"
     ondragover="allowDrop(event)">
  Suéltalo aquí
</div>

<!-- Content Editable -->
<div contenteditable="true">
  Este texto es editable directamente.
</div>

<!-- Spellcheck -->
<textarea spellcheck="true" lang="es">
  Texto con corrección ortográfica
</textarea>

<!-- Hidden -->
<div hidden>Este contenido está oculto</div>

<!-- Translate -->
<p translate="no">Brand Name - No traducir</p>

<!-- Dialog (Modal nativo) -->
<dialog id="miModal">
  <h2>Título del Modal</h2>
  <p>Contenido del modal</p>
  <button onclick="this.closest('dialog').close()">
    Cerrar
  </button>
</dialog>
<button onclick="document.getElementById('miModal').showModal()">
  Abrir Modal
</button>`,
      },
    },

    // ============================================
    // ELEMENTOS INTERACTIVOS
    // ============================================
    {
      id: 'interactive',
      title: 'Elementos Interactivos',
      type: 'code',
      code: {
        title: 'Details, Summary, Progress y Meter',
        language: 'html',
        description: 'Elementos HTML5 para interactividad sin JavaScript.',
        code: `<!-- Acordeón nativo (Details/Summary) -->
<details>
  <summary>¿Qué es HTML?</summary>
  <p>HTML (HyperText Markup Language) es el lenguaje
     estándar para crear páginas web.</p>
</details>

<details open>
  <summary>Sección abierta por defecto</summary>
  <p>Este contenido es visible inicialmente.</p>
</details>

<!-- Barra de progreso -->
<label for="descarga">Progreso de descarga:</label>
<progress id="descarga" value="70" max="100">70%</progress>

<!-- Progreso indeterminado -->
<progress>Cargando...</progress>

<!-- Meter (medición) -->
<label for="bateria">Batería:</label>
<meter id="bateria" value="0.8" min="0" max="1"
       low="0.2" high="0.8" optimum="1">
  80%
</meter>

<label for="espacio">Espacio en disco:</label>
<meter id="espacio" value="6" min="0" max="10"
       low="2" high="8" optimum="5">
  6 de 10 GB usados
</meter>

<!-- Output (resultado de cálculo) -->
<form oninput="resultado.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output name="resultado" for="a b">0</output>
</form>`,
      },
    },

    // ============================================
    // CANVAS Y SVG
    // ============================================
    {
      id: 'canvas-svg',
      title: 'Canvas y SVG',
      type: 'code',
      code: {
        title: 'Gráficos con Canvas y SVG',
        language: 'html',
        description: 'Dibujar gráficos vectoriales y rasterizados.',
        code: `<!-- Canvas (gráficos rasterizados con JS) -->
<canvas id="miCanvas" width="400" height="200">
  Tu navegador no soporta Canvas
</canvas>
<script>
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Rectángulo
ctx.fillStyle = '#3498db';
ctx.fillRect(10, 10, 100, 80);

// Círculo
ctx.beginPath();
ctx.arc(200, 50, 40, 0, Math.PI * 2);
ctx.fillStyle = '#e74c3c';
ctx.fill();

// Texto
ctx.font = '20px Arial';
ctx.fillStyle = '#2c3e50';
ctx.fillText('Hola Canvas', 280, 50);
</script>

<!-- SVG Inline (gráficos vectoriales) -->
<svg width="200" height="200" viewBox="0 0 200 200">
  <!-- Círculo -->
  <circle cx="100" cy="100" r="80"
          fill="#3498db" stroke="#2980b9" stroke-width="4"/>

  <!-- Rectángulo -->
  <rect x="60" y="60" width="80" height="80"
        fill="#e74c3c" rx="10"/>

  <!-- Línea -->
  <line x1="0" y1="0" x2="200" y2="200"
        stroke="#2c3e50" stroke-width="2"/>

  <!-- Texto -->
  <text x="100" y="110" text-anchor="middle"
        fill="white" font-size="20">
    SVG
  </text>

  <!-- Path -->
  <path d="M10 80 Q 95 10 180 80"
        stroke="#27ae60" fill="transparent" stroke-width="3"/>
</svg>

<!-- SVG externo -->
<img src="imagen.svg" alt="Gráfico SVG">

<!-- SVG como objeto (permite interacción) -->
<object type="image/svg+xml" data="imagen.svg">
  Fallback para navegadores sin soporte
</object>`,
      },
    },

    // ============================================
    // WEB COMPONENTS
    // ============================================
    {
      id: 'web-components',
      title: 'Web Components',
      type: 'code',
      code: {
        title: 'Template, Slot y Custom Elements',
        language: 'html',
        description: 'Crear componentes reutilizables nativos.',
        code: `<!-- Template (contenido no renderizado) -->
<template id="card-template">
  <style>
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
    }
  </style>
  <div class="card">
    <slot name="title">Título por defecto</slot>
    <slot name="content">Contenido por defecto</slot>
  </div>
</template>

<!-- Uso del template con JavaScript -->
<script>
class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('card-template');
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('my-card', MyCard);
</script>

<!-- Usar el componente personalizado -->
<my-card>
  <h2 slot="title">Mi Título</h2>
  <p slot="content">Mi contenido personalizado</p>
</my-card>

<!-- Slot básico -->
<template id="simple-template">
  <div class="wrapper">
    <slot>Contenido por defecto si no hay slot</slot>
  </div>
</template>`,
      },
    },

    // ============================================
    // CARACTERES ESPECIALES
    // ============================================
    {
      id: 'special-chars',
      title: 'Entidades y Caracteres Especiales',
      type: 'table',
      table: {
        title: 'Entidades HTML Comunes',
        headers: ['Caracter', 'Entidad', 'Código', 'Descripción'],
        rows: [
          { Caracter: ' ', Entidad: '&nbsp;', Código: '&#160;', Descripción: 'Espacio no separable' },
          { Caracter: '<', Entidad: '&lt;', Código: '&#60;', Descripción: 'Menor que' },
          { Caracter: '>', Entidad: '&gt;', Código: '&#62;', Descripción: 'Mayor que' },
          { Caracter: '&', Entidad: '&amp;', Código: '&#38;', Descripción: 'Ampersand' },
          { Caracter: '"', Entidad: '&quot;', Código: '&#34;', Descripción: 'Comillas dobles' },
          { Caracter: "'", Entidad: '&apos;', Código: '&#39;', Descripción: 'Comilla simple' },
          { Caracter: '©', Entidad: '&copy;', Código: '&#169;', Descripción: 'Copyright' },
          { Caracter: '®', Entidad: '&reg;', Código: '&#174;', Descripción: 'Marca registrada' },
          { Caracter: '™', Entidad: '&trade;', Código: '&#8482;', Descripción: 'Trademark' },
          { Caracter: '€', Entidad: '&euro;', Código: '&#8364;', Descripción: 'Euro' },
          { Caracter: '£', Entidad: '&pound;', Código: '&#163;', Descripción: 'Libra' },
          { Caracter: '¥', Entidad: '&yen;', Código: '&#165;', Descripción: 'Yen' },
          { Caracter: '←', Entidad: '&larr;', Código: '&#8592;', Descripción: 'Flecha izquierda' },
          { Caracter: '→', Entidad: '&rarr;', Código: '&#8594;', Descripción: 'Flecha derecha' },
          { Caracter: '↑', Entidad: '&uarr;', Código: '&#8593;', Descripción: 'Flecha arriba' },
          { Caracter: '↓', Entidad: '&darr;', Código: '&#8595;', Descripción: 'Flecha abajo' },
        ],
      },
    },

    // ============================================
    // BUENAS PRÁCTICAS
    // ============================================
    {
      id: 'best-practices',
      title: 'Buenas Prácticas HTML',
      type: 'list',
      items: [
        'Siempre declarar <!DOCTYPE html> al inicio del documento',
        'Usar UTF-8 como codificación de caracteres',
        'Incluir viewport meta tag para diseño responsivo',
        'Usar elementos semánticos en lugar de divs genéricos',
        'Solo un <h1> por página, seguir jerarquía h1-h6',
        'Siempre incluir atributo alt en imágenes',
        'Usar atributo lang en <html> para indicar idioma',
        'Asociar labels con inputs usando for/id',
        'Cerrar todas las etiquetas correctamente',
        'Usar comillas dobles para valores de atributos',
        'Mantener el código indentado y legible',
        'Validar el HTML con el validador W3C',
        'Optimizar imágenes y usar formatos modernos (WebP, AVIF)',
        'Cargar CSS en <head> y scripts antes de </body>',
        'Usar rel="noopener" en enlaces externos con target="_blank"',
        'Implementar lazy loading para imágenes: loading="lazy"',
        'Agregar favicon y meta tags para SEO',
        'Hacer el sitio accesible (roles ARIA, contraste, teclado)',
      ],
    },
  ],
}
