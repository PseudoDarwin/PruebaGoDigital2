import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  // Recibe la tarea desde el padre
  @Input() task: Task = this.initTask();
  // Recibe si estamos editando o creando
  @Input() isEditMode = false;
  
  // Avisa al padre cuando terminamos para refrescar la tabla
  @Output() onSaved = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  private initTask(): Task {
    return { id: 0, title: '', description: '', isCompleted: false };
  }

  save() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => this.onSaved.emit());
    } else {
      this.taskService.createTask(this.task).subscribe(() => this.onSaved.emit());
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}