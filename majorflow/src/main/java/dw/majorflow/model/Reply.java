package dw.majorflow.model;

import jakarta.persistence.*;
import lombok.*;

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


}
