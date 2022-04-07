import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedTasks: Task[] = [];
  isFetching: boolean = false;

  error = new Subject<string>();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.fetchTasks();
  }

  onCreateTask(taskInput: HTMLInputElement) {
    this.createTask({
      name: taskInput.value
    });
  }

  onDeleteTask(task: Task) {
    this.deleteTask(task);
  }

  private createTask(task: Task) {
    // Send Http request    
    this.taskService.createTask(task)
      .subscribe(responseData => {
        console.log(responseData);
        this.fetchTasks();
      }, error => {
        this.error = error.message;
        console.log(error);
      })
  }

  private fetchTasks() {
    // Send Http request

    this.loadedTasks = [];
    this.isFetching = true;

    setTimeout(() => {
      this.taskService.fetchTasks()
        .subscribe(tasks => {
          this.loadedTasks = tasks;
          this.isFetching = false;
          console.log(this.loadedTasks);
        }, error => {
          this.error = error.message;
          console.log(error);
        })
    }, 1500);
  }

  private deleteTask(task: Task) {
    // Send Http request

    return this.taskService.deleteTask(task)
      .subscribe(() => {
        this.fetchTasks();
      }, error => {
        this.error = error.message;
        console.log(error);
      })
  }
}
