import { ITableConfig } from "src/app/shared/table/table.component";
import { ISubCategory } from "../interfaces/sub-category.interface";
import { SubCategoryListComponent } from "../pages/sub-category-list/sub-category-list.component";
import { EUserType } from "src/app/core/enums/EUserType";

export const tableConfig = (parent: SubCategoryListComponent) : ITableConfig =>
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
      handler: (subCategory: ISubCategory) => parent.router.navigate(['sub-category/edit/',subCategory._id]),
      role: [EUserType.User]
    },
    {
      key: 'delete',
      icon: 'delete',
      // color: '#FF4500',
      label: 'Delete',
      handler: (subCategory: ISubCategory) => parent.subCategoryService.deleteSubCategory(subCategory._id).subscribe((res: any) => parent.load()),
      visible: (subCategory: ISubCategory) => !subCategory.deleted,
      role: [EUserType.User]
    },
    {
      key: 'enable',
      icon: 'toggle_on',
      label: 'Enable',
      handler: (subCategory: ISubCategory) => parent.subCategoryService.enableSubCategory(subCategory._id).subscribe((res: any) => parent.load()),
      visible: (subCategory: ISubCategory) => !subCategory.enabled,
      role: [EUserType.User]
    },
    {
      key: 'disable',
      icon: 'toggle_off',
      label: 'Disable',
      handler: (subCategory: ISubCategory) => parent.subCategoryService.disableSubCategory(subCategory._id).subscribe((res: any) => parent.load()),
      visible: (subCategory: ISubCategory) => !!subCategory.enabled,
      role: [EUserType.User]
    },
  ],
   background: (subCategory: ISubCategory) => subCategory.deleted ? '#FFB6C1' : ''
});
