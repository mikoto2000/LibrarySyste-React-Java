package dev.mikoto2000.study.springboot.web.practice20241215.eventhandler;

import java.util.Optional;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStock;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStockStatus;
import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingSet;
import dev.mikoto2000.study.springboot.web.practice20241215.repository.BookStockStatusRepository;
import lombok.extern.slf4j.Slf4j;

@Component
@RepositoryEventHandler
@Slf4j
public class LendingSetEventHandler {

  private BookStockStatusRepository bookStockStatusRepository;

  public LendingSetEventHandler(
      BookStockStatusRepository bookStockStatusRepository) {
    this.bookStockStatusRepository = bookStockStatusRepository;
  }

  @HandleBeforeCreate
  public void updateBookStatusBeforeLendCreate(LendingSet lendingSet) {
    Optional<BookStockStatus> lendingAvailable = Optional.empty();
    if (lendingSet.getLendingStatus().getId() == 1) {
      // 貸出不可能にする
      lendingAvailable = bookStockStatusRepository.findById(2L);
    }
    if (lendingSet.getBookStock() != null) {
      for (BookStock bookStock : lendingSet.getBookStock()) {
        log.debug("👺KITAYO: {}", bookStock.getBookMaster().getName());
        lendingAvailable.ifPresent((e) -> bookStock.setBookStockStatus(e));
      }
    }
  }

  @HandleBeforeSave
  public void updateBookStatusBeforeLendSave(LendingSet lendingSet) {
    Optional<BookStockStatus> lendingAvailable;
    if (lendingSet.getLendingStatus().getId() == 1) {
      // 貸出不可能にする
      lendingAvailable = bookStockStatusRepository.findById(2L);
    } else {
      // 貸出可能にする
      lendingAvailable = bookStockStatusRepository.findById(1L);
    }
    if (lendingSet.getBookStock() != null) {
      for (BookStock bookStock : lendingSet.getBookStock()) {
        log.debug("👺KITAYO: {}", bookStock.getBookMaster().getName());
        lendingAvailable.ifPresent((e) -> bookStock.setBookStockStatus(e));
      }
    }
  }
}
