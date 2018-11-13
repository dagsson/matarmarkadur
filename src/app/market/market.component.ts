import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { IssueService } from '../issue.service';
=======
>>>>>>> origin/master

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

<<<<<<< HEAD
  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => {
    }) 
  }
=======
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

>>>>>>> origin/master
}
