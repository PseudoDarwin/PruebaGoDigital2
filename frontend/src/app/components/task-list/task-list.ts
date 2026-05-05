import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task'; 
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Esto se ejecuta cuando la vista ya está dibujada
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
}