package softDesign.softDesign.entity;

import lombok.*;
import softDesign.softDesign.enumeration.SimNao;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
}
