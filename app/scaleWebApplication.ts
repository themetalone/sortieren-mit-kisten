import { Component } from '@angular/core';
import {ComparableObject} from "./model/ComparableObject";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

const RES_PATH = 'app/resources/';
const DEBUG:boolean = true;
const BUTTON_DEFAULT = 'Überprüfe deine Sortierung';
const BUTTON_SUCCESS = 'Richtig!';
const BUTTON_FAILURE = 'Das ist nicht ganz richtig';

@Component({
    selector: 'web-scale',
    templateUrl: './app/scaleWebApplication.html',
    directives: [Dragula],
    viewProviders: [DragulaService],
    styleUrls: ['./app/scaleWebApplication.css']
})
export class ScaleWebApplication {

    // Pictures
    public libra_equal:string = RES_PATH + 'libra.png';
    public libra_tilded_left:string = RES_PATH + 'libraleft.png';
    public libra_tilded_right:string = RES_PATH + 'libraright.png';


    // Bounded values
    public libraResult:string = this.libra_equal;
    public checkButton:string = BUTTON_DEFAULT;
    public boxes:ComparableObject[];
    public scaleLeft:ComparableObject = null;
    public scaleRight:ComparableObject = null;

    private scalePointer:boolean = true;

    constructor(private dragulaService:DragulaService) {
        this.defaultButtonClick();
        this.dragulaService.setOptions('box-bag', {
            revertOnSpill: true
        });
        this.dragulaService.setOptions('scale-bag', {});

        this.dragulaService .drop.subscribe((value)=> {
            this.onDrop(value.slice(1));
        });
        this.dragulaService.over.subscribe(((value)=> {
            this.onOver(value.slice(1));
        }));
    }

    copyInto(el, source, target):boolean {
        console.log(el.className + ':' + source.className + ':' + target.className);
        return el.className == '';
    }

    onOver(args) {
        this.checkButton = BUTTON_DEFAULT;
        // el is over container and came from source
        let [el, container, source] = args;
        console.log(el.id + ':' + container.id + ':' + source.id);
        if (container.id == 'slc') {

        }

    }

    boxClick(event:Event) {
        let entry:ComparableObject = this.getEntry(Number((<Element>event.currentTarget).id));
        if (this.scalePointer) {
            this.scaleLeft = entry;
        } else {
            this.scaleRight = entry;
        }
        this.scalePointer = !this.scalePointer;
        this.updateScale();
    }

    onDrop(args) {
        let [e, el] = args;
        this.updateScale();
    }

    libraResultToString(result:number):string {
        switch (result) {
            case 1:
                return this.libra_tilded_left;
            case 0:
                return this.libra_equal;
            case -1:
                return this.libra_tilded_right;
        }
    }

    updateScale() {
        let leftWeight:number = (this.scaleLeft == null ? 0 : this.scaleLeft.property);
        let rightWeight:number = (this.scaleRight == null ? 0 : this.scaleRight.property);

        if (leftWeight > rightWeight) {
            this.libraResult = this.libra_tilded_left;
        } else {
            if (leftWeight == rightWeight) {
                this.libraResult = this.libra_equal;
            }
            else {
                this.libraResult = this.libra_tilded_right;
            }
        }
    }

    resetScale(event:any) {
        this.scaleLeft = null;
        this.scaleRight = null;
        this.updateScale();
    }

    getEntry(id:number):ComparableObject {
        let o:ComparableObject = {id: -1, property: 0};
        this.boxes.forEach((item:ComparableObject)=> {
            if (item.id == id) {
                o = item;
                return;
            }
        });
        return o;
    }

    checkOrder() {
        if (this.isOrdered(this.boxes)) {
            this.checkButton = BUTTON_SUCCESS;
        } else {
            this.checkButton = BUTTON_FAILURE;
        }

    }

    isOrdered(entries:ComparableObject[]):boolean {
        let property:number = 0;
        for (let i:number = 0; i < entries.length; i++) {
            let box_entry = entries[i];
            if (box_entry.property < property) {
                return false;
            }
            property = box_entry.property;
        }
        return true;
    }

    defaultButtonClick() {
        this.boxes = [
            {id: 0, property: 10},
            {id: 1, property: 9},
            {id: 2, property: 11},
            {id: 3, property: 8},
            {id: 4, property: 7}
        ];
    }

    newProblemButtonClick() {
        let select = <HTMLSelectElement> document.getElementById('problem_size');
        let selected_case = Number((<HTMLOptionElement>select.item(select.selectedIndex)).value);
        switch (selected_case) {
            default:
            case 1:
                this.boxes = ScaleWebApplication.makeSomeBoxes(5);
                break;
            case 2:
                this.boxes = ScaleWebApplication.makeSomeBoxes(8);
                break;
            case 3:
                this.boxes = [
                    {id: 0, property: 11},
                    {id: 1, property: 10},
                    {id: 2, property: 9},
                    {id: 3, property: 8},
                    {id: 4, property: 7}
                ];
                break;
        }

    }

    static makeSomeBoxes(n:number):ComparableObject[] {
        let result:ComparableObject[] = [];
        for (let i:number = 0; i < n; i++) {
            let co = <ComparableObject>{id: i, property: Math.floor(Math.random() * 100)};
            result.push(co);
        }
        return result;

    }
}
