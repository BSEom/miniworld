package com.pknu.miniworld.Miniroom.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pknu.miniworld.Miniroom.Entity.MiniroomItems;

@Repository
public interface MiniroomItemsRepository extends MongoRepository<MiniroomItems, String> {

    List<MiniroomItems> findByMiniroomId(Long miniroomId);

    Optional<MiniroomItems> findByMiniroomIdAndItemId(Long miniroomId, String itemId);
}
