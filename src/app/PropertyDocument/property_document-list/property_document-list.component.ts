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
  selector: 'app-porperty_document-list',
  templateUrl: './property_document-list.component.html',
})
export class PorpertyDocumentListComponent implements OnInit {
  PorpertyDocumentList: any = [];
  PorpertyDocument: any = {};
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
      { field: 'date', header: 'Date' },
      { field: 'document_no', header: 'Document No' },
      { field: 'property', header: 'Property' },
      { field: 'customer', header: 'Customer' },
      { field: 'staff', header: 'Staff' },
    ];
    this.helper.ShowSpinner();
    //  await this.GetPorpertyDocumentList();
    this.helper.HideSpinner();
  }

  async GetList(model: SearchAndListModel = new SearchAndListModel()) {
    debugger
    console.log(2);
    this.helper.ShowSpinner();
    let params: any;
    let res = await this.service.CommonPost(model, "PropertyDocumentSearchAndList");
    console.log(res);
    this.PorpertyDocumentList = res["data"];
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
  // async GetPorpertyDocumentList() {
  //   debugger
  //   this.PorpertyDocumentList = await this.service.GetAll("PorpertyDocumentList");
  //   console.log(this.PorpertyDocumentList);
  // }

  Edit(id) {
    this.helper.redirectTo("PorpertyDocument/" + this.helper.Encrypt(id));
  }

  async Delete(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "PorpertyDocumentDelete");
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
  { path: "", component: PorpertyDocumentListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PorpertyDocumentListRoutingModule { }

@NgModule({
  declarations: [PorpertyDocumentListComponent],
  imports: [
    CommonModule,
    ModuleData,
    PorpertyDocumentListRoutingModule,
    TableModule
  ],
  providers: []
})
export class PorpertyDocumentListModule { }
