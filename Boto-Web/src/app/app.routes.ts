import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ResumesComponent } from './pages/resumes/resumes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, title: 'Cadastrar' },
  { path: 'resumes', component: ResumesComponent },
];
