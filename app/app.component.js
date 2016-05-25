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
var core_1 = require('@angular/core');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var RES_PATH = 'app/resources/';
var DEBUG = true;
var AppComponent = (function () {
    function AppComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        // Pictures
        this.box_picture = RES_PATH + 'box.png';
        this.libra_equal = RES_PATH + 'libra.png';
        this.libra_tilded_left = RES_PATH + 'libraleft.png';
        this.libra_tilded_right = RES_PATH + 'libraright.png';
        this.scaleLeft = null;
        this.scaleRight = null;
        this.libraResult = this.libra_equal;
        this.scalePointer = true;
        this.boxes = AppComponent.makeSomeBoxes(5);
        this.dragulaService.setOptions('box-bag', {
            revertOnSpill: true,
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });
        this.dragulaService.setOptions('scale-bag', {});
        this.dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
        this.dragulaService.over.subscribe((function (value) {
            _this.onOver(value.slice(1));
        }));
    }
    AppComponent.prototype.copyInto = function (el, source, target) {
        console.log(el.className + ':' + source.className + ':' + target.className);
        return el.className == '';
    };
    AppComponent.prototype.onOver = function (args) {
        // el is over container and came from source
        var el = args[0], container = args[1], source = args[2];
        console.log(el.id + ':' + container.id + ':' + source.id);
        if (container.id == 'slc') {
        }
    };
    AppComponent.prototype.boxClick = function (event) {
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
    AppComponent.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        this.updateScale();
    };
    AppComponent.prototype.libraResultToString = function (result) {
        switch (result) {
            case 1:
                return this.libra_tilded_left;
            case 0:
                return this.libra_equal;
            case -1:
                return this.libra_tilded_right;
        }
    };
    AppComponent.prototype.updateScale = function () {
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
    AppComponent.prototype.resetScale = function (event) {
        this.scaleLeft = null;
        this.scaleRight = null;
        this.updateScale();
    };
    AppComponent.prototype.getEntry = function (id) {
        var o = { id: -1, property: 0 };
        this.boxes.forEach(function (item) {
            if (item.id == id) {
                o = item;
                return;
            }
        });
        return o;
    };
    AppComponent.prototype.checkOrder = function () {
    };
    AppComponent.makeSomeBoxes = function (n) {
        var result = [];
        for (var i = 0; i < n; i++) {
            var co = { id: i, property: Math.floor(Math.random() * 100) };
            result.push(co);
        }
        return result;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.html',
            directives: [ng2_dragula_1.Dragula],
            viewProviders: [ng2_dragula_1.DragulaService],
            styles: ["\n    .wrapper {\n      display: table;\n    }\n    .container {\n      display: table-cell;\n      background-color: rgba(255, 255, 255, 0.2);\n      width: 50%;\n    }\n    .container:nth-child(odd) {\n      background-color: rgba(0, 0, 0, 0.2);\n    }\n    .container div,\n    .gu-mirror {\n      margin: 10px;\n      padding: 10px;\n      background-color: rgba(0, 0, 0, 0.2);\n      transition: opacity 0.4s ease-in-out;\n    }\n    .container div {\n      cursor: move;\n      cursor: grab;\n      cursor: -moz-grab;\n      cursor: -webkit-grab;\n    }\n    .gu-mirror {\n      cursor: grabbing;\n      cursor: -moz-grabbing;\n      cursor: -webkit-grabbing;\n    }\n    .handle {\n      padding: 0 5px;\n      margin-right: 5px;\n      background-color: rgba(0, 0, 0, 0.4);\n      cursor: move;\n    }\n   "]
        }), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map