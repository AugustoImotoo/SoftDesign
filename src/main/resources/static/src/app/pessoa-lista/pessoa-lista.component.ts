import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Pessoa {
  id: number;
  nomeCompleto: string;
  telefone: string;
}

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css']
})
export class PessoaListaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'telefone'];
  pessoas: Pessoa[] = [];
  novaPessoa: any = { // Declare novaPessoa como um objeto vazio
    nomeCompleto: '',
    telefone: ''
  };
  mostrarOpcoes = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.http.get<Pessoa[]>('http://localhost:8080/pessoa').subscribe(
      (data: Pessoa[]) => {
        this.pessoas = data;
      },
      error => {
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }

  adicionarPessoa(novaPessoa: Pessoa) {
    this.http.post('http://localhost:8080/pessoa', novaPessoa).subscribe(
      response => {
        console.log('Pessoa cadastrada com sucesso:', response);
        this.carregarPessoas(); // Atualiza a lista de pessoas
        this.fecharModalAdicao(); // Fecha o modal após adicionar pessoa
      },
      error => {
        console.error('Erro ao cadastrar pessoa:', error);
      }
    );
  }

  abrirModalAdicao() {
    this.novaPessoa = {}; // Limpa os campos do formulário ao abrir o modal
    $('#adicionarPessoaModal').modal('show'); // Abre o modal
  }

  fecharModalAdicao() {
    $('#adicionarPessoaModal').modal('hide'); // Fecha o modal
  }
}