import { ITableConfig } from "src/app/shared/table/table.component";
import { ICategory } from "../interfaces/category.interface";
import { CategoryListComponent } from "../pages/category-list/category-list.component";
import { EUserType } from "src/app/core/enums/EUserType";

export const tableConfig = (parent: CategoryListComponent) : ITableConfig =>
  <ITableConfig> ({
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
  actions: [
    {
      key: 'update',
      icon: 'edit',
      label: 'Update',
      handler: (category: ICategory) => parent.router.navigate(['category/edit/',category._id]),
      role: [EUserType.User]
    },
    {
      key: 'delete',
      icon: 'delete',
      // color: '#FF4500',
      label: 'Delete',
      handler: (category: ICategory) => parent.categoryService.deleteCategory(category._id).subscribe((res: any) => parent.load()),
      visible: (category: ICategory) => !category.deleted,
      role: [EUserType.User]
    },
    {
      key: 'enable',
      icon: 'toggle_on',
      label: 'Enable',
      handler: (category: ICategory) => parent.categoryService.enableCategory(category._id).subscribe((res: any) => parent.load()),
      visible: (category: ICategory) => !category.enabled,
      role: [EUserType.User]
    },
    {
      key: 'disable',
      icon: 'toggle_off',
      label: 'Disable',
      handler: (category: ICategory) => parent.categoryService.disableCategory(category._id).subscribe((res: any) => parent.load()),
      visible: (category: ICategory) => !!category.enabled,
      role: [EUserType.User]
    },
  ],
   background: (category: ICategory) => category.deleted ? '#FFB6C1' : ''
});