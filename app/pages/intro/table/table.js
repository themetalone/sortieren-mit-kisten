"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by sholzer on 02.07.2016.
 */
var core_1 = require('@angular/core');
var Table = (function () {
    function Table() {
        this.headerFilter = function (item, index) {
            return index != 0;
        };
        this.csvMap = function (item, index) {
            var object = item.split(',');
            return {
                verband: object[0],
                lv: object[1],
                uebergeordnet: object[2],
                name: object[3]
            };
        };
        this.objects = this.csv.split('\n').filter(this.headerFilter).map(this.csvMap);
    }
    Table = __decorate([
        core_1.Component({
            selector: 'csv-table',
            templateUrl: './app/pages/intro/intro.html',
            inputs: ['csv'],
            styleUrls: ['./app/pages/intro/intro.css']
        }), 
        __metadata('design:paramtypes', [])
    ], Table);
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=table.js.map