export class CreateNodeDTO {
    parentId: any;
    nodeTitle: any;
    nodeType: any;
    constructor(parentId: any, data: any) {
        this.parentId = parentId;
        this.nodeTitle = data.nodeTitle;
        this.nodeType = data.nodeType;
    }
}