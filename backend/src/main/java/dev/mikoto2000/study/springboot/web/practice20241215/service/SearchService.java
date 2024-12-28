package dev.mikoto2000.study.springboot.web.practice20241215.service;

import java.time.LocalDate;
import java.util.List;
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
      List<Long> lendingStatusIds,
      String bookName,
      String customerName,
      String memo,
      LocalDate lendStartDateBegin,
      LocalDate lendStartDateEnd,
      LocalDate lendDeadlineDateBegin,
      LocalDate lendDeadlineDateEnd,
      LocalDate returnDateBegin,
      LocalDate returnDateEnd,
      Pageable pageable) {

    if (lendingStatusIds != null && lendingStatusIds.size() == 1) {
      return this.lendingSetSearchRepository.searchLendingSetForSingleId(
          id,
          lendingStatusIds.get(0),
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
    } else {
      return this.lendingSetSearchRepository.searchLendingSetForMultiIds(
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
}
