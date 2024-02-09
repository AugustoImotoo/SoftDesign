package entity;

import enumeration.SimNao;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
public class Livro {
    @Id @GeneratedValue
    private Long id;

    @Getter @Setter
    private String titulo;

    @Getter @Setter
    private String autor;

    @Getter @Setter
    private String editora;

    @Getter @Setter
    private SimNao alugado;

    @ManyToOne @Getter @Setter
    private Pessoa pessoaQueAlugou;

    @Getter @Setter
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
