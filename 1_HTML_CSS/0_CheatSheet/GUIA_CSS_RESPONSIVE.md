# GUÍA DE CSS: DE CERO A DISEÑOS RESPONSIVE

**Chuleta y manual de consulta para prácticas de HTML y CSS**  
**Nivel:** iniciación → intermedio · **Enfoque:** CSS moderno, buenas prácticas, reutilización y diseño adaptable.

> **Cómo usar estos apuntes:** no hace falta memorizarlo todo. Busca el concepto que necesites, lee la explicación y prueba el ejemplo en VS Code. La guía acompaña a `plantilla_css_responsive.css` y `ejemplo_plantilla_responsive.html`, pero también puede consultarse de forma independiente.
>
> **Una advertencia útil:** los números de espaciado, los colores y los puntos de ruptura de los ejemplos son *puntos de partida*, no normas universales. Lo importante es entender el motivo de cada decisión.

---

## ÍNDICE

**PARTE I. BASES Y CRITERIOS**

1. Qué hacen HTML y CSS y cómo se conectan
2. Cómo decidir qué clases poner en el HTML (DRY y reutilización)
3. Cómo se escribe CSS: selectores, reglas, cascada y especificidad
4. Unidades CSS: `px`, `rem`, `em`, `%`, `fr`, `vw`, `vh` y `ch`

**PARTE II. LA PLANTILLA, DE PRINCIPIO A FIN**

5. Sección 1: `:root`, variables y sistema de diseño
6. Sección 2: reset y estilos generales
7. Modelo de caja: `margin`, `padding`, `border` y `gap`
8. Sección 3: contenedores, dimensiones y espaciado
9. Sección 4: Flexbox
10. Sección 5: CSS Grid
11. Tamaños fluidos: `min()`, `max()`, `clamp()`, `minmax()` y `auto-fit`
12. Sección 6: componentes reutilizables
13. Sección 7: clases de utilidad
14. Sección 8: `@media` y diseño responsive (*mobile first*)
15. Sección 9: accesibilidad
16. Sección 10: estilos específicos y organización profesional

**PARTE III. HERRAMIENTAS QUE TAMBIÉN DEBES CONOCER**

17. Selectores anidados y `&` (*CSS Nesting*)
18. Tipografía, colores, fondos, bordes y sombras
19. Imágenes, `aspect-ratio` y `object-fit`
20. `position`, `z-index`, `overflow` y elementos ocultos
21. Pseudoclases, transiciones y animaciones
22. Formularios y estados interactivos

**PARTE IV. APLICACIÓN Y CONSULTA**

23. Construir una página pequeña: HTML + CSS explicados
24. Depuración: por qué una clase «no funciona»
25. Chuleta rápida de clases y propiedades
26. Lista de comprobación para cualquier proyecto
27. Ejercicios progresivos y glosario

---

# PARTE I. BASES Y CRITERIOS

## 1. Qué hacen HTML y CSS y cómo se conectan

**HTML define la estructura y el significado del contenido**; **CSS define cómo se presenta visualmente**. JavaScript, cuando lo incorpores, añade comportamiento e interactividad.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primera web</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <nav aria-label="Navegación principal">...</nav>
    </header>

    <main>
      <section aria-labelledby="titulo-proyectos">
        <h1 id="titulo-proyectos">Mis proyectos</h1>
        <article>Un proyecto independiente</article>
      </section>
    </main>

    <footer>Información final</footer>
  </body>
</html>
```

### Etiquetas HTML semánticas

| Etiqueta | Qué representa | Ejemplo de uso |
|---|---|---|
| `<header>` | Cabecera de la página o de una sección | Logo, título o navegación |
| `<nav>` | Bloque de enlaces de navegación | Menú principal |
| `<main>` | Contenido principal del documento | Secciones de la página |
| `<section>` | Sección temática, normalmente con encabezado | Servicios, proyectos |
| `<article>` | Pieza que podría tener sentido de forma independiente | Noticia, artículo, tarjeta de proyecto |
| `<aside>` | Información complementaria | Barra lateral |
| `<footer>` | Pie de una página o sección | Contacto, créditos |
| `<div>` | Agrupador sin significado específico | Contenedor necesario para Grid |
| `<span>` | Agrupador en línea sin significado específico | Resaltar una parte de una frase |

**Importante:** `header`, `article`, `section` y `footer` no son simplemente `div` con otro nombre. Aportan significado al documento. Aun así, `div` sigue siendo muy útil cuando solo necesitas agrupar elementos para darles estilo.

### Cómo enlazar CSS

```html
<link rel="stylesheet" href="style.css">
```

- Si HTML y CSS están en la **misma carpeta**, basta con `style.css`.
- Si el CSS está dentro de `css/`, escribe `href="css/style.css"`.
- La ruta se interpreta en relación con el archivo HTML.

### Tres maneras de aplicar estilos

```css
/* Hoja CSS externa: la opción preferida para proyectos normales */
.card { padding: 1rem; }
```

```html
<!-- Estilo interno: útil en pruebas, pero no para organizar una web grande -->
<style>.card { padding: 1rem; }</style>

<!-- Estilo en línea: reservar para casos concretos -->
<div style="padding: 1rem;">Contenido</div>
```

Para tus prácticas, prioriza una **hoja CSS externa**.

---

## 2. Cómo decidir qué clases poner en el HTML

Esta es una de las cuestiones más importantes de toda la guía. **Una clase CSS no se pone porque sí:** debe expresar una función, un componente, una variante o una utilidad.

### 2.1. Las cuatro preguntas antes de poner una clase

1. **¿Qué es este contenido?** Elige primero la etiqueta HTML adecuada (`section`, `article`, `nav`, `div`...).
2. **¿Cómo se distribuye?** ¿Necesita un contenedor, Flexbox, Grid o alineación? Usa una clase de *layout* si el patrón es reutilizable.
3. **¿Qué componente es?** Si se repite una apariencia (tarjeta, botón, formulario), dale su clase de componente.
4. **¿Tiene una variante o requisito específico?** Añade un modificador o una clase propia del proyecto solo si lo necesita.

```html
<section class="section">
  <div class="container">
    <h2>Proyectos</h2>

    <div class="grid-auto">
      <article class="card">
        <h3>Mi mapa interactivo</h3>
        <p>Descripción del proyecto.</p>
        <a href="#" class="btn">Ver proyecto</a>
      </article>
    </div>
  </div>
</section>
```

| Fragmento | Por qué lo elegimos |
|---|---|
| `<section>` | Es un bloque temático |
| `.section` | Aplica separación vertical compartida |
| `<div class="container">` | Limita y centra la anchura del contenido; no necesita ser semántico |
| `.grid-auto` | Distribuye las tarjetas de forma adaptable |
| `<article>` | Cada proyecto puede entenderse como una pieza independiente |
| `.card` | Aplica el diseño visual de tarjeta |
| `.btn` | Comparte aspecto con otros botones o enlaces de acción |

**Nota:** `class="card grid-auto"` significa que **ambas clases** se aplican al mismo elemento, no que una contenga a la otra. Normalmente, `grid-auto` se pone en el **padre que distribuye las tarjetas**, y `card` en **cada tarjeta**.

### 2.2. Tipos de clases que conviene distinguir

**A. Layout: distribución de elementos**

```html
<div class="container">...</div>
<div class="flex-between">...</div>
<div class="grid-auto">...</div>
```

**B. Componente: una pieza visual identificable**

```html
<article class="card">...</article>
<button class="btn">Enviar</button>
```

**C. Modificador: una versión de un componente**

```html
<a href="#" class="btn btn--outline">Más información</a>
<div class="grid-auto grid-auto--wide">...</div>
```

**D. Utilidad: un ajuste pequeño y general**

```html
<h2 class="text-center">Título</h2>
<p class="text-muted">Texto secundario</p>
```

**E. Clase propia de la página o sección**

```html
<section class="hero">...</section>
<footer class="site-footer">...</footer>
```

### 2.3. ¿Cuándo pongo varias clases y cuándo una sola?

**Varias clases**, si realmente estás combinando responsabilidades independientes:

```html
<article class="card shadow-soft">...</article>
```

**Una clase de componente**, si ese comportamiento forma parte de **todas** las tarjetas:

```css
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
}
```

```html
<article class="card">...</article>
```

No necesitas añadir `flex-col` a 20 tarjetas si todas las `.card` tienen que ser verticales siempre. **DRY consiste en evitar duplicaciones de conocimiento, no en acumular clases en el HTML.**

### 2.4. ¿Cuándo crear una clase reutilizable?

Créala si se cumple alguno de estos casos:

- El mismo **patrón visual** se repite en distintas partes del proyecto.
- Quieres cambiarlo en un único lugar.
- Su nombre explica una función reconocible (`.container`, `.card`, `.grid-auto`).
- Quieres combinarla sin que dependa de una sección concreta.

Evita crear una clase compartida cuando dos elementos **coinciden de casualidad** pero podrían evolucionar de forma distinta. Por ejemplo, un hero y una tarjeta quizá estén centrados hoy, pero no tienen por qué compartir todos sus estilos para siempre.

### 2.5. Nombres de clases

Buenas opciones:

```css
.site-header { ... }  /* componente identificable */
.card { ... }         /* componente reutilizable */
.card__image { ... }  /* elemento dentro de card */
.card--featured { ... } /* variante de card */
.text-center { ... }  /* utilidad */
```

Evita nombres ambiguos como `.cosa1`, `.orden2`, `.bloqueazul` o `.grande` cuando no explican la intención. Es recomendable mantener un mismo estilo de escritura, como **kebab-case** (palabras separadas por guiones).

`.card__image` y `.card--featured` siguen una convención de nombres llamada **BEM** (*Block Element Modifier*):

- `.card`: bloque o componente.
- `.card__image`: elemento que pertenece al bloque.
- `.card--featured`: variación del bloque.

BEM es una **convención opcional**. No hace falta aplicarla a todo tu CSS.

### 2.6. ¿Importa el orden de las clases dentro del HTML?

```html
<article class="card shadow-soft">...</article>
<article class="shadow-soft card">...</article>
```

**En CSS normal, el orden de esos nombres dentro de `class` no decide quién gana.** Importan las reglas CSS aplicables, su origen, la cascada, la especificidad y el orden de declaración, entre otros factores. Puedes ordenar los nombres de forma consistente por legibilidad.

### 2.7. Clase frente a ID

- `class="card"`: reutilizable, puede aparecer muchas veces.
- `id="contacto"`: identificador único dentro de la página; muy útil para anclas `href="#contacto"` o JavaScript.

Aunque puedes aplicar CSS a `#contacto`, **suele ser más cómodo usar clases para estilos** y reservar IDs para identificar elementos concretos.

---

## 3. Cómo se escribe CSS: selectores, reglas y cascada

### 3.1. Anatomía de una regla

```css
.card {
  padding: 1rem;
  background-color: white;
}
```

- `.card`: **selector**; decide a qué elementos afecta.
- `padding`: **propiedad**.
- `1rem`: **valor**.
- `padding: 1rem;`: **declaración**.
- `{ ... }`: conjunto de declaraciones para ese selector.

Los comentarios CSS se escriben como `/* comentario */`.

### 3.2. Selectores habituales

| Selector | Significado |
|---|---|
| `p` | Todos los párrafos |
| `.card` | Elementos de clase `card` |
| `#contacto` | Elemento cuyo ID es `contacto` |
| `*` | Todos los elementos |
| `.card h3` | Todos los `h3` descendientes de `.card` |
| `.card > h3` | Los `h3` hijos directos de `.card` |
| `.card, .btn` | Ambos selectores |
| `.card.featured` | Elementos que tienen **las dos clases** |
| `a:hover` | Enlaces cuando se pasa el puntero |
| `input:focus` | Campo que recibe el foco |
| `::before` | Pseudoelemento anterior al contenido |
| `::after` | Pseudoelemento posterior al contenido |

### 3.3. ¿Por qué unas reglas sustituyen a otras?

Esto es la **cascada**. En los casos habituales, si dos reglas CSS normales afectan a la **misma propiedad del mismo elemento**, la especificidad y el orden del CSS ayudan a decidir cuál prevalece.

```css
.card { color: black; }
.card { color: green; } /* gana: mismo selector, aparece después */
```

Ejemplo con distinta especificidad:

```css
article { color: black; }
.card { color: green; } /* normalmente gana frente al selector de etiqueta */
```

Orientación para empezar: **selector de etiqueta < clase < ID** en especificidad; la cascada real incluye además origen, importancia (`!important`), capas y otras reglas. No uses `!important` para solucionar sistemáticamente conflictos: primero entiende qué selector está actuando.

### 3.4. Herencia

Algunas propiedades se heredan, por ejemplo `color`, `font-family` y normalmente `line-height`. Otras, como `padding`, `border` o `background-color`, **no se heredan** normalmente.

```css
body { font-family: system-ui; }
/* Los párrafos suelen recibir esa tipografía por herencia. */
```

**Error frecuente:** poner `background-color` en el selector universal `*` pinta **cada elemento**. Para el fondo general, lo lógico suele ser ponerlo en `body`.

---

## 4. Unidades CSS

### 4.1. `px` y `rem`

- `px`: unidad de píxel CSS; útil para bordes finos y detalles concretos.
- `rem`: relativa al `font-size` del elemento raíz (`html`).

**Normalmente** el tamaño inicial del navegador equivale a `16px`, por lo que:

| rem | Equivalencia si la raíz es 16px |
|---:|---:|
| `0.25rem` | `4px` |
| `0.5rem` | `8px` |
| `0.75rem` | `12px` |
| `1rem` | `16px` |
| `1.5rem` | `24px` |
| `2rem` | `32px` |
| `3rem` | `48px` |
| `4rem` | `64px` |

**Fórmula:** `píxeles = rem × tamaño de fuente raíz`.

```css
.card {
  padding: 1.5rem; /* equivale a 24px si la raíz es 16px */
  border: 1px solid #ddd;
}
```

Ventaja de `rem`: permite que el espaciado y la tipografía respondan a cambios en el tamaño de fuente raíz, incluidas determinadas preferencias de accesibilidad. **No implica por sí mismo** que algo cambie al pasar de ordenador a móvil.

**Buena práctica:** no fijar innecesariamente `html { font-size: 16px; }`; dejar el tamaño predeterminado permite respetar mejor la configuración de tamaño de texto del usuario.

### 4.2. `em`

- En `font-size`, `em` se calcula respecto al `font-size` del **padre**.
- En propiedades como `padding`, se calcula normalmente respecto al tamaño de fuente **del propio elemento**.

```css
.padre { font-size: 20px; }
.hijo { font-size: 1.5em; } /* 30px */
```

`em` es útil cuando quieres que alguna medida dependa del tamaño de letra de un componente. `rem` es más sencillo para una escala general.

### 4.3. Otras unidades esenciales

| Unidad | Qué representa | Uso frecuente |
|---|---|---|
| `%` | Proporción de una referencia, generalmente el contenedor | `width: 100%` |
| `vw` | 1 % de la anchura del viewport | Tamaños fluidos |
| `vh` | 1 % de la altura del viewport | Secciones a pantalla completa |
| `dvh` | Altura dinámica del viewport | Vistas móviles donde cambian barras del navegador |
| `fr` | Fracción del espacio disponible **en CSS Grid** | Columnas `1fr 2fr` |
| `ch` | Anchura aproximada del carácter `0` de la fuente | Limitar líneas de lectura |
| `auto` | El navegador determina el valor según la propiedad | `margin-inline: auto` |

```css
.hero { min-height: 70dvh; }
.prose { max-width: 65ch; }
.grid { grid-template-columns: 1fr 2fr; }
```

**Aviso:** no todas las propiedades interpretan los porcentajes del mismo modo. `width: 50%` y `height: 50%` no siempre se calculan igual; una altura porcentual suele necesitar una referencia de altura definida.

**¿Cuáles uso más?** Una buena base es: `rem` para tipografía y espaciado; `px` para bordes; `%` y `max-width` para anchuras; `fr` para Grid; `clamp()` para medidas fluidas.

---

# PARTE II. LA PLANTILLA, DE PRINCIPIO A FIN

## 5. Sección 1: `:root`, variables y sistema de diseño

### 5.1. ¿Qué es `:root`?

`:root` selecciona el elemento raíz del documento, que en HTML es `<html>`. Es un lugar habitual para declarar variables reutilizables, llamadas técnicamente **propiedades personalizadas**.

```css
:root {
  --color-primary: #265dc7;
  --space-4: 1rem;
}

.btn {
  background-color: var(--color-primary);
  padding: var(--space-4);
}
```

- **Declarar:** `--color-primary: #265dc7;`
- **Usar:** `var(--color-primary)`
- Una variable declarada **no pinta nada por sí sola**; tiene efecto cuando se utiliza en una propiedad real.

### 5.2. ¿Qué variables conviene declarar?

**Colores por función (no solo por tono):**

```css
:root {
  --color-primary: #265dc7;       /* Acciones y enlaces destacados */
  --color-primary-hover: #17489f; /* Interacción al pasar el puntero */
  --color-text: #202632;         /* Texto principal */
  --color-muted: #5a6473;        /* Texto secundario */
  --color-background: #ffffff;   /* Fondo principal */
  --color-surface: #f5f7fa;      /* Tarjetas y secciones */
  --color-border: #dce2ea;       /* Líneas y bordes */
  --color-focus: #17489f;        /* Resaltado de foco de teclado */
}
```

Los nombres indican el **papel** del color. `--color-primary` puede ser azul en una web y verde en otra sin cambiar las clases que lo consumen.

**Tipografía:**

```css
:root {
  --font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-body: 1rem;
  --font-title: clamp(2rem, 1.3rem + 3vw, 3.5rem);
}
```

`system-ui` utiliza una fuente apropiada del sistema. `clamp()` permite que un título se adapte al ancho dentro de límites (lo veremos en el capítulo 11).

**Escala de espaciado:**

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
}
```

En vez de inventar un `margin: 19px` o un `padding: 27px` cada vez, escoges valores de una escala coherente. No es una norma universal: se ajusta a cada diseño.

**Espaciados fluidos:**

```css
:root {
  --page-gutter: clamp(1rem, 3vw, 2rem);
  --section-space: clamp(2.5rem, 6vw, 5rem);
  --layout-gap: clamp(1rem, 2vw, 1.5rem);
}
```

- `--page-gutter`: aire lateral de la página.
- `--section-space`: separación entre grandes bloques.
- `--layout-gap`: espacio entre columnas, tarjetas o elementos.

**Anchuras, bordes y sombras:**

```css
:root {
  --container-max: 75rem;
  --content-max: 65ch;
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --border-standard: 1px solid var(--color-border);
  --shadow-soft: 0 4px 20px rgb(0 0 0 / 0.07);
}
```

- `--container-max`: máxima anchura del contenido general.
- `--content-max`: longitud de línea cómoda para leer párrafos.
- `--radius-*`: grados de redondeado coherentes.
- `--border-standard`: borde reutilizable.
- `--shadow-soft`: sombra sutil.

### 5.3. Variables locales y variantes

Las variables también pueden declararse dentro de una clase y utilizarse en ese elemento y sus descendientes.

```css
.grid-auto { --card-min: 16rem; }
.grid-auto--wide { --card-min: 20rem; }
```

```html
<div class="grid-auto grid-auto--wide">...</div>
```

El modificador cambia **solo el parámetro de tamaño**. No vuelve a escribir toda la definición de Grid.

### 5.4. Valores alternativos (*fallback*)

```css
.flex {
  gap: var(--gap, var(--space-4));
}
```

Se lee: «utiliza `--gap` si está disponible; si no, utiliza `--space-4`». Así se puede ajustar una instancia concreta:

```css
.gap-lg { --gap: var(--space-6); }
```

```html
<div class="flex gap-lg">...</div>
```

**Precisión importante:** esto funciona si la clase principal está programada para usar `var(--gap, ...)`. En la plantilla, `.flex`, `.flex-col`, `.flex-center`, `.flex-between`, `.cluster`, `.grid` y `.grid-auto` lo hacen. En cambio, `.grid-2` y `.grid-3` usan directamente `--layout-gap`; ponerles `.gap-lg` no cambiaría su separación sin adaptar esas reglas.

---

## 6. Sección 2: reset y estilos generales

### 6.1. ¿Por qué hay que hacer un reset?

Los navegadores aplican **estilos predeterminados**: `body` tiene margen, los títulos tienen tamaños, los enlaces tienen estilos, etc. Un *reset* o normalización pequeña nos ayuda a partir de un comportamiento más predecible.

No es necesario eliminar **todos** los estilos por defecto. En tu plantilla utilizamos un **reset suave**.

### 6.2. `box-sizing: border-box`

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

- `*`: todos los elementos.
- `*::before` y `*::after`: pseudoelementos generados por CSS.
- `border-box`: el `width`/`height` declarado incluye el **contenido, padding y borde** (no incluye el margen).

Sin `border-box`, un elemento con `width: 300px`, `padding: 20px` a cada lado y borde de `1px` terminaría ocupando **342px** de ancho exterior, sin contar márgenes. Con `border-box`, el ancho exterior es **300px**.

### 6.3. Estilos del documento

```css
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-family);
  font-size: var(--font-body);
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-background);
}
```

- `scroll-behavior: smooth`: desplazamiento suave hacia enlaces `#seccion`; se desactiva más adelante si el usuario prefiere menos movimiento.
- `margin: 0`: elimina el margen predeterminado del `body`.
- `min-height: 100vh`: intenta que el cuerpo tenga al menos la altura de la ventana.
- `line-height: 1.6`: interlineado proporcional sin unidad.
- `color` y `background-color`: colores generales.

**No pongas** `background-color` en `*` si solo quieres el fondo general. Eso daría fondo también a títulos, botones, párrafos, etc.

### 6.4. Imágenes y contenido multimedia

```css
img,
video,
svg {
  display: block;
  max-width: 100%;
}

img {
  height: auto;
}
```

- `max-width: 100%`: evita que un archivo multimedia sea más ancho que su contenedor.
- `height: auto`: conserva la proporción natural de la imagen cuando su ancho se adapta.
- `display: block`: elimina ciertas particularidades de los elementos en línea, como el espacio bajo la imagen debido a su alineación con el texto.

### 6.5. Formularios y títulos

```css
button,
input,
textarea,
select {
  font: inherit;
}

h1,
h2,
h3,
h4 {
  line-height: 1.2;
  text-wrap: balance;
}
```

- `font: inherit`: formularios y botones usan la tipografía heredada.
- `line-height: 1.2`: interlineado más compacto para títulos.
- `text-wrap: balance`: permite equilibrar mejor los saltos de línea de títulos; es una mejora visual, no una garantía sobre cada línea.

### 6.6. Legibilidad, enlaces y foco

```css
p { overflow-wrap: break-word; }
a { text-underline-offset: 0.15em; }

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

[id] {
  scroll-margin-top: var(--space-5);
}
```

- `overflow-wrap`: ayuda a romper palabras o URLs muy largas si no caben.
- `text-underline-offset`: separa ligeramente el subrayado del texto.
- `:focus-visible`: resalta el elemento durante la navegación mediante teclado.
- `scroll-margin-top`: deja espacio por arriba al navegar a un ID, útil especialmente con cabeceras fijas.

---

## 7. Modelo de caja: `margin`, `padding`, `border` y `gap`

Piensa en una tarjeta como en una caja dentro de otras cajas.

```text
┌───────────────────────────────────────┐
│                MARGIN                 │  ← distancia exterior
│   ┌───────────────────────────────┐   │
│   │            BORDER             │   │  ← contorno
│   │   ┌───────────────────────┐   │   │
│   │   │        PADDING        │   │   │  ← distancia interior
│   │   │   ┌───────────────┐   │   │   │
│   │   │   │   CONTENIDO   │   │   │   │
│   │   │   └───────────────┘   │   │   │
│   │   └───────────────────────┘   │   │
│   └───────────────────────────────┘   │
└───────────────────────────────────────┘
```

### 7.1. `margin` = espacio por fuera

```css
.card { margin: 1rem; }
```

Separa el elemento de otros elementos. `margin-inline: auto` es muy útil para **centrar horizontalmente un bloque con anchura limitada**.

### 7.2. `padding` = espacio por dentro

```css
.card { padding: 1.5rem; }
```

Separa el contenido del borde de su propia caja.

### 7.3. `border` = contorno

```css
.card {
  border: 1px solid #dddddd;
  border-radius: 0.75rem;
}
```

`border` puede alterar el tamaño final si no se usa `box-sizing: border-box`. `border-radius` redondea esquinas; no es un margen.

### 7.4. `gap` = separación entre hijos en Flex o Grid

```css
.contenedor {
  display: flex;
  gap: 1rem;
}
```

`gap` separa los **elementos hijos** del contenedor. No crea margen en el borde exterior del contenedor. También funciona en Grid y en diseños multicolumna.

### 7.5. Abreviaturas

```css
padding: 1rem;                 /* cuatro lados */
padding: 1rem 2rem;            /* arriba/abajo, derecha/izquierda */
padding: 1rem 2rem 3rem;       /* arriba, lados, abajo */
padding: 1rem 2rem 3rem 4rem;  /* arriba, derecha, abajo, izquierda */
```

Las abreviaturas de `margin` siguen el mismo orden.

### 7.6. Propiedades lógicas: recomendables

```css
.section { padding-block: 3rem; }  /* arriba y abajo en escritura horizontal */
.container { margin-inline: auto; } /* lados izquierdo y derecho en escritura horizontal */
```

`block` e `inline` tienen en cuenta la dirección de escritura. Son una alternativa moderna y flexible a `top/bottom/left/right` cuando la intención es trabajar por ejes.

### 7.7. ¿Cuándo usar cada una?

| Quiero... | Normalmente uso... |
|---|---|
| Aire dentro de la tarjeta | `padding` |
| Separar la tarjeta de otro bloque | `margin` o el `gap` del padre |
| Separación uniforme entre tarjetas | `gap` del Grid/Flex padre |
| Dibujar un contorno | `border` |
| Redondear esquinas | `border-radius` |
| Centrar un contenedor de ancho limitado | `margin-inline: auto` |

**Buena práctica:** cuando el padre ya tiene `display: grid` o `display: flex`, suele ser más sencillo controlar la separación de sus hijos con **`gap`** que dar márgenes diferentes a cada hijo. En bloques normales, recuerda que los márgenes verticales de ciertos elementos pueden colapsar; con Flex/Grid ese fenómeno no ocurre entre sus ítems.

---

## 8. Sección 3: contenedores, dimensiones y espaciado

### 8.1. La clase `.container`

```css
.container {
  width: min(
    var(--container-max),
    calc(100% - var(--page-gutter) - var(--page-gutter))
  );
  margin-inline: auto;
}
```

Se lee así:

1. **`100% - gutter - gutter`:** usa el espacio disponible dejando aire a ambos lados.
2. **`min()`**: nunca supera la anchura máxima definida en `--container-max`.
3. **`margin-inline: auto`:** centra el bloque horizontalmente cuando sobra espacio.

Esto evita que el contenido se extienda de borde a borde en una pantalla grande y que quede pegado a los bordes en un móvil.

### 8.2. Una versión más estrecha

```css
.container--narrow {
  --container-max: 48rem;
}
```

```html
<div class="container container--narrow">
  <p>Texto de lectura larga o formulario.</p>
</div>
```

El modificador cambia una variable que la clase base ya utiliza.

### 8.3. `.section`, `.section--muted` y `.prose`

```css
.section { padding-block: var(--section-space); }
.section--muted { background-color: var(--color-surface); }
.prose { max-width: var(--content-max); }
```

- `.section`: separación vertical generosa y coherente.
- `.section--muted`: variante de fondo suave.
- `.prose`: limita la anchura de un párrafo para mejorar su lectura.

```html
<section class="section section--muted">
  <div class="container">
    <h2>Sobre mí</h2>
    <p class="prose">Este texto no se hará interminablemente ancho.</p>
  </div>
</section>
```

### 8.4. Anchuras y límites

| Propiedad | Función |
|---|---|
| `width` | Anchura preferida o declarada |
| `max-width` | No superar una anchura |
| `min-width` | No bajar de una anchura |
| `height` | Altura declarada |
| `min-height` | Altura mínima, permite crecer si hace falta |
| `max-height` | Límite superior de altura |

**Regla práctica:** evita fijar alturas rígidas en tarjetas con texto variable. `min-height` suele ser más seguro que `height`, porque el contenido puede crecer.

### 8.5. Pequeñas utilidades de separación

```css
.p-sm { padding: var(--space-3); }
.p-md { padding: var(--space-4); }
.p-lg { padding: var(--space-6); }

.mt-md { margin-top: var(--space-4); }
.mt-lg { margin-top: var(--space-6); }
```

No hace falta crear 100 clases de margen. Empieza con unas pocas y úsalas donde realmente ayuden.

---

## 9. Sección 4: Flexbox

**Flexbox** organiza elementos principalmente en **un eje**: fila o columna. Es ideal para menús, botones, encabezados y grupos de elementos.

```css
.contenedor {
  display: flex;
}
```

### 9.1. Eje principal y eje transversal

```css
.fila {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
```

Con `flex-direction: row`:

- El **eje principal** es horizontal; `justify-content` distribuye sobre él.
- El **eje transversal** es vertical; `align-items` alinea sobre él.

Con `flex-direction: column`, **los ejes cambian**:

- `justify-content` actúa verticalmente.
- `align-items` actúa horizontalmente.

Este cambio es muy importante para entender por qué un contenedor puede centrar a sus hijos sin darles todo el ancho disponible.

### 9.2. Propiedades frecuentes

| Propiedad | Valores útiles | Qué hace |
|---|---|---|
| `display` | `flex` | Activa Flexbox |
| `flex-direction` | `row`, `column` | Dirección principal |
| `justify-content` | `center`, `space-between`, `flex-start` | Reparto en eje principal |
| `align-items` | `center`, `stretch`, `flex-start` | Alineación en eje transversal |
| `flex-wrap` | `wrap` | Permite salto a nueva línea |
| `gap` | `1rem`, etc. | Espacio entre hijos |
| `flex` (en hijo) | `1`, `1 1 16rem` | Crecimiento, reducción y base de tamaño |

### 9.3. Las clases que incluye tu plantilla

```css
.flex {
  display: flex;
  gap: var(--gap, var(--space-4));
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: var(--gap, var(--space-4));
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap, var(--space-4));
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap, var(--space-4));
}
```

No tienes que utilizar siempre todas estas clases. Por ejemplo, `.flex-center` está pensada para centrar elementos en ambos ejes, mientras que `.flex-between` resulta útil para una cabecera.

### 9.4. `flex-wrap` y `.cluster`

```css
.flex-wrap { flex-wrap: wrap; }

.cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap, var(--space-3));
}
```

Un *cluster* es un grupo de elementos (botones, etiquetas, enlaces) que permanece en una fila **mientras quepa** y salta a otra cuando no hay espacio.

```html
<div class="cluster">
  <a class="btn" href="#">Guardar</a>
  <a class="btn btn--outline" href="#">Cancelar</a>
</div>
```

### 9.5. La propiedad `flex` en los hijos

```css
.columna-principal { flex: 1 1 28rem; }
.barra-lateral { flex: 1 1 16rem; }
```

El formato abreviado es:

```text
flex: grow shrink basis;
```

- `grow`: cuánto puede crecer.
- `shrink`: si puede reducirse cuando falta espacio.
- `basis`: tamaño base para repartir el espacio.

Lo verás en la clase `.with-sidebar`.

### 9.6. Un error que ya has encontrado en prácticas

```css
.orden_columna {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Con dirección `column`, `align-items: center` **centra horizontalmente a los hijos**, pero no los estira para ocupar todo el ancho del padre. Si dentro colocas un Grid, ese Grid podría ser más estrecho de lo esperado.

Soluciones posibles según la intención:

```css
/* Opción 1: dejar que los hijos se estiren */
.contenedor { align-items: stretch; }

/* Opción 2: dar anchura al Grid */
.grid-auto { width: 100%; }
```

**No es que Flexbox y Grid no puedan combinarse**: pueden hacerlo perfectamente. Hay que tener en cuenta las dimensiones que recibe cada uno.

---

## 10. Sección 5: CSS Grid

**Grid** distribuye elementos en **filas y columnas**. Es especialmente cómodo para galerías, tarjetas y estructuras de página.

### 10.1. Una cuadrícula de tres columnas

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

- `display: grid`: activa Grid.
- `grid-template-columns`: define las columnas.
- `repeat(3, 1fr)`: tres columnas de igual fracción.
- `gap`: separación entre celdas.

**Problema:** tres columnas fijas quizá sean demasiado estrechas en un móvil.

### 10.2. Grid automático con `auto-fit`

La clase más interesante de tu plantilla es:

```css
.grid-auto {
  display: grid;
  gap: var(--gap, var(--layout-gap));
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--card-min, 16rem)), 1fr)
  );
}
```

Vamos por partes:

1. **`repeat(...)`:** repite un patrón de columnas.
2. **`auto-fit`:** crea tantas columnas como quepan y colapsa pistas vacías.
3. **`minmax(mínimo, máximo)`:** define hasta dónde puede encoger o crecer una columna.
4. **`min(100%, 16rem)`:** usa como mínimo 16rem cuando caben, pero permite una columna más estrecha si el contenedor es menor.
5. **`1fr`:** reparte el espacio disponible entre las columnas.
6. **`--card-min`:** permite cambiar el tamaño mínimo con otra clase.

```html
<div class="grid-auto">
  <article class="card">Tarjeta 1</article>
  <article class="card">Tarjeta 2</article>
  <article class="card">Tarjeta 3</article>
</div>
```

Dependiendo del ancho del **contenedor**, cabrán tres, dos o una. **No necesitas un `@media` para ese comportamiento.**

### 10.3. Variantes de Grid

```css
.grid-auto--compact { --card-min: 12rem; }
.grid-auto--wide { --card-min: 20rem; }
```

```html
<div class="grid-auto grid-auto--compact">...</div>
<div class="grid-auto grid-auto--wide">...</div>
```

- `compact`: mínimo más estrecho → pueden caber más tarjetas.
- `wide`: mínimo más ancho → caben menos tarjetas y cada una es más amplia.

### 10.4. `auto-fit` frente a `auto-fill`

Ambos calculan cuántas columnas caben. La diferencia relevante aparece cuando **hay menos elementos que espacio para columnas**:

- **`auto-fit`** colapsa las pistas vacías y deja que las ocupadas puedan crecer.
- **`auto-fill`** conserva pistas vacías reservadas.

Para tarjetas que deban aprovechar el ancho disponible, **`auto-fit` suele ser una buena opción**. Si no quieres que una tarjeta solitaria se haga enorme, puedes limitar el ancho de la tarjeta, de su contenedor o usar un patrón de Grid distinto.

### 10.5. Grid de columnas controladas

```css
.grid-2 {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--layout-gap);
}
```

Aquí comenzamos con **una sola columna**, y más adelante una media query activará dos. Es útil cuando quieres un diseño deliberado: «en escritorio siempre dos columnas».

Lo mismo ocurre con `.grid-3`: una columna de base, dos en tamaños intermedios y tres en pantallas amplias.

### 10.6. Una disposición con barra lateral

```css
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--layout-gap);
  align-items: flex-start;
}

.with-sidebar > :first-child {
  flex: 1 1 28rem;
  min-width: 0;
}

.with-sidebar > :last-child {
  flex: 1 1 16rem;
  min-width: 0;
}
```

Aunque está en la sección de Grid/layout de la plantilla, este patrón está implementado con **Flexbox**. Reparte contenido y barra lateral; si no caben, permite que se apilen.

```html
<div class="with-sidebar">
  <main>Contenido principal</main>
  <aside>Información complementaria</aside>
</div>
```

**Nota semántica:** usa `<main>` solo si esa región es verdaderamente el contenido principal de la página; normalmente hay uno por documento. Dentro de una sección puedes utilizar, por ejemplo, `<div>` o `<article>` como bloque principal y `<aside>` como complemento.

### 10.7. ¿Flexbox o Grid?

| Situación | Elección habitual |
|---|---|
| Menú horizontal | Flexbox |
| Botones que saltan de línea | Flexbox con `wrap` |
| Centrar un elemento | Flexbox o Grid |
| Galería de tarjetas | Grid |
| Mosaico de columnas y filas | Grid |
| Cabecera: logo a un lado, menú al otro | Flexbox |
| Formulario: varias columnas alineadas | Grid o Flexbox, según necesidad |

**Regla aproximada:** Flexbox para un eje; Grid para filas y columnas. No es una prohibición: se combinan constantemente.

---

## 11. Tamaños fluidos: `min()`, `max()`, `clamp()`, `minmax()` y `auto-fit`

### 11.1. `min()`

Elige el **menor** de los valores.

```css
.container { width: min(100% - 2rem, 75rem); }
```

El contenedor cabe en pantallas pequeñas y tiene un máximo en pantallas grandes.

### 11.2. `max()`

Elige el **mayor**.

```css
.bloque { padding-inline: max(1rem, 2vw); }
```

Garantiza un mínimo de espacio lateral.

### 11.3. `clamp(mínimo, preferido, máximo)`

Mantiene un valor dentro de un intervalo.

```css
h1 { font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem); }
```

- Nunca baja de `2rem`.
- Intenta usar una expresión fluida (`1.2rem + 3vw`).
- Nunca sube de `3.5rem`.

Sirve para **títulos, padding, gap y espaciado entre secciones**. No resuelve automáticamente todos los problemas de diseño.

### 11.4. `minmax()`

Se utiliza para establecer rangos de tamaño en **pistas de Grid**.

```css
.grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

En esta forma, permite tres columnas que pueden reducirse hasta 0 en lugar de conservar el ancho mínimo automático impuesto por algunos contenidos.

### 11.5. `calc()`

Realiza operaciones con medidas:

```css
.contenedor { width: calc(100% - 2rem); }
```

También puedes utilizar expresiones matemáticas compatibles dentro de `min()`, `max()` y `clamp()`.

### 11.6. ¿Una web es responsive solo por usar estas funciones?

**No.** Ayudan a crear tamaños fluidos, pero una web responsive también requiere:

- Un HTML bien estructurado.
- Layouts que puedan reorganizarse.
- Texto e imágenes que no se desborden.
- Controles utilizables en móvil.
- Media queries cuando hay que cambiar la disposición.
- Pruebas reales en diferentes anchos, con zoom y con contenido largo.

---

## 12. Sección 6: componentes reutilizables

Un componente es una pieza de interfaz con un objetivo claro: **tarjeta, botón, campo de formulario, navegación**. No necesitas React para pensar así; puedes empezar con HTML y CSS.

### 12.1. Tarjetas

```css
.card {
  padding: clamp(1rem, 2vw, 1.5rem);
  background-color: var(--color-surface);
  border: var(--border-standard);
  border-radius: var(--radius-md);
  min-width: 0;
}
```

- `padding` fluido: crece dentro de límites.
- Variables: apariencia coherente.
- `min-width: 0`: ayuda a evitar que un ítem flexible conserve un mínimo de contenido que desborde su celda (no arregla por sí solo cualquier desbordamiento).

### 12.2. Imagen de la tarjeta

```css
.card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
```

Permite imágenes con **proporciones visuales consistentes**. `object-fit: cover` recorta si hace falta, pero no estira ni deforma la foto.

### 12.3. Botón base

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: var(--space-3) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
```

¿Por qué `inline-flex`? El botón puede comportarse como elemento en línea respecto al contenido exterior y, a la vez, alinear internamente icono y texto mediante Flexbox.

**Un enlace puede tener apariencia de botón**, pero semánticamente sigue siendo un enlace: usa `<a>` para **navegar** y `<button>` para **ejecutar una acción**.

### 12.4. Variantes con modificadores

```css
.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
```

```html
<a href="/proyectos" class="btn">Ver proyectos</a>
<a href="/contacto" class="btn btn--outline">Contactar</a>
```

**No repites** los paddings, dimensiones y alineaciones del botón principal: solo cambias lo necesario.

### 12.5. Campos de formulario

```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input {
  width: 100%;
  min-height: 2.75rem;
  padding: var(--space-3) var(--space-4);
  border: var(--border-standard);
  border-radius: var(--radius-sm);
  background-color: var(--color-background);
  color: var(--color-text);
}
```

```html
<div class="field">
  <label for="email">Correo electrónico</label>
  <input class="input" id="email" name="email" type="email" required>
</div>
```

`for="email"` y `id="email"` relacionan la etiqueta con el campo. Esto es importante para accesibilidad y usabilidad.

### 12.6. Navegación

```css
.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}
```

```html
<nav aria-label="Navegación principal">
  <ul class="nav-list">
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#proyectos">Proyectos</a></li>
  </ul>
</nav>
```

No elimines las viñetas de **todas** las listas por defecto. Una lista de contenido debe seguir siendo una lista; solo la navegación necesita este tratamiento especial.

---

## 13. Sección 7: clases de utilidad

Las utilidades son pequeñas clases de propósito único o muy delimitado.

```css
.text-center { text-align: center; }
.text-muted { color: var(--color-muted); }
.full-width { width: 100%; }
.rounded { border-radius: var(--radius-md); }
.border { border: var(--border-standard); }
.shadow-soft { box-shadow: var(--shadow-soft); }
```

Ejemplos:

```html
<h2 class="text-center">Mis proyectos</h2>
<p class="text-muted">Última actualización...</p>
<article class="card shadow-soft">...</article>
```

**Cuándo sí:** un ajuste breve, independiente y repetido.  
**Cuándo no:** si necesitas doce utilidades en cada elemento o una combinación difícil de entender, quizá sea más claro crear una clase de componente.

### La utilidad `.sr-only`

```css
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
```

Oculta el contenido visualmente, pero lo mantiene disponible para determinadas tecnologías de asistencia. Úsala con intención (por ejemplo, un texto descriptivo para un icono) y **no** como técnica general para esconder cualquier contenido.

---

## 14. Sección 8: `@media` y responsive (*mobile first*)

### 14.1. ¿Qué es una media query?

Una **media query** es una condición: «aplica estas reglas si se cumple lo siguiente».

```css
/* Estilo base: móviles y ventanas estrechas */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
}

/* Cuando el viewport tenga, al menos, 48rem de ancho */
@media (min-width: 48rem) {
  .grid-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

**No cambia el HTML**, cambia qué reglas CSS se aplican bajo una condición.

### 14.2. Qué significan `min-width` y `max-width`

- `@media (min-width: 48rem)`: desde ese ancho **hacia arriba**.
- `@media (max-width: 30rem)`: hasta ese ancho **inclusive**.

**Detalle técnico:** en media queries, las unidades `em` y `rem` se evalúan respecto a un tamaño de fuente inicial, no según las modificaciones que hagas a `font-size` del elemento `html`. Por eso no debes interpretar siempre `48rem` como 768 píxeles exactos para todas las configuraciones de usuario.

### 14.3. ¿Qué es *mobile first*?

Primero escribes una versión que funcione en tamaños reducidos y, después, añades capacidades para ventanas más amplias.

```css
/* Pequeño: una columna */
.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
}

/* Mediano: dos columnas */
@media (min-width: 48rem) {
  .grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Grande: tres columnas */
@media (min-width: 64rem) {
  .grid-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

¿Por qué suele funcionar bien? Porque resulta fácil empezar con la versión esencial y añadir espacio y columnas cuando realmente caben.

### 14.4. Puntos de ruptura (*breakpoints*)

**No hay breakpoints obligatorios para «móvil», «tablet» y «ordenador».** Elige el punto donde **tu contenido deja de funcionar bien**.

Una manera de encontrarlos:

1. Diseña la versión pequeña.
2. Ensancha lentamente la ventana.
3. Observa dónde el contenido empieza a disponer de demasiado espacio o dónde una nueva columna cabría bien.
4. Añade un breakpoint si hace falta.

### 14.5. `auto-fit` o `@media`: ¿cuándo usar cada uno?

| Problema | Solución frecuente |
|---|---|
| «Quiero tantas tarjetas por fila como quepan» | `Grid` + `auto-fit` |
| «Quiero dos columnas exactamente a partir de cierto ancho» | `@media` + `Grid` |
| «Quiero que los botones salten a otra línea» | `flex-wrap` |
| «Quiero que el título crezca progresivamente» | `clamp()` |
| «Quiero que el menú cambie de estructura» | `@media` y, si hace falta, JavaScript accesible |

### 14.6. La clase `.btn--full-mobile`

```css
@media (max-width: 30rem) {
  .btn--full-mobile {
    width: 100%;
  }
}
```

```html
<a class="btn btn--full-mobile" href="#contacto">Contactar</a>
```

Solo ese botón se hace de ancho completo en una pantalla estrecha. Los demás `.btn` no cambian necesariamente.

### 14.7. No confundas viewport con contenedor

`@media` de anchura normalmente observa el **viewport**, mientras que el Grid con `auto-fit` calcula el espacio disponible **dentro de su contenedor**. Si una cuadrícula vive dentro de una barra lateral estrecha, quizá quepa una sola tarjeta aunque la pantalla global sea grande.

Más adelante puedes investigar `@container`: permite crear estilos condicionados al tamaño del propio contenedor. No hace falta dominarlo para estas primeras prácticas.

### 14.8. Cómo probar el responsive

En Chrome/Edge:

1. Abre la web.
2. Pulsa **F12**.
3. Activa el icono de móvil/tablet (modo de dispositivo).
4. Modifica la anchura o arrastra la ventana gradualmente.
5. Revisa que el texto no se corte, los botones se puedan usar y las tarjetas se recoloquen.

No pruebes **solo** 375px, 768px y 1440px. Comprueba también tamaños intermedios, zoom aumentado, texto largo e imágenes de distintas proporciones.

---

## 15. Sección 9: accesibilidad

La accesibilidad significa que la web pueda utilizarse por personas con distintas capacidades, dispositivos y preferencias.

### 15.1. Foco visible

```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

Al navegar con **Tab**, debe quedar claro qué enlace o botón tiene el foco. Evita `outline: none` si no aportas un sustituto visible.

### 15.2. Preferencia de movimiento reducido

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .btn { transition: none; }
}
```

Esta media query **no observa el tamaño de pantalla**. Consulta si la persona ha pedido reducir el movimiento en sus preferencias del sistema.

### 15.3. Más buenas prácticas

- Contraste suficiente entre texto y fondo.
- Texto no demasiado pequeño; permitir el zoom.
- Etiquetas `label` asociadas a los formularios.
- Texto alternativo `alt` que describa imágenes informativas; para una imagen decorativa se puede usar `alt=""`.
- No depender solo del color para indicar errores o estados.
- Botones y enlaces con tamaños y espacios cómodos para interacción táctil.
- Preferir HTML semántico antes que reproducir a mano comportamientos de controles nativos.

---

## 16. Sección 10: estilos específicos y organización profesional

La plantilla deja al final un espacio para las reglas que **solo pertenecen a ese proyecto**.

```css
/* ==================================================
   10. ESTILOS ESPECÍFICOS
   ================================================== */

.site-header { ... }
.hero { ... }
.projects-section { ... }
.contact-section { ... }
.site-footer { ... }
```

### 16.1. ¿El CSS debe seguir el orden del HTML?

**Puede seguirlo en los estilos específicos**, y esa sigue siendo una manera clara de orientarse. Para proyectos pequeños, un único CSS ordenado por secciones resulta perfectamente válido.

Cuando el código crece, suele funcionar mejor:

1. Variables.
2. Reset/base.
3. Layout y contenedores.
4. Componentes reutilizables.
5. Utilidades.
6. Estilos específicos (estos sí pueden seguir el orden del HTML).
7. Adaptaciones responsive (o media queries junto a cada componente, si el equipo lo prefiere).

**No existe una única organización «oficial».** Elige una convención y mantenla.

### 16.2. ¿Un solo archivo o varios?

**Al empezar:** `style.css` con comentarios por secciones.  
**Cuando el proyecto crezca:** separar puede ayudar.

```text
proyecto/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── pages.css
└── img/
```

No dividas en cinco archivos una página muy pequeña solo por aparentar profesionalidad. El objetivo es facilitar el mantenimiento.

---

# PARTE III. HERRAMIENTAS QUE TAMBIÉN DEBES CONOCER

## 17. Selectores anidados y `&` (*CSS Nesting*)

### 17.1. CSS tradicional

```css
.card { background: white; }
.card h3 { color: green; }
.card:hover { box-shadow: 0 2px 10px #0002; }
```

### 17.2. CSS moderno anidado

```css
.card {
  background: white;

  h3 {
    color: green;
  }

  &:hover {
    box-shadow: 0 2px 10px #0002;
  }
}
```

El anidamiento CSS es **nativo en navegadores modernos**. Antes se asociaba especialmente a preprocesadores como Sass/SCSS. Puedes utilizar ambos estilos, el tradicional y el anidado, según la claridad que aporten.

### 17.3. ¿Qué significa `&`?

`&` se refiere al selector de la regla externa, combinado según las normas de anidamiento.

```css
.btn {
  &:hover { ... }         /* .btn:hover */
  &:focus-visible { ... } /* .btn:focus-visible */
  &.activo { ... }        /* .btn.activo */
  & > span { ... }        /* span hijo directo de .btn */
}
```

Si escribes `h3 { ... }` anidado dentro de `.card`, seleccionas los `h3` descendientes sin necesidad de `&`.

**Importante:** evita anidar cuatro o cinco niveles sin necesidad; puede crear selectores difíciles de modificar. Anidar no siempre es mejor que escribir una regla independiente.

---

## 18. Tipografía, colores, fondos, bordes y sombras

### 18.1. Tipografía

```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: clamp(2rem, 1rem + 3vw, 3.5rem);
  line-height: 1.1;
}

.prose {
  max-width: 65ch;
}
```

- `font-family`: familia tipográfica.
- `font-size`: tamaño.
- `font-weight`: grosor (`400`, `600`, `700`...).
- `line-height`: distancia vertical entre líneas.
- `letter-spacing`: separación adicional entre letras.
- `text-align`: alineación (`left`, `center`...).
- `max-width: 65ch`: referencia útil para no crear párrafos demasiado anchos.

Evita justificar automáticamente todo el texto de una web, porque puede generar espacios irregulares, especialmente en pantallas estrechas. Para párrafos generales, la alineación de inicio suele ser una base cómoda.

### 18.2. Colores

```css
color: #222222;                    /* texto */
background-color: #ffffff;         /* fondo */
border-color: rgb(0 0 0 / 0.15);   /* borde con transparencia */
```

Puedes utilizar nombres, hexadecimal, `rgb()`, `hsl()` y otros espacios de color CSS modernos. En un proyecto, intenta centralizar los colores importantes en variables.

### 18.3. Fondos

```css
.hero {
  background-image: linear-gradient(
      rgb(0 0 0 / 0.55),
      rgb(0 0 0 / 0.55)
    ), url("imagen.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
```

Se pueden **superponer capas** de fondo: el degradado oscurece la fotografía para mejorar el contraste del texto.

### 18.4. Sombras

```css
.card {
  box-shadow: 0 4px 20px rgb(0 0 0 / 0.07);
}
```

Los valores principales son desplazamiento horizontal, desplazamiento vertical, desenfoque y color (pueden existir otros parámetros). Usa sombras discretas si quieres un estilo sobrio.

---

## 19. Imágenes, `aspect-ratio` y `object-fit`

### 19.1. Imágenes adaptables

```css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

Evita que las imágenes se salgan de sus contenedores en la mayoría de situaciones habituales.

### 19.2. Imagen de tarjeta con proporción consistente

```css
.card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
```

- `aspect-ratio`: relación entre ancho y alto.
- `object-fit: cover`: llena el espacio recortando lo necesario.
- `object-fit: contain`: muestra el archivo entero; puede dejar espacio vacío.

### 19.3. Imágenes semánticas frente a fondos

- Usa `<img>` cuando la imagen **sea contenido** (fotografía de producto, captura de proyecto).
- Usa `background-image` para imágenes **decorativas** de un bloque.
- Utiliza `alt` apropiado en imágenes informativas.
- Cuando sea útil, añade `loading="lazy"` a imágenes fuera de la zona inicial visible; no lo apliques automáticamente a imágenes críticas como la principal de portada.

---

## 20. `position`, `z-index`, `overflow` y elementos ocultos

### 20.1. `position`

| Valor | Comportamiento básico |
|---|---|
| `static` | Flujo normal; valor predeterminado |
| `relative` | Sigue ocupando su espacio y puede desplazarse respecto a su posición normal |
| `absolute` | Se posiciona respecto al bloque contenedor apropiado, a menudo un ancestro posicionado |
| `fixed` | Normalmente se fija respecto al viewport |
| `sticky` | Se desplaza normalmente hasta alcanzar el umbral indicado y entonces se adhiere dentro de sus límites |

```css
.card { position: relative; }
.card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
```

Aquí el distintivo queda situado respecto a la tarjeta.

### 20.2. `z-index`

```css
.menu {
  position: relative;
  z-index: 10;
}
```

Controla el apilamiento **dentro de las reglas de los contextos de apilamiento**. Poner un `z-index` enorme no siempre soluciona que algo aparezca detrás: algunos elementos crean contextos independientes.

### 20.3. `overflow`

```css
.contenedor { overflow: hidden; }
.tabla-ancha { overflow-x: auto; }
```

- `hidden`: recorta el contenido que sobresale.
- `auto`: permite desplazamiento cuando hace falta.

Evita ocultar desbordamientos simplemente para tapar un fallo: primero averigua qué elemento es demasiado ancho.

### 20.4. Formas de ocultar un elemento

- `display: none`: no ocupa espacio; normalmente se elimina también del árbol de accesibilidad.
- `visibility: hidden`: conserva su espacio, pero queda oculto.
- `opacity: 0`: es transparente, pero puede seguir ocupando espacio y participando en interacciones o foco si no se controla.
- `.sr-only`: permanece accesible para tecnologías de asistencia aunque no se vea.

No son intercambiables.

---

## 21. Pseudoclases, transiciones y animaciones

### 21.1. Estados habituales

```css
.btn:hover { ... }          /* puntero encima */
.btn:active { ... }         /* activación */
.btn:focus-visible { ... }  /* foco visible */
.btn:disabled { ... }       /* botón deshabilitado */
```

`hover` es una **mejora**, no el único modo de descubrir información: los dispositivos táctiles no siempre tienen un hover equivalente.

### 21.2. Transiciones

```css
.btn {
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #17489f;
}
```

- Propiedad que cambia: `background-color`.
- Duración: `0.2s`.
- Curva de velocidad: `ease`.

### 21.3. Transformaciones

```css
.card:hover {
  transform: translateY(-3px);
}
```

`transform` permite mover, rotar o escalar sin cambiar el flujo normal del documento. Evita efectos exagerados que dificulten la lectura o interacción.

### 21.4. Animaciones con `@keyframes` (nivel siguiente)

```css
@keyframes aparecer {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.elemento {
  animation: aparecer 0.4s ease both;
}
```

No necesitas dominar animaciones avanzadas en las primeras prácticas. Cuando las uses, respeta `prefers-reduced-motion`.

---

## 22. Formularios y estados interactivos

### 22.1. No todos los elementos son botones

```html
<a href="/contacto" class="btn">Ir a contacto</a>
<button type="submit" class="btn">Enviar formulario</button>
```

- `<a>`: navegación a un destino.
- `<button>`: ejecuta una acción.

### 22.2. Etiquetas y validación nativa

```html
<form>
  <div class="field">
    <label for="correo">Correo</label>
    <input
      class="input"
      id="correo"
      name="correo"
      type="email"
      autocomplete="email"
      required
    >
  </div>
  <button class="btn" type="submit">Enviar</button>
</form>
```

No sustituyas un `label` por un `placeholder`: el texto de ayuda desaparece al escribir y no cumple siempre la misma función.

### 22.3. Estados visuales

```css
.input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

Los mensajes de error deben ser comprensibles también en texto. Puedes aprender después `:invalid`, `:user-invalid` y reglas de validación más elaboradas.

---

# PARTE IV. APLICACIÓN Y CONSULTA

## 23. Construir una página pequeña: HTML y CSS explicados

Vamos a montar una estructura que puedas reutilizar en un portfolio, una web de servicios o una práctica.

### 23.1. Estructura de archivos

```text
mi-proyecto/
├── index.html
├── style.css
└── GUIA_CSS_RESPONSIVE.md
```

> Si quieres usar directamente la plantilla anterior, nombra el CSS `plantilla_css_responsive.css` y cambia el `href` del HTML a ese nombre. Esta guía funciona con ambas opciones.

### 23.2. HTML

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mis proyectos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="container flex-between">
      <a href="#inicio">Mi sitio</a>
      <nav aria-label="Navegación principal">
        <ul class="nav-list">
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="inicio">
    <section class="hero section">
      <div class="container">
        <h1>Diseño y desarrollo web</h1>
        <p class="prose">Una descripción clara de lo que hago.</p>
        <a class="btn" href="#proyectos">Ver proyectos</a>
      </div>
    </section>

    <section class="section" id="proyectos">
      <div class="container">
        <h2>Proyectos</h2>
        <div class="grid-auto">
          <article class="card">
            <h3>Proyecto 1</h3>
            <p>Descripción breve.</p>
            <a class="btn btn--outline" href="#contacto">Saber más</a>
          </article>
          <article class="card">
            <h3>Proyecto 2</h3>
            <p>Descripción breve.</p>
            <a class="btn btn--outline" href="#contacto">Saber más</a>
          </article>
          <article class="card">
            <h3>Proyecto 3</h3>
            <p>Descripción breve.</p>
            <a class="btn btn--outline" href="#contacto">Saber más</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--muted" id="contacto">
      <div class="container container--narrow">
        <h2>Contacto</h2>
        <p class="prose">Puedes escribirme aquí.</p>
        <a class="btn" href="mailto:hola@ejemplo.com">Enviar correo</a>
      </div>
    </section>
  </main>

  <footer class="site-footer section">
    <div class="container">
      <p class="text-muted">Página de ejemplo.</p>
    </div>
  </footer>
</body>
</html>
```

### 23.3. ¿Por qué se ha puesto cada clase?

| Elemento | Clase | Motivo |
|---|---|---|
| `<header>` | `.site-header` | Identificar la cabecera y darle reglas propias |
| `<div>` de cabecera | `.container` | Limitar el ancho general |
| Mismo `<div>` | `.flex-between` | Separar logo y navegación |
| `<ul>` | `.nav-list` | Dar distribución horizontal a la lista |
| `<section>` de presentación | `.hero` | Estilos exclusivos de la portada |
| Misma `<section>` | `.section` | Espaciado vertical compartido |
| `<p>` introductorio | `.prose` | Limitar longitud de línea |
| `<div>` de proyectos | `.grid-auto` | Recolocar tarjetas según anchura |
| Cada `<article>` | `.card` | Apariencia reutilizable |
| Enlaces de las tarjetas | `.btn btn--outline` | Botón base + variante |
| Sección de contacto | `.section--muted` | Fondo alternativo |
| Contenedor de contacto | `.container--narrow` | Limitar más el ancho |
| Párrafo del footer | `.text-muted` | Texto secundario |

**Punto clave:** el HTML no necesita una clase para cada etiqueta. Ponla **solo cuando tengas una razón visual o funcional para ello**.

### 23.4. CSS específico añadido sobre la plantilla

```css
.site-header {
  padding-block: var(--space-4);
  border-bottom: var(--border-standard);
}

.hero {
  background-color: var(--color-surface);
}

.hero h1 {
  max-width: 20ch;
}

.site-footer {
  border-top: var(--border-standard);
}
```

El resto de las clases (`.container`, `.grid-auto`, `.card`, `.btn`...) **ya existirían en tu CSS base**. Esa es la ventaja de reutilizar.

---

## 24. Depuración: por qué una clase «no funciona»

Es normal que CSS parezca misterioso al principio. Sigue siempre este orden.

### 24.1. Comprueba que el CSS esté enlazado

```html
<link rel="stylesheet" href="style.css">
```

Si el archivo se llama `plantilla_css_responsive.css`, `href="style.css"` no lo encontrará.

### 24.2. Comprueba el nombre exacto

```html
<div class="columna_responsive">...</div>
```

```css
.columna-responsive { ... } /* NO coincide: guion ≠ guion bajo */
```

Las clases deben coincidir exactamente.

### 24.3. ¿La clase está en el padre correcto?

```html
<div class="grid-auto">
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

El padre organiza; los hijos reciben apariencia. Un `display: grid` en cada tarjeta **no crea automáticamente** una cuadrícula de tarjetas entre sí.

### 24.4. ¿El padre limita el ancho?

```css
.padre {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Si el Grid queda pequeño, inspecciona el ancho calculado del padre y del propio Grid. A veces el problema no es `auto-fit`, sino el espacio que está recibiendo la cuadrícula.

### 24.5. ¿Otra regla está ganando?

En **F12 → Elements/Elementos → Styles/Estilos** puedes ver reglas aplicadas y tachadas. En la pestaña **Computed/Calculado** puedes comprobar el tamaño y los valores finales.

### 24.6. ¿El contenido es demasiado ancho?

Posibles causas:

- Imagen sin límite de anchura.
- Palabra o URL demasiado larga.
- `min-width` demasiado grande.
- Columnas fijas que no caben.
- Padding/borde sumándose porque falta `border-box`.
- Ancho fijo en un hijo.

**Evita** solucionar todo con `overflow-x: hidden`: eso a menudo oculta el síntoma sin resolver el problema.

### 24.7. Método de depuración rápido

1. Comprueba el `href` del CSS.
2. Comprueba que la clase del HTML existe.
3. Localiza qué elemento debería recibir la propiedad.
4. Inspecciona la regla en F12.
5. Mira sus dimensiones y las de su padre.
6. Comprueba si otra regla sobrescribe el valor.
7. Modifica **una sola cosa** y vuelve a probar.

---

## 25. Chuleta rápida de propiedades y clases

### 25.1. Qué propiedad buscar según tu objetivo

| Quiero conseguir... | Lo primero que probaría |
|---|---|
| Separar contenido del borde | `padding` |
| Separar dos bloques | `margin` o `gap` |
| Centrar texto | `text-align: center` |
| Centrar un contenedor con ancho máximo | `margin-inline: auto` |
| Alinear elementos en una fila | `display: flex` |
| Apilar elementos verticalmente | `flex-direction: column` |
| Separar dos extremos | `justify-content: space-between` |
| Permitir salto de línea en Flex | `flex-wrap: wrap` |
| Centrar en ambos ejes | `display: flex; justify-content: center; align-items: center` |
| Crear una cuadrícula | `display: grid` |
| Tarjetas que se recolocan solas | `repeat(auto-fit, minmax(...))` |
| Dar el mismo ancho a columnas | `repeat(3, 1fr)` |
| Crear tamaño adaptable con límites | `clamp()` |
| Limitar un elemento | `max-width` |
| No dejar que una imagen desborde | `max-width: 100%; height: auto` |
| Recortar una imagen sin deformarla | `object-fit: cover` |
| Cambiar layout a partir de una anchura | `@media (min-width: ...)` |
| Cambiar estilo en hover | `:hover` o `&:hover` |
| Dar foco visible | `:focus-visible` |
| Usar un color o medida global | `var(--variable)` |

### 25.2. Qué clase de tu plantilla elegir

| Clase | Para qué la usaría |
|---|---|
| `.container` | Contenido centrado con anchura máxima |
| `.container--narrow` | Contenedor más estrecho; combinar con `.container` |
| `.section` | Espaciado vertical de secciones |
| `.section--muted` | Fondo alternativo |
| `.prose` | Texto con anchura de lectura |
| `.flex` | Fila flexible |
| `.flex-col` | Columna flexible |
| `.flex-center` | Centrar hijos |
| `.flex-between` | Distribuir hijos hacia extremos y permitir salto |
| `.flex-wrap` | Permitir salto en un Flex existente |
| `.cluster` | Grupo de botones/enlaces adaptable |
| `.gap-sm`, `.gap-lg` | Ajustar `--gap` en layouts que lo consumen |
| `.grid` | Activar cuadrícula y añadir columnas propias |
| `.grid-auto` | Tarjetas con número automático de columnas |
| `.grid-auto--compact` | Tarjetas más estrechas; combinar con `.grid-auto` |
| `.grid-auto--wide` | Tarjetas más anchas; combinar con `.grid-auto` |
| `.grid-2` | Una o dos columnas según media query |
| `.grid-3` | Una, dos o tres columnas según media query |
| `.with-sidebar` | Contenido + barra lateral flexible |
| `.card` | Apariencia de tarjeta |
| `.card__image` | Foto de proporción consistente |
| `.btn` | Botón/enlace de acción con apariencia base |
| `.btn--outline` | Variante de botón; combinar con `.btn` |
| `.btn--full-mobile` | Botón ancho completo en ventana pequeña |
| `.field` | Etiqueta + campo apilados |
| `.input` | Estilo de campo de formulario |
| `.nav-list` | Lista de navegación horizontal |
| `.text-center` | Centrar texto |
| `.text-muted` | Texto secundario |
| `.full-width` | Anchura 100 % |
| `.rounded` | Bordes redondeados |
| `.border` | Borde estándar |
| `.shadow-soft` | Sombra suave |
| `.sr-only` | Ocultar visualmente manteniendo texto accesible |

### 25.3. Combinaciones prácticas

```html
<!-- Fila de cabecera -->
<div class="container flex-between">...</div>

<!-- Listado de tarjetas -->
<div class="grid-auto">...
  <article class="card">...</article>
</div>

<!-- Tarjetas de mayor ancho mínimo -->
<div class="grid-auto grid-auto--wide">...</div>

<!-- Dos columnas deliberadas en pantallas amplias -->
<div class="grid-2">...</div>

<!-- Botones que se recolocan -->
<div class="cluster">
  <button class="btn">Guardar</button>
  <button class="btn btn--outline">Cancelar</button>
</div>

<!-- Sección con fondo alternativo y contenido centrado -->
<section class="section section--muted">
  <div class="container">...</div>
</section>
```

---

## 26. Lista de comprobación para cualquier proyecto

### HTML

- [ ] El archivo comienza con `<!doctype html>`.
- [ ] El `lang` corresponde al idioma real (`es` cuando es español).
- [ ] He incluido `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [ ] El CSS está correctamente enlazado.
- [ ] He usado etiquetas semánticas donde corresponde y `div` cuando solo necesito agrupar.
- [ ] Las imágenes informativas tienen un `alt` útil.
- [ ] Los botones son botones y los enlaces sirven para navegar.
- [ ] Los formularios tienen `label` asociado.

### CSS y diseño

- [ ] Tengo `box-sizing: border-box` y una base razonable.
- [ ] Los valores repetidos importantes están en variables.
- [ ] Uso una escala de espaciados coherente.
- [ ] Los contenedores no se vuelven excesivamente anchos.
- [ ] No he puesto clases por poner: cada una tiene un propósito.
- [ ] Sé qué elementos distribuye el padre y cuáles reciben apariencia como hijos.
- [ ] He utilizado Grid/Flex según la necesidad.
- [ ] He preferido tamaños flexibles cuando tiene sentido.
- [ ] He revisado que no se desborde nada horizontalmente.
- [ ] El texto se puede leer y el contraste es adecuado.
- [ ] La navegación por teclado deja ver el foco.
- [ ] Respeto la preferencia de movimiento reducido cuando hay efectos.

### Responsive

- [ ] He probado la web en una ventana estrecha.
- [ ] He ampliado gradualmente para detectar puntos conflictivos.
- [ ] Los botones y campos no quedan demasiado pequeños.
- [ ] Las tarjetas se recolocan como quería.
- [ ] He comprobado títulos largos y contenido de diferente longitud.
- [ ] Sé por qué he utilizado cada `@media`.

### Mantenimiento

- [ ] Los nombres de clases son claros y consistentes.
- [ ] No hay reglas repetidas innecesariamente.
- [ ] El CSS está agrupado por responsabilidades.
- [ ] No uso `!important` para tapar errores sin entenderlos.
- [ ] Puedo encontrar rápidamente los estilos de cada componente.

---

## 27. Ejercicios progresivos y glosario

### Ejercicio 1. Variables

Crea una tarjeta y un botón. Declara tres colores, dos espaciados y un radio en `:root`. Cambia las variables sin modificar las reglas de los componentes.

### Ejercicio 2. Modelo de caja

Crea dos tarjetas y observa qué ocurre al cambiar el `padding` de una, el `margin` y el `gap` del contenedor. Activa o desactiva temporalmente `box-sizing: border-box` para comparar.

### Ejercicio 3. Flexbox

Construye una cabecera con logo a la izquierda y enlaces a la derecha. Haz que el menú pueda saltar de línea sin provocar desbordamiento.

### Ejercicio 4. Grid automático

Crea ocho tarjetas utilizando `.grid-auto`. Prueba `.grid-auto--compact` y `.grid-auto--wide`. Estrecha la ventana poco a poco y observa cómo cambia el número de columnas.

### Ejercicio 5. Media queries

Crea un bloque `.grid-3`: una columna como base, dos desde `48rem` y tres desde `64rem`. Observa la diferencia respecto a `.grid-auto`.

### Ejercicio 6. Diseñar clases con intención

Diseña una página con cabecera, hero, proyectos y contacto. Antes de escribir el CSS, anota junto a cada contenedor qué clase usarías y **por qué**: ¿layout, componente, modificador, utilidad o clase específica?

### Mini glosario

| Término | Significado |
|---|---|
| **CSS** | Lenguaje de estilos para presentar HTML |
| **Selector** | Regla que identifica a qué elementos se aplica CSS |
| **Propiedad** | Característica modificable: `color`, `padding`... |
| **Cascada** | Proceso por el que se determinan las declaraciones que prevalecen |
| **Especificidad** | Peso de ciertos selectores al resolver conflictos |
| **Herencia** | Transmisión de determinadas propiedades a descendientes |
| **Clase** | Identificador reutilizable con `class="..."` |
| **Componente** | Elemento de interfaz con responsabilidad visual concreta |
| **Utilidad** | Clase pequeña que resuelve un ajuste repetible |
| **DRY** | *Don't Repeat Yourself*: evitar duplicación innecesaria |
| **Design token** | Valor reutilizable: color, espaciado, radio... |
| **Flexbox** | Sistema de distribución centrado en un eje |
| **Grid** | Sistema de distribución en filas y columnas |
| **Responsive** | Diseño que se adapta al espacio y a distintas necesidades |
| **Breakpoint** | Condición de tamaño en la que cambia un layout |
| **Mobile first** | Escribir estilos base para tamaños pequeños y ampliar después |
| **Viewport** | Área visible que usa el navegador para representar la página |
| **Pseudoclase** | Estado o condición (`:hover`, `:focus-visible`) |
| **Pseudoelemento** | Parte generada o seleccionada (`::before`, `::after`) |
| **BEM** | Convención opcional para nombres de bloques, elementos y modificadores |

---

## PRINCIPIOS QUE MERECE LA PENA RECORDAR

1. **Primero la semántica:** el HTML expresa qué es cada elemento.
2. **Después la distribución:** decide qué contenedor organiza a cuáles hijos.
3. **Después el aspecto:** colores, tarjetas, botones, bordes, tipografías.
4. **Reutiliza con criterio:** no compartas una clase solo porque hoy dos elementos se parezcan.
5. **Diseña con flexibilidad:** usa Grid, Flexbox, límites de tamaño y funciones fluidas.
6. **Introduce `@media` cuando el contenido lo necesite**, no para reproducir una lista de dispositivos.
7. **Prueba y depura:** F12 es tan importante como escribir el CSS.
8. **Prioriza legibilidad y accesibilidad:** para quien navega y para quien mantiene el código.

**Idea final:** una plantilla CSS no es una ley ni debe utilizarse completa en cada proyecto. Es una caja de herramientas. Aprender CSS significa saber **qué herramienta elegir, dónde colocarla y por qué**.
