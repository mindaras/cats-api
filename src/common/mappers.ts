import { Order } from "./models";

const toErrorResponse = (e: unknown) => ({ message: (e as Error)?.message });

const toOrderClause = ({
  orderBy,
  order,
}: {
  orderBy: string;
  order: Order;
}) => {
  const param = order?.toUpperCase();
  let orderClause = "";

  if (param === Order.ASC) orderClause = `ORDER BY ${orderBy} ASC`;
  if (param === Order.DESC) orderClause = `ORDER BY ${orderBy} DESC`;

  return orderClause;
};

export { toErrorResponse, toOrderClause };
