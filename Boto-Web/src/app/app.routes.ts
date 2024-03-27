import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ResumesComponent } from './pages/resumes/resumes.component';
import { StartComponent } from './pages/start/start.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' }, //, pathMatch: 'full' 
  { path: 'register', component: RegisterComponent, title: 'Cadastrar' },
  { path: 'resumes', component: ResumesComponent },
  { path: 'start', component: StartComponent }
];

