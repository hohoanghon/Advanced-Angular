import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpServerService {

    private REST_API_server = ['https://localhost:44382/api/Node', 'https://localhost:44382/api/Attribute'];
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    private refetchNodeInformation = new BehaviorSubject<any>(null);
    private refetchTreeview = new BehaviorSubject<any>(null);
    public currentNodeInformationData = this.refetchNodeInformation.asObservable();
    public currentTreeviewData = this.refetchTreeview.asObservable();

    constructor(private httpClient: HttpClient) { }

    /**
     * change current massage
     * @param massage 
     */
    changeMassage(massage: any) {
        this.refetchNodeInformation.next(massage);
    }

    changeStatus(massage: any) {
        this.refetchTreeview.next(massage);
    }

    /**
     * Get node list
     * @returns node list
     */
    public getNodes(): Observable<any> {
        const url = `${this.REST_API_server[0]}`;
        return this.httpClient.get<any>(url, this.httpOption);
    }

    /**
     * Get node by studentId
     * @param id : id of node
     * @returns info of node by id
     */
    public getNodeDetail(id: string): Observable<any> {
        const url = `${this.REST_API_server[0]}/${id}`;
        return this.httpClient.get<any>(url, this.httpOption);
    }

    /**
     * Add a new node
     * @param body payload to post
     * @returns posted data
     */
    public postNode(body: any): Observable<any> {
        const url = `${this.REST_API_server[0]}`;
        return this.httpClient.post<any>(url, body, this.httpOption).pipe(tap(() => this.refetchTreeview.next(body)));
    }

    public postAttribute(body: any): Observable<any> {
        const url = `${this.REST_API_server[1]}`;
        return this.httpClient.post<any>(url, body, this.httpOption).pipe(tap(() => this.refetchNodeInformation.next(body)));
    }

    /**
     * 
     * @param body new node data to update
     * @param id id of node to update
     * @returns updated data
     */
    public updateNode(body: any, id: string): Observable<any> {
        const url = `${this.REST_API_server[0]}/${id}`;
        return this.httpClient.put<any>(url, body, this.httpOption).pipe(tap(() => {
            this.refetchTreeview.next(body),
            this.refetchNodeInformation.next(body)
        }));
    }

    public updateAttribute(body: any, id: string): Observable<any> {
        const url = `${this.REST_API_server[1]}/${id}`;
        return this.httpClient.put<any>(url, body, this.httpOption).pipe(tap(() => this.refetchNodeInformation.next(body)));
    }

    /**
     * Delete node
     * @param id :id of the node you want to delete
     * @returns 
     */
    public deleteNode(id: string) {
        const url = `${this.REST_API_server[0]}/${id}`;
        return this.httpClient.delete<any>(url, this.httpOption).pipe(tap(() => this.refetchTreeview.next(id)));
    }

    public deleteAttribute(id: string, body: any) {
        const url = `${this.REST_API_server[1]}/${id}`;
        return this.httpClient.delete<any>(url, this.httpOption).pipe(tap(() => this.refetchNodeInformation.next(body)));
    }
}
