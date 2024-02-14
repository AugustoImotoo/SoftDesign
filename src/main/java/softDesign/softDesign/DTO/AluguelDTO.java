package softDesign.softDesign.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AluguelDTO {
    private Long livroId;
    private Long pessoaId;
    private LocalDate dataDevolucao;
}
