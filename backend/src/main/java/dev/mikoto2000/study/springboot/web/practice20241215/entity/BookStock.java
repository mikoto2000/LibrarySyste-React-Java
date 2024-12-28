package dev.mikoto2000.study.springboot.web.practice20241215.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BookStock
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookStock {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String memo;

  @ManyToMany
  @JoinTable(name = "lending_set_book_stock", joinColumns = @JoinColumn(name = "book_stock_id"), inverseJoinColumns = @JoinColumn(name = "lending_set_id"))
  List<LendingSet> lendingSet;

  @NotNull
  @ManyToOne
  private BookMaster bookMaster;

  @NotNull
  @ManyToOne
  private BookStockStatus bookStockStatus;
}
