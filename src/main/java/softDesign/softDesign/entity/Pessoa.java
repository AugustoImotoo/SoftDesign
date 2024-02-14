package softDesign.softDesign.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
    @Id
    @GeneratedValue
    private Long id;
    private String nomeCompleto;
    private String telefone;
}
