import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgSIconComponent } from "../icons/icon.component";
import { CommonModule } from "@angular/common";
import { NgSInputComponent, NgSSelectInput } from "../input/input.component";
import { NgSLangPipe } from "../../pipes/lang.pipe";

@Component({
    templateUrl: "./pagination.component.html",
    selector: "ngs-pagination",
    standalone: true,
    imports: [NgSIconComponent, CommonModule, NgSInputComponent, NgSLangPipe]
})
export class NgSPaginationComponent {

    @Input("pagination")
    public pagination: NgSPagination<any> = new NgSPagination<any>();

    @Input("enablePageSize")
    public enablePageSize: boolean = false;

    @Input("pageSize")
    public pageSize: number = 25;

    @Input("pageSizeOptions")
    public pageSizeOptions: number[] = [10, 25, 50, 100];

    @Output("onPageChange")
    public onPageChange = new EventEmitter<NgSPaginationRequest>();

    public pageSizeInput: NgSSelectInput = new NgSSelectInput("", "size").setStandalone(true) as NgSSelectInput;

    constructor() {
        if (!this.pageSizeOptions.includes(this.pageSize)) {
            this.pageSizeOptions.push(this.pageSize);
        }
        this.pageSizeOptions.sort((a, b) => a - b);
        this.pageSizeInput.addOptions(this.pageSizeOptions.map((value) => { return { value: value.toString(), label: value.toString() } }));
        this.pageSizeInput.select({
            value: this.pageSize.toString(),
            label: this.pageSize.toString()
        });
        this.pageSizeInput.onInput = () => {
            this.setPageSize(parseInt(this.pageSizeInput.value));
        }
    }

    get pages(): number[] {
        const currentPage = this.pagination.page;
        const totalPages = this.pagination.pages;
        const pagesToShow = 5;

        let firstPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2) + 1);
        let lastPage = Math.min(totalPages, firstPage + pagesToShow - 1);

        if (lastPage - firstPage + 1 < pagesToShow) {
            firstPage = Math.max(1, lastPage - pagesToShow + 1);
        }

        const pages = [];
        for (let i = firstPage; i <= lastPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    get hasPrevious(): boolean {
        return this.pagination.page > 0;
    }

    get hasNext(): boolean {
        return this.pagination.page < this.pagination.pages - 1;
    }

    public setPageSize(pageSize: number): void {
        this.pageSize = pageSize;
        this.onPageChange.emit({
            page: this.pagination.page,
            size: this.pageSize
        });
    }

    public setPage(page: number): void {
        this.pagination.page = page;
        this.onPageChange.emit({
            page: this.pagination.page,
            size: this.pageSize
        });
    }

    public previous(): void {
        if (this.hasPrevious) {
            this.setPage(this.pagination.page - 1);
        }
    }

    public next(): void {
        if (this.hasNext) {
            this.setPage(this.pagination.page + 1);
        }
    }

}

export class NgSPaginationRequest {
    public page: number = 0;
    public size: number = 25;
}

export class NgSPagination<T> {
    public page: number = 0;
    public pages: number = 0;
    public size: number = 25;
    public elements: T[] = [];
}