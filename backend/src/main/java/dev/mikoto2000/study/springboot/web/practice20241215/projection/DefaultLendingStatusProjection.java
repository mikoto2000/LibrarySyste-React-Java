package dev.mikoto2000.study.springboot.web.practice20241215.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingStatus;

/**
 * DefaultLendingStatusProjection
 */
@Projection(name = "defaultLendingStatusProjection", types = { LendingStatus.class })
public interface DefaultLendingStatusProjection {
  @Value("#{target.id}")
  Long getId();
  String getName();
}

