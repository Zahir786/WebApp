import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CommonHelper } from 'src/Helper/CommonHelper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'waveapp';
  userRole = ['Super Admin', 'Admin']
  constructor(
    public helper: CommonHelper,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.SetTheme();
  }



  SetTheme() {
    let theme = this.helper.GetLocalStorage('theme');
    let menuStyle = this.helper.GetLocalStorage('menu');
    let body =  document.getElementsByTagName('BODY')[0];
    if(theme == 'dark') {
      body.classList.add('dark');
    }

    if(menuStyle == 'enlarged') {
      body.classList.add('enlarged');
    }
  }

}
