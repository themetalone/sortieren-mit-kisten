import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import {Intro} from './pages/intro/intro';
import {ScaleWebApplication} from './pages/scale/scaleWebApplication';


@Component({
    selector:'MyApp',
    template:'<intro>Einführung</intro><web-scale>Waage</web-scale>'
})
export class MyApp {

    private intro = new Intro();

}

bootstrap(MyApp);