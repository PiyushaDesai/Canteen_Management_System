package com.canteen.backend.dto;

import lombok.Data;

@Data
public class MenuItemDto {
	private String name;
    private String description;
    private double price;
    private String category;       
    private boolean isSpecial;
    private String imageUrl;
    private boolean isAvailable;
    private String itemType;
}
