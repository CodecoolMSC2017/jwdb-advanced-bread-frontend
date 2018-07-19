import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: String;

  constructor(private router: Router,private authService: AuthService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
   }

  ngOnInit() {
  }

  logOut() {
    const clearAuth = () => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    };
    this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
  }

}
