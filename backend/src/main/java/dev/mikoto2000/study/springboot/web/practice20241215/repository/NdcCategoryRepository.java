package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.NdcCategory;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultNdcCategoryProjection;

/**
 * NdcCategoryRepository
 */
@RepositoryRestResource(excerptProjection = DefaultNdcCategoryProjection.class)
public interface NdcCategoryRepository
    extends PagingAndSortingRepository<NdcCategory, Long>, CrudRepository<NdcCategory, Long> {
  @Query(value = """
    select a from NdcCategory a
      where
        (a.id = :id or :id is null)
        and
        (a.name like %:name% or :name is null)
        and
        (a.number like %:number% or :number is null)
  """
  )
  Page<NdcCategory> findByComplexConditions(Long id, String name, String number, Pageable pageable);
}
