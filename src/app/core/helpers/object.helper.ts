export const removeEmptyValues = (obj:any) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key, value]) => value !== null && value !== undefined && value !== '')
    );
}

interface FieldValue {
    field: string;
    value: any;
}
  
export const transformObject = (obj: { [key: string]: any }): FieldValue[] => {
    return Object.keys(obj).map(key => ({
      field: key,
      value: obj[key]
    }));
  }