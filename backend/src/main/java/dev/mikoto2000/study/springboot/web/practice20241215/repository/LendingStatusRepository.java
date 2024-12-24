package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingStatus;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultLendingStatusProjection;

/**
 * LendingStatusRepository
 */
@RepositoryRestResource(excerptProjection = DefaultLendingStatusProjection.class)
public interface LendingStatusRepository extends PagingAndSortingRepository<LendingStatus, Long>, CrudRepository<LendingStatus, Long> {

  @Query(value = """
    select a from LendingStatus a
      where
        (a.id = :id or :id is null)
        and
        (a.name like %:name% or :name is null)
  """
  )
  Page<LendingStatus> findByComplexConditions(Long id, String name, Pageable pageable);
}

