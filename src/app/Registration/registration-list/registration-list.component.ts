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
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
})
export class RegistrationListComponent implements OnInit {
  registrationList: any = [];
  registration: any = {};
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
    //  await this.GetregistrationList();
    this.helper.HideSpinner();
  }

  async GetList(model: SearchAndListModel = new SearchAndListModel()) {
    debugger
    console.log(2);
    this.helper.ShowSpinner();
    let res: any = [];
    res = await this.service.CommonPost(model, "RegistrationSearchAndList");
    console.log(res);
    this.registrationList = res["data"];
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
  // async GetregistrationList() {
  //   debugger
  //   this.registrationList = await this.service.GetAll("registrationList");
  //   console.log(this.registrationList);
  // }

  Edit(id) {
    this.helper.redirectTo("Registration/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "RegistrationDelete");
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
  { path: "", component: RegistrationListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationListRoutingModule { }

@NgModule({
  declarations: [RegistrationListComponent],
  imports: [
    CommonModule,
    ModuleData,
    RegistrationListRoutingModule,
    TableModule
  ],
  providers: []
})
export class RegistrationListModule { }
