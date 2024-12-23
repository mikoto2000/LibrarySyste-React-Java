package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.BookStockStatus;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultBookStockStatusProjection;

/**
 * BookStockStatusRepository
 */
@RepositoryRestResource(excerptProjection = DefaultBookStockStatusProjection.class)
public interface BookStockStatusRepository extends PagingAndSortingRepository<BookStockStatus, Long>, CrudRepository<BookStockStatus, Long> {

  @Query(value = """
    select a from BookStockStatus a
      where
        (a.id = :id or :id is null)
        and
        (a.name like %:name% or :name is null)
  """
  )
  Page<BookStockStatus> findByComplexConditions(Long id, String name, Pageable pageable);
}

