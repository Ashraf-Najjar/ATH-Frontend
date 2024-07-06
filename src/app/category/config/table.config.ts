import { ITableConfig } from "src/app/shared/table/table.component";

export const tableConfig: ITableConfig = ({
  cols: [
    {
      key:'name', 
      label: 'Name'
    },
    {
      key:'note', 
      label: 'note'
    },
    {
      key:'description', 
      label: 'description'
    },
    {
      key:'createdAt', 
      label: 'Create At',
      value: (data: any) => data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'
    }
  ],
  actions: []
});