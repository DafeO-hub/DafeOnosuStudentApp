import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/shared/services/global.service';

@Injectable()
export class StudentService {
    public createOrEditDialog = new Subject<any>();
    public label = new BehaviorSubject('');

    // event handler
    public onOkay = new Subject<void>();

    private url = this.globals.baseApiUrl + '/students';

    public constructor(
        public http: HttpClient,
        public globals: GlobalService
    ) {
        //
    }

    showCreateOrEditDialog(params?: any, callback?: any) {
        this.createOrEditDialog.next({
            data: params, callback
        });
    }

    hideCreateOrEditDialog() {
        // this.createOrEditDialog.next(null);
    }

    addEventHandler(event: any) {
        this.onOkay.next(event);
    }

    getAll(): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/getall').subscribe(
                (response: any) => {
                    resolve({
                        data: response.List
                    });
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    get(param: any): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/get/' + param).subscribe(
                (response: any) => {
                    resolve(response.Details);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    create(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/create', params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    update(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/update', params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    delete(id?: any): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/delete/' + id).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    generateCSV(): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/generate-csv').subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    downloadCSV(): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/download-csv', {
                responseType: 'blob'
            }).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

}