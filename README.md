# Mi To-Do List

Aplicación web ligera para la gestión de tareas personales, construida con estándares web nativos (HTML5, CSS3, JavaScript ES6+). Sin frameworks ni dependencias externas.

## Stack

- **HTML5** — estructura semántica
- **CSS3** — Flexbox, animaciones, variables CSS
- **JavaScript ES6+** — módulos nativos, arrow functions, template literals
- **LocalStorage** — persistencia de datos en el navegador

## Estructura del proyecto

```
todo-app/
├── index.html      # Estructura principal de la interfaz
├── styles.css      # Estilos de la aplicación
├── app.js          # Toda la lógica (estado, persistencia, renderizado, eventos)
├── AGENTS.md       # Reglas y convenciones del proyecto
├── MEMORY.md       # Memoria del proyecto entre sesiones
└── README.md       # Este archivo
```

## Cómo funciona

La app sigue un patrón simple de **estado en memoria + renderizado dinámico**:

1. **Estado:** Las tareas se guardan en un arreglo de objetos en memoria (`tasks`). Este arreglo es la única fuente de verdad.
2. **Renderizado:** La función `render()` genera el HTML de la lista a partir del estado. Nunca se lee información del DOM para determinar el estado.
3. **Persistencia:** Cada cambio en el estado se guarda en `localStorage` bajo la clave `todo-tasks`. Al cargar la app, se lee desde ahí.
4. **Eventos:** Se usa delegación de eventos — un solo listener en el contenedor principal de la lista maneja clics en botones de editar/borrar/completar.

## Esquema del objeto Task

```json
{
  "id": 1696000000000,
  "text": "Comprar leche",
  "note": "También pan y huevos",
  "completed": false,
  "updatedAt": "2026-09-30T12:00:00.000Z"
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | Identificador único (timestamp de creación) |
| `text` | `string` | Texto de la tarea |
| `note` | `string` | Nota opcional (máx. 500 caracteres) |
| `completed` | `boolean` | Si la tarea está completada |
| `updatedAt` | `Date` | Fecha de última actualización |

## Cómo ejecutarla

```bash
# Opción 1: servidor estático con npx
npx serve .

# Opción 2: abrir directamente index.html en el navegador
# (doble clic en el archivo)
```

## Funcionalidades

- Crear tareas con nota opcional
- Editar texto y nota de forma inline
- Marcar/desmarcar tareas como completadas
- Eliminar tareas
- Filtrar por: Todas, Pendientes, Completadas
- Contador de tareas pendientes
- Notas con expander (mostrar/ocultar)
- Persistencia automática en `localStorage`
- Diseño responsive y accesible

## Próximos pasos

- Categorías o etiquetas para tareas
- Fechas límite con recordatorios
- Arrastrar para reordenar tareas
- Modo oscuro
- Búsqueda de tareas
- Exportar/importar tareas (JSON)
