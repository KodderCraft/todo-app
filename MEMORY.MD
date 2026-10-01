# MEMORY.md — To-Do List App

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- v1 funcional: creación, edición, marcado de completado y eliminación de tareas.
- Sistema de filtrado básico (Todas, Pendientes, Completadas) y contador de pendientes.
- Persistencia de datos local implementada en `localStorage`.
- v2: notas opcionales en tareas con expander, edición inline y límite de 500 caracteres.
- Documentación completa en `README.md`.

## Decisiones (y por qué)
- **Sin backend ni dependencias externas:** Desarrollado con HTML/CSS/JS nativo para garantizar portabilidad total y carga instantánea mediante `file://` o servidor estático simple.
- **Renderizado basado en estado:** El DOM no guarda información; la lista de tareas se gestiona mediante un arreglo de objetos en memoria y se renderiza dinámicamente para evitar desincronizaciones.
- **Delegación de eventos:** Un solo listener en el contenedor principal de la lista para manejar clics en botones de editar/borrar/completar, optimizando el rendimiento.
- **Notas con expander:** La nota se muestra/oculta con un botón para no saturar la lista. Se edita inline junto al texto. Límite de 500 caracteres. Saltos de línea respetados con `white-space: pre-wrap`.

## Aprendizajes y errores a evitar
- (vacio)

## Próximos pasos
- (vacio)