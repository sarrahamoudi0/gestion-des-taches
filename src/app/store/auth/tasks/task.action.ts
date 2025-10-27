import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/model/task';

// Ajouter une tâche
export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task; userEmail: string }>()
);

// Modifier une tâche
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task; userEmail: string }>()
);

// Supprimer une tâche
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: string; userEmail: string }>()
);

// Marquer une tâche comme complétée
export const toggleTaskCompleted = createAction(
  '[Task] Toggle Task Completed',
  props<{ taskId: string; userEmail: string }>()
);

// Réinitialiser toutes les tâches 
export const resetTasks = createAction('[Task] Reset Tasks');
