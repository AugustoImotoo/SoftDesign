import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../pessoa-lista/pessoa-lista.component';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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
  pessoas: Pessoa[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarPessoas();
    this.carregarLivros();
  }

  modoEdicao: boolean = false;

  carregarLivros() {
    this.http.get<Livro[]>('http://localhost:8080/livro').subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      error => {
        this.showErrorMessage("Erro ao carregar registros")
        console.error('Erro ao carregar pessoas:', error);
      }
    );
  }

  adicionarLivro(novoLivro: Livro) {
    this.http.post('http://localhost:8080/livro', novoLivro).subscribe(
      response => {
        this.showSuccessMessage("Registro gravado com sucesso");
        this.carregarLivros();
        this.fecharModalAdicao(); 
      },
      error => {
        this.showErrorMessage("Erro ao gravar registro")
      }
    );
  }

  abrirModalAdicao(livro?: Livro) {
    if (livro) {
      this.modoEdicao = true;
      this.novoLivro = { ...livro }; 
    } else {
      this.modoEdicao = false;
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
  
  salvarEdicaoLivro() {
    console.log('Editando livro:', this.novoLivro);
    this.http.put(`http://localhost:8080/livro/editar/${this.novoLivro.id}`, this.novoLivro, { responseType: 'text' }).subscribe(
      response => {
        console.log('Resposta do servidor:', response);
        console.log('Livro editado com sucesso:', this.novoLivro);
        this.showSuccessMessage("Registro editado com sucesso");
        this.carregarLivros();
        this.fecharModalAdicao();
      },
      error => {
        this.showErrorMessage("Erro ao editar registro")
        console.error('Erro ao editar livro:', error);
      }
    );
  }

  excluirLivro(livro: Livro) {
    const url = `http://localhost:8080/livro/${livro.id}`;
    
    this.http.delete(url).subscribe(
      () => {
        const index = this.livros.findIndex(p => p.id === livro.id);
        if (index !== -1) {
          this.livros.splice(index, 1);
          this.showSuccessMessage("Registro excluido com sucesso");
          console.log('Livro excluído:', livro);
        } else {
          console.error('Erro: Livro não encontrado na lista');
        }
        this.carregarLivros();
      },
      error => {
        console.log('Erro ao excluir livro:', error);
        console.log('Erro ao excluir livro:', livro);
        this.showErrorMessage("Erro ao excluir registro")
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
