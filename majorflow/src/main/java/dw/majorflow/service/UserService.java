package dw.majorflow.service;

import dw.majorflow.dto.UserDto;
import dw.majorflow.model.Authority;
import dw.majorflow.model.User;
import dw.majorflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User getUserById(String userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }

    public List<User> getUsersAll() {
        return userRepository.findAll();
    }

    public String saveUser(UserDto userDto) {
        Optional<User> userById = userRepository.findByUserId(userDto.getUserId());
        Optional<User> userByNickname = userRepository.findByNickname(userDto.getNickname());
        if (userById.isPresent() || userByNickname.isPresent()) {
            return "0"; // userId 또는 nickname 중 하나라도 중복되는 경우
        } else {
            Authority authority = new Authority();
            authority.setAuthorityName("ROLE_USER");
            User user = new User(
                    userDto.getUserId(),
                    userDto.getName(),
                    bCryptPasswordEncoder.encode(userDto.getPassword()),
                    userDto.getBirthDate(),
                    userDto.getPhoneNumber(),
                    userDto.getAddress(),
                    userDto.getGender().getFirst(),
                    userDto.getEmail(),
                    userDto.getNickname(),
                    userDto.getGenre().getFirst(),
                    authority);
            return userRepository.save(user).getUserId();
        }
    }

    public boolean checkDuplicateId(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }

    public boolean checkDuplicateNickname(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }
}
