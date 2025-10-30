package com.canteen.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.canteen.backend.model.MenuItem;


public interface MenuItemRepository extends MongoRepository<MenuItem,Long> {


    List<MenuItem> findByCategoryIgnoreCase(String category);
    List<MenuItem> findByAvailableTrue();

}
