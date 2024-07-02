package dw.majorflow.service;

import dw.majorflow.dto.ReplyDto;
import dw.majorflow.model.Reply;
import dw.majorflow.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReplyService {

    @Autowired
    ReplyRepository replyRepository;

    public Reply saveReply(Reply reply) {
        reply.setReplyTime(LocalDate.now());
        return replyRepository.save(reply);
    }

    public List<Reply> getAllReply(){
        return replyRepository.findAll();
    }

    public List<ReplyDto> getReplyAllByDto() {
        List<Reply> replyList = replyRepository.findAll();
        List<ReplyDto> replyDtoList = new ArrayList<>();
        for (int i = 0; i < replyList.size(); i++) {
            ReplyDto replyDto = new ReplyDto();
            replyDtoList.add(replyDto.toReplyDtoFromReply(replyList.get(i)));
        }
        return replyDtoList;
    }
}
