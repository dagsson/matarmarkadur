import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => {
      console.log(issues);
    }) 
  }
}
