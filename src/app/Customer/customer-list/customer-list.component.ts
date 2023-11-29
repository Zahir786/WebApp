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
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  customerList: any = [];
  customer: any = {};
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
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone_no', header: 'Phone No' },
    ];
    this.helper.ShowSpinner();
    //  await this.GetcustomerList();
    this.helper.HideSpinner();
  }

  async GetList(model: SearchAndListModel = new SearchAndListModel()) {
    debugger
    console.log(2);
    this.helper.ShowSpinner();
    let res: any = [];
    res = await this.service.CommonPost(model, "CustomerSearchAndList");
    console.log(res);
    this.customerList = res["data"];
    this.TotalRecord = res["totalrecord"];
    this.helper.HideSpinner();
  }

  loadLazy(event: LazyLoadEvent) {
    console.log(1);
    let model: SearchAndListModel = new SearchAndListModel();
    model.global_filter = event.globalFilter;
    model.take = event.rows;
    model.skip = event.first;
    model.sortField = event.sortField;
    model.sortOrder = event.sortOrder == 1 ? "asc" : "desc";
    this.GetList(model);
  }
  // async GetcustomerList() {
  //   debugger
  //   this.customerList = await this.service.GetAll("customerList");
  //   console.log(this.customerList);
  // }

  Edit(id) {
    this.helper.redirectTo("Customer/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "CustomerDelete");
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
  { path: "", component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerListRoutingModule { }

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    ModuleData,
    CustomerListRoutingModule,
    TableModule
  ],
  providers: []
})
export class CustomerListModule { }
