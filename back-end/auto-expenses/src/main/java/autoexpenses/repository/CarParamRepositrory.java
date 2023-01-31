package autoexpenses.repository;

import autoexpenses.entity.CarParam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarParamRepositrory extends JpaRepository<CarParam, Long> {
}
