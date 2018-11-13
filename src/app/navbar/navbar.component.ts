import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
<<<<<<< HEAD
declare var $ : any;
=======
>>>>>>> origin/master

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

<<<<<<< HEAD

=======
>>>>>>> origin/master
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
<<<<<<< HEAD
    $(document).ready(function () {
      $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
      });
    });
=======
>>>>>>> origin/master
  }

}
