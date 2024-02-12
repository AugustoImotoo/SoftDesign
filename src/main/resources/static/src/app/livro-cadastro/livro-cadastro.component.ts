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

export interface AluguelRequest {
  pessoaId: number;
  livroId: number;
  dataDevolucao: Date;
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
  filtro: string = '';
  filtroAutor: string = '';
  filtroEditora: string = '';
  filtroTitulo: string = '';

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
    this.errorMessage = null;
    setTimeout(() => {
      this.successMessage = null; 
    }, 3000);
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = null;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  devolverLivro(livro: Livro) {
    const aluguelRequest: AluguelRequest = {
      pessoaId: livro.pessoaQueAlugou ? livro.pessoaQueAlugou.id : -1,
      livroId: livro.id,
      dataDevolucao: new Date()
    };
  
    this.http.put('http://localhost:8080/livro/devolver', aluguelRequest).subscribe(
      response => {
        this.showSuccessMessage("Livro devolvido com sucesso.");
        this.carregarLivros();
      },
      error => {
        this.showErrorMessage("Erro ao devolver livro");
        console.error('Erro ao devolver livro:', error);
      }
    );
  }

  alugarLivro(livro: Livro) {
    const aluguelRequest: AluguelRequest = {
      pessoaId: livro.pessoaQueAlugou ? livro.pessoaQueAlugou.id : -1,
      livroId: livro.id,
      dataDevolucao: new Date()
    };
  
    this.http.put('http://localhost:8080/livro/alugar', aluguelRequest).subscribe(
      response => {
        this.showSuccessMessage("Livro alugado com sucesso.");
        this.carregarLivros();
        this.fecharModalAdicao();
      },
      error => {
        this.showErrorMessage("Erro ao alugar livro");
        console.error('Erro ao alugar livro:', error);
      }
    );
  }

  aplicarFiltros(): void {
    this.livros = this.livros.filter(livro =>
      livro.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase()) &&
      livro.autor.toLowerCase().includes(this.filtroAutor.toLowerCase()) &&
      livro.editora.toLowerCase().includes(this.filtroEditora.toLowerCase())
    );
  }

  limparFiltros(): void {
    this.filtroTitulo = '';
    this.filtroAutor = '';
    this.filtroEditora = '';
    this.carregarLivros();
  }
}
