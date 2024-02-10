package softDesign.softDesign.service;

import softDesign.softDesign.entity.Livro;
import softDesign.softDesign.entity.Pessoa;
import softDesign.softDesign.enumeration.SimNao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import softDesign.softDesign.repository.LivroRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    LivroRepository livroRepository;

    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public List<Livro> listarLivroByEditora(String editora) {
        return livroRepository.findByEditora(editora);
    }

    public List<Livro> listarLivroByAutor(String autor) {
        return livroRepository.findByAutor(autor);
    }

    public List<Livro> listarLivroByTitulo(String nome) {
        return livroRepository.findByTitulo(nome);
    }

    public Livro listarLivroById(Long id) {
        return livroRepository.findById(id).orElse(null);
    }

    public Livro salvarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    public boolean alugarLivro(Long livroId, Pessoa pessoa, LocalDate dataDevolucao){
        Livro livro = livroRepository.findById(livroId).orElse(null);
        if (livro == null){
            return false;
        }

        if (livro.getAlugado() != null && livro.getAlugado().equals(SimNao.SIM)) {
            return false;
        }

        livro.setAlugado(SimNao.SIM);
        livro.setPessoaQueAlugou(pessoa);
        livro.setDataDevolucao(dataDevolucao);

        livroRepository.save(livro);
        return true;
    }

    public boolean devolverLivro(Long livroId, Pessoa pessoa){
        Livro livro = livroRepository.findById(livroId).orElse(null);
        if (livro == null){
            return false;
        }

        if (livro.getAlugado() != null && livro.getAlugado().equals(SimNao.NAO)) {
            return false;
        }

        livro.setAlugado(SimNao.NAO);
        livro.setPessoaQueAlugou(null);
        livro.setDataDevolucao(null);

        livroRepository.save(livro);
        return true;
    }

    public boolean deleteLivroById(Long livroId) {
        Optional<Livro> livroOptional = livroRepository.findById(livroId);
        if (livroOptional.isPresent()) {
            if (livroOptional.get().getAlugado() != null && livroOptional.get().getAlugado().equals(SimNao.NAO)) {
                return false;
            }
            Livro livro = livroOptional.get();
            livroRepository.delete(livro);
            return true;
        }
        return false;
    }

    public boolean editarLivro(Long livroId, Livro livroAtualizado) {
        Optional<Livro> livroOptional = livroRepository.findById(livroId);
        if (livroOptional.isPresent()) {
            if (livroOptional.get().getAlugado() != null && livroOptional.get().getAlugado().equals(SimNao.SIM)) {
                return false;
            }

            Livro livroExistente = livroOptional.get();
            livroExistente.setTitulo(livroAtualizado.getTitulo());
            livroExistente.setAutor(livroAtualizado.getAutor());
            livroExistente.setEditora(livroAtualizado.getEditora());
            livroRepository.save(livroExistente);
            return true;
        }
        return false;
    }
}
