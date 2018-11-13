import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  subissue = {};

  uri = 'http://localhost:3000'
 
  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/farm`)
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/farm/${id}`)
  }

  addIssue(ID, Name, Place, area, areaCode, Product, ProductII, Type, TypeII, TypeIII, TypeIV, Vottun, fm, email, phone, about, lan, long) {
    const issue = {
      type: 'Feature',
      properties: {
        id: ID,
        name: Name,
        place: Place,
        area: area,
        areacode: areaCode,
        product: Product,
        byproduct: ProductII,
        type: Type,
        typeii: TypeII,
        typeiii: TypeIII,
        typeiv: TypeIV,
        cert: Vottun,
        bfb: fm,
        email: email,
        phone: phone,
        about: about
      },
      geometry: {
        coordinates: [lan, long],
        type: 'Point'
      }
    };

    return this.http.post(`${this.uri}/farm/add`, issue);
  }

  updateIssue(id, ID, Name, Place, area, areaCode, Product, ProductII, Type, TypeII, TypeIII, TypeIV, Vottun, fm, email, phone, about, lan, long) {
    const issue = {
      type: 'Feature',
      properties: {
        id: ID,
        name: Name,
        place: Place,
        area: area,
        areacode: areaCode,
        product: Product,
        byproduct: ProductII,
        type: Type,
        typeii: TypeII,
        typeiii: TypeIII,
        typeiv: TypeIV,
        cert: Vottun,
        bfb: fm,
        email: email,
        phone: phone,
        about: about
      },
      geometry: {
        coordinates: [lan, long],
        type: 'Point'
      }
    };
    return this.http.post(`${this.uri}/farm/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/farm/delete/${id}`);
  }
}
