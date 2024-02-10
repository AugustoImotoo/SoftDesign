package softDesign.softDesign;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import softDesign.softDesign.entity.Livro;
import softDesign.softDesign.entity.Pessoa;
import softDesign.softDesign.enumeration.SimNao;
import softDesign.softDesign.repository.LivroRepository;
import softDesign.softDesign.service.LivroService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LivroServiceTest {

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testListarLivros() {
        List<Livro> livros = new ArrayList<>();
        when(livroRepository.findAll()).thenReturn(livros);

        List<Livro> result = livroService.listarLivros();

        assertEquals(livros, result);
    }

    @Test
    public void testListarLivroById() {
        Long id = 1L;
        Livro livro = new Livro();
        livro.setId(id);
        when(livroRepository.findById(id)).thenReturn(Optional.of(livro));

        Livro result = livroService.listarLivroById(id);

        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testSalvarLivro() {
        Livro livro = new Livro();
        when(livroRepository.save(any(Livro.class))).thenReturn(livro);

        Livro result = livroService.salvarLivro(livro);

        assertNotNull(result);
    }

    @Test
    public void testAlugarLivro() {
        Long livroId = 1L;
        Pessoa pessoa = new Pessoa();
        LocalDate dataDevolucao = LocalDate.now().plusDays(7);

        Livro livro = new Livro();
        livro.setAlugado(SimNao.NAO);
        when(livroRepository.findById(livroId)).thenReturn(Optional.of(livro));

        boolean sucesso = livroService.alugarLivro(livroId, pessoa, dataDevolucao);

        assertTrue(sucesso);
        assertEquals(SimNao.SIM, livro.getAlugado());
        assertEquals(pessoa, livro.getPessoaQueAlugou());
        assertEquals(dataDevolucao, livro.getDataDevolucao());
    }

    @Test
    public void testDevolverLivro() {
        Long livroId = 1L;
        Pessoa pessoa = new Pessoa();

        Livro livro = new Livro();
        livro.setAlugado(SimNao.SIM);
        livro.setPessoaQueAlugou(pessoa);
        livro.setDataDevolucao(LocalDate.now());
        when(livroRepository.findById(livroId)).thenReturn(Optional.of(livro));

        boolean sucesso = livroService.devolverLivro(livroId, pessoa);

        assertTrue(sucesso);
        assertEquals(SimNao.NAO, livro.getAlugado());
        assertNull(livro.getPessoaQueAlugou());
        assertNull(livro.getDataDevolucao());
    }

    @Test
    public void testDeleteLivroById() {
        Long livroId = 1L;

        Livro livro = new Livro();
        livro.setAlugado(SimNao.NAO);
        when(livroRepository.findById(livroId)).thenReturn(Optional.of(livro));

        boolean sucesso = livroService.deleteLivroById(livroId);

        assertTrue(sucesso);
        verify(livroRepository, times(1)).delete(livro);
    }

    @Test
    public void testEditarLivro() {
        Long livroId = 1L;
        Livro livroAtualizado = new Livro();
        livroAtualizado.setTitulo("Novo Título");
        livroAtualizado.setAutor("Novo Autor");
        livroAtualizado.setEditora("Nova Editora");

        Livro livroExistente = new Livro();
        livroExistente.setAlugado(SimNao.NAO);
        when(livroRepository.findById(livroId)).thenReturn(Optional.of(livroExistente));

        boolean sucesso = livroService.editarLivro(livroId, livroAtualizado);

        assertTrue(sucesso);
        assertEquals(livroAtualizado.getTitulo(), livroExistente.getTitulo());
        assertEquals(livroAtualizado.getAutor(), livroExistente.getAutor());
        assertEquals(livroAtualizado.getEditora(), livroExistente.getEditora());
    }
}
