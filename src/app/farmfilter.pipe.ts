import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(farms: any[], term: any): any {
        if (term === undefined) return farms;
        return farms.filter(function(farm) {
            return farm.properties.name.toLowerCase().indexOf(term.toLowerCase()) !== -1});
        }
    }
