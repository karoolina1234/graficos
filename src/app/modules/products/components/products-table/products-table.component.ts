import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/enums/products/productEvent';
import {
  DeleteProdAction,
  EventAction,
} from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/getAllProducts';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProdAction>();
  public productSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };

      //emitir evento

      this.productEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      //emitir evento

      this.deleteProductEvent.emit({
        product_id,
        productName,
      });
    }
  }
}
