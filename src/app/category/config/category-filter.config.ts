import { IFilter } from "src/app/shared/filter/filter.component";
import { CategoryListComponent } from "../pages/category-list/category-list.component";

export const filterConfig = (parent: CategoryListComponent): IFilter[] => <IFilter[]>([
    {
        key: 'name',
        label: 'Name',
        type: "text",
        placeholder: "Enter name..."
    },
    {
        key: 'description',
        label: 'Description',
        type: "text",
        placeholder: "Enter description..."
    },
    {
        key: 'note',
        label: 'Note',
        type: "text",
        placeholder: "Enter note..."
    },
    {
        key: 'createdBy',
        label: 'Created By',
        type: "text",
        placeholder: "Enter user name..."
    },
])