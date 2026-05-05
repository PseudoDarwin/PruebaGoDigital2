import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task'; 
import { Task } from '../../models/task';
import { TaskFormComponent } from '../task-form/task-form';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  

  selectedTask: Task = { id: 0, title: '', description: '', isCompleted: false };
  editing = false;
  showForm = false; 
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadTasks();
  }

loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        if (data) {
          this.tasks = data;
        }
      },
      error: (err) => console.error(err)
    });
  }


  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          console.log(`Tarea ${id} eliminada`);
        },
        error: (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      });
    }
  }

  prepareNewTask() {
    this.selectedTask = { id: 0, title: '', description: '', isCompleted: false };
    this.editing = false;
    this.showForm = true;
  }

  prepareEditTask(task: Task) {
    this.selectedTask = { ...task }; 
    this.editing = true;
    this.showForm = true;
  }

  handleSave() {
    this.showForm = false;
    this.loadTasks(); 
  }
 
}