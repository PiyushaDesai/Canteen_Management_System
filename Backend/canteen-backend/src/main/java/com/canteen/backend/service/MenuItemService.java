package com.canteen.backend.service;

import java.util.List;

import com.canteen.backend.dto.ApiResponse;
import com.canteen.backend.dto.MenuItemDto;
import com.canteen.backend.model.MenuItem;

public interface MenuItemService {

    ApiResponse addFoodItem(MenuItemDto dto);
    List<MenuItem> getMenuItems();
    ApiResponse updateMenuItem(Long id, MenuItemDto menuItemDto);  // changed to String
    ApiResponse deleteMenuItem(Long id);                           // changed to String
    MenuItem getMenuItemById(Long id);                             // changed to String
    List<MenuItem> getItemsByCategory(String category);
    List<MenuItem> getAvailableMenuItems();

}
