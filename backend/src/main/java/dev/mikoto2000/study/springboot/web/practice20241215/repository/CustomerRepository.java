package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.Customer;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultCustomerProjection;

/**
 * CustomerRepository
 */
@RepositoryRestResource(excerptProjection = DefaultCustomerProjection.class)
public interface CustomerRepository
    extends PagingAndSortingRepository<Customer, Long>, CrudRepository<Customer, Long> {
  @Query(value = """
    select a from Customer a
      where
        (a.id = :id or :id is null)
        and
        (a.name like %:name% or :name is null)
        and
        (a.emailAddress like %:emailAddress% or :emailAddress is null)
  """
  )
  Page<Customer> findByComplexConditions(Long id, String name, String emailAddress, Pageable pageable);
}

