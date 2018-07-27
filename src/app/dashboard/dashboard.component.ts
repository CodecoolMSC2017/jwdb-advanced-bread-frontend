import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  deleteAuth() {
    const clearAuth = () => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    };
    this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
  }
}
