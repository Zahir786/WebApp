import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ConfirmationService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {
  Menu: any = [];
  CompanyData: any = [];
  CurrentCompanyData: any = {};
  appVertion: string;
  constructor(
    public helper: CommonHelper,
    private confirmationService: ConfirmationService
  ) {
    document.body.classList.remove("authentication-bg", "authentication-bg-pattern");
  }
  ngAfterViewInit() {

  }

  ngAfterContentInit() {

  }

  ngAfterViewChecked() {
  }

  ngOnInit() {
    let url = window.location.host;
    // this.appVertion = url.match(/uat/) ? "UAT" : "LIVE";
    this.Menu = [
      //Admin
      { Module: "Admin", Label: "Dashboard", RouterLink: "/Dashboard", Icon: "bi bi-house-door-fill", Visiable: true },
      { Module: "Admin", Label: "User", RouterLink: "/UserList", Icon: "fas fa-user-plus", Visiable: true },
      { Module: "Admin", Label: "Enquiry", RouterLink: "/EnquiryList", Icon: "fas fa-user-plus", Visiable: true },
      { Module: "Admin", Label: "Staff", RouterLink: "/StaffList", Icon: "fas fa-user-plus", Visiable: true },
      { Module: "Admin", Label: "Custmer", RouterLink: "/CustomerList", Icon: "fas fa-user-plus", Visiable: true },
      { Module: "Admin", Label: "Product & Service", RouterLink: "/ProductList", Icon: "fas fa-user-plus", Visiable: true },
      { Module: "Admin", Label: "Porperty Document", RouterLink: "/PorpertyDocumentList", Icon: "fas fa-user-plus", Visiable: true },
      // { Module: "Admin", Label: "Registration", RouterLink: "/RegistrationList", Icon: "fas fa-user-plus", Visiable: true },


      {
        Module: "Admin", Label: "Setup", RouterLink: "", Icon: "bi bi-gear-wide-connected", Visiable: true, ChildMenu: [

          { Module: "Admin", Label: "User Role", RouterLink: "/UserRoleList", Icon: "fas fa-user-plus", Visiable: true },
          { Module: "Admin", Label: "State", RouterLink: "/StateList", Icon: "fas fa-user-plus", Visiable: true },
          { Module: "Admin", Label: "Property", RouterLink: "/PropertyList", Icon: "fas fa-user-plus", Visiable: true },




        ]
      },
      // { Module: "Dashboard", Label: "Email Template", RouterLink: "/EmailTemplate", Icon: "bi bi-envelope", Visiable: true },
      //Admin
    ];
    this.Menu = this.Menu.filter(o => o.Visiable);
    this.Menu = this.Menu.filter(o => {
      if (o.ChildMenu) {
        o.ChildMenu = o.ChildMenu.filter(o => o.Visiable);
        return true;
      }
      else {
        return true;
      }
    });
    this.helper.RoleBasedMenu = this.Menu;
    this.FillLeftMenu();
    this.Jquery();

    // this.CompanyData = this.helper.GetUserInfo();
    // this.CurrentCompanyData = this.helper.GetCurrentCompany();
  }

  FillLeftMenu() {
    // this.LeftMenu = [
    //   { Icon: "fas fa-tachometer-alt", Name: "Dashboard", Link: "Dashboard", Child: false, Visible: true },

    //   {
    //     Icon: "fas fa-cog", Name: "Settings", Child: true, Visible: true,
    //     ChildList: [
    //       { Name: "User", Link: "UserList", Child: false, Visible: true },
    //       { Name: "Country", Link: "CountryList", Child: false, Visible: true },
    //       { Name: "State", Link: "StateList", Child: false, Visible: true },
    //       { Name: "Currency", Link: "CurrencyList", Child: false, Visible: true },
    //     ]
    //   },
    // ]
  }

  ShowCompanySelection(event) {
    let css: any = document.querySelector(".companySelectionPopOver");
    css.style.display = "block";
    event.stopPropagation();
  }

  HideCompanySelection(event) {
    let css: any = document.querySelector(".companySelectionPopOver");
    event.stopPropagation();
    css.removeAttribute("style");
  }

  SelectCompany(item, event) {
    this.helper.SetLocalStorage("CurrentCompany", item);
    this.CompanyData = this.helper.GetUserInfo();
    this.CurrentCompanyData = this.helper.GetCurrentCompany();
    let css: any = document.querySelector(".companySelectionPopOver");
    css.removeAttribute("style");
    event.stopPropagation();
    this.helper.redirectTo("Dashboard");
  }

  Jquery() {
    var This = this;
    $(function () {
      $('[data-toggle="popover"]').popover();
      $("#side-menu").metisMenu();
      $('.slimscroll-menu').slimscroll({
        height: 'auto',
        position: 'right',
        size: "8px",
        color: '#9ea5ab',
        wheelStep: 5,
        touchScrollStep: 20
      });

      $('.button-menu-mobile').on('click', function (event) {
        var $this = this;
        event.preventDefault();
        this.$body = $("body");
        this.$window = $(window);
        $this.$body.toggleClass('sidebar-enable');
        if ($this.$window.width() > 1200) {
          $this.$body.toggleClass('enlarged');
          This.menuStatus();
        } else {
          $this.$body.removeClass('enlarged');
        }
        $('.slimscroll-menu').slimscroll({
          height: 'auto',
          position: 'right',
          size: "8px",
          color: '#9ea5ab',
          wheelStep: 5,
          touchScrollStep: 20
        });
      });

    });
  }

  async Logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout?',
      accept: () => {
        this.helper.DeleteAllLocalStorage();
        window.location.reload();
        this.helper.redirectTo("Login");
      }
    });

  }

  async ChangePassword() {
    this.helper.redirectTo("ChangePassword/" + this.helper.Encrypt(this.helper.GetUserInfo()?.id));
  }
  // CHANGING DARK AND LIGHT THEME
  changeTheme() {
    let body = document.getElementsByTagName('BODY')[0];
    body.classList.toggle('dark');
    if (body.classList.contains("dark")) {
      this.helper.SetLocalStorage('theme', 'dark', false);
    } else {
      this.helper.SetLocalStorage('theme', 'light', false);
    }
  }

  menuStatus() {
    let body = document.getElementsByTagName('BODY')[0];
    if (body.classList.contains("enlarged")) {
      this.helper.SetLocalStorage('menu', 'enlarged', false);
    } else {
      this.helper.SetLocalStorage('menu', 'not-enlarged', false);
    }
  }

}


