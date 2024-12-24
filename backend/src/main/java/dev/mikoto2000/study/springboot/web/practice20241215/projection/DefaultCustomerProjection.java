package dev.mikoto2000.study.springboot.web.practice20241215.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.Customer;

/**
 * DefaultCustomerProjection
 */
@Projection(name = "defaultCustomerProjection", types = { Customer.class })
public interface DefaultCustomerProjection {
  @Value("#{target.id}")
  Long getId();
  String getName();
  String getEmailAddress();
}

