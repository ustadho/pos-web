/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.pos.dao;

import com.pos.model.ItemKategori;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author faheem
 */
public interface ItemKategoriDao extends PagingAndSortingRepository<ItemKategori, Integer>{
    @Query("from ItemKategori k where upper(k.nama) like upper(:search) ")
    public Page<ItemKategori> filter(@Param("search") String search, Pageable pageable);
    
    public ItemKategori findByNama(String nama);
    
    
}
