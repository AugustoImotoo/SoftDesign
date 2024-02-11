import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoasComponent } from './cadastro-pessoas/cadastro-pessoas.component';

const routes: Routes = [
  { path: 'cadastro-pessoas', component: CadastroPessoasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
