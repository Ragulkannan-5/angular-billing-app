import { Component } from '@angular/core';
import { CommonService } from '../../commonservice/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
opened : boolean = true;
events: string[] = [];
constructor(public commonService : CommonService){

}
}
