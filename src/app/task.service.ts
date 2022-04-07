
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { Task } from './task.model'

@Injectable({ providedIn: 'root' })
export class TaskService {

    constructor(private http: HttpClient) { }

    createTask(task: Task) {
        return this.http.post<{ id: string }>(
            environment.host + "/tasks.json",
            task
        )
    }

    fetchTasks() {
        return this.http.get<{ [key: string]: Task }>(
            environment.host + "/tasks.json"
        )
            .pipe(
                map(responseData => {
                    const tasksArray: Task[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            tasksArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return tasksArray;
                })
            )
    }

    deleteTask(task: Task) {
        return this.http.delete(
            environment.host + `/tasks/${task.id}.json`
        )
    }
}