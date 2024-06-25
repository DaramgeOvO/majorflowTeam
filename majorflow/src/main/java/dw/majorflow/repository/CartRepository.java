package dw.majorflow.repository;

import dw.majorflow.model.Cart;
import dw.majorflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
}