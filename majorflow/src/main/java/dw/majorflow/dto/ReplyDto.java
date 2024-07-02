package dw.majorflow.dto;

import dw.majorflow.model.FreeBoard;
import dw.majorflow.model.Reply;
import dw.majorflow.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReplyDto {
    private long replyId;
    private User userId;
    private FreeBoard freeBoardId;
    private String text;
    private LocalDate replyTime;

    public ReplyDto toReplyDtoFromReply(Reply reply) {
        ReplyDto replyDto = new ReplyDto();
        replyDto.setReplyId(reply.getReplyId());
        replyDto.setUserId(reply.getUser());
        replyDto.setFreeBoardId(reply.getFreeBoard());
        replyDto.setText(reply.getReplyText());
        replyDto.setReplyTime(reply.getReplyTime());
        return replyDto;
    }
}
