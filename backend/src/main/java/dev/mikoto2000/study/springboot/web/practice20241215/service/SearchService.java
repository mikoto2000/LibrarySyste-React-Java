package dev.mikoto2000.study.springboot.web.practice20241215.service;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.mikoto2000.study.springboot.web.practice20241215.repository.LendingSetSearchRepository;
import dev.mikoto2000.study.springboot.web.practice20241215.repository.SearchRepository;

/**
 * SearchService
 */
@Service
public class SearchService {
  private SearchRepository searchRepository;
  private LendingSetSearchRepository lendingSetSearchRepository;

  /**
   * Constructor
   */
  public SearchService(
      SearchRepository searchRepository,
      LendingSetSearchRepository lendingSetSearchRepository) {
    this.searchRepository = searchRepository;
    this.lendingSetSearchRepository = lendingSetSearchRepository;
  }

  public Page<Map<String, Object>> searchBookMaster(
      Long id,
      String name,
      LocalDate publicationDateBegin,
      LocalDate publicationDateEnd,
      String ndcCategoryName,
      Pageable pageable) {
    return this.searchRepository.searchBookMaster(id, name, publicationDateBegin, publicationDateEnd, ndcCategoryName,
        pageable);
  }

  public Page<Map<String, Object>> searchLendingSet(
      Long id,
      String name,
      String memo,
      LocalDate lendStartDateBegin,
      LocalDate lendStartDateEnd,
      LocalDate lendDeadlineDateBegin,
      LocalDate lendDeadlineDateEnd,
      LocalDate returnDateBegin,
      LocalDate returnDateEnd,
      Pageable pageable) {
    return this.lendingSetSearchRepository.searchLendingSet(
        id,
        name,
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
