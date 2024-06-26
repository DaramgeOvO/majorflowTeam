package dw.majorflow.controller;

import dw.majorflow.dto.SessionDto;
import dw.majorflow.dto.UserDto;
import dw.majorflow.model.User;
import dw.majorflow.service.UserDetailService;
import dw.majorflow.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private UserDetailService userDetailService;
    private AuthenticationManager authenticationManager;
    private HttpServletRequest httpServletRequest;

    @Autowired
    public UserController(UserService userService, UserDetailService userDetailService, AuthenticationManager authenticationManager, HttpServletRequest httpServletRequest) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.authenticationManager = authenticationManager;
        this.httpServletRequest = httpServletRequest;
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsersAll() {
        return new ResponseEntity<>(userService.getUsersAll(), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.saveUser(userDto),
                HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto, HttpServletRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        HttpSession session = request.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

        User authenticatedUser = (User) authentication.getPrincipal();
        SessionDto sessionDto = new SessionDto(
                authenticatedUser.getUserId(),
                authenticatedUser.getNickname(),
                authenticatedUser.getAuthorities()
        );

        session.setAttribute("sessionDto", sessionDto);

        return ResponseEntity.ok("Success");
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "You have been logged out.";
    }


    @GetMapping("/current")
    public SessionDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        SessionDto sessionDto = new SessionDto();
        sessionDto.setUserId(authentication.getName());
        sessionDto.setUserName(authentication.getName());
        sessionDto.setAuthority(authentication.getAuthorities());
        return sessionDto;
    }

    @PostMapping("/check-id")
    public ResponseEntity<Boolean> checkDuplicateId(@RequestBody UserDto userDto) {
        boolean exists = userService.checkDuplicateId(userDto.getUserId());
        return new ResponseEntity<>(exists, exists ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    @PostMapping("/check-nickname")
    public ResponseEntity<Boolean> checkDuplicateNickname(@RequestBody UserDto userDto) {
        boolean exists = userService.checkDuplicateNickname(userDto.getNickname());
        return new ResponseEntity<>(exists, exists ? HttpStatus.CONFLICT : HttpStatus.OK);
    }
}
