import { Component } from '@angular/core';
import {ComparableObject} from "./../../model/ComparableObject";
import {Dragula, DragulaService} from '../../../node_modules/ng2-dragula/ng2-dragula.d';

const RES_PATH = 'app/resources/';
const DEBUG:boolean = true;
const BUTTON_DEFAULT = 'Überprüfe deine Sortierung';
const BUTTON_SUCCESS = 'Richtig!';
const BUTTON_FAILURE = 'Das ist nicht ganz richtig';

@Component({
    selector: 'web-scale',
    viewProviders: [DragulaService],
    templateUrl: './app/scaleWebApplication.html',
    styleUrls: ['./app/scaleWebApplication.css'],
    directives: [Dragula]
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

    public boxLists:ComparableObject[][] = [[]];

    private scalePointer:boolean = true;

    public reveal:boolean = false;

    public numberOfBoxes:number;

    // Colors
    public colorList:string[] = [
        'rgb(255,0,0)',
        'rgb(255,128,0)',
        'rgb(255,255,0)',
        'rgb(128,255,0)',
        'rgb(0,255,0)',
        'rgb(0,255,128)',
        'rgb(0,255,255)',
        'rgb(0,128,255)',
        'rgb(0,0,255)',
        'rgb(128,0,255)'];

    constructor(private dragulaService:DragulaService) {
        this.defaultButtonClick();
        this.boxLists[0] = this.boxes;
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
        let o:ComparableObject = {id: -1, property: 0, colorCode:'rgb(0,0,0)'};
        this.boxLists.forEach((list:ComparableObject[])=> list.forEach((item:ComparableObject)=> {
            if (item.id == id) {
                o = item;
                return;
            }
        }));
        return o;
    }

    checkOrder() {
        if (ScaleWebApplication.isAnyOrdered(this.boxLists,this.numberOfBoxes)) {
            this.checkButton = BUTTON_SUCCESS;
        } else {
            this.checkButton = BUTTON_FAILURE;
        }

    }

    static isAnyOrdered(entries:ComparableObject[][], numberOfBoxes:number):boolean{
        return entries.map<boolean>((list:ComparableObject[]) => list.length == numberOfBoxes).reduce<boolean>((a,b)=>a || b, false)  &&
        entries.map<boolean>(boxes => ScaleWebApplication.isOrdered(boxes)).reduce<boolean>((a,b)=>a||b, false);
    }

    static isOrdered(entries:ComparableObject[]):boolean {
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
        this.numberOfBoxes = 5;
        this.boxes = [
            {id: 0, property: 10, colorCode:this.colorList[0]},
            {id: 1, property: 9, colorCode:this.colorList[2]},
            {id: 2, property: 11, colorCode:this.colorList[4]},
            {id: 3, property: 8, colorCode:this.colorList[6]},
            {id: 4, property: 7, colorCode:this.colorList[8]}
        ];
        this.boxLists = [this.boxes];
    }

    switchRevelation(){
        this.reveal = !this.reveal;
    }

    newProblemButtonClick() {
        let select = <HTMLSelectElement> document.getElementById('problem_size');
        let selected_case = Number((<HTMLOptionElement>select.item(select.selectedIndex)).value);
        switch (selected_case) {
            default:
            case 1:
                this.boxes = this.makeSomeBoxes(5);
                break;
            case 2:
                this.boxes = this.makeSomeBoxes(10);
                break;
            case 3:
                this.boxes = [
                    {id: 0, property: 11, colorCode:this.colorList[0]},
                    {id: 1, property: 10, colorCode:this.colorList[2]},
                    {id: 2, property: 9, colorCode:this.colorList[4]},
                    {id: 3, property: 8, colorCode:this.colorList[6]},
                    {id: 4, property: 7, colorCode:this.colorList[8]}
                ];
                break;
        }
        this.boxLists = [this.boxes];
    }

     makeSomeBoxes(n:number):ComparableObject[] {
         let colorMultiplier:number = 1;
         this.numberOfBoxes = n;
         if(n <= 5){
             colorMultiplier = 2;
         }
        let result:ComparableObject[] = [];
        for (let i:number = 0; i < n; i++) {
            let co = <ComparableObject>{id: i, property: Math.floor(Math.random() * 100), colorCode:this.colorList[colorMultiplier*i]};
            result.push(co);
        }
        return result;

    }

    newList():void{
        this.boxLists[this.boxLists.length] = [];
    }
}
