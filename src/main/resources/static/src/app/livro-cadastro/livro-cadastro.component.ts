import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../pessoa-lista/pessoa-lista.component';
import { Observable } from 'rxjs';


export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  alugado: 'SIM' | 'NAO';
  pessoaQueAlugou?: Pessoa;
  dataDevolucao?: Date;
}

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  styleUrl: './livro-cadastro.component.css'
})
export class LivroCadastroComponent {
  displayedColumns: string[] = ['id', 'titulo', 'autor', "editora", "alugado", "pessoaQueAlugou", "dataDevolucao"];
  livros: Livro[] = [];
  novoLivro: any = {
    titulo: '',
    autor: '',
    editora: '',
    alugado: '',
    pessoaQueAlugou: null,
    dataDevolucao: null
  };
  livroSelecionado: Livro | null = null;
  pessoas: Pessoa[] = [];

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.carregarPessoas();
    this.carregarLivros();
  }

  carregarLivros() {
    this.http.get<Livro[]>('http://localhost:8080/livro').subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      error => {
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }

  adicionarLivro(novoLivro: Livro) {
    this.http.post('http://localhost:8080/livro', novoLivro).subscribe(
      response => {
        console.log('Pessoa cadastrada com sucesso:', response);
        this.carregarLivros();
        this.fecharModalAdicao(); 
      },
      error => {
        console.error('Erro ao cadastrar pessoa:', error);
      }
    );
  }

  abrirModalAdicao(livro?: Livro) {
    if (livro) {
      this.novoLivro = { ...livro }; 
    } else {
      this.novoLivro = { id: 0, titulo: '', autor: '', editora: '',  }; 
    }
    $('#adicionarLivroModal').modal('show');
  }

  fecharModalAdicao() {
    $('#adicionarLivroModal').modal('hide'); 
  }

  editarLivro(livro: Livro) {
    this.abrirModalAdicao(livro);
  }

  excluirLivro(livro: Livro) {
    const url = `http://localhost:8080/livro/${livro.id}`;
    
    this.http.delete(url).subscribe(
      () => {
        const index = this.livros.findIndex(p => p.id === livro.id);
        if (index !== -1) {
          this.livros.splice(index, 1);
          console.log('Livro excluído:', livro);
        } else {
          console.error('Erro: Livro não encontrado na lista');
        }
        this.carregarLivros();
      },
      error => {
        console.error('Erro ao excluir livro:', error);
        this.carregarLivros();
      }
    )
  }
  
  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>('http://localhost:8080/pessoa');
  }

  carregarPessoas(): void {
    this.getPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      console.log(this.pessoas);
    });
  }

  limparCampos() {
    if (this.novoLivro.alugado === 'NAO') {
      this.novoLivro.pessoaQueAlugou = null;
      this.novoLivro.dataDevolucao = null;
    }
  }
}
