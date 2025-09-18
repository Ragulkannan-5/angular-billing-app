import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Input() expanded: boolean = true;
constructor(private router: Router){

}
navigatetopage(route:any) {
    this.router.navigate([route], {
      state: {
      }
    });
  }
}
