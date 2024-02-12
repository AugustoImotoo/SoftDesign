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
  novaPessoa: any = {
    nomeCompleto: '',
    telefone: ''
  };
  pessoaSelecionada: Pessoa | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
        this.showErrorMessage("Erro ao carregar registros")
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }

  adicionarPessoa(novaPessoa: Pessoa) {
    this.http.post('http://localhost:8080/pessoa', novaPessoa).subscribe(
      response => {
        console.log('Pessoa cadastrada com sucesso:', response);
        this.showSuccessMessage("Registro gravado com sucesso");
        this.carregarPessoas(); 
        this.fecharModalAdicao(); 
      },
      error => {
        this.showErrorMessage("Erro ao gravar registro")
        console.error('Erro ao cadastrar pessoa:', error);
      }
    );
  }

  abrirModalAdicao(pessoa?: Pessoa) {
    if (pessoa) {
      this.novaPessoa = { ...pessoa }; 
    } else {
      this.novaPessoa = { id: 0, nomeCompleto: '', telefone: '' }; 
    }
    $('#adicionarPessoaModal').modal('show');
  }

  fecharModalAdicao() {
    $('#adicionarPessoaModal').modal('hide'); 
  }

  editarPessoa(pessoa: Pessoa) {
    this.abrirModalAdicao(pessoa);
  }

  excluirPessoa(pessoa: Pessoa) {
    const url = `http://localhost:8080/pessoa/${pessoa.id}`;
  
    this.http.delete(url).subscribe(
      () => {
        const index = this.pessoas.findIndex(p => p.id === pessoa.id);
        if (index !== -1) {
          this.pessoas.splice(index, 1);
          console.log('Pessoa excluída:', pessoa);
          this.showSuccessMessage("Registro excluido com sucesso");
        } else {
          console.error('Erro: Pessoa não encontrada na lista');
        }
      },
      error => {
        this.showErrorMessage("Erro ao excluir registro")
        console.error('Erro ao excluir pessoa:', error);
      }
    )
  }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    this.errorMessage = null; // Limpa a mensagem de erro
    setTimeout(() => {
      this.successMessage = null; // Limpa a mensagem de sucesso após alguns segundos
    }, 3000); // Tempo em milissegundos
  }

  // Método para exibir uma mensagem de erro
  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = null; // Limpa a mensagem de sucesso
    setTimeout(() => {
      this.errorMessage = null; // Limpa a mensagem de erro após alguns segundos
    }, 3000); // Tempo em milissegundos
  }
}