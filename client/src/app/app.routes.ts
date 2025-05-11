import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ActivityLogComponent } from './features/activity-log/activity-log/activity-log.component';
import { ActivityListComponent } from './features/activity-log/activity-list/activity-list.component';
import { ActivityFormComponent } from './features/activity-log/activity-form/activity-form.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'activities', component: ActivityListComponent },
    { path: 'activities/new', component: ActivityFormComponent },
    { path: 'activities/:id/edit', component: ActivityFormComponent }
];
