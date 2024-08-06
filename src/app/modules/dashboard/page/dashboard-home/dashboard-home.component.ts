import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/getAllProducts';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public productList: Array<GetAllProductsResponse> = [];
  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productsDataService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productList = response;
            this.productsDataService.setProductsDatas(this.productList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Erro ao buscar produtos',
            life: 2300,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
