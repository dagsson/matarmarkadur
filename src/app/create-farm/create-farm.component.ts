import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';


@Component({
  selector: 'app-create-farm',
  templateUrl: './create-farm.component.html',
  styleUrls: ['./create-farm.component.css']
})
export class CreateFarmComponent implements OnInit {

  createForm: FormGroup;
  selectedFile: null;

  constructor(private issue: IssueService, private fb: FormBuilder, private router: Router) {
    const geo = this.fb.group({
      lon: [],
      lan: []
    })
    this.createForm = this.fb.group({
        ID: [null, Validators.required],
        Name: [null, Validators.required],
        Place: '',
        area: '',
        areaCode: '',
        Product: '',
        ProductII: '',
        Type: '',
        TypeII: '',
        TypeIII: '',
        TypeIV: '',
        Vottun: '',
        fm: '',
        email: [null, Validators.required],
        phone: '',
        about: '',
        lat: '',
        lon: ''
    });
  }



  addFarm(value) {
    this.issue.addIssue(value.ID, value.Name, value.Place, value.area, value.areaCode, value.Product, value.ProductII, value.Type, value.TypeII, value.TypeIII, value.TypeIV, value.Vottun, value.fm, value.email, value.phone, value.about, value.lat, value.lon).subscribe(() => {
      this.router.navigate(['/mainmap']);
    })
  }

  ngOnInit() {
  }

}
