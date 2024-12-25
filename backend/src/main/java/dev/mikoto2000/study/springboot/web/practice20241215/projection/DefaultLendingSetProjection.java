package dev.mikoto2000.study.springboot.web.practice20241215.projection;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStock;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.Customer;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingSet;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingStatus;

/**
 * DefaultLendingSetProjection
 */
@Projection(name = "defaultLendingSetProjection", types = { LendingSet.class })
public interface DefaultLendingSetProjection {
  @Value("#{target.id}")
  Long getId();
  LocalDate getLendStartDate();
  LocalDate getLendDeadlineDate();
  LocalDate getreturnDate();

  List<BookStock> getBookStock();

  Customer getCustomer();
  LendingStatus getLendingStatus();
}

