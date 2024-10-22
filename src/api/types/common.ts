export type Pagination<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type CustomError = {
  response: {
    status: number;
    data: {
      errors: { code: string }[];
    };
  };
};
