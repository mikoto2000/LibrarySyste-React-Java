package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStock;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultBookStockProjection;

/**
 * BookStockRepository
 */
@RepositoryRestResource(excerptProjection = DefaultBookStockProjection.class)
public interface BookStockRepository extends PagingAndSortingRepository<BookStock, Long>, CrudRepository<BookStock, Long> {

  @Query(value = """
    select a from BookStock a
      where
        (a.id = :id or :id is null)
        and
        (a.memo like %:memo% or :memo is null)
        and
        (:bookStockStatusIds is null or a.bookStockStatus.id in :bookStockStatusIds)
  """
  )
  Page<BookStock> findByComplexConditions(Long id, String memo, List<Long> bookStockStatusIds, Pageable pageable);

}


