package autoexpenses.repository;

import autoexpenses.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepostirory extends JpaRepository<Document, Long> {
}
