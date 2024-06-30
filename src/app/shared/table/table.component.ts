import { Component, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface ActionConfig {
  key: string,
  label: string,
  icon: string,
  color?: string,
  handler: any
}
interface TableConfig {
  key: string,
  label: string,
  value?: object | string;
  actions?: ActionConfig[]
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() config: TableConfig[] = [];
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
    this.displayedColumns = this.config.map(column => column.key);
    // Only update dataSource if data or config changes
    if (this.data && this.config) {
      const updatedData = this.data.map(item => {
        const newItem = { ...item };
        this.config.forEach((column, index) => {
          newItem[`${column.key}___value`] = column.value && typeof column.value == "function" ? column.value(newItem) : newItem[column.key];
          // if(column.key !== "actions"){

          // }else{
          //   // for(let action of column.actions){
          //   //   newItem[`${action.key}${index}`] = column.value && typeof column.value == "function" ? column.value(newItem) : newItem[column.key];
          //   // }
          // }
        });
        return newItem;
      });

      this.dataSource.data = updatedData;
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Adjust as needed based on unique identifier
  }
}
