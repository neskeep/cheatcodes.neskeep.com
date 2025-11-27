import type { Cheatcode } from '../types'

export const accessibilityCheatcode: Cheatcode = {
  metadata: {
    id: 'accessibility',
    title: 'Accesibilidad Web (a11y)',
    language: 'HTML/ARIA',
    category: 'markup',
    tags: ['accessibility', 'html', 'frontend'],
    version: 'WCAG 2.2',
    description: 'Guía completa de accesibilidad web: ARIA, WCAG, lectores de pantalla, navegación por teclado y más',
    lastUpdated: '2024-11-25',
    logo: '/logos/accessibility.svg',
    color: '#0066CC',
    difficulty: 'intermediate',
  },
  sections: [
    // ============================================
    // INTRODUCCIÓN A LA ACCESIBILIDAD
    // ============================================
    {
      id: 'intro',
      title: 'Principios WCAG (POUR)',
      type: 'table',
      table: {
        title: 'Los 4 Principios Fundamentales de Accesibilidad',
        headers: ['Principio', 'Significado', 'Ejemplo'],
        rows: [
          { Principio: 'Perceptible', Significado: 'Los usuarios deben poder percibir la información', Ejemplo: 'Texto alternativo en imágenes, subtítulos en videos' },
          { Principio: 'Operable', Significado: 'La interfaz debe ser navegable y usable', Ejemplo: 'Navegación por teclado, tiempo suficiente' },
          { Principio: 'Comprensible', Significado: 'El contenido debe ser entendible', Ejemplo: 'Lenguaje claro, comportamiento predecible' },
          { Principio: 'Robusto', Significado: 'Compatible con tecnologías actuales y futuras', Ejemplo: 'HTML válido, compatible con lectores de pantalla' },
        ],
      },
    },

    // ============================================
    // NIVELES DE CONFORMIDAD
    // ============================================
    {
      id: 'conformance-levels',
      title: 'Niveles de Conformidad WCAG',
      type: 'table',
      table: {
        title: 'Niveles A, AA y AAA',
        headers: ['Nivel', 'Descripción', 'Requisitos'],
        rows: [
          { Nivel: 'A (Mínimo)', Descripción: 'Requisitos básicos de accesibilidad', Requisitos: 'Texto alt, navegación por teclado, sin trampas de teclado' },
          { Nivel: 'AA (Estándar)', Descripción: 'Nivel recomendado y requerido legalmente', Requisitos: 'Contraste 4.5:1, redimensionar texto, múltiples formas de navegación' },
          { Nivel: 'AAA (Óptimo)', Descripción: 'Máximo nivel de accesibilidad', Requisitos: 'Contraste 7:1, lenguaje de señas, sin límites de tiempo' },
        ],
      },
    },

    // ============================================
    // ESTRUCTURA SEMÁNTICA
    // ============================================
    {
      id: 'semantic-structure',
      title: 'Estructura HTML Semántica',
      type: 'code',
      code: {
        title: 'Landmarks y Estructura del Documento',
        language: 'html',
        description: 'Usar elementos semánticos correctamente para navegación por lectores de pantalla.',
        code: `<!-- Estructura de página accesible -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título descriptivo de la página | Nombre del sitio</title>
</head>
<body>
  <!-- Skip link (primer elemento) -->
  <a href="#main-content" class="skip-link">
    Saltar al contenido principal
  </a>

  <!-- Banner / Header -->
  <header role="banner">
    <nav role="navigation" aria-label="Navegación principal">
      <ul>
        <li><a href="/" aria-current="page">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenido Principal -->
  <main id="main-content" role="main">
    <h1>Título Principal (único por página)</h1>

    <article>
      <h2>Sección del artículo</h2>
      <p>Contenido del artículo...</p>
    </article>

    <section aria-labelledby="productos-heading">
      <h2 id="productos-heading">Productos</h2>
      <!-- Contenido de la sección -->
    </section>
  </main>

  <!-- Barra lateral -->
  <aside role="complementary" aria-label="Información relacionada">
    <h2>Artículos relacionados</h2>
  </aside>

  <!-- Pie de página -->
  <footer role="contentinfo">
    <p>&copy; 2024 Mi Empresa</p>
  </footer>
</body>
</html>`,
      },
    },

    // ============================================
    // JERARQUÍA DE ENCABEZADOS
    // ============================================
    {
      id: 'headings',
      title: 'Jerarquía de Encabezados',
      type: 'code',
      code: {
        title: 'Uso Correcto de h1-h6',
        language: 'html',
        description: 'Los encabezados crean un esquema del documento para lectores de pantalla.',
        code: `<!-- ✅ CORRECTO: Jerarquía lógica -->
<h1>Guía de Accesibilidad Web</h1>
  <h2>1. Introducción</h2>
    <h3>1.1 ¿Qué es la accesibilidad?</h3>
    <h3>1.2 ¿Por qué es importante?</h3>
  <h2>2. Principios WCAG</h2>
    <h3>2.1 Perceptible</h3>
      <h4>2.1.1 Texto alternativo</h4>
      <h4>2.1.2 Contenido multimedia</h4>
    <h3>2.2 Operable</h3>
  <h2>3. Implementación</h2>

<!-- ❌ INCORRECTO: Saltar niveles -->
<h1>Título</h1>
<h3>Subtítulo</h3>  <!-- Saltó h2 -->
<h5>Otro título</h5> <!-- Saltó h4 -->

<!-- ❌ INCORRECTO: Múltiples h1 -->
<h1>Primer título</h1>
<h1>Segundo título</h1>

<!-- ❌ INCORRECTO: Usar encabezados solo por estilo -->
<h3>Este texto solo quiero que sea grande</h3>

<!-- ✅ CORRECTO: Usar CSS para estilo -->
<p class="text-large">Este texto es grande pero no es encabezado</p>`,
      },
    },

    // ============================================
    // IMÁGENES ACCESIBLES
    // ============================================
    {
      id: 'images',
      title: 'Imágenes Accesibles',
      type: 'code',
      code: {
        title: 'Texto Alternativo y Descripciones',
        language: 'html',
        description: 'Proporcionar alternativas textuales para contenido no textual.',
        code: `<!-- Imagen informativa: describir el contenido -->
<img src="grafico-ventas.png"
     alt="Gráfico de barras mostrando ventas: Q1 $10K, Q2 $15K, Q3 $12K, Q4 $20K">

<!-- Imagen decorativa: alt vacío -->
<img src="decoracion.png" alt="" role="presentation">

<!-- Imagen con texto: incluir el texto en alt -->
<img src="banner-oferta.jpg"
     alt="Oferta especial: 50% de descuento en todos los productos">

<!-- Imagen compleja: usar longdesc o figura con descripción -->
<figure>
  <img src="diagrama-proceso.png"
       alt="Diagrama del proceso de compra"
       aria-describedby="diagrama-desc">
  <figcaption id="diagrama-desc">
    El proceso consta de 5 pasos: 1) Seleccionar producto,
    2) Agregar al carrito, 3) Revisar pedido,
    4) Ingresar datos de pago, 5) Confirmar compra.
  </figcaption>
</figure>

<!-- Imagen como enlace -->
<a href="/perfil">
  <img src="avatar.jpg" alt="Ver perfil de Juan García">
</a>

<!-- Imagen con texto adyacente (evitar redundancia) -->
<a href="/producto">
  <img src="producto.jpg" alt="">
  <span>Zapatillas deportivas Nike</span>
</a>

<!-- SVG accesible -->
<svg role="img" aria-labelledby="svg-title svg-desc">
  <title id="svg-title">Icono de carrito de compras</title>
  <desc id="svg-desc">Carrito con 3 artículos</desc>
  <!-- paths del SVG -->
</svg>

<!-- Icono decorativo -->
<span aria-hidden="true">🔔</span>
<span class="sr-only">Notificaciones</span>`,
      },
    },

    // ============================================
    // ENLACES ACCESIBLES
    // ============================================
    {
      id: 'links',
      title: 'Enlaces Accesibles',
      type: 'code',
      code: {
        title: 'Enlaces Descriptivos y Claros',
        language: 'html',
        description: 'Los enlaces deben ser comprensibles fuera de contexto.',
        code: `<!-- ✅ CORRECTO: Texto descriptivo -->
<a href="/guia-accesibilidad.pdf">
  Descargar guía de accesibilidad (PDF, 2.5 MB)
</a>

<a href="/articulo">
  Leer artículo completo sobre accesibilidad web
</a>

<!-- ❌ INCORRECTO: Texto genérico -->
<a href="/guia.pdf">Clic aquí</a>
<a href="/articulo">Leer más</a>
<a href="/info">Más información</a>

<!-- Si necesitas "Leer más", usa aria-label -->
<a href="/articulo" aria-label="Leer más sobre accesibilidad web">
  Leer más
</a>

<!-- Enlaces que abren en nueva ventana -->
<a href="https://externo.com"
   target="_blank"
   rel="noopener noreferrer">
  Sitio externo
  <span class="sr-only">(abre en nueva ventana)</span>
  <span aria-hidden="true">↗</span>
</a>

<!-- Enlace de descarga -->
<a href="/documento.pdf" download>
  Descargar informe anual (PDF, 1.2 MB)
</a>

<!-- Enlace de email -->
<a href="mailto:contacto@ejemplo.com">
  Enviar correo a contacto@ejemplo.com
</a>

<!-- Enlace de teléfono -->
<a href="tel:+34600000000">
  Llamar al +34 600 000 000
</a>

<!-- Skip links (navegación rápida) -->
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: #000;
  color: #fff;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>
<a href="#main" class="skip-link">Saltar al contenido principal</a>
<a href="#nav" class="skip-link">Saltar a navegación</a>`,
      },
    },

    // ============================================
    // FORMULARIOS ACCESIBLES
    // ============================================
    {
      id: 'forms',
      title: 'Formularios Accesibles',
      type: 'code',
      code: {
        title: 'Labels, Instrucciones y Errores',
        language: 'html',
        description: 'Formularios completamente accesibles con validación.',
        code: `<form aria-labelledby="form-title">
  <h2 id="form-title">Formulario de Contacto</h2>

  <!-- Campo con label asociado -->
  <div class="form-group">
    <label for="nombre">
      Nombre completo
      <span aria-hidden="true">*</span>
    </label>
    <input type="text"
           id="nombre"
           name="nombre"
           required
           aria-required="true"
           autocomplete="name">
  </div>

  <!-- Campo con descripción adicional -->
  <div class="form-group">
    <label for="password">Contraseña</label>
    <input type="password"
           id="password"
           name="password"
           required
           aria-required="true"
           aria-describedby="password-help"
           minlength="8"
           autocomplete="new-password">
    <p id="password-help" class="help-text">
      Mínimo 8 caracteres, una mayúscula y un número
    </p>
  </div>

  <!-- Campo con error -->
  <div class="form-group">
    <label for="email">Correo electrónico</label>
    <input type="email"
           id="email"
           name="email"
           required
           aria-required="true"
           aria-invalid="true"
           aria-describedby="email-error"
           autocomplete="email">
    <p id="email-error" class="error" role="alert">
      Por favor, ingresa un correo electrónico válido
    </p>
  </div>

  <!-- Grupo de radio buttons -->
  <fieldset>
    <legend>Método de contacto preferido</legend>
    <div>
      <input type="radio" id="contact-email" name="contact" value="email">
      <label for="contact-email">Correo electrónico</label>
    </div>
    <div>
      <input type="radio" id="contact-phone" name="contact" value="phone">
      <label for="contact-phone">Teléfono</label>
    </div>
  </fieldset>

  <!-- Checkbox -->
  <div class="form-group">
    <input type="checkbox"
           id="terms"
           name="terms"
           required
           aria-required="true">
    <label for="terms">
      Acepto los <a href="/terminos">términos y condiciones</a>
    </label>
  </div>

  <!-- Select -->
  <div class="form-group">
    <label for="country">País</label>
    <select id="country" name="country" autocomplete="country">
      <option value="">Selecciona un país</option>
      <optgroup label="Europa">
        <option value="es">España</option>
        <option value="fr">Francia</option>
      </optgroup>
    </select>
  </div>

  <!-- Botón de envío -->
  <button type="submit">Enviar formulario</button>
</form>`,
      },
    },

    // ============================================
    // TABLAS ACCESIBLES
    // ============================================
    {
      id: 'tables',
      title: 'Tablas de Datos Accesibles',
      type: 'code',
      code: {
        title: 'Tablas con Encabezados y Relaciones',
        language: 'html',
        description: 'Estructurar tablas para que sean comprensibles por lectores de pantalla.',
        code: `<!-- Tabla simple -->
<table>
  <caption>Precios de productos por categoría</caption>
  <thead>
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Categoría</th>
      <th scope="col">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Laptop Pro</th>
      <td>Electrónica</td>
      <td>$1,299</td>
    </tr>
    <tr>
      <th scope="row">Silla Ergonómica</th>
      <td>Mobiliario</td>
      <td>$450</td>
    </tr>
  </tbody>
</table>

<!-- Tabla compleja con headers relacionados -->
<table>
  <caption>
    Horario de clases - Semestre 2024
    <span class="sr-only">
      La tabla muestra las clases por día y hora
    </span>
  </caption>
  <thead>
    <tr>
      <th scope="col" id="hour">Hora</th>
      <th scope="col" id="mon">Lunes</th>
      <th scope="col" id="tue">Martes</th>
      <th scope="col" id="wed">Miércoles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" id="h9">9:00 - 10:00</th>
      <td headers="mon h9">Matemáticas</td>
      <td headers="tue h9">Historia</td>
      <td headers="wed h9">Física</td>
    </tr>
    <tr>
      <th scope="row" id="h10">10:00 - 11:00</th>
      <td headers="mon h10">Inglés</td>
      <td headers="tue h10">Química</td>
      <td headers="wed h10">Literatura</td>
    </tr>
  </tbody>
</table>

<!-- Tabla con celdas que abarcan filas/columnas -->
<table>
  <caption>Ventas trimestrales por región</caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Región</th>
      <th scope="colgroup" colspan="2">2023</th>
      <th scope="colgroup" colspan="2">2024</th>
    </tr>
    <tr>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Norte</th>
      <td>$10,000</td>
      <td>$12,000</td>
      <td>$11,000</td>
      <td>$13,000</td>
    </tr>
  </tbody>
</table>`,
      },
    },

    // ============================================
    // ROLES ARIA
    // ============================================
    {
      id: 'aria-roles',
      title: 'Roles ARIA',
      type: 'table',
      table: {
        title: 'Roles ARIA Más Comunes',
        headers: ['Rol', 'Uso', 'Elemento HTML equivalente'],
        rows: [
          { Rol: 'banner', Uso: 'Encabezado del sitio', 'Elemento HTML equivalente': '<header> (hijo de body)' },
          { Rol: 'navigation', Uso: 'Navegación principal', 'Elemento HTML equivalente': '<nav>' },
          { Rol: 'main', Uso: 'Contenido principal', 'Elemento HTML equivalente': '<main>' },
          { Rol: 'complementary', Uso: 'Contenido complementario', 'Elemento HTML equivalente': '<aside>' },
          { Rol: 'contentinfo', Uso: 'Pie de página', 'Elemento HTML equivalente': '<footer> (hijo de body)' },
          { Rol: 'search', Uso: 'Formulario de búsqueda', 'Elemento HTML equivalente': '<search> (HTML5.2)' },
          { Rol: 'form', Uso: 'Formulario', 'Elemento HTML equivalente': '<form>' },
          { Rol: 'region', Uso: 'Sección importante', 'Elemento HTML equivalente': '<section> con aria-label' },
          { Rol: 'alert', Uso: 'Mensaje de alerta', 'Elemento HTML equivalente': 'Ninguno (usar con div)' },
          { Rol: 'alertdialog', Uso: 'Diálogo de alerta', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'dialog', Uso: 'Ventana modal', 'Elemento HTML equivalente': '<dialog>' },
          { Rol: 'button', Uso: 'Botón interactivo', 'Elemento HTML equivalente': '<button>' },
          { Rol: 'link', Uso: 'Enlace', 'Elemento HTML equivalente': '<a href>' },
          { Rol: 'tab', Uso: 'Pestaña', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'tabpanel', Uso: 'Panel de pestaña', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'tablist', Uso: 'Lista de pestañas', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'menu', Uso: 'Menú de acciones', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'menuitem', Uso: 'Ítem de menú', 'Elemento HTML equivalente': 'Ninguno' },
          { Rol: 'progressbar', Uso: 'Barra de progreso', 'Elemento HTML equivalente': '<progress>' },
          { Rol: 'status', Uso: 'Mensaje de estado', 'Elemento HTML equivalente': 'Ninguno' },
        ],
      },
    },

    // ============================================
    // PROPIEDADES Y ESTADOS ARIA
    // ============================================
    {
      id: 'aria-properties',
      title: 'Propiedades y Estados ARIA',
      type: 'code',
      code: {
        title: 'Atributos ARIA Esenciales',
        language: 'html',
        description: 'Propiedades y estados para comunicar información a tecnologías asistivas.',
        code: `<!-- aria-label: etiqueta accesible -->
<button aria-label="Cerrar ventana">×</button>
<nav aria-label="Navegación principal">...</nav>
<nav aria-label="Navegación de pie de página">...</nav>

<!-- aria-labelledby: referencia a elemento con texto -->
<section aria-labelledby="section-title">
  <h2 id="section-title">Nuestros Servicios</h2>
</section>

<!-- aria-describedby: descripción adicional -->
<input type="password"
       aria-describedby="pwd-requirements">
<p id="pwd-requirements">
  Debe contener al menos 8 caracteres
</p>

<!-- aria-hidden: ocultar de lectores de pantalla -->
<span aria-hidden="true">🔔</span>
<span class="sr-only">Notificaciones</span>

<!-- aria-expanded: estado de expansión -->
<button aria-expanded="false" aria-controls="menu">
  Menú
</button>
<ul id="menu" hidden>...</ul>

<!-- aria-pressed: botón de alternancia -->
<button aria-pressed="false">
  Modo oscuro
</button>

<!-- aria-selected: elemento seleccionado -->
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>

<!-- aria-current: elemento actual -->
<nav>
  <a href="/" aria-current="page">Inicio</a>
  <a href="/about">Acerca de</a>
</nav>

<!-- aria-disabled vs disabled -->
<button disabled>No disponible</button>
<button aria-disabled="true">Próximamente</button>

<!-- aria-invalid: campo con error -->
<input type="email"
       aria-invalid="true"
       aria-errormessage="email-error">
<span id="email-error">Email inválido</span>

<!-- aria-required: campo obligatorio -->
<input type="text" aria-required="true">

<!-- aria-live: regiones dinámicas -->
<div aria-live="polite">
  <!-- Cambios se anuncian cuando el usuario está inactivo -->
</div>
<div aria-live="assertive">
  <!-- Cambios se anuncian inmediatamente -->
</div>

<!-- aria-atomic: anunciar todo el contenedor -->
<div aria-live="polite" aria-atomic="true">
  Artículos en carrito: <span>5</span>
</div>

<!-- aria-busy: contenido cargando -->
<div aria-busy="true" aria-live="polite">
  Cargando resultados...
</div>`,
      },
    },

    // ============================================
    // NAVEGACIÓN POR TECLADO
    // ============================================
    {
      id: 'keyboard',
      title: 'Navegación por Teclado',
      type: 'table',
      table: {
        title: 'Teclas de Navegación Estándar',
        headers: ['Tecla', 'Acción', 'Contexto'],
        rows: [
          { Tecla: 'Tab', Acción: 'Mover al siguiente elemento focusable', Contexto: 'Navegación general' },
          { Tecla: 'Shift + Tab', Acción: 'Mover al elemento focusable anterior', Contexto: 'Navegación general' },
          { Tecla: 'Enter', Acción: 'Activar enlace o botón', Contexto: 'Enlaces, botones' },
          { Tecla: 'Space', Acción: 'Activar botón, marcar checkbox', Contexto: 'Botones, checkboxes' },
          { Tecla: 'Escape', Acción: 'Cerrar modal/menú', Contexto: 'Modales, menús desplegables' },
          { Tecla: 'Flechas ↑↓', Acción: 'Navegar opciones', Contexto: 'Menús, selects, radio buttons' },
          { Tecla: 'Flechas ←→', Acción: 'Navegar tabs, sliders', Contexto: 'Tabs, carruseles' },
          { Tecla: 'Home', Acción: 'Ir al primer elemento', Contexto: 'Listas, sliders' },
          { Tecla: 'End', Acción: 'Ir al último elemento', Contexto: 'Listas, sliders' },
          { Tecla: 'Page Up/Down', Acción: 'Scroll por página', Contexto: 'Contenido largo' },
        ],
      },
    },

    // ============================================
    // FOCUS MANAGEMENT
    // ============================================
    {
      id: 'focus',
      title: 'Gestión del Foco',
      type: 'code',
      code: {
        title: 'Control del Foco y Orden de Tabulación',
        language: 'html',
        description: 'Asegurar que el foco sea visible y lógico.',
        code: `<!-- CSS: Nunca ocultar el outline completamente -->
<style>
/* ❌ INCORRECTO: Elimina el indicador de foco */
*:focus { outline: none; }

/* ✅ CORRECTO: Outline personalizado visible */
*:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* ✅ CORRECTO: Focus visible solo con teclado */
*:focus:not(:focus-visible) {
  outline: none;
}
*:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* Skip link visible solo con foco */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  z-index: 100;
  transition: top 0.3s;
}
.skip-link:focus {
  top: 0;
}

/* Contenido solo para lectores de pantalla */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

<!-- tabindex: controlar orden de tabulación -->
<!-- tabindex="0": añadir al flujo natural -->
<div tabindex="0" role="button">Elemento focusable</div>

<!-- tabindex="-1": focusable solo por JS -->
<div id="error-message" tabindex="-1">
  Error: mensaje importante
</div>
<script>
// Mover foco al error
document.getElementById('error-message').focus();
</script>

<!-- ❌ INCORRECTO: tabindex positivo -->
<input tabindex="3">  <!-- Altera el orden natural -->
<input tabindex="1">
<input tabindex="2">

<!-- Modal con trampa de foco -->
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title">
  <h2 id="modal-title">Título del Modal</h2>
  <p>Contenido del modal...</p>
  <button>Aceptar</button>
  <button>Cancelar</button>
</div>

<script>
// Trampa de foco en modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
</script>`,
      },
    },

    // ============================================
    // CONTRASTE Y COLOR
    // ============================================
    {
      id: 'contrast',
      title: 'Contraste y Uso del Color',
      type: 'code',
      code: {
        title: 'Requisitos de Contraste WCAG',
        language: 'css',
        description: 'Asegurar que el texto sea legible para todos los usuarios.',
        code: `/*
  REQUISITOS DE CONTRASTE WCAG:

  Nivel AA:
  - Texto normal (< 18pt): ratio mínimo 4.5:1
  - Texto grande (≥ 18pt o 14pt bold): ratio mínimo 3:1
  - Componentes UI y gráficos: ratio mínimo 3:1

  Nivel AAA:
  - Texto normal: ratio mínimo 7:1
  - Texto grande: ratio mínimo 4.5:1
*/

/* ✅ Buenos contrastes */
.text-high-contrast {
  color: #1a1a1a;           /* Sobre fondo blanco: 16:1 */
  background: #ffffff;
}

.text-accessible {
  color: #595959;           /* Sobre fondo blanco: 7:1 (AAA) */
  background: #ffffff;
}

.text-minimum {
  color: #767676;           /* Sobre fondo blanco: 4.5:1 (AA) */
  background: #ffffff;
}

/* ❌ Contrastes insuficientes */
.text-low-contrast {
  color: #aaaaaa;           /* Sobre fondo blanco: 2.3:1 (FALLA) */
  background: #ffffff;
}

/* No depender solo del color */

/* ❌ INCORRECTO: Solo color indica estado */
.error { color: red; }
.success { color: green; }

/* ✅ CORRECTO: Color + icono + texto */
.error {
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}
.error::before {
  content: "⚠ Error: ";
  font-weight: bold;
}

.success {
  color: #388e3c;
  border-left: 4px solid #388e3c;
}
.success::before {
  content: "✓ Éxito: ";
  font-weight: bold;
}

/* Enlaces: no depender solo del color */
a {
  color: #0066cc;
  text-decoration: underline;  /* Siempre subrayado */
}

a:hover, a:focus {
  text-decoration: none;
  outline: 2px solid currentColor;
}

/* Modo oscuro con buen contraste */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f5f5f5;    /* Sobre #121212: 15.8:1 */
    --text-secondary: #b0b0b0;  /* Sobre #121212: 7:1 */
    --bg-primary: #121212;
  }
}

/* Respeta preferencias de usuario */
@media (prefers-contrast: high) {
  :root {
    --text-color: #000000;
    --bg-color: #ffffff;
    --border-color: #000000;
  }

  * {
    border-color: var(--border-color) !important;
  }
}`,
      },
    },

    // ============================================
    // MOVIMIENTO Y ANIMACIONES
    // ============================================
    {
      id: 'motion',
      title: 'Movimiento y Animaciones',
      type: 'code',
      code: {
        title: 'Animaciones Accesibles',
        language: 'css',
        description: 'Respetar preferencias de movimiento reducido.',
        code: `/* Respetar preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Alternativa: mantener transiciones sutiles */
  .subtle-transition {
    transition-duration: 0.1s !important;
  }
}

/* Animación segura por defecto */
.animated-element {
  /* Transición suave por defecto */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .animated-element {
    /* Animaciones más elaboradas solo si el usuario las permite */
    animation: bounce 1s infinite;
  }
}

/* Evitar parpadeos y destellos */
/* WCAG: No más de 3 destellos por segundo */

/* ❌ PELIGROSO: Puede causar convulsiones */
.flashing {
  animation: flash 0.2s infinite;
}

/* ✅ SEGURO: Sin parpadeo rápido */
.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Proporcionar controles para animaciones */
<style>
.carousel {
  /* Pausar al hover o focus */
}
.carousel:hover,
.carousel:focus-within {
  animation-play-state: paused;
}
</style>

/* Botón para pausar animaciones */
<button id="pause-animations" aria-pressed="false">
  Pausar animaciones
</button>

<script>
const btn = document.getElementById('pause-animations');
btn.addEventListener('click', () => {
  const isPaused = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', !isPaused);
  document.body.classList.toggle('animations-paused');
});
</script>

<style>
.animations-paused * {
  animation-play-state: paused !important;
  transition: none !important;
}
</style>`,
      },
    },

    // ============================================
    // MULTIMEDIA ACCESIBLE
    // ============================================
    {
      id: 'multimedia',
      title: 'Multimedia Accesible',
      type: 'code',
      code: {
        title: 'Video, Audio y Contenido Temporal',
        language: 'html',
        description: 'Hacer contenido multimedia accesible para todos.',
        code: `<!-- Video con subtítulos y audiodescripción -->
<video controls>
  <source src="video.mp4" type="video/mp4">

  <!-- Subtítulos en español -->
  <track kind="subtitles"
         src="subtitulos-es.vtt"
         srclang="es"
         label="Español"
         default>

  <!-- Subtítulos en inglés -->
  <track kind="subtitles"
         src="subtitles-en.vtt"
         srclang="en"
         label="English">

  <!-- Audiodescripción -->
  <track kind="descriptions"
         src="audiodesc.vtt"
         srclang="es"
         label="Audiodescripción">

  <!-- Capítulos -->
  <track kind="chapters"
         src="chapters.vtt"
         srclang="es"
         label="Capítulos">

  <!-- Fallback -->
  <p>Tu navegador no soporta video HTML5.
     <a href="video.mp4">Descargar video</a>
  </p>
</video>

<!-- Transcripción completa -->
<details>
  <summary>Ver transcripción del video</summary>
  <div class="transcript">
    <p><strong>00:00</strong> - Bienvenidos al tutorial...</p>
    <p><strong>00:15</strong> - Hoy aprenderemos sobre...</p>
  </div>
</details>

<!-- Archivo VTT de subtítulos -->
<!--
WEBVTT

00:00:00.000 --> 00:00:05.000
Bienvenidos a este tutorial sobre accesibilidad web.

00:00:05.000 --> 00:00:10.000
Hoy aprenderemos los fundamentos de WCAG.
-->

<!-- Audio con transcripción -->
<figure>
  <figcaption id="audio-title">
    Podcast: Introducción a la accesibilidad
  </figcaption>
  <audio controls aria-describedby="audio-title">
    <source src="podcast.mp3" type="audio/mpeg">
    <source src="podcast.ogg" type="audio/ogg">
    <p>Tu navegador no soporta audio HTML5.</p>
  </audio>
  <details>
    <summary>Transcripción del podcast</summary>
    <p>...</p>
  </details>
</figure>

<!-- Controles de reproducción automática -->
<!-- ❌ INCORRECTO: Autoplay sin controles -->
<video autoplay>...</video>

<!-- ✅ CORRECTO: Sin autoplay o con muted -->
<video autoplay muted controls>...</video>

<!-- Contenido con límite de tiempo -->
<div role="alert" aria-live="assertive">
  Tu sesión expirará en <span id="countdown">5:00</span> minutos.
  <button onclick="extendSession()">Extender sesión</button>
</div>`,
      },
    },

    // ============================================
    // COMPONENTES INTERACTIVOS
    // ============================================
    {
      id: 'components',
      title: 'Componentes Interactivos',
      type: 'code',
      code: {
        title: 'Tabs, Acordeones y Modales Accesibles',
        language: 'html',
        description: 'Patrones ARIA para componentes comunes.',
        code: `<!-- Sistema de Tabs -->
<div class="tabs">
  <div role="tablist" aria-label="Opciones de producto">
    <button role="tab"
            id="tab-1"
            aria-selected="true"
            aria-controls="panel-1">
      Descripción
    </button>
    <button role="tab"
            id="tab-2"
            aria-selected="false"
            aria-controls="panel-2"
            tabindex="-1">
      Especificaciones
    </button>
    <button role="tab"
            id="tab-3"
            aria-selected="false"
            aria-controls="panel-3"
            tabindex="-1">
      Reseñas
    </button>
  </div>

  <div role="tabpanel"
       id="panel-1"
       aria-labelledby="tab-1">
    <p>Contenido de descripción...</p>
  </div>

  <div role="tabpanel"
       id="panel-2"
       aria-labelledby="tab-2"
       hidden>
    <p>Contenido de especificaciones...</p>
  </div>

  <div role="tabpanel"
       id="panel-3"
       aria-labelledby="tab-3"
       hidden>
    <p>Contenido de reseñas...</p>
  </div>
</div>

<!-- Acordeón -->
<div class="accordion">
  <h3>
    <button aria-expanded="true"
            aria-controls="section1"
            id="accordion1">
      ¿Qué es la accesibilidad?
      <span aria-hidden="true">▼</span>
    </button>
  </h3>
  <div id="section1"
       role="region"
       aria-labelledby="accordion1">
    <p>La accesibilidad web significa...</p>
  </div>

  <h3>
    <button aria-expanded="false"
            aria-controls="section2"
            id="accordion2">
      ¿Por qué es importante?
      <span aria-hidden="true">▶</span>
    </button>
  </h3>
  <div id="section2"
       role="region"
       aria-labelledby="accordion2"
       hidden>
    <p>Es importante porque...</p>
  </div>
</div>

<!-- Modal Accesible -->
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-desc">

  <h2 id="modal-title">Confirmar acción</h2>
  <p id="modal-desc">
    ¿Estás seguro de que deseas eliminar este elemento?
  </p>

  <div class="modal-actions">
    <button type="button" onclick="closeModal()">
      Cancelar
    </button>
    <button type="button" onclick="confirmDelete()">
      Eliminar
    </button>
  </div>

  <button type="button"
          class="modal-close"
          aria-label="Cerrar modal"
          onclick="closeModal()">
    ×
  </button>
</div>

<!-- Menú desplegable -->
<div class="dropdown">
  <button aria-haspopup="menu"
          aria-expanded="false"
          aria-controls="dropdown-menu">
    Opciones
  </button>
  <ul role="menu"
      id="dropdown-menu"
      hidden>
    <li role="menuitem">
      <a href="/editar">Editar</a>
    </li>
    <li role="menuitem">
      <a href="/duplicar">Duplicar</a>
    </li>
    <li role="separator"></li>
    <li role="menuitem">
      <button onclick="eliminar()">Eliminar</button>
    </li>
  </ul>
</div>`,
      },
    },

    // ============================================
    // LIVE REGIONS
    // ============================================
    {
      id: 'live-regions',
      title: 'Live Regions (Contenido Dinámico)',
      type: 'code',
      code: {
        title: 'Anunciar Cambios Dinámicos',
        language: 'html',
        description: 'Notificar cambios de contenido a lectores de pantalla.',
        code: `<!-- aria-live: anunciar cambios -->

<!-- polite: espera a que el usuario esté inactivo -->
<div aria-live="polite" aria-atomic="true">
  <p>Resultados encontrados: <span id="count">0</span></p>
</div>

<!-- assertive: interrumpe inmediatamente -->
<div role="alert" aria-live="assertive">
  <!-- Errores críticos, alertas urgentes -->
</div>

<!-- Roles con live region implícito -->
<div role="alert">Error: Contraseña incorrecta</div>
<div role="status">Guardado exitosamente</div>
<div role="log">Nuevo mensaje recibido</div>
<div role="marquee">Breaking news...</div>
<div role="timer">Tiempo restante: 5:00</div>

<!-- aria-atomic: anunciar todo o solo cambios -->
<div aria-live="polite" aria-atomic="true">
  <!-- Anuncia todo el contenedor cuando cambia -->
  Carrito: <span>3</span> artículos - Total: <span>$99</span>
</div>

<div aria-live="polite" aria-atomic="false">
  <!-- Solo anuncia la parte que cambió -->
</div>

<!-- aria-relevant: qué cambios anunciar -->
<div aria-live="polite"
     aria-relevant="additions removals">
  <!-- additions: elementos añadidos -->
  <!-- removals: elementos eliminados -->
  <!-- text: cambios de texto -->
  <!-- all: todos los cambios -->
</div>

<!-- aria-busy: contenido cargando -->
<div aria-live="polite" aria-busy="true">
  Cargando resultados...
</div>
<!-- Cuando termina, cambiar a false -->
<script>
function finishLoading() {
  const region = document.querySelector('[aria-busy]');
  region.setAttribute('aria-busy', 'false');
  region.innerHTML = 'Se encontraron 15 resultados';
}
</script>

<!-- Ejemplo: Notificación toast -->
<div id="notifications"
     role="status"
     aria-live="polite"
     aria-atomic="true"
     class="sr-only">
</div>

<script>
function showToast(message) {
  // Visual toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Anunciar a lectores de pantalla
  document.getElementById('notifications').textContent = message;

  // Limpiar después
  setTimeout(() => {
    toast.remove();
    document.getElementById('notifications').textContent = '';
  }, 5000);
}
</script>

<!-- Ejemplo: Validación en tiempo real -->
<input type="email"
       id="email"
       aria-describedby="email-status">
<span id="email-status"
      role="status"
      aria-live="polite">
</span>

<script>
document.getElementById('email').addEventListener('input', (e) => {
  const status = document.getElementById('email-status');
  if (e.target.validity.valid) {
    status.textContent = 'Email válido';
  } else {
    status.textContent = 'Por favor ingresa un email válido';
  }
});
</script>`,
      },
    },

    // ============================================
    // HERRAMIENTAS DE TESTING
    // ============================================
    {
      id: 'testing-tools',
      title: 'Herramientas de Testing',
      type: 'list',
      items: [
        'axe DevTools: Extensión de navegador para auditoría de accesibilidad',
        'WAVE: Herramienta web de evaluación de accesibilidad',
        'Lighthouse: Auditoría integrada en Chrome DevTools',
        'NVDA: Lector de pantalla gratuito para Windows',
        'VoiceOver: Lector de pantalla integrado en macOS/iOS',
        'JAWS: Lector de pantalla profesional para Windows',
        'TalkBack: Lector de pantalla para Android',
        'Color Contrast Checker: Verificar ratios de contraste',
        'HeadingsMap: Extensión para visualizar estructura de encabezados',
        'Accessibility Insights: Suite de herramientas de Microsoft',
        'Pa11y: Testing automatizado de accesibilidad en CLI',
        'Tenon.io: API de testing de accesibilidad',
        'Stark: Plugin de accesibilidad para Figma/Sketch',
        'Deque University: Recursos de aprendizaje',
        'WebAIM: Recursos y herramientas de accesibilidad',
      ],
    },

    // ============================================
    // CHECKLIST DE ACCESIBILIDAD
    // ============================================
    {
      id: 'checklist',
      title: 'Checklist de Accesibilidad',
      type: 'list',
      items: [
        'Todas las imágenes tienen texto alternativo apropiado',
        'El sitio es completamente navegable por teclado',
        'El orden de tabulación es lógico y predecible',
        'El foco es siempre visible al navegar con teclado',
        'Hay un enlace "saltar al contenido" al inicio',
        'La jerarquía de encabezados es correcta (h1-h6 sin saltos)',
        'Todos los formularios tienen labels asociados',
        'Los errores de formulario son claros y descriptivos',
        'El contraste de color cumple ratio mínimo 4.5:1',
        'La información no depende solo del color',
        'El contenido es legible al zoom 200%',
        'Videos tienen subtítulos y audiodescripción',
        'Animaciones respetan prefers-reduced-motion',
        'Los modales atrapan el foco correctamente',
        'Las live regions anuncian cambios dinámicos',
        'El HTML es válido y semántico',
        'ARIA se usa correctamente (solo cuando es necesario)',
        'El sitio funciona sin JavaScript',
        'Probado con lectores de pantalla reales',
        'Cumple WCAG 2.1 nivel AA mínimo',
      ],
    },

    // ============================================
    // BUENAS PRÁCTICAS
    // ============================================
    {
      id: 'best-practices',
      title: 'Buenas Prácticas de Accesibilidad',
      type: 'list',
      items: [
        'Usar HTML semántico antes de ARIA (primera regla de ARIA)',
        'No usar ARIA para recrear funcionalidad HTML nativa',
        'Probar con usuarios reales con discapacidades',
        'Incluir accesibilidad desde el diseño, no como añadido',
        'Documentar decisiones de accesibilidad para el equipo',
        'Formar al equipo en accesibilidad (desarrolladores, diseñadores, QA)',
        'Implementar testing automatizado de accesibilidad en CI/CD',
        'Mantener un nivel AA como mínimo, aspirar a AAA',
        'Proporcionar múltiples formas de contacto',
        'Ofrecer contenido alternativo cuando sea necesario',
        'Escribir contenido claro y fácil de entender',
        'Evitar captchas, usar alternativas accesibles',
        'No desactivar el zoom del usuario',
        'Probar en diferentes navegadores y dispositivos',
        'Mantener actualizada la declaración de accesibilidad',
        'Establecer un proceso de reporte de problemas de accesibilidad',
        'Considerar la accesibilidad cognitiva además de la técnica',
        'Recordar: accesibilidad beneficia a todos los usuarios',
      ],
    },
  ],
}
