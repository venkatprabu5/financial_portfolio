import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestmentComponent } from './investment/investment.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
   path: '',
   component: LayoutComponent,
   children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'investment',
      component: InvestmentComponent
    }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
