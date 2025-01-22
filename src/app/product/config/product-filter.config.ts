import { IFilter } from "src/app/shared/filter/filter.component";
import { ProductListComponent } from "../pages/product-list/product-list.component";

export const filterConfig = (parent: ProductListComponent): IFilter[] => <IFilter[]>([
    {
        key: 'name',
        label: 'Product Name',
        type: "text",
        placeholder: "Enter product name..."
    },
    {
        key: 'note',
        label: 'Note',
        type: "text",
        placeholder: "Enter note..."
    },
    {
        key: 'description',
        label: 'Description',
        type: "text",
        placeholder: "Enter description..."
    },
    {
        key: 'createdBy',
        label: 'Created By',
        type: "text",
        placeholder: "Enter user name..."
    },
    // {
    //     key: 'name',
    //     label: 'Name',
    //     type: "dropdown",
    //     options: async () => await firstValueFrom(parent.userService.getProducts(0, 100).pipe(map(res => res.users))) 
    // },
    // {
    //     key: 'email',
    //     label: 'Email',
    //     type: "text",
    //     validation: Validators.email,
    //     errorMsg: "Type write email"
    // }
])