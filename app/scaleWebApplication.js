var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var RES_PATH = 'app/resources/';
var DEBUG = true;
var BUTTON_DEFAULT = 'Überprüfe deine Sortierung';
var BUTTON_SUCCESS = 'Richtig!';
var BUTTON_FAILURE = 'Das ist nicht ganz richtig';
var ScaleWebApplication = (function () {
    function ScaleWebApplication(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        // Pictures
        this.libra_equal = RES_PATH + 'libra.png';
        this.libra_tilded_left = RES_PATH + 'libraleft.png';
        this.libra_tilded_right = RES_PATH + 'libraright.png';
        // Bounded values
        this.libraResult = this.libra_equal;
        this.checkButton = BUTTON_DEFAULT;
        this.scaleLeft = null;
        this.scaleRight = null;
        this.boxLists = [[]];
        this.scalePointer = true;
        this.reveal = false;
        // Colors
        this.colorList = [
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
        this.defaultButtonClick();
        this.boxLists[0] = this.boxes;
        this.dragulaService.setOptions('box-bag', {
            revertOnSpill: true
        });
        this.dragulaService.setOptions('scale-bag', {});
        this.dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
        this.dragulaService.over.subscribe((function (value) {
            _this.onOver(value.slice(1));
        }));
    }
    ScaleWebApplication.prototype.copyInto = function (el, source, target) {
        console.log(el.className + ':' + source.className + ':' + target.className);
        return el.className == '';
    };
    ScaleWebApplication.prototype.onOver = function (args) {
        this.checkButton = BUTTON_DEFAULT;
        // el is over container and came from source
        var el = args[0], container = args[1], source = args[2];
        console.log(el.id + ':' + container.id + ':' + source.id);
        if (container.id == 'slc') {
        }
    };
    ScaleWebApplication.prototype.boxClick = function (event) {
        var entry = this.getEntry(Number(event.currentTarget.id));
        if (this.scalePointer) {
            this.scaleLeft = entry;
        }
        else {
            this.scaleRight = entry;
        }
        this.scalePointer = !this.scalePointer;
        this.updateScale();
    };
    ScaleWebApplication.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        this.updateScale();
    };
    ScaleWebApplication.prototype.libraResultToString = function (result) {
        switch (result) {
            case 1:
                return this.libra_tilded_left;
            case 0:
                return this.libra_equal;
            case -1:
                return this.libra_tilded_right;
        }
    };
    ScaleWebApplication.prototype.updateScale = function () {
        var leftWeight = (this.scaleLeft == null ? 0 : this.scaleLeft.property);
        var rightWeight = (this.scaleRight == null ? 0 : this.scaleRight.property);
        if (leftWeight > rightWeight) {
            this.libraResult = this.libra_tilded_left;
        }
        else {
            if (leftWeight == rightWeight) {
                this.libraResult = this.libra_equal;
            }
            else {
                this.libraResult = this.libra_tilded_right;
            }
        }
    };
    ScaleWebApplication.prototype.resetScale = function (event) {
        this.scaleLeft = null;
        this.scaleRight = null;
        this.updateScale();
    };
    ScaleWebApplication.prototype.getEntry = function (id) {
        var o = { id: -1, property: 0, colorCode: 'rgb(0,0,0)' };
        this.boxLists.forEach(function (list) { return list.forEach(function (item) {
            if (item.id == id) {
                o = item;
                return;
            }
        }); });
        return o;
    };
    ScaleWebApplication.prototype.checkOrder = function () {
        if (ScaleWebApplication.isAnyOrdered(this.boxLists, this.numberOfBoxes)) {
            this.checkButton = BUTTON_SUCCESS;
        }
        else {
            this.checkButton = BUTTON_FAILURE;
        }
    };
    ScaleWebApplication.isAnyOrdered = function (entries, numberOfBoxes) {
        return entries.map(function (list) { return list.length == numberOfBoxes; }).reduce(function (a, b) { return a || b; }, false) &&
            entries.map(function (boxes) { return ScaleWebApplication.isOrdered(boxes); }).reduce(function (a, b) { return a || b; }, false);
    };
    ScaleWebApplication.isOrdered = function (entries) {
        var property = 0;
        for (var i = 0; i < entries.length; i++) {
            var box_entry = entries[i];
            if (box_entry.property < property) {
                return false;
            }
            property = box_entry.property;
        }
        return true;
    };
    ScaleWebApplication.prototype.defaultButtonClick = function () {
        this.numberOfBoxes = 5;
        this.boxes = [
            { id: 0, property: 10, colorCode: this.colorList[0] },
            { id: 1, property: 9, colorCode: this.colorList[2] },
            { id: 2, property: 11, colorCode: this.colorList[4] },
            { id: 3, property: 8, colorCode: this.colorList[6] },
            { id: 4, property: 7, colorCode: this.colorList[8] }
        ];
        this.boxLists = [this.boxes];
    };
    ScaleWebApplication.prototype.switchRevelation = function () {
        this.reveal = !this.reveal;
    };
    ScaleWebApplication.prototype.newProblemButtonClick = function () {
        var select = document.getElementById('problem_size');
        var selected_case = Number(select.item(select.selectedIndex).value);
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
                    { id: 0, property: 11, colorCode: this.colorList[0] },
                    { id: 1, property: 10, colorCode: this.colorList[2] },
                    { id: 2, property: 9, colorCode: this.colorList[4] },
                    { id: 3, property: 8, colorCode: this.colorList[6] },
                    { id: 4, property: 7, colorCode: this.colorList[8] }
                ];
                break;
        }
        this.boxLists = [this.boxes];
    };
    ScaleWebApplication.prototype.makeSomeBoxes = function (n) {
        var colorMultiplier = 1;
        this.numberOfBoxes = n;
        if (n <= 5) {
            colorMultiplier = 2;
        }
        var result = [];
        for (var i = 0; i < n; i++) {
            var co = { id: i, property: Math.floor(Math.random() * 100), colorCode: this.colorList[colorMultiplier * i] };
            result.push(co);
        }
        return result;
    };
    ScaleWebApplication.prototype.newList = function () {
        this.boxLists[this.boxLists.length] = [];
    };
    ScaleWebApplication = __decorate([
        core_1.Component({
            selector: 'web-scale',
            viewProviders: [ng2_dragula_1.DragulaService],
            templateUrl: './app/scaleWebApplication.html',
            styleUrls: ['./app/scaleWebApplication.css'],
            directives: [ng2_dragula_1.Dragula]
        }), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService])
    ], ScaleWebApplication);
    return ScaleWebApplication;
})();
exports.ScaleWebApplication = ScaleWebApplication;
//# sourceMappingURL=scaleWebApplication.js.map