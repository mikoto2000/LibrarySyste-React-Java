package dev.mikoto2000.study.springboot.web.practice20241215.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev.mikoto2000.study.springboot.web.practice20241215.entity.LendingSet;
import dev.mikoto2000.study.springboot.web.practice20241215.projection.DefaultLendingSetProjection;

/**
 * LendingSetRepository
 */
@RepositoryRestResource(excerptProjection = DefaultLendingSetProjection.class)
public interface LendingSetRepository
    extends PagingAndSortingRepository<LendingSet, Long>, CrudRepository<LendingSet, Long> {
}

