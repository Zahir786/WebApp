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
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
})
export class EnquiryListComponent implements OnInit {
  enquiryList: any = [];
  enquiry: any = {};
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
      { field: 'phone_no', header: 'Phone No' },
    ];
    this.helper.ShowSpinner();
    //  await this.GetEnquiryList();
    this.helper.HideSpinner();
  }

  async GetList(model: SearchAndListModel = new SearchAndListModel()) {
    debugger
    console.log(2);
    this.helper.ShowSpinner();
    let params: any;
    let res = await this.service.CommonPost(model, "EnquirySearchAndList");
    console.log(res);
    this.enquiryList = res["data"];
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
  // async GetEnquiryList() {
  //   debugger
  //   this.enquiryList = await this.service.GetAll("EnquiryList");
  //   console.log(this.enquiryList);
  // }

  Edit(id) {
    this.helper.redirectTo("Enquiry/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "EnquiryDelete");
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
  { path: "", component: EnquiryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryListRoutingModule { }

@NgModule({
  declarations: [EnquiryListComponent],
  imports: [
    CommonModule,
    ModuleData,
    EnquiryListRoutingModule,
    TableModule
  ],
  providers: []
})
export class EnquiryListModule { }
