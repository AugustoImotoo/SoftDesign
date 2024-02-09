package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Pessoa {
    @Id @GeneratedValue
    private Long id;

    @Getter @Setter
    private String nomeCompleto;

    @Getter @Setter
    private String telefone;
}
