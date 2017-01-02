import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";
@Injectable()
export class BourseService {
    societes: Array<any>;

    private basicSocieteUrl = "http://localhost:8080/api/societes";
    private societeUrl = "http://localhost:8080/api/societe/";
    private _totalPages: number = 0;
    private _totalOrdrePages: number = 0;

    constructor(private http: Http) {
    }

    get totalPages(): number {
        return this._totalPages;
    }

    set totalPages(value: number) {
        this._totalPages = value;
    }

    get totalOrdrePages(): number {
        return this._totalOrdrePages;
    }

    set totalOrdrePages(value: number) {
        this._totalOrdrePages = value;
    }

    getSocietes(page: number, size: number): Observable<any> {
        return this.http.get(this.basicSocieteUrl + "?page=" + page + "&size=" + size)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getOrdres(code: string, page: number, size: number): Observable<any> {
        return this.http.get(this.societeUrl + code + "/ordres/" + page + "/" + size)
            .map(res => {
                let body = res.json();
                this.totalOrdrePages = body.totalPages;
                return body.content;
            })
            .catch(this.handleError);
    }

    getInfos(code: string): Observable<any> {
        return this.http.get(this.societeUrl + code + "/infos/")
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getSociete(code: string): Observable<any> {
        return this.http.get(this.societeUrl + code)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        let body = res.json();
        this._totalPages = body.page.totalPages;
        return body._embedded.societes || {};
    }
}
