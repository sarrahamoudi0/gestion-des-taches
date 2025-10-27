import { createReducer, on } from '@ngrx/store';
import { initialTaskState } from './task.state';
import { addTask,updateTask,deleteTask,toggleTaskCompleted,resetTasks } from './task.action';

export const taskReducer = createReducer(
  initialTaskState,

  // Ajouter une tâche
  on(addTask, (state, { task, userEmail }) => ({
    ...state,
    tasksByUser: {
      ...state.tasksByUser,
      [userEmail]: [...(state.tasksByUser[userEmail] || []), task]
    }
  })),

  // Modifier une tâche
  on(updateTask, (state, { task, userEmail }) => ({
    ...state,
    tasksByUser: {
      ...state.tasksByUser,
      [userEmail]: (state.tasksByUser[userEmail] || []).map(t => t.id === task.id ? task : t)
    }
  })),

  // Supprimer une tâche
  on(deleteTask, (state, { taskId, userEmail }) => ({
    ...state,
    tasksByUser: {
      ...state.tasksByUser,
      [userEmail]: (state.tasksByUser[userEmail] || []).filter(t => t.id !== taskId)
    }
  })),

  // Toggle tâche complétée
  on(toggleTaskCompleted, (state, { taskId, userEmail }) => ({
    ...state,
    tasksByUser: {
      ...state.tasksByUser,
      [userEmail]: (state.tasksByUser[userEmail] || []).map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }
  })),

  // Réinitialiser toutes les tâches (logout)
  on(resetTasks, state => ({ tasksByUser: {} }))
);
