package dev.mikoto2000.study.springboot.web.practice20241215.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStockStatus;

/**
 * DefaultBookStockStatusProjection
 */
@Projection(name = "defaultBookStockStatusProjection", types = { BookStockStatus.class })
public interface DefaultBookStockStatusProjection {
  @Value("#{target.id}")
  Long getId();
  String getName();
}


