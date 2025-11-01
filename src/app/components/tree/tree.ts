import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreeNode } from '../../models/tree';



@Component({
  selector: 'app-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree.html',
  styleUrl: './tree.scss',
})
export class Tree {
   @Input() dataSource: TreeNode[] = [];

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}


