package dw.majorflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
    private String userId;
    private String name;
    private String password;
    private LocalDate birthDate;
    private String phoneNumber;
    private String address;
    private List<String> gender;
    private String email;
    private String nickname;
    private List<String> genre;
}
