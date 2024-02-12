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
  pessoaSelecionada: Pessoa | null = null; // Armazena a pessoa selecionada para edição

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

  abrirModalAdicao(pessoa?: Pessoa) {
    if (pessoa) {
      this.novaPessoa = { ...pessoa }; // Preenche o formulário com os dados da pessoa selecionada
    } else {
      this.novaPessoa = { id: 0, nomeCompleto: '', telefone: '' }; // Limpa o formulário para adição
    }
    $('#adicionarPessoaModal').modal('show');
  }

  fecharModalAdicao() {
    $('#adicionarPessoaModal').modal('hide'); // Fecha o modal
  }

  editarPessoa(pessoa: Pessoa) {
    this.abrirModalAdicao(pessoa); // Abre o modal para edição com os dados da pessoa selecionada
  }

  excluirPessoa(pessoa: Pessoa) {
    const url = `http://localhost:8080/pessoa/${pessoa.id}`; // Supondo que sua API REST use uma rota como /pessoa/:id para exclusão
  
    this.http.delete(url).subscribe(
      () => {
        // Se a exclusão for bem-sucedida, você pode remover a pessoa da lista localmente
        const index = this.pessoas.findIndex(p => p.id === pessoa.id);
        if (index !== -1) {
          this.pessoas.splice(index, 1);
          console.log('Pessoa excluída:', pessoa);
        } else {
          console.error('Erro: Pessoa não encontrada na lista');
        }
      },
      error => {
        console.error('Erro ao excluir pessoa:', error);
      }
    )
  }
}