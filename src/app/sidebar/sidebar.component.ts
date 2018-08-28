import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: String;

  constructor(private router: Router,private authService: AuthService,private data: DataService,private toasterService:ToasterService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
   }

   user = JSON.parse(sessionStorage.getItem('user'));
   loggedIn$:Object;
  ngOnInit() {
    this.data.getProfile().subscribe(
       data => this.loggedIn$ = data     
    )
  }

  logOut() {
    const clearAuth = () => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    };
    this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
  }

}
