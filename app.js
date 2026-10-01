// ===== Elementos del DOM =====
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskNote = document.getElementById('task-note');
const toggleNoteBtn = document.getElementById('toggle-note-btn');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filterBtns = document.querySelectorAll('.filter-btn');

// ===== Estado =====
let tasks = loadTasks();
let currentFilter = 'all';
let editingId = null; // ID de la tarea que se está editando

// ===== Persistencia =====

// Cargar tareas desde localStorage
function loadTasks() {
  try {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convertir las fechas de string a Date
      return parsed.map((t) => ({
        ...t,
        updatedAt: new Date(t.updatedAt),
      }));
    }
  } catch (e) {
    console.warn('Error cargando tareas:', e);
  }
  return [];
}

// Guardar tareas en localStorage
function saveTasks() {
  try {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  } catch (e) {
    console.warn('Error guardando tareas:', e);
  }
}

// ===== Funciones de tiempo =====

// Formatear fecha en tiempo relativo en español
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return 'hace un momento';
  if (diffMin < 60) return `hace ${diffMin} minuto${diffMin !== 1 ? 's' : ''}`;
  if (diffHour < 24) return `hace ${diffHour} hora${diffHour !== 1 ? 's' : ''}`;
  if (diffDay < 7) return `hace ${diffDay} día${diffDay !== 1 ? 's' : ''}`;
  return `hace ${diffWeek} semana${diffWeek !== 1 ? 's' : ''}`;
}

// ===== Funciones de tareas =====

// Agregar una nueva tarea
function addTask(text, note) {
  const task = {
    id: Date.now(),
    text: text,
    note: note || '',
    completed: false,
    updatedAt: new Date(),
  };
  tasks.push(task);
  saveTasks();
  render();
}

// Eliminar una tarea
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

// Marcar/desmarcar tarea como completada
function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  render();
}

// Editar texto y nota de una tarea
function editTask(id, newText, newNote) {
  const trimmed = newText.trim();
  if (!trimmed) return; // No guardar si está vacío
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, text: trimmed, note: newNote || '', updatedAt: new Date() } : t
  );
  editingId = null;
  saveTasks();
  render();
}

// Cancelar edición
function cancelEdit() {
  editingId = null;
  render();
}

// Mostrar/ocultar nota de una tarea
function toggleNote(id) {
  const noteEl = document.getElementById(`note-${id}`);
  if (noteEl) {
    noteEl.style.display = noteEl.style.display === 'none' ? 'block' : 'none';
  }
}

// Filtrar tareas según el filtro activo
function getFilteredTasks() {
  if (currentFilter === 'pending') return tasks.filter((t) => !t.completed);
  if (currentFilter === 'completed') return tasks.filter((t) => t.completed);
  return tasks;
}

// Actualizar contador de pendientes
function updateCounter() {
  const pending = tasks.filter((t) => !t.completed).length;
  counter.textContent = `${pending} tarea${pending !== 1 ? 's' : ''} pendiente${pending !== 1 ? 's' : ''}`;
}

// ===== Renderizado =====

function render() {
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    taskList.innerHTML = '<p class="empty-state">No hay tareas para mostrar 🎉</p>';
  } else {
    taskList.innerHTML = filtered
      .map((task) => {
        const isEditing = task.id === editingId;

        if (isEditing) {
          return `
          <li class="task-item editing">
            <input type="checkbox" disabled>
            <input 
              type="text" 
              class="edit-input" 
              value="${task.text}"
              data-id="${task.id}"
              autofocus
            >
            <textarea 
              class="edit-note-input" 
              placeholder="Nota (opcional)..."
              data-id="${task.id}"
            >${task.note}</textarea>
            <div class="task-actions">
              <button class="save-btn" onclick="editTask(${task.id}, this.parentElement.parentElement.querySelector('.edit-input').value, this.parentElement.parentElement.querySelector('.edit-note-input').value)" title="Guardar">
                ✓
              </button>
              <button class="cancel-btn" onclick="cancelEdit()" title="Cancelar">
                ✗
              </button>
            </div>
          </li>
        `;
        }

        const hasNote = task.note && task.note.trim();

        return `
          <li class="task-item ${task.completed ? 'completed' : ''}">
            <input 
              type="checkbox" 
              ${task.completed ? 'checked' : ''} 
              onchange="toggleTask(${task.id})"
            >
            <div class="task-content">
              <span class="task-text">${task.text}</span>
              <span class="task-date">🕐 ${formatTimeAgo(task.updatedAt)}</span>
              ${hasNote ? `
                <button class="toggle-note-btn" onclick="toggleNote(${task.id})" title="Ver nota">
                  📄
                </button>
                <div class="task-note-content" id="note-${task.id}" style="display: none;">
                  ${task.note}
                </div>
              ` : ''}
            </div>
            <div class="task-actions">
              <button class="edit-btn" onclick="startEdit(${task.id})" title="Editar">
                ✏️
              </button>
              <button class="delete-btn" onclick="deleteTask(${task.id})" title="Eliminar">
                🗑️
              </button>
            </div>
          </li>
        `;
      })
      .join('');
  }

  updateCounter();
}

// ===== Edición inline =====

function startEdit(id) {
  editingId = id;
  render();
  // Poner el foco en el input de edición
  const input = taskList.querySelector('.edit-input');
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

// ===== Eventos =====

// Toggle del botón "Agregar nota"
toggleNoteBtn.addEventListener('click', () => {
  const isHidden = taskNote.style.display === 'none';
  taskNote.style.display = isHidden ? 'block' : 'none';
  toggleNoteBtn.textContent = isHidden ? 'Ocultar nota' : 'Agregar nota';
  if (isHidden) {
    taskNote.focus();
  }
});

// Enviar formulario
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    const note = taskNote.value.trim();
    addTask(text, note);
    taskInput.value = '';
    taskNote.value = '';
    taskNote.style.display = 'none';
    toggleNoteBtn.textContent = 'Agregar nota';
    taskInput.focus();
  }
});

// Botones de filtro
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Eventos de teclado para edición (Enter = guardar, Escape = cancelar)
taskList.addEventListener('keydown', (e) => {
  if (e.target.classList.contains('edit-input')) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const id = parseInt(e.target.dataset.id);
      editTask(id, e.target.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }
});

// ===== Inicio =====
render();
