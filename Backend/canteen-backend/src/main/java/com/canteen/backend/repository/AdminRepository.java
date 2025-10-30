package com.canteen.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.canteen.backend.model.MenuItem;

public interface AdminRepository  extends MongoRepository<MenuItem, Long>{

}
