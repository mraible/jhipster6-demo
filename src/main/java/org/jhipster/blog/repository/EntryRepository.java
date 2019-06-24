package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Entry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Entry entity.
 */
@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

    @Query(value = "select distinct entry from Entry entry left join fetch entry.tags",
        countQuery = "select count(distinct entry) from Entry entry")
    Page<Entry> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct entry from Entry entry left join fetch entry.tags")
    List<Entry> findAllWithEagerRelationships();

    @Query("select entry from Entry entry left join fetch entry.tags where entry.id =:id")
    Optional<Entry> findOneWithEagerRelationships(@Param("id") Long id);

    Page<Entry> findByBlogUserLoginOrderByDateDesc(String currentUserLogin, Pageable pageable);
}
