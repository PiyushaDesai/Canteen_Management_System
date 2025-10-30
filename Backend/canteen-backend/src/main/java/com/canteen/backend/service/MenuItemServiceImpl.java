package com.canteen.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canteen.backend.custom_exception.ResourceNotFoundException;
import com.canteen.backend.dto.ApiResponse;
import com.canteen.backend.dto.MenuItemDto;
import com.canteen.backend.model.MenuItem;
import com.canteen.backend.repository.MenuItemRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private MenuItemRepository menuItemRepository;
    private SequenceGeneratorService sequenceGenerator;

    @Override
    public ApiResponse addFoodItem(MenuItemDto dto) {
        MenuItem item = new MenuItem();
        item.setId(sequenceGenerator.generateSequence(MenuItem.SEQUENCE_NAME));
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setCategory(dto.getCategory());
        item.setPrice(dto.getPrice());
        item.setSpecial(dto.isSpecial());
        item.setAvailable(dto.isAvailable());
        item.setImageUrl(dto.getImageUrl());
        item.setItemType(dto.getItemType());

        menuItemRepository.save(item);
        return new ApiResponse("Food Item Added Successfully");
    }

    @Override
    public List<MenuItem> getMenuItems() {
        return menuItemRepository.findAll();
    }

    
  
    
    @Override
    public ApiResponse updateMenuItem(Long id, MenuItemDto dto) {
        Optional<MenuItem> optional = menuItemRepository.findById(id);
        if (!optional.isPresent()) {
            return new ApiResponse("Item not found!");
        }

        MenuItem item = optional.get();
        item.setId(id);
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setCategory(dto.getCategory());
        item.setAvailable(dto.isAvailable());
        item.setSpecial(dto.isSpecial());
        item.setImageUrl(dto.getImageUrl());

        menuItemRepository.save(item);
        return new ApiResponse("Item updated successfully!");
    }

    @Override
    public ApiResponse deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            return new ApiResponse("Item not found!");
        }
        MenuItem item=menuItemRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Id"));
	    item.setAvailable(false); // soft delete of food item
	    menuItemRepository.save(item);
        
        return new ApiResponse("Item deleted successfully!");
    }

    @Override
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + id));
    }

    @Override
    public List<MenuItem> getItemsByCategory(String category) {
        return menuItemRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<MenuItem> getAvailableMenuItems() {
        return menuItemRepository.findByAvailableTrue();
    }
}
