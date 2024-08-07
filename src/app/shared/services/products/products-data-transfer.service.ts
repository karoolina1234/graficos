import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/getAllProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  //BehaviorSubject vantagem - é possivel ter acesso ao valor emitido antes

  public productsDataEmmiter$ =
    new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmmiter$.next(products);
      this.getProductsData();
    }
  }
  getProductsData() {
    this.productsDataEmmiter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        },
      });
    return this.productsDatas;
  }
}
