import { GetAllProductsResponse } from './../../../../models/interfaces/products/getAllProducts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];
  constructor(
    private productService: ProductsService,
    private productDataTransfer: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productDataTransfer.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
    } else {
      this.getAPIProductsData();
    }
  }
  getAPIProductsData() {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!!',
            detail: 'Erro ao buscar produtos',
            life: 1200,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      console.log('evento', event);
    }
  }

  handleDeleteProductAction(event: {
    product_id: string;
    productName: string;
  }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Deseja remover o produto ${event?.productName}`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      });
    }
  }

  deleteProduct(product_id: string) {
    if (product_id) {
      this.productService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'produto removido com sucesso',
                life: 2200,
              });
              this.getAPIProductsData();
            }
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro!',
              detail: 'Erro ao remover o produto',
              life: 2300,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
