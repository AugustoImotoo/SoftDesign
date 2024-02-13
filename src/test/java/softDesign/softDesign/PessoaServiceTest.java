package softDesign.softDesign;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import softDesign.softDesign.entity.Pessoa;
import softDesign.softDesign.repository.PessoaRepository;
import softDesign.softDesign.service.PessoaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PessoaServiceTest {

    @Mock
    private PessoaRepository pessoaRepository;

    @InjectMocks
    private PessoaService pessoaService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testListarPessoas() {
        List<Pessoa> pessoas = new ArrayList<>();
        when(pessoaRepository.findAll()).thenReturn(pessoas);

        List<Pessoa> result = pessoaService.listarPessoas();

        assertEquals(pessoas, result);
    }

    @Test
    public void testListarPessoaById() {
        Long id = 1L;
        Pessoa pessoa = new Pessoa();
        pessoa.setId(id);
        when(pessoaRepository.findById(id)).thenReturn(Optional.of(pessoa));

        Pessoa result = pessoaService.listarPessoaById(id);

        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testSalvarPessoa() {
        Pessoa pessoa = new Pessoa();
        when(pessoaRepository.save(any(Pessoa.class))).thenReturn(pessoa);

        Pessoa result = pessoaService.salvarPessoa(pessoa);

        assertNotNull(result);
    }

    @Test
    public void testExcluirPessoa() {
        Long id = 1L;
        Pessoa pessoa = new Pessoa();
        pessoa.setId(id);
        when(pessoaRepository.findById(id)).thenReturn(Optional.of(pessoa));

        boolean sucesso = pessoaService.excluirPessoa(id);
        
        assertTrue(sucesso);
        verify(pessoaRepository, times(1)).deleteById(id);
    }
}