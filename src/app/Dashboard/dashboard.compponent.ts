import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ModuleData } from 'src/Helper/Modules';
import { CalendarModule } from 'primeng/calendar';
import { DateFormat } from 'src/Helper/DateFormat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  data: any;
  chartOptions: any;
  Labdata: any;
  LabLinedata: any;
  System: number;
  Lab_Total: number;
  Lab_value: number;
  Sysyem_date: any = [];
  Routerdata: any;
  RouterLinedata: any;
  RouterSystem: number;
  Router_Total: number;
  Router_value: number;
  Router_date: any = [];
  Switchdata: any;
  SwitchSystem: number;
  Switch_Total: number;
  Switch_value: number;
  Switch_date: any = [];
  SwitchLinedata: any;
  Hostsdata: any;
  HostsSystem: number;
  Hosts_Total: number;
  Hosts_value: number;
  Hosts_date: any = [];
  HostsLinedata: any;
  LabchartOptions: any;
  basicData: any;
  basicOptions: any;
  Labdropdown: any = [];
  lab_id: number;
  From_date: any;
  To_date: any;
  Date: any;
  constructor(
    public helper: CommonHelper,
    private service: CommonService,
  ) { }
  async ngOnInit() {
    this.From_date = new Date();
    this.To_date = new Date();
    this.Date = new Date();
    await this.LabdropdownList();

    // this.data = {
    //   labels: ['Managed', 'Unmanaged'],
    //   datasets: [
    //     {
    //       data: [300, 50],
    //       backgroundColor: [
    //         "#66BB6A",
    //         "#ff0000"
    //       ],
    //       hoverBackgroundColor: [
    //         "#64B5F6",
    //         "#FFB74D"
    //       ]
    //     }
    //   ]
    // };
    // this.basicData = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'Routers',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       fill: false,
    //       borderColor: '#42A5F5',
    //       tension: .4
    //     }
    //   ]
    // };
  }

  async GetLabChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.Date) },
    ];
    console.log(params);
    let res = await this.service.GetWithParameter("DashboardLablist", params);
    console.log(res);
    // let value = res[0].countt.split(",");
    // this.Lab_value = value[0];
    this.System = res[0].systems;
    this.Lab_Total = res[0].total;
    this.Labdata = {
      labels: JSON.parse("[" + res[0].percentage + "]"),
      datasets: [
        {
          data: JSON.parse("[" + res[0].countt + "]"),
          backgroundColor: [
            "#66BB6A",
            "#FFB74D",
            "#64B5F6",
            "#ff0000",
            "#42A5F5",
            "#FFA726",
            "#26C6DA",
            "#7E57C2",
            "#495057",
            '#ebedef'
          ],
        }
      ]
    };
  }

  async GetLabLineChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.From_date) },
      { params: DateFormat.FormatDate(this.To_date) },
    ];
    let res = await this.service.GetWithParameter("DashboardLabLinelist", params);
    if (res) {
      const result = res[0].datee?.split(',') || [];
      this.Sysyem_date = result;
      this.LabLinedata = {
        labels: result,
        datasets: [
          {
            label: 'System-PC',
            data: JSON.parse("[" + res[0].percentage + "]"),
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      };
    }

  }

  async GetRouterChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.Date) },
    ];
    let res = await this.service.GetWithParameter("DashboardRouterlist", params);
    // let value = res[0].countt.split(",");
    // this.Router_value = value[0];
    this.RouterSystem = res[0].systems;
    this.Router_Total = res[0].total;
    this.Routerdata = {
      labels: JSON.parse("[" + res[0].percentage + "]"),
      datasets: [
        {
          data: JSON.parse("[" + res[0].countt + "]"),
          backgroundColor: [
            "#66BB6A",
            "#FFB74D",
            "#64B5F6",
            "#ff0000",
            "#42A5F5",
            "#FFA726",
            "#26C6DA",
            "#7E57C2",
            "#495057",
            '#ebedef'
          ],
        }
      ]
    };
  }

  async GetRouterLineChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.From_date) },
      { params: DateFormat.FormatDate(this.To_date) },
    ];
    let res = await this.service.GetWithParameter("DashboardRouterLinelist", params);
    if (res) {
      const result = res[0].datee?.split(',') || [];
      this.Router_date = result;
      this.RouterLinedata = {
        labels: result,
        datasets: [
          {
            label: 'Router',
            data: JSON.parse("[" + res[0].percentage + "]"),
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      };
    }

  }

  async GetSwitchChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.Date) },
    ];
    let res = await this.service.GetWithParameter("DashboardSwitchlist", params);
    console.log(res);
    // let value = res[0].countt.split(",");
    // this.Switch_value = value[0];
    this.SwitchSystem = res[0].systems;
    this.Switch_Total = res[0].total;
    this.Switchdata = {
      labels: JSON.parse("[" + res[0].percentage + "]"),
      datasets: [
        {
          data: JSON.parse("[" + res[0].countt + "]"),
          backgroundColor: [
            "#66BB6A",
            "#FFB74D",
            "#64B5F6",
            "#ff0000",
            "#42A5F5",
            "#FFA726",
            "#26C6DA",
            "#7E57C2",
            "#495057",
            '#ebedef'
          ],
        }
      ]
    };
  }

  async GetSwitchLineChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.From_date) },
      { params: DateFormat.FormatDate(this.To_date) },
    ];
    let res = await this.service.GetWithParameter("DashboardSwitchLinelist", params);
    if (res) {
      const result = res[0].datee?.split(',') || [];
      this.Switch_date = result;
      this.SwitchLinedata = {
        labels: result,
        datasets: [
          {
            label: 'Switch',
            data: JSON.parse("[" + res[0].percentage + "]"),
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      };
    }

  }

  async GetHostsChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.Date) },
    ];
    let res = await this.service.GetWithParameter("DashboardHostslist", params);
    // let value = res[0].countt.split(",");
    // this.Hosts_value = value[0];
    this.HostsSystem = res[0].systems;
    this.Hosts_Total = res[0].total;
    this.Hostsdata = {
      labels: JSON.parse("[" + res[0].percentage + "]"),
      datasets: [
        {
          data: JSON.parse("[" + res[0].countt + "]"),
          backgroundColor: [
            "#66BB6A",
            "#FFB74D",
            "#64B5F6",
            "#ff0000",
            "#42A5F5",
            "#FFA726",
            "#26C6DA",
            "#7E57C2",
            "#495057",
            '#ebedef'
          ],
        }
      ]
    };
  }

  async GetHostsLineChartList() {
    let params: any;
    params = [
      { params: this.lab_id },
      { params: DateFormat.FormatDate(this.From_date) },
      { params: DateFormat.FormatDate(this.To_date) },
    ];
    let res = await this.service.GetWithParameter("DashboardHostsLinelist", params);
    if (res) {
      const result = res[0].datee?.split(',') || [];
      this.Hosts_date = result;
      this.HostsLinedata = {
        labels: result,
        datasets: [
          {
            label: 'Access Points',
            data: JSON.parse("[" + res[0].percentage + "]"),
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      };
    }

  }

  async LabdropdownList() {
    this.Labdropdown = [];
    let res = await this.service.GetAll("LabList");
    this.Labdropdown = res;
  }

  async Submit() {
    console.log(this.lab_id);
    console.log(this.Date);
    console.log(this.From_date);
    console.log(this.To_date);
    await this.GetLabChartList();
    await this.GetRouterChartList();
    await this.GetSwitchChartList();
    await this.GetHostsChartList();
    await this.GetLabLineChartList();
    await this.GetRouterLineChartList();
    await this.GetSwitchLineChartList();
    await this.GetHostsLineChartList();

  }

  async labChangeEvent(event) {
    // await this.GetLabChartList();
    // await this.GetRouterChartList();
    // await this.GetSwitchChartList();
    // await this.GetHostsChartList();
    // await this.GetLabLineChartList();
    // await this.GetRouterLineChartList();
    // await this.GetSwitchLineChartList();
    // await this.GetHostsLineChartList();
  }

}

const routes: Routes = [
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ModuleData,
    DashboardRoutingModule,
    TableModule,
    ProgressBarModule,
    ChartModule,
    DropdownModule,
    CalendarModule
  ]
})
export class DashboardModule { }
