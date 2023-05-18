import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "node-info-component",
    templateUrl: "./nodeinfo.component.html",
    styleUrls: ["./nodeinfo.component.scss"]
})

export class NodeInfoComponent implements OnInit {
    public updateNodeInfoForm: FormGroup;
    public types: Array<string> = [
        "Folder",
        "File"
    ];
    public dataGrid = [
        {
            id: 1,
            name: "horizontalRuleIcon",
            desc: "this is desc"
        }
    ]

    constructor() {
        this.updateNodeInfoForm = new FormGroup({
            nodeTitle: new FormControl('', [Validators.required]),
            nodeType: new FormControl('', [Validators.required]),
        });
    }

    onSubmit() { }

    ngOnInit(): void { }
}