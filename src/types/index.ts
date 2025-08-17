// types.ts or paramsType.ts (file name as per your preference)
export interface ParamsType {
    limit?: number | undefined;
    page?: number | undefined;
    search?: string | undefined;
  }
  export interface ModalPropType {
    id?:number | string
    open:boolean,
    update:any,
    handleCancel: () => void,
  }