package dw.majorflow.repository;

import dw.majorflow.model.EduTech;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EduTechRepository extends JpaRepository<EduTech, Integer> {
    Optional<EduTech> findById(Integer EduTechId);

    List<EduTech> findByUserUserId(String userId);
}