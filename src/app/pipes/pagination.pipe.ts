import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

    public transform(value: any[], page): any {
        try {
            return [...value.slice(5 * (page - 1), 5 * (page))]
        } catch (error) {}
    }
}
