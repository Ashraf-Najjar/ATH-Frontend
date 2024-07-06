import { Component, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface IActionConfig {
  key: string;
  label: string;
  icon: string;
  handler: (item: any) => void;
  color?: string;
  visible?: (item: any) => boolean;
}

interface IColumnConfig {
  key: string;
  label: string;
  value?: (item: any) => any | string;
}
export interface ITableConfig {
  cols: IColumnConfig[];
  actions: IActionConfig[];
  background?: any
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() config!: ITableConfig;
  @Input() data: any[] = [];

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['config']) {
      this.initializeTable();
    }
  }

  initializeTable(): void {
    this.displayedColumns = this.config.cols.map(column => column.key);
    this.displayedColumns.push('actions');

    // Only update dataSource if data or config changes
    if (this.data && this.config) {
      const updatedData = this.data.map(item => {
        const newItem = { ...item };

        // Handling cells data
        this.config.cols.forEach((column) => {
          newItem[`${column.key}___value`] = column.value && typeof column.value == "function" ? column.value(newItem) : newItem[column.key];
        });
        
        // Handling actions for each row
        this.config.actions.forEach((action, index) => {
          newItem[`${action.key}${index}`] = !action.visible || action.visible(newItem);
        });

        return newItem;
      });

      this.dataSource.data = updatedData;
    }
  }

  trackByFn(index: number, item: any): any {
    return item._id || index; // Use item.id if available, otherwise use the index
  }
}
