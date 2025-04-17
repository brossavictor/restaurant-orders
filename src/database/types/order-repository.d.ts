type OrderRepository = {
  id: number;
  table_session_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: number;
  updated_at: number;
};

type Order = OrderRepository & {
  name: string;
  total: number;
};
