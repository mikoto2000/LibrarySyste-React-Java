package dev.mikoto2000.study.springboot.web.practice20241215.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * LendingSet
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LendingSet {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private LocalDate lendStartDate;
  private LocalDate lendDeadlineDate;
  private LocalDate returnDate;
  private String memo;

  @ManyToMany
  List<BookStock> bookStock;

  @ManyToOne
  private LendingStatus lendingStatus;
  @ManyToOne
  private Customer customer;
}

