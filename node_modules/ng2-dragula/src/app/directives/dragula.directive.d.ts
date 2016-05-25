import { ElementRef, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { DragulaService } from '../providers/dragula.provider';
export declare class Dragula implements OnInit, OnChanges {
    private el;
    private dragulaService;
    bag: string;
    dragulaModel: any;
    private container;
    private drake;
    constructor(el: ElementRef, dragulaService: DragulaService);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
}
