package dw.majorflow.controller;

import dw.majorflow.model.FreeBoard;
import dw.majorflow.service.FreeBoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class FreeBoardController {

    private FreeBoardService freeBoardService;

    public FreeBoardController(FreeBoardService freeBoardService) {
        this.freeBoardService = freeBoardService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<FreeBoard>> getBoardAll() {
        return new ResponseEntity<>(freeBoardService.getBoardAll(), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<FreeBoard> saveBoard(@RequestBody FreeBoard freeBoard) {
        return new ResponseEntity<>(freeBoardService.saveBoard(freeBoard),
                HttpStatus.OK);
    }
}
