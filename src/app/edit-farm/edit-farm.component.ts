import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  styleUrls: ['./edit-farm.component.css']
})
export class EditFarmComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
    this.updateForm = this.fb.group({
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('ID').setValue(this.issue.properties.id);
        this.updateForm.get('Name').setValue(this.issue.properties.name);
        this.updateForm.get('Place').setValue(this.issue.properties.place);
        this.updateForm.get('area').setValue(this.issue.properties.area);
        this.updateForm.get('areaCode').setValue(this.issue.properties.areacode);
        this.updateForm.get('Product').setValue(this.issue.properties.product);
        this.updateForm.get('ProductII').setValue(this.issue.properties.byproduct);
        this.updateForm.get('Type').setValue(this.issue.properties.type);
        this.updateForm.get('TypeII').setValue(this.issue.properties.typeii);
        this.updateForm.get('TypeIII').setValue(this.issue.properties.typeiii);
        this.updateForm.get('TypeIV').setValue(this.issue.properties.typeiv);
        this.updateForm.get('Vottun').setValue(this.issue.properties.cert);
        this.updateForm.get('fm').setValue(this.issue.properties.bfb);
        this.updateForm.get('email').setValue(this.issue.properties.email);
        this.updateForm.get('phone').setValue(this.issue.properties.phone);
        this.updateForm.get('about').setValue(this.issue.properties.about);
        this.updateForm.get('lat').setValue(this.issue.geometry.coordinates[0]);
        this.updateForm.get('lon').setValue(this.issue.geometry.coordinates[1]);
      })
    })
  }

  updateFarm(value) {
    this.issueService.updateIssue(this.id, value.ID, value.Name, value.Place, value.area, value.areaCode, value.Product, value.ProductII, value.Type, value.TypeII, value.TypeIII, value.TypeIV, value.Vottun, value.fm, value.email, value.phone, value.about, value.lat, value.lon).subscribe(() => {
      this.router.navigate(['/mainmap']);
  });
}

}
