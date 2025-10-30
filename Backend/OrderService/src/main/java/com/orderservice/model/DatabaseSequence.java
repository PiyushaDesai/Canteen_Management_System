package com.orderservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="Database_Sequences")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DatabaseSequence {
	
	@Id
    private String _id;

    private long seq;

}
