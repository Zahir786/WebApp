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
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {
  staffList: any = [];
  staff: any = {};
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
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile_no', header: 'Phone No' },
    ];
    this.helper.ShowSpinner();
    await this.GetstaffList();
    this.helper.HideSpinner();
  }


  async GetstaffList() {
    debugger
    this.staffList = await this.service.GetAll("StaffList");
    console.log(this.staffList);
  }

  Edit(id) {
    this.helper.redirectTo("Staff/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "StaffDelete");
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
  { path: "", component: StaffListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffListRoutingModule { }

@NgModule({
  declarations: [StaffListComponent],
  imports: [
    CommonModule,
    ModuleData,
    StaffListRoutingModule,
    TableModule
  ],
  providers: []
})
export class StaffListModule { }
