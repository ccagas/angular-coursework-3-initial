import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Task } from '../task.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent {

    @Input() item: { index: number, task: Task };

    @Output() itemDeleted = new EventEmitter<Task>();

    onDeleteTask() {
        this.itemDeleted.emit(this.item.task);
    }
}
