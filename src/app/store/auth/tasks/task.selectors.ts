import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

// Sélecteur pour tout le store tasks
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Sélecteur pour toutes les tâches d’un utilisateur
export const selectTasksByUser = (userEmail: string) =>
  createSelector(
    selectTaskState,
    (state) => state.tasksByUser[userEmail] || []
  );
