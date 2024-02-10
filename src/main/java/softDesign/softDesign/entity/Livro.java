package softDesign.softDesign.entity;

import lombok.Data;
import softDesign.softDesign.enumeration.SimNao;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
public class Livro {
    @Id
    @GeneratedValue
    private Long id;
    private String titulo;
    private String autor;
    private String editora;
    private SimNao alugado;
    @ManyToOne
    private Pessoa pessoaQueAlugou;
    private LocalDate dataDevolucao;

    public Livro() {

    }

    public Livro(String titulo, String autor, String editora, SimNao alugado, Pessoa pessoaQueAlugou, LocalDate dataDevolucao) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.alugado = alugado;
        this.pessoaQueAlugou = pessoaQueAlugou;
        this.dataDevolucao = dataDevolucao;
    }
}
