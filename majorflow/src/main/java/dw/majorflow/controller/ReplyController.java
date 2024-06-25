package dw.majorflow.controller;

import dw.majorflow.model.Reply;
import dw.majorflow.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/reply")
public class ReplyController {
    @Autowired
    private ReplyService replyService;

    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/save")
    public ResponseEntity<Reply> saveReply(@RequestBody Reply reply) {
        return new ResponseEntity<>(replyService.saveReply(reply),
                HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Reply>> getAllReply() {
        return new ResponseEntity<>(replyService.getAllReply(),
                HttpStatus.OK);
    }

}
