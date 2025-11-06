import {
  Component,
  ViewChild,
  AfterViewInit,
  input,
  signal,
  effect,
  output,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDragDrop,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dad-table',
  standalone: true,
  templateUrl: './dad-table.html',
  styleUrls: ['./dad-table.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DragDropModule,
    NgClass,
    NgIcon,
  ],
  viewProviders: provideIcons({ bootstrapSearch }),
})
export class DadTable implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table!: MatTable<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  viewItem = output<any>();
  editItem = output<any>();
  deleteItem = output<any>();

  data = input<Task[]>([]);
  displayedColumns = input<string[]>([
    'id',
    'title',
    'status',
    'dueDate',
    'assignee',
    'actions',
  ]);
  showSearch = input<boolean>(true);
  showStatusMenu = signal<boolean>(false);

  searchTerm = signal('');
  dataSource = new MatTableDataSource<Task>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.applyFilter();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    const filterValue = this.searchTerm().trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  drop(event: CdkDragDrop<Task[]>) {
    const previousData = [...this.dataSource.data];
    moveItemInArray(previousData, event.previousIndex, event.currentIndex);
    this.dataSource.data = previousData;
  }

  updateSearchTerm(value: string) {
    this.searchTerm.set(value);
    this.applyFilter();
  }

  onView(item: any) {
    this.viewItem.emit(item);
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  onDelete(item: any) {
    this.deleteItem.emit(item);
  }
}
