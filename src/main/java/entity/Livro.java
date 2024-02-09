package entity;

import enumeration.SimNao;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Livro {
    @Id
    @GeneratedValue
    private Long id;

    @Getter
    @Setter
    private String titulo;

    @Getter
    @Setter
    private String autor;

    @Getter
    @Setter
    private SimNao alugado;

    public Livro() {

    }

    public Livro(String titulo, String autor, SimNao alugado) {
        this.titulo = titulo;
        this.autor = autor;
        this.alugado = alugado;
    }
}
