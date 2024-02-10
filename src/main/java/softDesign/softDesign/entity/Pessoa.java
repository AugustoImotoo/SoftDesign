package softDesign.softDesign.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
public class Pessoa {
    @Id
    @GeneratedValue
    private Long id;
    private String nomeCompleto;
    private String telefone;

    public Pessoa() {

    }

    public Pessoa(String nomeCompleto, String telefone) {
        this.nomeCompleto = nomeCompleto;
        this.telefone = telefone;
    }
}
