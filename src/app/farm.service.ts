import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FARMS } from './mock-farms';
import { GeoJson } from './map';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor() { }

  getFarms() {
    return of(FARMS);
  }

  getFarm(id: number): Observable<GeoJson> {
    return of(FARMS.features.find(farm => farm.properties.id === id));
  }

}
