package softDesign.softDesign.controller;

import softDesign.softDesign.entity.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import softDesign.softDesign.service.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public ResponseEntity<?> listarPessoa() {
        return ResponseEntity.ok(pessoaService.listarPessoas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPessoaById(@PathVariable Long id) {
        Pessoa pessoa = pessoaService.listarPessoaById(id);
        if (pessoa != null) {
            return ResponseEntity.ok(pessoa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> salvarPessoa(@RequestBody Pessoa pessoa) {
        Pessoa pessoaSalvar = pessoaService.salvarPessoa(pessoa);
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalvar);
    }

}
