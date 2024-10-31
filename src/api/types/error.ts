export type ErrorData = {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: ErrorItem[];
};

export type ErrorItem = {
  code: string;
  description: string;
  type: number;
};
