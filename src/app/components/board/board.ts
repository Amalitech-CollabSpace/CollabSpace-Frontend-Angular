import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from '../board-list/board-list';

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
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardListComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class BoardComponent {
  lists = signal<BoardList[]>([
    {
      id: 1,
      title: 'Todo',
      tasks: [
        { id: 1, title: 'Setup project' },
        { id: 2, title: 'Design UI mockups' },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [{ id: 3, title: 'Implement authentication' }],
    },
    {
      id: 3,
      title: 'In Review',
      tasks: [],
    },
    {
      id: 4,
      title: 'Done',
      tasks: [{ id: 4, title: 'Create project repo' }],
    },
  ]);

  draggedTask: Task | null = null;
  sourceListId: number | null = null;

  onDragStart(task: Task, listId: number) {
    this.draggedTask = task;
    this.sourceListId = listId;
  }

  onDrop(targetListId: number) {
    if (!this.draggedTask || this.sourceListId === null) return;

    const lists = [...this.lists()];
    const sourceList = lists.find((l) => l.id === this.sourceListId);
    const targetList = lists.find((l) => l.id === targetListId);

    if (sourceList && targetList) {
      sourceList.tasks = sourceList.tasks.filter(
        (t) => t.id !== this.draggedTask!.id
      );
      targetList.tasks.push(this.draggedTask);
      this.lists.set(lists);
    }

    this.draggedTask = null;
    this.sourceListId = null;
  }

  addList() {
    const title = prompt('Enter list name');
    if (!title) return;

    const newList: BoardList = {
      id: Date.now(),
      title,
      tasks: [],
    };
    this.lists.update((prev) => [...prev, newList]);
  }
}
