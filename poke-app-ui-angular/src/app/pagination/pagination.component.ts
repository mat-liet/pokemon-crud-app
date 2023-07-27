import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

    @Input() currentPage: number = 1;
    @Input() totalPages: number = 0;
    @Output() newPage = new EventEmitter();

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Changes: ' + changes);
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.newPage.emit(this.currentPage);
        console.log(`Page changed to ${page}`);
    }

    isNextDisabled() {
        return Math.ceil(this.totalPages / 12) <= this.currentPage;
    }

}