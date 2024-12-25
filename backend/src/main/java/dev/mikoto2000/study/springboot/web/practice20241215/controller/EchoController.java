package dev.mikoto2000.study.springboot.web.practice20241215.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.mikoto2000.study.springboot.web.practice20241215.service.SearchService;
import lombok.extern.slf4j.Slf4j;

/**
 * EchoController
 */
@RestController
@Slf4j
public class EchoController {

  private SearchService searchService;

  /**
   * Constructor
   */
  public EchoController(SearchService searchService) {
    this.searchService = searchService;
  }

  @GetMapping(path = "/hello")
  public String hello() {
    return "Hello, World!";
  }

  @GetMapping(path = "/searchBookMasters")
  public Page<Map<String, Object>> searchBookMasters(
      @Nullable Long id,
      @Nullable String name,
      @Nullable LocalDate publicationDateBegin,
      @Nullable LocalDate publicationDateEnd,
      @Nullable String ndcCategoryName,
      @Nullable @ParameterObject Pageable pageable) {
    return this.searchService.searchBookMaster(id, name, publicationDateBegin, publicationDateEnd, ndcCategoryName,
        pageable);
  }

  @GetMapping(path = "/searchLendingSet")
  public Page<Map<String, Object>> searchLendingSet(
      @Nullable Long id,
      @RequestParam("lendingStatusIds") @Nullable List<Long> lendingStatusIds,
      @Nullable String bookName,
      @Nullable String customerName,
      @Nullable String memo,
      @Nullable LocalDate lendStartDateBegin,
      @Nullable LocalDate lendStartDateEnd,
      @Nullable LocalDate lendDeadlineDateBegin,
      @Nullable LocalDate lendDeadlineDateEnd,
      @Nullable LocalDate returnDateBegin,
      @Nullable LocalDate returnDateEnd,
      @Nullable @ParameterObject Pageable pageable) {
      log.debug("lendingStatusIds: {}", lendingStatusIds);
    return this.searchService.searchLendingSet(
        id,
        lendingStatusIds,
        bookName,
        customerName,
        memo,
        lendStartDateBegin,
        lendStartDateEnd,
        lendDeadlineDateBegin,
        lendDeadlineDateEnd,
        returnDateBegin,
        returnDateEnd,
        pageable);
  }
}
