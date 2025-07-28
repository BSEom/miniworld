package com.pknu.miniworld.Miniroom.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pknu.miniworld.Miniroom.Entity.ItemList;

@Repository
public interface ItemListRepository extends MongoRepository<ItemList, String> {

}
