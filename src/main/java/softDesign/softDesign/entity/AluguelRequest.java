package softDesign.softDesign.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AluguelRequest {
    private Long livroId;
    private Long pessoaId;
    private LocalDate dataDevolucao;
}
