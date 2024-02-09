package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    LivroRepository livroRepository;

}
