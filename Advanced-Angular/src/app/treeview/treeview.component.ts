import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
    selector: "treeview-component",
    templateUrl: "./treeview.component.html",
    styleUrls: ["./treeview.component.scss"]
})

export class TreeViewComponent implements OnInit {
    public data: any[] = [
        {
            text: "Furniture",
            items: [
                { text: "Tables & Chairs" },
                { text: "Sofas" },
                { text: "Occasional Furniture" },
            ],
        },
        {
            text: "Decor",
            items: [
                { text: "Bed Linen" },
                { text: "Curtains & Blinds" },
                { text: "Carpets" },
            ],
        },
    ];

    public children = (dataitem: any): Observable<any[]> => of(dataitem.items);
    public hasChildren = (dataitem: any): boolean => !!dataitem.items;
    ngOnInit(): void {
     }
}