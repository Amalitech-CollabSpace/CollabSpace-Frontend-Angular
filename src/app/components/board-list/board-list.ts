import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
}

interface BoardList {
  id: number;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
})
export class BoardListComponent {
  list = input.required<BoardList>();
  dragStart = output<{ task: Task; listId: number }>();
  dropTask = output<number>();

  protected onDragStart(task: Task) {
    this.dragStart.emit({ task, listId: this.list().id });
  }

  protected onDrop() {
    this.dropTask.emit(this.list().id);
  }

  protected onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  protected addTask() {
    const title = prompt('Enter task title');
    if (!title) return;
    this.list().tasks.push({ id: Date.now(), title });
  }
}
