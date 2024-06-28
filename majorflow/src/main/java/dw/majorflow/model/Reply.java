package dw.majorflow.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reply")
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Column(name = "reply_text", length=65535)
    private String replyText;

    @ManyToOne
    @JoinColumn(name = "freeBoard_id")
    private FreeBoard freeBoard;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private LocalDateTime replyTime;


}
