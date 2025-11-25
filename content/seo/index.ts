import type { Cheatcode } from '~/types/cheatcode'

export const seoCheatcode: Cheatcode = {
  metadata: {
    id: 'seo',
    title: 'SEO (Posicionamiento Web)',
    language: 'HTML/Técnico',
    version: '2024',
    description: 'Guía completa de SEO: meta tags, Schema.org, Core Web Vitals, sitemap, robots.txt y más',
    lastUpdated: '2024-11-25',
    logo: '/logos/seo.svg',
    color: '#4285F4',
  },
  sections: [
    // ============================================
    // INTRODUCCIÓN AL SEO
    // ============================================
    {
      id: 'intro',
      title: 'Pilares del SEO',
      type: 'table',
      table: {
        title: 'Los 3 Pilares Fundamentales del SEO',
        headers: ['Pilar', 'Descripción', 'Elementos'],
        rows: [
          { Pilar: 'SEO Técnico', Descripción: 'Optimización de la infraestructura del sitio', Elementos: 'Velocidad, indexación, crawlability, HTTPS, mobile-first' },
          { Pilar: 'SEO On-Page', Descripción: 'Optimización del contenido y HTML', Elementos: 'Meta tags, encabezados, keywords, enlaces internos' },
          { Pilar: 'SEO Off-Page', Descripción: 'Factores externos al sitio', Elementos: 'Backlinks, autoridad de dominio, menciones, redes sociales' },
        ],
      },
    },

    // ============================================
    // META TAGS BÁSICOS
    // ============================================
    {
      id: 'meta-basic',
      title: 'Meta Tags Esenciales',
      type: 'code',
      code: {
        title: 'Meta Tags Fundamentales para SEO',
        language: 'html',
        description: 'Meta tags que todo sitio web debe tener para SEO básico.',
        code: `<head>
  <!-- Codificación de caracteres -->
  <meta charset="UTF-8">

  <!-- Viewport para móviles (crítico para mobile-first) -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Título de la página (50-60 caracteres) -->
  <title>Palabra Clave Principal | Nombre de Marca</title>

  <!-- Meta descripción (150-160 caracteres) -->
  <meta name="description"
        content="Descripción atractiva que incluya la palabra clave
                 principal y motive al usuario a hacer clic.
                 Máximo 160 caracteres.">

  <!-- Idioma del contenido -->
  <meta http-equiv="content-language" content="es">

  <!-- Instrucciones para robots -->
  <meta name="robots" content="index, follow">

  <!-- URL canónica (evita contenido duplicado) -->
  <link rel="canonical" href="https://ejemplo.com/pagina-actual">

  <!-- Autor (opcional) -->
  <meta name="author" content="Nombre o Empresa">

  <!-- Fecha de publicación (opcional pero útil) -->
  <meta name="date" content="2024-11-25">

  <!-- Verificación de propiedad -->
  <meta name="google-site-verification" content="código-de-google">
  <meta name="msvalidate.01" content="código-de-bing">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>`,
      },
    },

    // ============================================
    // TÍTULOS SEO
    // ============================================
    {
      id: 'title-optimization',
      title: 'Optimización de Títulos',
      type: 'code',
      code: {
        title: 'Mejores Prácticas para Title Tags',
        language: 'html',
        description: 'El título es el factor on-page más importante para SEO.',
        code: `<!-- Estructura recomendada -->

<!-- Página de inicio -->
<title>Nombre de Marca - Propuesta de valor corta</title>
<title>Nike - Just Do It | Zapatillas y Ropa Deportiva</title>

<!-- Páginas internas -->
<title>Palabra Clave Principal | Nombre de Marca</title>
<title>Zapatillas Running Mujer | Nike</title>

<!-- Páginas de producto -->
<title>Nombre Producto - Categoría | Marca</title>
<title>Air Max 90 - Zapatillas Running | Nike</title>

<!-- Páginas de blog/artículos -->
<title>Título del Artículo (con keyword) | Blog de Marca</title>
<title>Cómo Elegir Zapatillas de Running en 2024 | Blog Nike</title>

<!-- Páginas de categoría -->
<title>Categoría - Subcategoría | Marca</title>
<title>Zapatillas Mujer - Running | Nike</title>

<!-- ✅ BUENAS PRÁCTICAS -->
<!--
  - Longitud: 50-60 caracteres (máximo 600px de ancho)
  - Palabra clave principal al inicio
  - Único para cada página
  - Incluir marca al final
  - Ser descriptivo y atractivo
  - Usar separadores: | - –
-->

<!-- ❌ EVITAR -->
<!--
  - Títulos duplicados en varias páginas
  - Keyword stuffing: "Zapatillas, Zapatillas Nike, Comprar Zapatillas"
  - Títulos genéricos: "Página de inicio" o "Bienvenido"
  - Títulos muy largos que se cortan en los resultados
  - Todo en mayúsculas
-->`,
      },
    },

    // ============================================
    // META DESCRIPCIÓN
    // ============================================
    {
      id: 'meta-description',
      title: 'Meta Descripción Optimizada',
      type: 'code',
      code: {
        title: 'Escribir Meta Descripciones Efectivas',
        language: 'html',
        description: 'La meta descripción influye en el CTR (Click-Through Rate) en resultados de búsqueda.',
        code: `<!-- Estructura recomendada -->

<!-- Página de producto -->
<meta name="description"
      content="Compra Air Max 90 en Nike.com. Envío gratis en
               pedidos +50€. Diseño icónico con amortiguación Air.
               ¡Descubre todos los colores!">

<!-- Página de servicio -->
<meta name="description"
      content="Servicios de diseño web profesional. Creamos sitios
               rápidos, accesibles y optimizados para SEO.
               Solicita presupuesto gratis hoy.">

<!-- Artículo de blog -->
<meta name="description"
      content="Aprende a elegir las mejores zapatillas de running
               según tu tipo de pisada. Guía completa 2024 con
               consejos de expertos. [5 min de lectura]">

<!-- Página de categoría -->
<meta name="description"
      content="Zapatillas de running para mujer. Encuentra tu par
               perfecto entre +200 modelos. Filtros por precio,
               talla y tipo de pisada. Envío gratis.">

<!-- ✅ BUENAS PRÁCTICAS -->
<!--
  - Longitud: 150-160 caracteres (máximo 920px de ancho)
  - Incluir palabra clave principal de forma natural
  - Incluir llamada a la acción (CTA)
  - Destacar beneficios o propuesta única de valor
  - Única para cada página
  - Coincidir con la intención de búsqueda
  - Usar verbos de acción: Descubre, Aprende, Compra, Encuentra
-->

<!-- ❌ EVITAR -->
<!--
  - Descripciones duplicadas
  - Solo listar keywords sin contexto
  - Dejar que Google la genere automáticamente
  - Descripciones engañosas que no coinciden con el contenido
  - Usar comillas que corten la descripción
-->

<!-- Emojis en meta description (usar con moderación) -->
<meta name="description"
      content="⭐ Zapatillas Nike Air Max 90. ✓ Envío gratis
               ✓ Devolución 30 días ✓ Todos los colores.
               ¡Compra ahora!">`,
      },
    },

    // ============================================
    // OPEN GRAPH
    // ============================================
    {
      id: 'open-graph',
      title: 'Open Graph (Facebook, LinkedIn)',
      type: 'code',
      code: {
        title: 'Meta Tags Open Graph para Redes Sociales',
        language: 'html',
        description: 'Controlar cómo aparece tu contenido al compartirlo en Facebook, LinkedIn, WhatsApp, etc.',
        code: `<!-- Meta Tags Open Graph básicos -->
<meta property="og:title" content="Título para redes sociales (60-90 caracteres)">
<meta property="og:description" content="Descripción atractiva para redes sociales. Puede ser más larga que la meta description (200 caracteres).">
<meta property="og:image" content="https://ejemplo.com/imagen-og.jpg">
<meta property="og:url" content="https://ejemplo.com/pagina">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nombre del Sitio">
<meta property="og:locale" content="es_ES">

<!-- Dimensiones de imagen recomendadas -->
<!--
  Tamaño óptimo: 1200 x 630 píxeles (ratio 1.91:1)
  Tamaño mínimo: 600 x 315 píxeles
  Formato: JPG o PNG
  Tamaño máximo: 8MB
-->

<!-- Tipos de contenido Open Graph -->

<!-- Artículo / Blog post -->
<meta property="og:type" content="article">
<meta property="article:published_time" content="2024-11-25T10:00:00+00:00">
<meta property="article:modified_time" content="2024-11-25T15:30:00+00:00">
<meta property="article:author" content="https://ejemplo.com/autor/juan">
<meta property="article:section" content="Tecnología">
<meta property="article:tag" content="SEO">
<meta property="article:tag" content="Marketing Digital">

<!-- Producto -->
<meta property="og:type" content="product">
<meta property="product:price:amount" content="99.99">
<meta property="product:price:currency" content="EUR">
<meta property="product:availability" content="in stock">
<meta property="product:brand" content="Nike">

<!-- Video -->
<meta property="og:type" content="video.other">
<meta property="og:video" content="https://ejemplo.com/video.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">

<!-- Perfil -->
<meta property="og:type" content="profile">
<meta property="profile:first_name" content="Juan">
<meta property="profile:last_name" content="García">
<meta property="profile:username" content="juangarcia">

<!-- Alternativas de idioma -->
<meta property="og:locale" content="es_ES">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:locale:alternate" content="fr_FR">`,
      },
    },

    // ============================================
    // TWITTER CARDS
    // ============================================
    {
      id: 'twitter-cards',
      title: 'Twitter Cards',
      type: 'code',
      code: {
        title: 'Meta Tags para Twitter/X',
        language: 'html',
        description: 'Optimizar la apariencia de enlaces compartidos en Twitter/X.',
        code: `<!-- Twitter Card básica -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@usuario_marca">
<meta name="twitter:creator" content="@usuario_autor">
<meta name="twitter:title" content="Título del contenido">
<meta name="twitter:description" content="Descripción breve y atractiva del contenido.">
<meta name="twitter:image" content="https://ejemplo.com/imagen-twitter.jpg">
<meta name="twitter:image:alt" content="Descripción de la imagen">

<!-- Tipos de Twitter Cards -->

<!-- Summary: Imagen pequeña a la izquierda -->
<meta name="twitter:card" content="summary">
<!-- Imagen: mínimo 144x144, máximo 4096x4096, ratio 1:1 -->

<!-- Summary Large Image: Imagen grande arriba -->
<meta name="twitter:card" content="summary_large_image">
<!-- Imagen: mínimo 300x157, óptimo 1200x628, ratio 2:1 -->

<!-- Player: Video/Audio embebido -->
<meta name="twitter:card" content="player">
<meta name="twitter:player" content="https://ejemplo.com/player.html">
<meta name="twitter:player:width" content="480">
<meta name="twitter:player:height" content="480">

<!-- App: Promoción de aplicación móvil -->
<meta name="twitter:card" content="app">
<meta name="twitter:app:id:iphone" content="123456789">
<meta name="twitter:app:id:googleplay" content="com.ejemplo.app">

<!-- Ejemplo completo para artículo -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@MiMarca">
<meta name="twitter:creator" content="@JuanAutor">
<meta name="twitter:title" content="Guía Completa de SEO 2024">
<meta name="twitter:description"
      content="Aprende las mejores prácticas de SEO para
               posicionar tu sitio web en Google.
               Guía actualizada con las últimas tendencias.">
<meta name="twitter:image"
      content="https://ejemplo.com/images/guia-seo-2024.jpg">
<meta name="twitter:image:alt"
      content="Infografía mostrando los pilares del SEO">

<!-- Nota: Twitter también lee Open Graph si no hay Twitter Cards -->
<!-- Prioridad: Twitter Cards > Open Graph -->`,
      },
    },

    // ============================================
    // ENCABEZADOS Y ESTRUCTURA
    // ============================================
    {
      id: 'headings',
      title: 'Estructura de Encabezados',
      type: 'code',
      code: {
        title: 'Jerarquía de Encabezados para SEO',
        language: 'html',
        description: 'Los encabezados ayudan a Google a entender la estructura y temas de tu contenido.',
        code: `<!-- Estructura correcta de encabezados -->

<body>
  <!-- Solo UN h1 por página con la keyword principal -->
  <h1>Guía Completa de SEO: Todo lo que Necesitas Saber en 2024</h1>

  <p>Introducción al tema...</p>

  <!-- H2 para secciones principales (keywords secundarias) -->
  <h2>1. Qué es el SEO y Por Qué es Importante</h2>
  <p>Contenido de la sección...</p>

    <!-- H3 para subsecciones -->
    <h3>1.1 Definición de SEO</h3>
    <p>Contenido...</p>

    <h3>1.2 Beneficios del SEO</h3>
    <p>Contenido...</p>

      <!-- H4 para puntos específicos -->
      <h4>Beneficios a Corto Plazo</h4>
      <p>Contenido...</p>

      <h4>Beneficios a Largo Plazo</h4>
      <p>Contenido...</p>

  <h2>2. SEO On-Page: Optimización del Contenido</h2>
  <p>Contenido...</p>

    <h3>2.1 Optimización de Títulos</h3>
    <h3>2.2 Meta Descripciones</h3>
    <h3>2.3 Uso de Keywords</h3>

  <h2>3. SEO Técnico: Aspectos Fundamentales</h2>
  <p>Contenido...</p>

  <!-- Conclusión -->
  <h2>Conclusión</h2>
  <p>Resumen y llamada a la acción...</p>
</body>

<!-- ✅ BUENAS PRÁCTICAS -->
<!--
  - Un solo H1 por página
  - Incluir keyword principal en H1
  - Keywords secundarias en H2
  - No saltar niveles (H1 → H3 sin H2)
  - Usar encabezados para estructura, no para estilo
  - Mantener los encabezados concisos
  - Usar palabras de acción cuando sea apropiado
-->

<!-- ❌ EVITAR -->
<!--
  - Múltiples H1
  - H1 genéricos como "Bienvenido" o "Inicio"
  - Usar encabezados solo para hacer texto grande
  - Keyword stuffing en encabezados
  - Encabezados muy largos
-->`,
      },
    },

    // ============================================
    // ENLACES INTERNOS
    // ============================================
    {
      id: 'internal-links',
      title: 'Enlaces Internos',
      type: 'code',
      code: {
        title: 'Estrategia de Enlazado Interno',
        language: 'html',
        description: 'Los enlaces internos distribuyen autoridad y ayudan a la indexación.',
        code: `<!-- Texto ancla descriptivo (anchor text) -->

<!-- ✅ CORRECTO: Anchor text descriptivo -->
<p>
  Aprende más sobre
  <a href="/guia-seo">optimización para motores de búsqueda</a>
  en nuestra guía completa.
</p>

<p>
  Consulta nuestra
  <a href="/productos/zapatillas-running">
    colección de zapatillas de running
  </a>
  con envío gratis.
</p>

<!-- ❌ INCORRECTO: Anchor text genérico -->
<p>
  Para más información <a href="/guia">haz clic aquí</a>.
</p>
<p>
  Más detalles <a href="/info">aquí</a>.
</p>

<!-- Navegación breadcrumb (migas de pan) -->
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope
        itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Inicio</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope
        itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/productos">
        <span itemprop="name">Productos</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope
        itemtype="https://schema.org/ListItem">
      <span itemprop="name">Zapatillas Running</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>

<!-- Enlaces relacionados al final del contenido -->
<section>
  <h2>Artículos Relacionados</h2>
  <ul>
    <li>
      <a href="/blog/elegir-zapatillas-running">
        Cómo elegir zapatillas de running según tu pisada
      </a>
    </li>
    <li>
      <a href="/blog/mejores-zapatillas-2024">
        Las 10 mejores zapatillas de running en 2024
      </a>
    </li>
  </ul>
</section>

<!-- Enlaces en el contenido (contextual linking) -->
<p>
  El <a href="/glosario/seo">SEO (Search Engine Optimization)</a>
  es fundamental para cualquier estrategia de
  <a href="/servicios/marketing-digital">marketing digital</a>.
  Una buena estrategia de
  <a href="/blog/contenido-seo">contenido optimizado</a>
  puede aumentar significativamente tu tráfico orgánico.
</p>

<!-- Atributos para enlaces -->
<a href="/pagina" title="Descripción adicional">Enlace</a>

<!-- Enlaces externos: usar nofollow cuando corresponda -->
<a href="https://externo.com" rel="nofollow">Enlace externo</a>

<!-- Enlaces patrocinados -->
<a href="https://anunciante.com" rel="sponsored">Anuncio</a>

<!-- Contenido generado por usuarios -->
<a href="https://comentario.com" rel="ugc">Link de usuario</a>`,
      },
    },

    // ============================================
    // URLS AMIGABLES
    // ============================================
    {
      id: 'urls',
      title: 'URLs Amigables para SEO',
      type: 'code',
      code: {
        title: 'Estructura de URLs Optimizada',
        language: 'text',
        description: 'Las URLs claras y descriptivas mejoran el SEO y la experiencia de usuario.',
        code: `# ✅ URLS CORRECTAS

# Estructura clara y descriptiva
https://ejemplo.com/zapatillas-running-mujer
https://ejemplo.com/blog/guia-seo-principiantes
https://ejemplo.com/productos/nike-air-max-90

# Categorías y subcategorías
https://ejemplo.com/ropa/mujer/camisetas
https://ejemplo.com/electronica/smartphones/iphone

# URLs de blog con fecha (opcional)
https://ejemplo.com/blog/2024/11/tendencias-seo

# URLs de producto con SKU (opcional)
https://ejemplo.com/productos/nike-air-max-90-blanco-123456


# ❌ URLS A EVITAR

# IDs numéricos sin contexto
https://ejemplo.com/producto?id=12345
https://ejemplo.com/p/12345

# Parámetros de sesión
https://ejemplo.com/producto?session=abc123&user=456

# Extensiones innecesarias
https://ejemplo.com/pagina.html
https://ejemplo.com/pagina.php

# Caracteres especiales
https://ejemplo.com/zapatillas_running
https://ejemplo.com/Zapatillas%20Running

# URLs muy largas
https://ejemplo.com/categoria/subcategoria/otra/producto-nombre-muy-largo-con-muchas-palabras

# Fechas innecesarias en contenido evergreen
https://ejemplo.com/blog/2020/01/15/que-es-seo


# REGLAS GENERALES

1. Usar guiones (-) para separar palabras, NO guiones bajos (_)
2. Solo minúsculas
3. Incluir keyword principal
4. Mantener cortas (idealmente < 75 caracteres)
5. Evitar palabras vacías (el, la, de, un, etc.)
6. Ser descriptivas y legibles por humanos
7. Usar HTTPS siempre
8. Evitar parámetros de tracking en URLs indexadas
9. Implementar redirecciones 301 al cambiar URLs
10. Mantener estructura consistente en todo el sitio`,
      },
    },

    // ============================================
    // CANONICAL Y DUPLICADOS
    // ============================================
    {
      id: 'canonical',
      title: 'URLs Canónicas y Contenido Duplicado',
      type: 'code',
      code: {
        title: 'Evitar Penalizaciones por Contenido Duplicado',
        language: 'html',
        description: 'La etiqueta canonical indica a Google cuál es la versión principal de una página.',
        code: `<!-- URL canónica básica -->
<link rel="canonical" href="https://ejemplo.com/pagina">

<!-- Siempre usar URL absoluta con protocolo -->
<!-- ✅ Correcto -->
<link rel="canonical" href="https://ejemplo.com/pagina">
<!-- ❌ Incorrecto -->
<link rel="canonical" href="/pagina">

<!-- Casos comunes de contenido duplicado -->

<!-- 1. HTTP vs HTTPS (elegir HTTPS) -->
<!-- En todas las páginas HTTP, canonical apunta a HTTPS -->
<link rel="canonical" href="https://ejemplo.com/pagina">

<!-- 2. WWW vs no-WWW (elegir uno y mantenerlo) -->
<link rel="canonical" href="https://ejemplo.com/pagina">
<!-- O -->
<link rel="canonical" href="https://www.ejemplo.com/pagina">

<!-- 3. Trailing slash (con o sin /) -->
<!-- Elegir uno y mantenerlo consistente -->
<link rel="canonical" href="https://ejemplo.com/pagina">
<link rel="canonical" href="https://ejemplo.com/pagina/">

<!-- 4. Parámetros de URL (filtros, ordenamiento) -->
<!-- Todas estas variantes apuntan a la versión limpia -->
<!-- URL actual: ejemplo.com/productos?orden=precio&color=rojo -->
<link rel="canonical" href="https://ejemplo.com/productos">

<!-- 5. Paginación -->
<!-- Página 1 -->
<link rel="canonical" href="https://ejemplo.com/blog">
<!-- Páginas 2, 3, etc. tienen su propio canonical -->
<link rel="canonical" href="https://ejemplo.com/blog?page=2">

<!-- Paginación con rel prev/next (menos usado ahora) -->
<link rel="prev" href="https://ejemplo.com/blog?page=1">
<link rel="next" href="https://ejemplo.com/blog?page=3">

<!-- 6. Variantes de producto (mismo producto, diferente color) -->
<!-- Si quieres indexar todas las variantes: cada una su canonical -->
<link rel="canonical" href="https://ejemplo.com/producto-rojo">

<!-- Si quieres una sola versión indexada: todas apuntan a ella -->
<link rel="canonical" href="https://ejemplo.com/producto">

<!-- 7. Contenido sindicado/republicado -->
<!-- En el sitio que republica el contenido: -->
<link rel="canonical" href="https://sitio-original.com/articulo">

<!-- Cross-domain canonical (mismo contenido en diferentes dominios) -->
<link rel="canonical" href="https://dominio-principal.com/contenido">

<!-- hreflang para versiones en diferentes idiomas -->
<link rel="alternate" hreflang="es" href="https://ejemplo.com/pagina">
<link rel="alternate" hreflang="en" href="https://ejemplo.com/en/page">
<link rel="alternate" hreflang="x-default" href="https://ejemplo.com/pagina">`,
      },
    },

    // ============================================
    // HREFLANG
    // ============================================
    {
      id: 'hreflang',
      title: 'Hreflang (SEO Internacional)',
      type: 'code',
      code: {
        title: 'Configuración para Sitios Multiidioma',
        language: 'html',
        description: 'Indicar a Google qué versión de la página mostrar según el idioma/país del usuario.',
        code: `<!-- Hreflang básico: diferentes idiomas -->
<link rel="alternate" hreflang="es" href="https://ejemplo.com/pagina">
<link rel="alternate" hreflang="en" href="https://ejemplo.com/en/page">
<link rel="alternate" hreflang="fr" href="https://ejemplo.com/fr/page">
<link rel="alternate" hreflang="x-default" href="https://ejemplo.com/pagina">

<!-- x-default: versión por defecto para idiomas no especificados -->

<!-- Hreflang con idioma Y país -->
<link rel="alternate" hreflang="es-ES" href="https://ejemplo.es/pagina">
<link rel="alternate" hreflang="es-MX" href="https://ejemplo.mx/pagina">
<link rel="alternate" hreflang="es-AR" href="https://ejemplo.ar/pagina">
<link rel="alternate" hreflang="en-US" href="https://ejemplo.com/page">
<link rel="alternate" hreflang="en-GB" href="https://ejemplo.co.uk/page">

<!-- Importante: CADA página debe tener TODAS las variantes -->
<!-- Incluyendo una referencia a sí misma -->

<!-- En la página española (ejemplo.es/pagina): -->
<link rel="alternate" hreflang="es-ES" href="https://ejemplo.es/pagina">
<link rel="alternate" hreflang="es-MX" href="https://ejemplo.mx/pagina">
<link rel="alternate" hreflang="en-US" href="https://ejemplo.com/page">
<link rel="alternate" hreflang="x-default" href="https://ejemplo.com/page">

<!-- En la página mexicana (ejemplo.mx/pagina): -->
<link rel="alternate" hreflang="es-ES" href="https://ejemplo.es/pagina">
<link rel="alternate" hreflang="es-MX" href="https://ejemplo.mx/pagina">
<link rel="alternate" hreflang="en-US" href="https://ejemplo.com/page">
<link rel="alternate" hreflang="x-default" href="https://ejemplo.com/page">

<!-- Códigos de idioma ISO 639-1 comunes -->
<!--
  es = Español
  en = Inglés
  fr = Francés
  de = Alemán
  pt = Portugués
  it = Italiano
  zh = Chino
  ja = Japonés
  ko = Coreano
  ru = Ruso
  ar = Árabe
-->

<!-- Códigos de país ISO 3166-1 Alpha-2 comunes -->
<!--
  ES = España
  MX = México
  AR = Argentina
  CO = Colombia
  US = Estados Unidos
  GB = Reino Unido
  FR = Francia
  DE = Alemania
  BR = Brasil
  PT = Portugal
-->

<!-- Alternativa: Hreflang en sitemap.xml -->
<!--
<url>
  <loc>https://ejemplo.com/pagina</loc>
  <xhtml:link rel="alternate" hreflang="es"
              href="https://ejemplo.com/pagina"/>
  <xhtml:link rel="alternate" hreflang="en"
              href="https://ejemplo.com/en/page"/>
</url>
-->`,
      },
    },

    // ============================================
    // ROBOTS META TAG
    // ============================================
    {
      id: 'robots-meta',
      title: 'Meta Robots y X-Robots-Tag',
      type: 'table',
      table: {
        title: 'Directivas de Robots',
        headers: ['Directiva', 'Descripción', 'Ejemplo'],
        rows: [
          { Directiva: 'index', Descripción: 'Permitir indexación', Ejemplo: '<meta name="robots" content="index">' },
          { Directiva: 'noindex', Descripción: 'No indexar la página', Ejemplo: '<meta name="robots" content="noindex">' },
          { Directiva: 'follow', Descripción: 'Seguir enlaces de la página', Ejemplo: '<meta name="robots" content="follow">' },
          { Directiva: 'nofollow', Descripción: 'No seguir ningún enlace', Ejemplo: '<meta name="robots" content="nofollow">' },
          { Directiva: 'noarchive', Descripción: 'No mostrar versión en caché', Ejemplo: '<meta name="robots" content="noarchive">' },
          { Directiva: 'nosnippet', Descripción: 'No mostrar snippet en resultados', Ejemplo: '<meta name="robots" content="nosnippet">' },
          { Directiva: 'noimageindex', Descripción: 'No indexar imágenes', Ejemplo: '<meta name="robots" content="noimageindex">' },
          { Directiva: 'max-snippet', Descripción: 'Límite de caracteres del snippet', Ejemplo: '<meta name="robots" content="max-snippet:150">' },
          { Directiva: 'max-image-preview', Descripción: 'Tamaño máximo de imagen en preview', Ejemplo: '<meta name="robots" content="max-image-preview:large">' },
          { Directiva: 'max-video-preview', Descripción: 'Segundos máximos de preview de video', Ejemplo: '<meta name="robots" content="max-video-preview:30">' },
        ],
      },
    },

    // ============================================
    // ROBOTS.TXT
    // ============================================
    {
      id: 'robots-txt',
      title: 'Archivo robots.txt',
      type: 'code',
      code: {
        title: 'Configuración de robots.txt',
        language: 'text',
        description: 'El archivo robots.txt indica a los crawlers qué pueden y qué no pueden rastrear.',
        code: `# Ubicación: https://ejemplo.com/robots.txt

# Reglas para todos los robots
User-agent: *

# Permitir todo (por defecto)
Allow: /

# Bloquear rutas específicas
Disallow: /admin/
Disallow: /api/
Disallow: /carrito/
Disallow: /checkout/
Disallow: /cuenta/
Disallow: /buscar?
Disallow: /*?utm_
Disallow: /*?ref=
Disallow: /*?session=
Disallow: /temp/
Disallow: /private/

# Bloquear archivos específicos
Disallow: /config.php
Disallow: /*.json$

# Reglas específicas para Googlebot
User-agent: Googlebot

# Permitir CSS y JS para renderizado
Allow: /*.css
Allow: /*.js
Allow: /images/

# Bloquear recursos pesados innecesarios
Disallow: /videos/raw/

# Bloquear GPTBot (ChatGPT crawler)
User-agent: GPTBot
Disallow: /

# Bloquear CCBot (Common Crawl)
User-agent: CCBot
Disallow: /

# Bloquear otros bots de IA
User-agent: ChatGPT-User
Disallow: /

User-agent: anthropic-ai
Disallow: /

# Permitir solo a bots específicos en secciones sensibles
User-agent: Googlebot
Allow: /api/public/
User-agent: Bingbot
Allow: /api/public/

# Crawl-delay (no soportado por Google, sí por Bing/Yandex)
User-agent: Bingbot
Crawl-delay: 10

# Referencia al sitemap
Sitemap: https://ejemplo.com/sitemap.xml
Sitemap: https://ejemplo.com/sitemap-posts.xml
Sitemap: https://ejemplo.com/sitemap-productos.xml

# Notas:
# - robots.txt NO garantiza que la página no sea indexada
#   (usar noindex para eso)
# - robots.txt es público, no poner URLs sensibles
# - Probar con Google Search Console
# - Máximo 500KB de tamaño`,
      },
    },

    // ============================================
    // SITEMAP XML
    // ============================================
    {
      id: 'sitemap',
      title: 'Sitemap XML',
      type: 'code',
      code: {
        title: 'Estructura del Sitemap',
        language: 'xml',
        description: 'El sitemap ayuda a los motores de búsqueda a descubrir todas tus páginas.',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Página principal -->
  <url>
    <loc>https://ejemplo.com/</loc>
    <lastmod>2024-11-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Página de categoría -->
  <url>
    <loc>https://ejemplo.com/productos</loc>
    <lastmod>2024-11-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Página de producto con imagen -->
  <url>
    <loc>https://ejemplo.com/productos/zapatillas-nike</loc>
    <lastmod>2024-11-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <image:image>
      <image:loc>https://ejemplo.com/images/zapatillas-nike.jpg</image:loc>
      <image:title>Zapatillas Nike Air Max 90</image:title>
      <image:caption>Zapatillas deportivas Nike en color blanco</image:caption>
    </image:image>
  </url>

  <!-- Página con video -->
  <url>
    <loc>https://ejemplo.com/tutoriales/seo-basico</loc>
    <video:video>
      <video:thumbnail_loc>https://ejemplo.com/thumbs/seo.jpg</video:thumbnail_loc>
      <video:title>Tutorial de SEO Básico</video:title>
      <video:description>Aprende los fundamentos del SEO</video:description>
      <video:content_loc>https://ejemplo.com/videos/seo-basico.mp4</video:content_loc>
      <video:duration>600</video:duration>
    </video:video>
  </url>

  <!-- Página multiidioma con hreflang -->
  <url>
    <loc>https://ejemplo.com/contacto</loc>
    <xhtml:link rel="alternate" hreflang="es"
                href="https://ejemplo.com/contacto"/>
    <xhtml:link rel="alternate" hreflang="en"
                href="https://ejemplo.com/en/contact"/>
    <xhtml:link rel="alternate" hreflang="x-default"
                href="https://ejemplo.com/contacto"/>
  </url>

</urlset>

<!--
  Sitemap Index (para sitios grandes, >50,000 URLs)
-->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://ejemplo.com/sitemap-pages.xml</loc>
    <lastmod>2024-11-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ejemplo.com/sitemap-posts.xml</loc>
    <lastmod>2024-11-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ejemplo.com/sitemap-products.xml</loc>
    <lastmod>2024-11-25</lastmod>
  </sitemap>
</sitemapindex>

<!--
  changefreq: always, hourly, daily, weekly, monthly, yearly, never
  priority: 0.0 a 1.0 (relativo dentro del sitio)
  Máximo: 50,000 URLs o 50MB por sitemap
-->`,
      },
    },

    // ============================================
    // SCHEMA.ORG BÁSICO
    // ============================================
    {
      id: 'schema-basic',
      title: 'Schema.org (Datos Estructurados)',
      type: 'code',
      code: {
        title: 'Introducción a Schema.org con JSON-LD',
        language: 'html',
        description: 'Los datos estructurados ayudan a Google a entender tu contenido y mostrar rich snippets.',
        code: `<!-- Schema.org se implementa preferiblemente con JSON-LD -->
<!-- Colocar en <head> o al final del <body> -->

<!-- Organización (para la página principal) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mi Empresa",
  "url": "https://ejemplo.com",
  "logo": "https://ejemplo.com/logo.png",
  "description": "Descripción de la empresa",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Principal 123",
    "addressLocality": "Madrid",
    "addressRegion": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-600-000-000",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/miempresa",
    "https://twitter.com/miempresa",
    "https://www.linkedin.com/company/miempresa",
    "https://www.instagram.com/miempresa"
  ]
}
</script>

<!-- WebSite (con SearchAction para sitelinks searchbox) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mi Sitio Web",
  "url": "https://ejemplo.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ejemplo.com/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>

<!-- BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://ejemplo.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Productos",
      "item": "https://ejemplo.com/productos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Zapatillas",
      "item": "https://ejemplo.com/productos/zapatillas"
    }
  ]
}
</script>`,
      },
    },

    // ============================================
    // SCHEMA PARA ARTÍCULOS
    // ============================================
    {
      id: 'schema-article',
      title: 'Schema.org para Artículos',
      type: 'code',
      code: {
        title: 'Datos Estructurados para Blog y Noticias',
        language: 'html',
        description: 'Schema para artículos de blog, noticias y contenido editorial.',
        code: `<!-- Article (blog post general) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guía Completa de SEO para Principiantes",
  "description": "Aprende los fundamentos del SEO con esta guía paso a paso.",
  "image": [
    "https://ejemplo.com/images/guia-seo-1x1.jpg",
    "https://ejemplo.com/images/guia-seo-4x3.jpg",
    "https://ejemplo.com/images/guia-seo-16x9.jpg"
  ],
  "datePublished": "2024-11-01T10:00:00+01:00",
  "dateModified": "2024-11-25T15:30:00+01:00",
  "author": {
    "@type": "Person",
    "name": "Juan García",
    "url": "https://ejemplo.com/autor/juan-garcia"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mi Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ejemplo.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ejemplo.com/blog/guia-seo"
  },
  "wordCount": 2500,
  "articleSection": "SEO",
  "keywords": ["SEO", "marketing digital", "Google", "posicionamiento"]
}
</script>

<!-- NewsArticle (para sitios de noticias) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Google anuncia nueva actualización del algoritmo",
  "description": "La actualización afectará al 10% de las búsquedas.",
  "image": "https://ejemplo.com/images/google-update.jpg",
  "datePublished": "2024-11-25T08:00:00+01:00",
  "dateModified": "2024-11-25T10:00:00+01:00",
  "author": {
    "@type": "Person",
    "name": "María López"
  },
  "publisher": {
    "@type": "NewsMediaOrganization",
    "name": "Noticias Tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ejemplo.com/logo.png"
    }
  }
}
</script>

<!-- HowTo (tutoriales paso a paso) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo optimizar el título de una página para SEO",
  "description": "Guía paso a paso para crear títulos SEO efectivos.",
  "image": "https://ejemplo.com/images/titulo-seo.jpg",
  "totalTime": "PT15M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Investigar palabras clave",
      "text": "Usa herramientas como Google Keyword Planner para encontrar keywords relevantes.",
      "url": "https://ejemplo.com/tutorial#paso-1",
      "image": "https://ejemplo.com/images/paso-1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Escribir el título",
      "text": "Incluye la palabra clave principal al inicio del título.",
      "url": "https://ejemplo.com/tutorial#paso-2"
    },
    {
      "@type": "HowToStep",
      "name": "Optimizar longitud",
      "text": "Mantén el título entre 50-60 caracteres.",
      "url": "https://ejemplo.com/tutorial#paso-3"
    }
  ]
}
</script>`,
      },
    },

    // ============================================
    // SCHEMA PARA PRODUCTOS
    // ============================================
    {
      id: 'schema-product',
      title: 'Schema.org para Productos',
      type: 'code',
      code: {
        title: 'Datos Estructurados para E-commerce',
        language: 'html',
        description: 'Schema para productos, ofertas, reseñas y disponibilidad.',
        code: `<!-- Product con Offer, Review y AggregateRating -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Zapatillas Nike Air Max 90",
  "image": [
    "https://ejemplo.com/images/nike-air-max-1.jpg",
    "https://ejemplo.com/images/nike-air-max-2.jpg",
    "https://ejemplo.com/images/nike-air-max-3.jpg"
  ],
  "description": "Zapatillas deportivas con amortiguación Air visible. Diseño icónico de los 90.",
  "sku": "NIKE-AM90-WHT-42",
  "mpn": "AM90-WHT",
  "gtin13": "0194501234567",
  "brand": {
    "@type": "Brand",
    "name": "Nike"
  },
  "category": "Zapatillas > Running > Hombre",
  "color": "Blanco",
  "size": "42",
  "material": "Cuero sintético",

  "offers": {
    "@type": "Offer",
    "url": "https://ejemplo.com/productos/nike-air-max-90",
    "priceCurrency": "EUR",
    "price": "149.99",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Mi Tienda"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "EUR"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "ES"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 3,
          "unitCode": "DAY"
        }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  },

  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "156",
    "reviewCount": "89"
  },

  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Carlos M."
      },
      "datePublished": "2024-11-20",
      "reviewBody": "Excelentes zapatillas, muy cómodas y el envío fue rapidísimo."
    }
  ]
}
</script>

<!-- Valores de availability -->
<!--
  InStock - En stock
  OutOfStock - Agotado
  PreOrder - Preventa
  BackOrder - Pedido pendiente
  Discontinued - Descontinuado
  LimitedAvailability - Disponibilidad limitada
  SoldOut - Vendido
-->`,
      },
    },

    // ============================================
    // SCHEMA FAQ
    // ============================================
    {
      id: 'schema-faq',
      title: 'Schema.org para FAQ',
      type: 'code',
      code: {
        title: 'Datos Estructurados para Preguntas Frecuentes',
        language: 'html',
        description: 'Schema para FAQ que puede generar rich snippets expandidos en Google.',
        code: `<!-- FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO (Search Engine Optimization) es el proceso de optimizar un sitio web para mejorar su visibilidad en los resultados de búsqueda orgánicos de Google y otros motores de búsqueda."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda el SEO en dar resultados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SEO es una estrategia a largo plazo. Generalmente, se empiezan a ver resultados significativos entre 3 y 6 meses después de implementar las optimizaciones, aunque esto puede variar según la competencia y el estado inicial del sitio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre SEO y SEM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO se refiere al posicionamiento orgánico (gratuito) en buscadores, mientras que SEM (Search Engine Marketing) incluye publicidad pagada como Google Ads. El SEO tarda más pero tiene resultados duraderos, mientras que SEM da resultados inmediatos pero requiere inversión continua."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es necesario contratar una agencia de SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No es estrictamente necesario. Puedes aprender SEO básico y aplicarlo tú mismo. Sin embargo, para sitios grandes o competitivos, una agencia o consultor especializado puede acelerar los resultados y evitar errores costosos."
      }
    }
  ]
}
</script>

<!-- LocalBusiness con FAQ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mi Restaurante",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Principal 123",
    "addressLocality": "Madrid"
  },
  "telephone": "+34600000000",
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Hacen envíos a domicilio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, hacemos envíos a domicilio en un radio de 5km. Pedido mínimo 15€. Envío gratuito a partir de 25€."
        }
      },
      {
        "@type": "Question",
        "name": "¿Aceptan reservas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, aceptamos reservas por teléfono o a través de nuestra web. Recomendamos reservar con al menos 24 horas de anticipación para fines de semana."
        }
      }
    ]
  }
}
</script>`,
      },
    },

    // ============================================
    // CORE WEB VITALS
    // ============================================
    {
      id: 'core-web-vitals',
      title: 'Core Web Vitals',
      type: 'table',
      table: {
        title: 'Métricas de Core Web Vitals',
        headers: ['Métrica', 'Qué mide', 'Bueno', 'Necesita mejora', 'Pobre'],
        rows: [
          { Métrica: 'LCP (Largest Contentful Paint)', 'Qué mide': 'Tiempo de carga del elemento más grande', Bueno: '≤ 2.5s', 'Necesita mejora': '2.5s - 4s', Pobre: '> 4s' },
          { Métrica: 'INP (Interaction to Next Paint)', 'Qué mide': 'Latencia de interacciones', Bueno: '≤ 200ms', 'Necesita mejora': '200ms - 500ms', Pobre: '> 500ms' },
          { Métrica: 'CLS (Cumulative Layout Shift)', 'Qué mide': 'Estabilidad visual (saltos de layout)', Bueno: '≤ 0.1', 'Necesita mejora': '0.1 - 0.25', Pobre: '> 0.25' },
        ],
      },
    },

    // ============================================
    // OPTIMIZACIÓN DE VELOCIDAD
    // ============================================
    {
      id: 'speed-optimization',
      title: 'Optimización de Velocidad',
      type: 'code',
      code: {
        title: 'Técnicas para Mejorar Core Web Vitals',
        language: 'html',
        description: 'Implementaciones técnicas para mejorar la velocidad de carga.',
        code: `<!-- MEJORAR LCP (Largest Contentful Paint) -->

<!-- Precargar imagen LCP -->
<link rel="preload" as="image" href="/hero-image.jpg"
      fetchpriority="high">

<!-- Preconectar a CDNs -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.ejemplo.com" crossorigin>

<!-- DNS prefetch para recursos externos -->
<link rel="dns-prefetch" href="https://analytics.google.com">

<!-- Prioridad de imagen LCP -->
<img src="hero.jpg" alt="Hero" fetchpriority="high"
     loading="eager" decoding="async">

<!-- Lazy loading para imágenes below the fold -->
<img src="producto.jpg" alt="Producto" loading="lazy"
     decoding="async" width="400" height="300">


<!-- MEJORAR CLS (Cumulative Layout Shift) -->

<!-- SIEMPRE especificar dimensiones -->
<img src="imagen.jpg" alt="Descripción"
     width="800" height="600">

<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
</video>

<!-- Reservar espacio para anuncios -->
<div style="min-height: 250px;">
  <!-- Espacio para banner publicitario -->
</div>

<!-- Reservar espacio para contenido dinámico -->
<div id="comentarios" style="min-height: 400px;">
  <!-- Comentarios cargados dinámicamente -->
</div>

<!-- Web fonts sin FOUT/FOIT -->
<link rel="preload" as="font" type="font/woff2"
      href="/fonts/mi-fuente.woff2" crossorigin>

<style>
@font-face {
  font-family: 'MiFuente';
  src: url('/fonts/mi-fuente.woff2') format('woff2');
  font-display: swap;  /* Muestra fallback hasta que cargue */
}
</style>


<!-- MEJORAR INP (Interaction to Next Paint) -->

<!-- Dividir JavaScript pesado -->
<script type="module">
  // Código crítico primero
</script>
<script type="module" async>
  // Código no crítico después
</script>

<!-- Defer para scripts no críticos -->
<script src="analytics.js" defer></script>
<script src="chat-widget.js" defer></script>

<!-- Async para scripts independientes -->
<script src="social-share.js" async></script>

<!-- Critical CSS inline -->
<style>
  /* CSS crítico para above-the-fold */
  body { margin: 0; font-family: system-ui; }
  .hero { height: 100vh; }
</style>

<!-- CSS no crítico con preload -->
<link rel="preload" href="styles.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link rel="stylesheet" href="styles.css">
</noscript>`,
      },
    },

    // ============================================
    // IMÁGENES PARA SEO
    // ============================================
    {
      id: 'images-seo',
      title: 'Optimización de Imágenes',
      type: 'code',
      code: {
        title: 'Imágenes Optimizadas para SEO y Rendimiento',
        language: 'html',
        description: 'Mejores prácticas para imágenes en términos de SEO y velocidad.',
        code: `<!-- Imagen optimizada completa -->
<img src="producto-zapatillas-nike-800.jpg"
     srcset="producto-zapatillas-nike-400.jpg 400w,
             producto-zapatillas-nike-800.jpg 800w,
             producto-zapatillas-nike-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Zapatillas Nike Air Max 90 en color blanco, vista lateral"
     width="800"
     height="600"
     loading="lazy"
     decoding="async">

<!-- Picture para formatos modernos -->
<picture>
  <!-- AVIF: mejor compresión -->
  <source type="image/avif"
          srcset="imagen.avif 1x, imagen@2x.avif 2x">

  <!-- WebP: buen soporte -->
  <source type="image/webp"
          srcset="imagen.webp 1x, imagen@2x.webp 2x">

  <!-- JPEG: fallback universal -->
  <img src="imagen.jpg"
       srcset="imagen.jpg 1x, imagen@2x.jpg 2x"
       alt="Descripción detallada"
       width="800" height="600"
       loading="lazy">
</picture>

<!-- SVG para logos e iconos -->
<img src="logo.svg" alt="Logo de Mi Empresa"
     width="200" height="50">

<!-- Nombre de archivo optimizado -->
<!--
  ✅ zapatillas-nike-air-max-90-blanco.jpg
  ❌ IMG_20241125_123456.jpg
  ❌ foto1.jpg
  ❌ zapatillas_nike.jpg (usar guiones, no guiones bajos)
-->

<!-- Texto alt optimizado -->
<!--
  ✅ "Zapatillas Nike Air Max 90 blancas, vista lateral
       mostrando la cámara de aire"
  ❌ "zapatillas nike air max 90 comprar ofertas"
  ❌ "imagen" o "foto"
  ❌ "" (vacío, excepto para decorativas)
-->

<!-- Imagen en artículo con figura y caption -->
<figure>
  <img src="grafico-trafico-seo.png"
       alt="Gráfico de líneas mostrando crecimiento del
            tráfico orgánico de 1000 a 5000 visitas
            mensuales entre enero y noviembre 2024"
       width="800" height="400"
       loading="lazy">
  <figcaption>
    Fig. 1: Crecimiento del tráfico orgánico durante 2024
    tras implementar estrategia SEO.
  </figcaption>
</figure>

<!-- Imagen con Schema -->
<div itemscope itemtype="https://schema.org/ImageObject">
  <img itemprop="contentUrl"
       src="infografia-seo.png"
       alt="Infografía: Los 10 factores SEO más importantes">
  <meta itemprop="name" content="Infografía SEO 2024">
  <meta itemprop="description"
        content="Los 10 factores más importantes para
                 posicionar en Google">
</div>`,
      },
    },

    // ============================================
    // HERRAMIENTAS SEO
    // ============================================
    {
      id: 'tools',
      title: 'Herramientas SEO Esenciales',
      type: 'list',
      items: [
        'Google Search Console: Monitoreo de indexación, errores, rendimiento',
        'Google Analytics 4: Análisis de tráfico y comportamiento',
        'Google PageSpeed Insights: Análisis de Core Web Vitals',
        'Google Lighthouse: Auditoría de rendimiento, SEO, accesibilidad',
        'Bing Webmaster Tools: SEO para Bing',
        'Ahrefs: Análisis de backlinks, keywords, competencia',
        'SEMrush: Suite completa de SEO y marketing',
        'Moz Pro: Autoridad de dominio, análisis de enlaces',
        'Screaming Frog: Crawler SEO para auditorías técnicas',
        'Schema Markup Validator: Validar datos estructurados',
        'Rich Results Test: Probar rich snippets de Google',
        'Mobile-Friendly Test: Verificar compatibilidad móvil',
        'GTmetrix: Análisis detallado de velocidad',
        'WebPageTest: Testing avanzado de rendimiento',
        'Yoast SEO / RankMath: Plugins SEO para WordPress',
        'Ubersuggest: Investigación de keywords gratuita',
        'AnswerThePublic: Ideas de contenido basadas en preguntas',
        'Google Trends: Tendencias de búsqueda',
      ],
    },

    // ============================================
    // CHECKLIST SEO
    // ============================================
    {
      id: 'checklist',
      title: 'Checklist SEO On-Page',
      type: 'list',
      items: [
        'Título único con keyword principal (50-60 caracteres)',
        'Meta descripción única y atractiva (150-160 caracteres)',
        'URL amigable con keyword',
        'Un solo H1 con keyword principal',
        'Estructura de encabezados jerárquica (H1-H6)',
        'Keyword principal en primeros 100 palabras',
        'Imágenes con alt text descriptivo',
        'Imágenes optimizadas (WebP/AVIF, comprimidas)',
        'Enlaces internos relevantes con anchor text descriptivo',
        'Enlaces externos a fuentes de autoridad',
        'URL canónica correcta',
        'Hreflang si hay versiones en otros idiomas',
        'Schema.org implementado (Organization, Article, Product, etc.)',
        'Open Graph y Twitter Cards configurados',
        'Core Web Vitals en verde (LCP, INP, CLS)',
        'Sitio mobile-friendly y responsive',
        'HTTPS habilitado',
        'Sitemap.xml actualizado',
        'Robots.txt correctamente configurado',
        'Sin errores 404 en enlaces internos',
        'Página carga en menos de 3 segundos',
        'Contenido mínimo de 300 palabras (ideal 1500+)',
        'Sin contenido duplicado',
      ],
    },

    // ============================================
    // BUENAS PRÁCTICAS
    // ============================================
    {
      id: 'best-practices',
      title: 'Buenas Prácticas SEO',
      type: 'list',
      items: [
        'Crear contenido útil, original y de calidad (E-E-A-T)',
        'Investigar keywords antes de crear contenido',
        'Actualizar contenido antiguo regularmente',
        'Mantener URLs permanentes (evitar cambios)',
        'Implementar redirecciones 301 cuando sea necesario',
        'Evitar keyword stuffing (uso excesivo de keywords)',
        'Priorizar experiencia de usuario sobre SEO técnico',
        'Construir backlinks de calidad, no cantidad',
        'Monitorear Search Console semanalmente',
        'Analizar competencia y brechas de contenido',
        'Optimizar para búsqueda por voz (preguntas naturales)',
        'Crear contenido para featured snippets',
        'Usar datos estructurados donde aplique',
        'Mantener velocidad de carga óptima',
        'Asegurar accesibilidad web (también ayuda al SEO)',
        'No usar técnicas black hat (cloaking, links ocultos)',
        'Diversificar fuentes de tráfico (no solo Google)',
        'Medir resultados y ajustar estrategia continuamente',
      ],
    },
  ],
}
