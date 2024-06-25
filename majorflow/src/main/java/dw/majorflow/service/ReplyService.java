package dw.majorflow.service;

import dw.majorflow.model.Reply;
import dw.majorflow.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ReplyService {

    @Autowired
    ReplyRepository replyRepository;

    public Reply saveReply(Reply reply) {
        return replyRepository.save(reply);
    }

    public List<Reply> getAllReply(){
        return replyRepository.findAll();
    }
}
