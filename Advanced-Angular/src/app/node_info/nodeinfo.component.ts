import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UpdateNodeDTO } from "../models/updateNodeDTO";
import { HttpServerService } from "../services/http-server.service";
import { CreateNodeDTO } from "../models/createNodeDTO";

@Component({
    selector: "node-info-component",
    templateUrl: "./nodeinfo.component.html",
    styleUrls: ["./nodeinfo.component.scss"]
})

export class NodeInfoComponent implements OnInit, OnDestroy {
    public getNodeService: any = null;
    public submitStatus: any = null;
    public checkMassageService: any = null;
    public dataGrid: any[] = [];
    public dropdownDisabled: boolean = false;
    public currentNodeId: any = null;
    public currentParentId: any = null;
    public nodeTitleValue: any = null;
    public nodeTypeValue: any = null;
    public updateNodeDto: any;
    public createNodeDto: any;
    public updateNodeInfoForm: FormGroup;
    public types: Array<string> = [
        "Folder",
        "File"
    ];

    /**
     * constructor
     * @param httpServerService
     * @param changeDetectorRef 
     */
    constructor(
        private httpServerService: HttpServerService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.updateNodeInfoForm = new FormGroup({
            nodeTitle: new FormControl('', [Validators.required, Validators.pattern("^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]),
            nodeType: new FormControl('', [Validators.required])
        });

        this.updateNodeInfoForm.markAsPristine
    }

    /**
     * Submit form update
     */
    onSubmit() {
        if (this.submitStatus == 'new') {
            this.createNodeDto = new CreateNodeDTO(this.currentNodeId, this.updateNodeInfoForm.value);
            this.httpServerService.postNode(this.createNodeDto).subscribe();
        }
        else {
            this.updateNodeDto = new UpdateNodeDTO(this.currentNodeId, this.updateNodeInfoForm.value, this.currentParentId);
            this.httpServerService.updateNode(this.updateNodeDto, this.currentNodeId).subscribe();
        }
    }

    ngOnInit(): void {
        this.dropdownDisabled = true;
        this.checkMassageService = this.httpServerService.currentNodeInformationData.subscribe(data => {
            this.submitStatus = data;
            if (data != 'new' && data) {
                this.currentNodeId = data.nodeId;
                this.getNodeService = this.httpServerService.getNodeDetail(data.nodeId).subscribe(
                    item => {
                        this.nodeTitleValue = item.nodeTitle;
                        this.nodeTypeValue = item.nodeType;
                        this.currentParentId = item.parentId;
                        this.dataGrid = item.attributes;
                        if (this.nodeTypeValue == 'Folder' && data.childNodes?.length > 0) this.dropdownDisabled = true
                        else this.dropdownDisabled = false;
                        this.changeDetectorRef.detectChanges();
                    }
                );
            }
            else if (data == 'new') {
                this.nodeTitleValue = null;
                this.dataGrid = [];
                this.dropdownDisabled = false;
                // this.submitStatus = data;
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    /**
     * destroy component
     */
    ngOnDestroy(): void {
        this.checkMassageService.unsubcribe();
        this.getNodeService.unsubcribe();
    }
}