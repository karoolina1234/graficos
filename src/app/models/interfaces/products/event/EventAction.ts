export interface EventAction {
  action: string;
  id?: string;
}

export interface DeleteProdAction {
  product_id: string;
  productName: string;
}
