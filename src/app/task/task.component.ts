import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../model/task';
import { selectUser } from '../store/auth/auth.selectors';
import { selectTasksByUser } from '../store/auth/tasks/task.selectors';
import { addTask, deleteTask, toggleTaskCompleted, updateTask } from '../store/auth/tasks/task.action';
import { logout } from '../store/auth/auth.action';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  userEmail: string = '';

  taskForm: FormGroup;
  editingTask: Task | null = null;

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [3, Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.tasks$ = this.store.select(selectTasksByUser(this.userEmail));
      }
    });
  }

  onSubmitTask() {
    if (!this.userEmail || this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    if (this.editingTask) {
      // Modifier une tâche existante
      const updatedTask: Task = { ...this.editingTask, ...formValue };
      this.store.dispatch(updateTask({ task: updatedTask, userEmail: this.userEmail }));
      this.editingTask = null;
    } else {
      // Ajouter une nouvelle tâche
      const newTask: Task = {
        id: this.generateId(),
        title: formValue.title,
        description: formValue.description,
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask, userEmail: this.userEmail }));
    }

    this.taskForm.reset({ priority: 3 });
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
  }

  cancelEdit() {
    this.editingTask = null;
    this.taskForm.reset({ priority: 3 });
  }

  toggleCompleted(task: Task) {
    if (!this.userEmail) return;
    this.store.dispatch(toggleTaskCompleted({ taskId: task.id, userEmail: this.userEmail }));
  }

  deleteTask(task: Task) {
    if (!this.userEmail) return;
    this.store.dispatch(deleteTask({ taskId: task.id, userEmail: this.userEmail }));
  }

  onLogout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  private generateId(): string {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}
}
