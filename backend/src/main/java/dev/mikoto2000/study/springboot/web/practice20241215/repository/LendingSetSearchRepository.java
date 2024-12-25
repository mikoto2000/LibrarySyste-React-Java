package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingSet;

/**
 * LendingSetSearchRepository
 */
@Repository
public interface LendingSetSearchRepository extends PagingAndSortingRepository<LendingSet, Long> {

  @Query(value = """
        select
          ls.id,
          ls.lend_start_date,
          ls.lend_deadline_date,
          ls.return_date,
          status.name as lending_status,
          ls.memo,
          c.name as customer_name,
          string_agg(bm.name, ', ') as book_name
        from lending_set as ls
        left outer join customer as c on ls.customer_id = c.id
        left outer join lending_set_book_stock as lsbs on ls.id = lsbs.lending_set_id
        left outer join book_stock as bs on bs.id = lsbs.book_stock_id
        left outer join book_master as bm on bm.id = bs.book_master_id
        left outer join lending_status as status on ls.lending_status_id = status.id
        where
          (ls.id = :id or :id is null)
          and
          (bs.memo like %:memo% or cast(:memo as varchar) is null)
          and
          (bm.name like %:bookName% or cast(:bookName as varchar) is null)
          and
          (c.name like %:customerName% or cast(:customerName as varchar) is null)
          and
          (ls.lend_start_date >= :lendStartDateBegin or cast(:lendStartDateBegin as date) is null)
          and
          (ls.lend_start_date <= :lendStartDateEnd or cast(:lendStartDateEnd as date) is null)
          and
          (ls.lend_deadline_date >= :lendDeadlineDateBegin or cast(:lendDeadlineDateBegin as date) is null)
          and
          (ls.lend_deadline_date <= :lendDeadlineDateEnd or cast(:lendDeadlineDateEnd as date) is null)
          and
          (ls.return_date >= :returnDateBegin or cast(:returnDateBegin as date) is null)
          and
          (ls.return_date <= :returnDateEnd or cast(:returnDateEnd as date) is null)
        group by
          ls.id,
          c.name,
          status.name
      """,
      countQuery = """
        select
          count(*)
        from lending_set as ls
        left outer join customer as c on ls.customer_id = c.id
        left outer join lending_set_book_stock as lsbs on ls.id = lsbs.lending_set_id
        left outer join book_stock as bs on bs.id = lsbs.book_stock_id
        left outer join book_master as bm on bm.id = bs.book_master_id
        left outer join lending_status as status on ls.lending_status_id = status.id
        where
          (ls.id = :id or :id is null)
          and
          (bs.memo like %:memo% or cast(:memo as varchar) is null)
          and
          (bm.name like %:bookName% or cast(:bookName as varchar) is null)
          and
          (c.name like %:customerName% or cast(:customerName as varchar) is null)
          and
          (ls.lend_start_date >= :lendStartDateBegin or cast(:lendStartDateBegin as date) is null)
          and
          (ls.lend_start_date <= :lendStartDateEnd or cast(:lendStartDateEnd as date) is null)
          and
          (ls.lend_deadline_date >= :lendDeadlineDateBegin or cast(:lendDeadlineDateBegin as date) is null)
          and
          (ls.lend_deadline_date <= :lendDeadlineDateEnd or cast(:lendDeadlineDateEnd as date) is null)
          and
          (ls.return_date >= :returnDateBegin or cast(:returnDateBegin as date) is null)
          and
          (ls.return_date <= :returnDateEnd or cast(:returnDateEnd as date) is null)
        group by
          ls.id,
          c.name,
          status.name
      """,
      nativeQuery = true)
  Page<Map<String, Object>> searchLendingSet(
      Long id,
      String bookName,
      String customerName,
      String memo,
      LocalDate lendStartDateBegin,
      LocalDate lendStartDateEnd,
      LocalDate lendDeadlineDateBegin,
      LocalDate lendDeadlineDateEnd,
      LocalDate returnDateBegin,
      LocalDate returnDateEnd,
      Pageable pageable);
}

