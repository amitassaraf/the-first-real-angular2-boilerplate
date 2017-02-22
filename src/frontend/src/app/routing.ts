import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home';
import {AboutComponent} from './components/about/about';

const routes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
