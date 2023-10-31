export type PurchaseOrder = {
  status: string
  totalPrice: number
  orderNumber: string
  id: number
  vendorName: string
  purchaseDate: string
}

export interface PurchaseOrdersData {
  getPurchaseOrders: {
    purchaseOrders: PurchaseOrder[]
    totalCount: number
  }
}
