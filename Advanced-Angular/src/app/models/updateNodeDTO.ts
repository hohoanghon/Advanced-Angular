export class UpdateNodeDTO {
    nodeId: any
    nodeTitle: any;
    nodeType: any;
    parentId: any;
    constructor(nodeId: any, data: any, parentId: any) {
        this.nodeId = nodeId;
        this.nodeTitle = data.nodeTitle;
        this.nodeType = data.nodeType;
        this.parentId = parentId;
    }
}