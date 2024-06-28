package dw.majorflow.service;

import dw.majorflow.model.FreeBoard;
import dw.majorflow.repository.FreeBoardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;

    public FreeBoardService(FreeBoardRepository freeBoardRepository) {
        this.freeBoardRepository = freeBoardRepository;
    }

    public List<FreeBoard> getBoardAll() {
        return freeBoardRepository.findAll();
    }

    public FreeBoard saveBoard(FreeBoard freeBoard) {
        return freeBoardRepository.save(freeBoard);
    }
}
