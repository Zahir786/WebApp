import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RactivevalidationDirective } from "src/Directives/ractivevalidation.directive";
import { NgPipesModule } from 'ngx-pipes';
import { AbsselectModule } from 'src/app/Shared/absselect/absselect.component';
import { ValidationModule } from '../app/Shared/Validation/validation.component';
import { GetSumValuePipe } from '../Pipe/GetSumValue.pipe';
import { GetArrayValuePipe } from '../Pipe/GetArrayValue.pipe';
import { ConfirmationService } from 'primeng/api';
import { ViewPasswordDirective } from 'src/Directives/view-password.directive';
import { RestrictCopyPasteDirective } from 'src/Directives/restrict-copy-paste.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    RactivevalidationDirective,
    GetSumValuePipe,
    GetArrayValuePipe,
    ViewPasswordDirective,
    RestrictCopyPasteDirective
  ],
  imports: [

  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AbsselectModule,
    RactivevalidationDirective,
    NgPipesModule,
    ValidationModule,
    GetSumValuePipe,
    GetArrayValuePipe,
    ConfirmDialogModule,
    ViewPasswordDirective,
    RestrictCopyPasteDirective
  ]
})
export class ModuleData { }
