package dev.mikoto2000.study.springboot.web.practice20241215.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStock;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStockStatus;

/**
 * DefaultBookStockProjection
 */
@Projection(name = "defaultBookStockProjection", types = { BookStock.class })
public interface DefaultBookStockProjection {
  @Value("#{target.id}")
  Long getId();
  String getMemo();
  BookStockStatus getBookStockStatus();
}

