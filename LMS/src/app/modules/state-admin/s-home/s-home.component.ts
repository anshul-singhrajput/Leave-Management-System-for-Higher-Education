import { Component } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { ChartType } from 'chart.js';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-s-home',
  templateUrl: './s-home.component.html',
  styleUrls: ['./s-home.component.css']
})
export class SHomeComponent {

  AA: number = 0;
  DA: number = 0;
  TA: number = 0;
  CL: number = 0;
  EL: number = 0;
  HPL: number = 0;
  RL: number = 0;
  Sname : any ;


  constructor(private ls: LeaveService) { }

    // ADD CHART OPTIONS.
    pieChartOptions = {
      responsive: true
    }

    pieChartLabels = ['TA', 'AA','DA'];

    public pieChartType: ChartType = 'pie';
 
    pieChartData: any = [
      {
        data: [this.TA, this.AA, this.DA]
      }
    ];

    public pieChartLegend = true;

    calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: [
        { title: 'Meeting', start: new Date() }
      ]
    };

  ngOnInit(): void {
    this.Sname =  sessionStorage.getItem('UserName');
    this. getAllApplicationData();
  }

  getAllApplicationData() {
    this.ls.getapplicationNo('leave/getALLApplication').subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
       this.TA = res.data[0][0].TA;
       this.AA = res.data[0][0].AA;
       this.DA = res.data[0][0].DA;
       this.CL = res.data[0][0].CL;
       this.EL = res.data[0][0].EL;
       this.HPL = res.data[0][0].HPL;
       this.RL = res.data[0][0].RL;


       this.pieChartData= [
        {
          data: [this.TA, this.AA, this.DA]
        }
      ];
      
      }
    })

  }

}
