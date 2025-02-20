import { ITableConfig } from "src/app/shared/table/table.component";
import { IProduct } from "../interfaces/product.interface";
import { ProductListComponent } from "../pages/product-list/product-list.component";
import { EUserType } from "src/app/core/enums/EUserType";

export const tableConfig = (parent: ProductListComponent) : ITableConfig =>
  <ITableConfig>({
    cols: [
      {
        key:'name', 
        label: 'Name',
      },
      {
        key:'category', 
        label: 'Category',
        value: (data: any) => data.category?.name ?? "-"
      },
      {
        key:'subCategory', 
        label: 'Sub category',
        value: (data: any) => data.subCategory?.name ?? "-"
      },
      {
        key:'price', 
        label: 'Price',
      },
      {
        key:'quantity', 
        label: 'Quantity',
      },
      {
        key:'note', 
        label: 'Note'
      },
      {
        key:'description', 
        label: 'Description'
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
        handler: (product: IProduct) => parent.router.navigate(['product/edit/',product._id]),
        role: [EUserType.User]
      },
      {
        key: 'delete',
        icon: 'delete',
        // color: '#FF4500',
        label: 'Delete',
        handler: (product: IProduct) => parent.productService.deleteProduct(product._id).subscribe((res: any) => parent.load()),
        visible: (product: IProduct) => !product.deleted,
        role: [EUserType.User]
      },
      {
        key: 'enable',
        icon: 'toggle_on',
        label: 'Enable',
        handler: (product: IProduct) => parent.productService.enableProduct(product._id).subscribe((res: any) => parent.load()),
        visible: (product: IProduct) => !product.enabled,
        role: [EUserType.User]
      },
      {
        key: 'disable',
        icon: 'toggle_off',
        label: 'Disable',
        handler: (product: IProduct) => parent.productService.disableProduct(product._id).subscribe((res: any) => parent.load()),
        visible: (product: IProduct) => !!product.enabled,
        role: [EUserType.User]
      },
    ],
    background: (product: IProduct) => product.deleted ? '#FFB6C1' : ''
  })