package softDesign.softDesign.repository;

import softDesign.softDesign.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByEditora(String editora);

    List<Livro> findByAutor(String autor);

    List<Livro> findByTitulo(String titulo);
}
