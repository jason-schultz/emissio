import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideCharts(withDefaultRegisterables()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
