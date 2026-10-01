# AGENTS.md — To-Do List App 

Aplicación web ligera para la gestión de tareas personales, construida con estándares web nativos (HTML5, CSS3, JavaScript ES6+). Su objetivo es ofrecer una experiencia rápida, accesible y sin dependencias externas.

## Stack y estructura

- **Stack principal:** HTML5 nativo, CSS3 (variables CSS, Flexbox/Grid) y JavaScript (ES6+ Modules). Sin frameworks ni transpiladores.
- **Estructura del proyecto:**
  - `index.html`: Estructura semántica principal de la interfaz y contenedor de la app.
  - `styles.css`: Estilos de la aplicación (reset, formulario, filtros, lista, acciones).
  - `app.js`: Toda la lógica de la aplicación (estado, persistencia, renderizado, eventos).

## Comandos

- **Servidor de desarrollo local:** `npx serve .` (o cualquier servidor estático HTTP local como Live Server).
- **Ejecutar pruebas / Linter:** `npx eslint js/`
- **Verificar formato CSS:** `npx stylelint css/**/*.css`

## Diseño

- **Paleta:** Fondo crema `#FAF7F2`, acento terracota `#C4532E`, texto carbón `#2D2A26`.
- **Tipografía:** Georgia (serif) para headings, system-ui para body/UI.
- **Estilo:** Editorial y cálido. Bordes sutiles, espaciado generoso, sin sombras fuertes.
- **Checkbox:** Personalizado con `appearance: none` — círculo terracota con check blanco.
- **Responsive:** Adaptado para móvil con formulario en columna y espaciado ajustado.

## Convenciones

- **Nombres:**
  - Archivos y carpetas en minusculas/kebab-case (`todo-item.css`, `helpers.js`).
  - Variables y funciones JavaScript en `camelCase` (`renderTodoList`, `saveTasks`).
  - Variables CSS globales en `--kebab-case` (`--primary-color`, `--font-size-base`).
- **Idioma:** Código, funciones e identificadores en inglés (`taskId`, `completed`). Comentarios y textos visibles de la app en español.
- **Estilo:**
  - Manipulación limpia del DOM evitando el uso inseguro de `innerHTML` con entradas del usuario (prevenir XSS sanitizando o creando nodos con `document.createElement`).
  - Uso de ES Modules nativos (`import` / `export`) cargados mediante `<script type="module" src="js/app.js">`.
  - Archivo de referencia para patrones de código: `js/store.js`.

## Reglas de dominio / trampas conocidas

- **Persistencia con LocalStorage:** La clave de almacenamiento en `localStorage` debe ser fija (`todo-tasks`). Toda lectura de `localStorage` debe ir dentro de un bloque `try/catch` para manejar entornos restringidos o datos corruptos.
- **Esquema del objeto Task:** `{ id: number, text: string, note: string, completed: boolean, updatedAt: Date }`. El campo `note` es opcional y se muestra en un expander.
- **Manipulación del DOM:**
  - Delegación de eventos: Escuchar clics o cambios en el contenedor principal de la lista (`ul` / `ol`) en lugar de añadir event listeners individuales a cada tarea nueva.
  - Estado y UI sincronizados: La fuente de la verdad reside en el arreglo de objetos de `store.js`. Nunca leer el estado directamente de los elementos del DOM.
- **Formularios y Accesibilidad:**
  - Todo formulario debe prevenir el comportamiento predeterminado (`e.preventDefault()`) al enviar.
  - Asegurar atributos ARIA básicos (`aria-checked`, `aria-label`) al marcar/desmarcar o eliminar elementos.

## Forma de trabajar

- **Planificación:** Antes de añadir una nueva interacción con la interfaz (ej. editar texto in-line o arrastrar para reordenar), detallar en un breve plan los módulos JS que se modificarán.
- **Tamaño de cambios:** Realizar modificaciones pequeñas enfocadas en un solo módulo a la vez (`store.js` o `ui.js`).
- **Resumen:** Indicar qué componentes del DOM o módulos JS se actualizaron tras terminar cada cambio.

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

## Límites

- ✅ **Siempre:** Mantener la compatibilidad nativa con navegadores modernos, utilizar clases CSS reutilizables y sanitizar el texto ingresado por el usuario.
- ✅ **Siempre**: actualizar `MEMORY.md` al terminar cada tarea. 
- ⚠️ **Pregunta antes:** Introducir bibliotecas de terceros (ej. FontAwesome, Tailwind CDN, librerías de utilidades), modificar la estructura general del HTML base (`index.html`) o cambiar el esquema del objeto `Task`.
- 🚫 **Nunca:** Usar `eval()`, escribir estilos CSS en línea (`style="..."`) desde JS salvo para animaciones/posicionamiento dinámico puntual, ni incluir frameworks de compilación (Webpack, Vite, Babel).

## Verificación

Antes de dar una tarea por terminada:
1. Validar que la app cargue sin errores ni advertencias en la consola de desarrollo del navegador.
2. Confirmar que la persistencia funcione al recargar la página (`F5`).
3. Verificar que las interacciones clave (crear, completar, filtrar y borrar tareas) respondan correctamente con mouse y teclado (tecla `Enter` / `Space`).