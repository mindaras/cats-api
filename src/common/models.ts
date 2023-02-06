export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export interface PaginationParams {
  limit: string | number;
  offset: string | number;
  order: Order;
}
