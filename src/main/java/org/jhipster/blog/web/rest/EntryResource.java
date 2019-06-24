package org.jhipster.blog.web.rest;

import org.jhipster.blog.domain.Entry;
import org.jhipster.blog.repository.EntryRepository;
import org.jhipster.blog.security.SecurityUtils;
import org.jhipster.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.blog.domain.Entry}.
 */
@RestController
@RequestMapping("/api")
public class EntryResource {

    private final Logger log = LoggerFactory.getLogger(EntryResource.class);

    private static final String ENTITY_NAME = "entry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntryRepository entryRepository;

    public EntryResource(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    /**
     * {@code POST  /entries} : Create a new entry.
     *
     * @param entry the entry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entry, or with status {@code 400 (Bad Request)} if the entry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entries")
    public ResponseEntity<?> createEntry(@Valid @RequestBody Entry entry) throws URISyntaxException {
        log.debug("REST request to save Entry : {}", entry);
        if (entry.getId() != null) {
            throw new BadRequestAlertException("A new entry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entry result = entryRepository.save(entry);
        if (entry.getBlog() != null &&
            !entry.getBlog().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().orElse(""))) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.created(new URI("/api/entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entries} : Updates an existing entry.
     *
     * @param entry the entry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entry,
     * or with status {@code 400 (Bad Request)} if the entry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entries")
    public ResponseEntity<?> updateEntry(@Valid @RequestBody Entry entry) throws URISyntaxException {
        log.debug("REST request to update Entry : {}", entry);
        if (entry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (entry.getBlog() != null &&
            !entry.getBlog().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().orElse(""))) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Entry result = entryRepository.save(entry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entry.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entries} : get all the entries.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entries in body.
     */
    @GetMapping("/entries")
    public ResponseEntity<List<Entry>> getAllEntries(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Entries");
        Page<Entry> page = entryRepository.findByBlogUserLoginOrderByDateDesc(SecurityUtils.getCurrentUserLogin().orElse(null), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entries/:id} : get the "id" entry.
     *
     * @param id the id of the entry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entries/{id}")
    public ResponseEntity<?> getEntry(@PathVariable Long id) {
        log.debug("REST request to get Entry : {}", id);
        Optional<Entry> entry = entryRepository.findOneWithEagerRelationships(id);
        if (entry.isPresent() && entry.get().getBlog() != null &&
            !entry.get().getBlog().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().orElse(""))) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        return ResponseUtil.wrapOrNotFound(entry);
    }

    /**
     * {@code DELETE  /entries/:id} : delete the "id" entry.
     *
     * @param id the id of the entry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entries/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        log.debug("REST request to delete Entry : {}", id);
        Optional<Entry> entry = entryRepository.findOneWithEagerRelationships(id);
        if (entry.isPresent() && entry.get().getBlog() != null &&
            !entry.get().getBlog().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().orElse(""))) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        entryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
