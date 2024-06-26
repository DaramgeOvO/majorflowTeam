package dw.majorflow.service;

import dw.majorflow.model.FreeBoard;
import dw.majorflow.model.Review;
import dw.majorflow.repository.FreeBoardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class FreeBoardService {

    public FreeBoard saveFreeBoard(FreeBoard freeBoard) {
        freeBoard.setFreeBoardTime(LocalDateTime.now());
        return freeBoardRepository.save(freeBoard);
    }
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
