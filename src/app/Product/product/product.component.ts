import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ModuleData } from 'src/Helper/Modules';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  ProductData: any = {};
  ProductForm: FormGroup;
  ProductId: number = 0;
  Categorydropdown: any = {};
  packagePlanList: [];
  nameRegex: RegExp = /^[a-zA-Z \s]*$/;
  mobileRegex: RegExp = /^[\d \+]$/;
  constructor(
    private service: CommonService,
    public helper: CommonHelper,
    private route: ActivatedRoute,
    public commonservice: CommonService,
    private formbuilder: FormBuilder
  ) { }
  async ngOnInit() {
    this.ProductId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.ProductForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      category: new FormControl('', Validators.compose([Validators.required])),
    });

    this.helper.ShowSpinner();
    await this.GetProductData();
    await this.CategorydropdownList();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.ProductForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }
  ProductValidationMessages = {
    'name': [{ type: 'required', message: 'Enter name.' }],
    'description': [{ type: 'required', message: 'Enter description.' }],
    'category': [{ type: 'required', message: 'Enter category.' }],
  };
  async GetProductData() {
    if (this.ProductId > 0) {
      this.ProductData = await this.service.GetById(this.ProductId, "ProductById");
    }
  }

  async CategorydropdownList() {
    this.Categorydropdown = [];
    this.Categorydropdown.push({ id: 1, name: 'Product' },
      { id: 2, name: 'Service' });
    // this.UserRoledropdown = res.filter(obj => ['2', '3'].includes(obj.id));
    if (this.ProductId == 0 && this.Categorydropdown.length > 0) {
      this.ProductData.category = this.Categorydropdown[0].name;
    }
  }

  async Save() {
    if (this.ProductForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.ProductId > 0) {
        res = await this.service.CommonPost(this.ProductData, "ProductUpdate");
      }
      else {
        console.log(this.ProductData);
        res = await this.service.CommonPost(this.ProductData, "ProductInsert");
      }
      console.log(res);
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("ProductList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.ProductForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ModuleData,
    ProductRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    TooltipModule,
    InputSwitchModule

  ]
})
export class ProductModule { }
