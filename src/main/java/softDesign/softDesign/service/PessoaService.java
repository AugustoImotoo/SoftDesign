package softDesign.softDesign.service;

import softDesign.softDesign.entity.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import softDesign.softDesign.repository.PessoaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    public List<Pessoa> listarPessoas() {
        return pessoaRepository.findAll();
    }

    public Pessoa listarPessoaById(Long id) {
        return pessoaRepository.findById(id).orElse(null);
    }

    public Pessoa salvarPessoa(Pessoa pessoa){
        return pessoaRepository.save(pessoa);
    }

    public boolean excluirPessoa(Long id) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
        if (pessoaOptional.isPresent()) {
            pessoaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
