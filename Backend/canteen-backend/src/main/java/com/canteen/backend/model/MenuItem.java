package com.canteen.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "MenuItem")
public class MenuItem {
	

	@Transient
	public static final String SEQUENCE_NAME="MenuItem_sequence";
	

    @Id
    private Long id; // ✅ Changed to String for MongoDB

    private String name;
    private String description;
    private double price;
    private String category;
    private boolean isSpecial;
    private String imageUrl;
    private boolean available;
    private String itemType;
}
