import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
      });
    });
  }

}
