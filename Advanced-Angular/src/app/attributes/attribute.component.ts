import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from "@progress/kendo-angular-grid";
import { CreateAttributeDto } from "../models/createAttributeDTO";
import { HttpServerService } from "../services/http-server.service";

@Component({
    selector: "attribute-component",
    templateUrl: "./attribute.component.html",
    styleUrls: ["./attribute.component.scss"]
})

export class AttributeComponent implements OnInit {
    @Input() currentNodeId = '';
    @Input() submitStatus = '';
    @Input() dataGrid: any[] = [];

    private editedRowIndex: number | undefined;
    public formGroupUpdate: FormGroup | undefined;
    public formGroup: FormGroup | undefined;


    constructor(
        private httpServerService: HttpServerService,
    ) { }

    /**
     * add new attribute
     * @param args add event
     */
    public addHandler(args: AddEvent): void {
        this.closeEditor(args.sender);
        this.formGroup = new FormGroup({
            attributeName: new FormControl("", [Validators.required]),
        }),
            args.sender.addRow(this.formGroup);
    }

    /**
     * update data in row into database
     * @param param0 save event
     */
    public saveHandler({ sender, rowIndex, isNew, dataItem }: SaveEvent): void {
        const body = new CreateAttributeDto(this.currentNodeId, this.formGroup?.value);
        if (isNew) {
            this.httpServerService.postAttribute(body).subscribe();
        }
        else {
            this.httpServerService.updateAttribute(body, dataItem.attributeId).subscribe();
        }
        sender.closeRow(rowIndex);
    }

    /**
     * close input in table
     * @param grid grid comp
     * @param rowIndex no of row
     */
    private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    /**
     * edit attribute
     * @param args edit event
     */
    public editHandler(args: EditEvent): void {
        const { dataItem } = args;
        this.closeEditor(args.sender);

        this.formGroup = new FormGroup({
            attributeName: new FormControl(dataItem.attributeName)
        });

        this.editedRowIndex = args.rowIndex;
        args.sender.editRow(args.rowIndex, this.formGroup);
    }

    /**
     * remove attribute
     * @param args remove event
     */
    public removeHandler(args: RemoveEvent): void {
        this.httpServerService.deleteAttribute(args.dataItem.attributeId, args.dataItem).subscribe();
    }

    /**
     * cancel command
     * @param args cancel event
     */
    public cancelHandler(args: CancelEvent): void {
        this.closeEditor(args.sender, args.rowIndex);
    }

    ngOnInit(): void {
    }
}