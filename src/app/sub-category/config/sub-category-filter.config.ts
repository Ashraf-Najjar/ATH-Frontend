import { IFilter } from "src/app/shared/filter/filter.component";
import { SubCategoryListComponent } from "../pages/sub-category-list/sub-category-list.component";

export const filterConfig = (parent: SubCategoryListComponent): IFilter[] => <IFilter[]>([
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
