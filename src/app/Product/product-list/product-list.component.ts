import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ModuleData } from 'src/Helper/Modules';
import { TableModule } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { SearchAndListModel } from 'src/Helper/SearchAndListModel';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  ProductList: any = [];
  Product: any = {};
  Columns: any;
  TotalRecord: number;
  constructor(
    private service: CommonService,
    private helper: CommonHelper,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.Columns = [
      { field: 'category', header: 'Category' },
      { field: 'name', header: 'Name' },
    ];
    this.helper.ShowSpinner();
    await this.GetProductList();
    this.helper.HideSpinner();
  }


  async GetProductList() {
    debugger
    this.ProductList = await this.service.GetAll("ProductList");
    console.log(this.ProductList);
  }

  Edit(id) {
    this.helper.redirectTo("Product/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "ProductDelete");
        if (res['Type'] == "S") {
          this.helper.SucessToastr(res['Message']);
        }
        else {
          this.helper.ErrorToastr(res['Message']);
        }
        this.helper.HideSpinner();
      }
    });

  }

}

const routes: Routes = [
  { path: "", component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ModuleData,
    ProductListRoutingModule,
    TableModule
  ],
  providers: []
})
export class ProductListModule { }
