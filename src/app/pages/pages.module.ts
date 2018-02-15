import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

//ng2charts
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports: [ //Componentes accedidos desde afuera de este módulo
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]

})
export class PagesModule {}