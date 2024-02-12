import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';


const routes: Routes = [
  { path: 'pessoas', component: PessoaListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
