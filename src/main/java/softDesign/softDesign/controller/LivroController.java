package softDesign.softDesign.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import softDesign.softDesign.entity.AluguelRequest;
import softDesign.softDesign.entity.Livro;
import softDesign.softDesign.entity.Pessoa;
import softDesign.softDesign.service.LivroService;
import softDesign.softDesign.service.PessoaService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public ResponseEntity<?> listarLivros() {
        return ResponseEntity.ok(livroService.listarLivros());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarLivroById(@PathVariable Long id) {
        Livro livro = livroService.listarLivroById(id);
        if (livro != null) {
            return ResponseEntity.ok(livro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/editora/{editora}")
    public ResponseEntity<List<Livro>> listarLivrosPorEditora(@PathVariable String editora) {
        List<Livro> livros = livroService.listarLivroByEditora(editora);
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<Livro>> listarLivrosPorAutor(@PathVariable String autor) {
        List<Livro> livros = livroService.listarLivroByAutor(autor);
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<List<Livro>> listarLivrosPorTitulo(@PathVariable String titulo) {
        List<Livro> livros = livroService.listarLivroByTitulo(titulo);
        return ResponseEntity.ok(livros);
    }

    @PostMapping
    public ResponseEntity<?> salvarLivro(@RequestBody Livro livro) {
        Livro livroSalvar = livroService.salvarLivro(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(livroSalvar);
    }

    @PutMapping("/alugar")
    public ResponseEntity<?> alugarLivro(@RequestBody AluguelRequest aluguelRequest) {
        Long livroId = aluguelRequest.getLivroId();
        Long pessoaId = aluguelRequest.getPessoaId();
        LocalDate dataDevolucao = aluguelRequest.getDataDevolucao();

        Pessoa pessoa = pessoaService.listarPessoaById(pessoaId);

        boolean sucesso = livroService.alugarLivro(livroId, pessoa, dataDevolucao);

        if (sucesso) {
            return ResponseEntity.ok("Livro alugado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não foi possível alugar o livro.");
        }
    }

    @PutMapping("/devolver")
    public ResponseEntity<?> devolverLivro(@RequestBody AluguelRequest aluguelRequest) {
        Long pessoaId = aluguelRequest.getPessoaId();
        Long livroId = aluguelRequest.getLivroId();

        Pessoa pessoa = pessoaService.listarPessoaById(pessoaId);

        boolean sucesso = livroService.devolverLivro(livroId, pessoa);

        if (sucesso) {
            return ResponseEntity.ok("Livro devolvido com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não foi possível alugar o livro.");
        }
    }

    @DeleteMapping("/{livroId}")
    public ResponseEntity<?> deleteLivro(@PathVariable Long livroId) {
        boolean deleted = livroService.deleteLivroById(livroId);
        if (deleted) {
            return ResponseEntity.ok("Livro deletado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro não encontrado ou alugado.");
        }
    }

    @PutMapping("/editar/{livroId}")
    public ResponseEntity<?> editarLivro(@PathVariable Long livroId, @RequestBody Livro livroAtualizado) {
        boolean sucesso = livroService.editarLivro(livroId, livroAtualizado);
        if (sucesso) {
            return ResponseEntity.ok("Livro editado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro não encontrado ou alugado.");
        }
    }

}
