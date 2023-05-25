export class CreateAttributeDto {
    nodeId: any
    attributeName: any;
    constructor(nodeId: any, data: any) {
        this.nodeId = nodeId;
        this.attributeName = data.attributeName;
    }
}