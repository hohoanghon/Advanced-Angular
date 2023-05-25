import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpServerService } from "../services/http-server.service";
import { TreeItem } from "@progress/kendo-angular-treeview";
const is = (fileName: string, ext: string) =>
    new RegExp(`.${ext}\$`).test(fileName);

@Component({
    selector: "treeview-component",
    templateUrl: "./treeview.component.html",
    styleUrls: ["./treeview.component.scss"]
})

export class TreeViewComponent implements OnInit, OnDestroy {
    constructor(
        private httpServerService: HttpServerService
    ) { }

    public getNodeListService: any = null;
    public data: any[] = [];
    public selectedKeys: string[] = [];
    public currentNode: any = null;
    public statusButton: any = null;

    /**
     * icon of node
     * @param param0 node title, node type
     * @returns 
     */
    public iconClass({ nodeTitle, nodeType }: any): any {
        return {
            "k-i-file-pdf": is(nodeTitle, "pdf"),
            "k-i-folder": nodeType == "Folder",
            "k-i-code": nodeType == "File",
            "k-i-image": is(nodeTitle, "jpg|png"),
            "k-icon": true,
        };
    }

    ngOnInit(): void {
        this.httpServerService.currentTreeviewData.subscribe(() => {
            this.getNodeListService = this.httpServerService.getNodes().subscribe(data => this.data = data);
        })
    }

    /**
     * refresh node
     */
    private refreshNode(): void {
        const selectedKeys = this.selectedKeys.join().replace(/_/g, "");
        this.currentNode = this.data[Number(selectedKeys[0])];
        for (var i = 0; i < selectedKeys.length - 1; i++) {
            this.currentNode = this.currentNode.childNodes[Number(selectedKeys[i + 1])];
        }
    }

    /**
     * change node
     * @param event 
     */
    public onSelectionChange(event: TreeItem) {
        this.httpServerService.changeMassage(event.dataItem);
    }

    addNodeHandler() {
        this.httpServerService.changeMassage('new');
    }

    deleteNodeHandler() {
        let nodeId: any;
        this.httpServerService.currentNodeInformationData.subscribe(data => {
            nodeId = data.nodeId;
        })
        this.httpServerService.deleteNode(nodeId).subscribe();
        this.httpServerService.changeMassage('new');
    }

    ngOnDestroy(): void {

    }
}