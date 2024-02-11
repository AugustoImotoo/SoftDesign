import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent {
  pessoas = [
    { id: 1, nome: 'João', telefone: '123-456-7890' },
    { id: 2, nome: 'Maria', telefone: '987-654-3210' },
    { id: 3, nome: 'José', telefone: '555-555-5555' }
  ];

  constructor() { }

  adicionarPessoa(): void {
    const novaPessoa = { id: this.pessoas.length + 1, nome: 'Novo', telefone: 'Novo Telefone' };
    this.pessoas.push(novaPessoa);
  }

  editarPessoa(pessoa: any): void {
    // Implemente a lógica para edição da pessoa aqui
    console.log('Editar pessoa', pessoa);
  }

  excluirPessoa(pessoa: any): void {
    // Implemente a lógica para exclusão da pessoa aqui
    console.log('Excluir pessoa', pessoa);
  }
}