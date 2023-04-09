import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'lib-BlackIP',
    templateUrl: './BlackIP.component.html',
    styleUrls: ['./BlackIP.component.css']
})
export class BlackIPComponent implements OnInit {
    constructor(private API: ApiService) { }

    error = "";
    addresses4 = "";
    addresses6 = "";

    userIP = "";
    userType = "";
    hasInit: boolean = false;
    isAdding: boolean = false;
    isResetting: boolean = false;
    isUpdating: boolean = false;

    init(): void {
        this.API.request({
            module: 'BlackIP',
            action: "init"
        }, (response) => {
            if (response != "ok") {
                this.error = response;
            } else {
                this.hasInit = true;
            }
        })
    }

    get4(): void {
        this.API.request({
            module: 'BlackIP',
            action: "get4"
        }, (response) => {
            this.addresses4 = response;
        })
    }

    get6(): void {
        this.API.request({
            module: 'BlackIP',
            action: "get6"
        }, (response) => {
            this.addresses6 = response;
        })
    }

    add(): void {
        this.isAdding = true;
        this.API.request({
            module: 'BlackIP',
            action: "add",
            user_ip: this.userIP,
            user_type: this.userType
        }, (response) => {
            if (response != "ok") {
                this.error = response;
            } else {
                this.userIP = "";
                this.get4();
                this.get6();
            }
            this.isAdding = false;
        })
    }

    clear(): void {
        this.isResetting = true;
        this.API.request({
            module: 'BlackIP',
            action: "clear"
        }, (response) => {
            if (response != "ok") {
                this.error = response;
            } else {
                this.get4();
                this.get6();
            }
            this.isResetting = false;
        })
    }

    update(): void {
        this.isUpdating = true;
        this.API.request({
            module: 'BlackIP',
            action: "update"
        }, (response) => {
            if (response != "ok") {
                this.error = response;
            }
            this.isUpdating = false;
        })
    }

    ngOnInit() {
        this.init();
        this.get4();
        this.get6();
    }
}
