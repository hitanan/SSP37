package com.example.domain;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface WordRepository extends PagingAndSortingRepository<Word, Long> {
    
    List<Word> findBySpellingLikeOrderBySpellingAsc(@Param("spelling") String spelling);

}
