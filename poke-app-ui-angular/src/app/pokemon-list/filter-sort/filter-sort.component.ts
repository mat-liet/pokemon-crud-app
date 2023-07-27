import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-filter-sort',
    templateUrl: './filter-sort.component.html',
    styleUrls: ['./filter-sort.component.css']
})
export class FilterSortComponent {

    @Input() filterString: string = '';

    @Output() newFilterEvent: EventEmitter<string> = new EventEmitter();

    @Input() sortString: string = 'name_asc';

    @Output() newSortEvent: EventEmitter<string> = new EventEmitter();

    getFilteredResults(event: string) {
        console.log('Filter changed:' + event);
        this.newFilterEvent.emit(event);
    }

    getSortedEvents(event: string) {
        console.log('Sort changed:' + event);
        this.newSortEvent.emit(event);
    }

}