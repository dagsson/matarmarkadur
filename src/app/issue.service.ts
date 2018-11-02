import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000'
 
  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/Farm`)
  }
}
