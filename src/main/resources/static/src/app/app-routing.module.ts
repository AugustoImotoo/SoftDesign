import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoaListaComponent },
  { path: 'livros', component: LivroCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
