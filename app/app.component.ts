import { Component } from '@angular/core';
import {ComparableObject} from "./model/ComparableObject";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

const RES_PATH = 'app/resources/';
const DEBUG : boolean = true;
const BUTTON_DEFAULT = 'Überprüfe deine Sortierung';
const BUTTON_SUCCESS = 'Richtig!';
const BUTTON_FAILURE = 'Das ist nicht ganz richtig';

@Component({
    selector: 'my-app',
    templateUrl:'./app/app.html',
    directives: [Dragula],
    viewProviders: [DragulaService],
    styles: [`
    .wrapper {
      display: table;
    }
    .container {
      display: table-cell;
      background-color: rgba(255, 255, 255, 0.2);
      width: 50%;
    }
    .container:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .container div,
    .gu-mirror {
      margin: 10px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      transition: opacity 0.4s ease-in-out;
    }
    .container div {
      cursor: move;
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
    }
    .gu-mirror {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
    .handle {
      padding: 0 5px;
      margin-right: 5px;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: move;
    }
   `]
})
export class AppComponent {

    // Pictures
    public box_picture:string = RES_PATH + 'box.png';
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
        this.boxes = AppComponent.makeSomeBoxes(5);
        this.dragulaService.setOptions('box-bag', {
            revertOnSpill:true,
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
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

    checkOrder(){
        if (this.isOrdered(this.boxes)) {
            this.checkButton = BUTTON_SUCCESS;
        } else {
            this.checkButton = BUTTON_FAILURE;
        }

    }

    isOrdered(entries:ComparableObject[]):boolean {
        let property:number = 0;
        for (let i:number = 0; i < this.boxes.length; i++) {
            let box_entry = this.boxes[i];
            if (box_entry.property < property) {
                return false;
            }
            property = box_entry.property;
        }
        return true;
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
