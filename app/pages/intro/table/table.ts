/**
 * Created by sholzer on 02.07.2016.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'csv-table',
    templateUrl: './app/pages/intro/intro.html',
    inputs: ['csv'],
    styleUrls: ['./app/pages/intro/intro.css']
})
export class Table {

    public csv: string;
    public objects: CsvObject[];

    constructor() {
    	this.objects = this.csv.split('\n').filter(this.headerFilter).map<CsvObject>(this.csvMap);
    }

    headerFilter = (item:string, index:number) => {
    	return index != 0;
    }

    csvMap = (item:string, index) => {
    	let object = item.split(',');
    	return {
    		verband:object[0],
    		lv:object[1],
    		uebergeordnet:object[2],
    		name:object[3]
    	};
   	}
}

interface CsvObject{
	verband:string;
	lv:string;
	uebergeordnet:string,
	name:string;
}