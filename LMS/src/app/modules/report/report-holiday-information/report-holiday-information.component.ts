import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-holiday-information',
  templateUrl: './report-holiday-information.component.html',
  styleUrls: ['./report-holiday-information.component.css']
})
export class ReportHolidayInformationComponent {

  constructor(private fb: FormBuilder, private _ARoute: ActivatedRoute, private _router: Router, public S: LeaveService) { }

  loading: boolean = false; 
  content: boolean = false;

  title = 'angular-app';
  fileName = 'HolidayInformationReport.xlsx';

  HolidayReport = [{HolidayReasonEng:"", HolidayDate:"", CurrentYear:"", Day:""}]

    // for label name display 
    HolidayTypeFormater: any = {
      2: "सामान्य अवकाश",
      3: "ऐच्छिक अवकाश",
    }

    // variable declaration
    HolidayType: number = 0;
    Year: string = "";

    ngOnInit(): void {

      this.content = sessionStorage.getItem("UserCode") != null ? true : false;
  
      this.loading = true;
  
      this.HolidayType = 2;
  
     // this.Year = "2021";
  
      this.BindHoliday(2);
  
      this.loading = false;
  
    }

  onSelectedRadio(event: any) {

    if (event.target.value == "2") {
      this.HolidayType = 2;
    }
    else if (event.target.value == "3") {
      this.HolidayType = 3;
    }

    let id = event.target.value;

    this.BindHoliday(id);

  }

  BindHoliday(id: number) {

    this.S.getHolidayInformation('leaveService/getHolidayInformation/',id).subscribe(
      (res:any) => {
        console.log(res);
        if(res.status == 200){

          this.HolidayReport = res.data[0];

          this.Year = this.HolidayReport[0].CurrentYear;
  
          this.loading = false;
        }
      })
  }

  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  Print(cmpName : any) {
    // window.print();
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  }

}
