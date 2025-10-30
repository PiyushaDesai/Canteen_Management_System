package com.canteen.backend.controller;

import com.canteen.backend.dto.MenuItemDto;
import com.canteen.backend.model.MenuItem;
import com.canteen.backend.service.MenuItemService;
import com.canteen.backend.dto.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Map;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;




@RestController
@RequestMapping("/MenuItems")
@CrossOrigin(origins = {
		"http://localhost:5173",
		"https://canteen-management-system-theta.vercel.app"})
public class MenuItemController {
	 @Autowired
	    private MenuItemService menuItemService;
	 @Autowired
	 private Cloudinary cloudinary;


	@PostMapping(value = "/add", consumes = "multipart/form-data")
	public ResponseEntity<?> addFoodItem(
	        @RequestParam("name") String name,
	        @RequestParam("description") String description,
	        @RequestParam("price") double price,
	        @RequestParam("category") String category,
	        @RequestParam("available") boolean available,
	        @RequestParam("isSpecial") boolean isSpecial,
	        @RequestParam(value = "image", required = false) MultipartFile image,
	        @RequestParam("itemType") String itemType
	) {
	    String imageUrl = "";
	    if (image != null && !image.isEmpty()) {
	        try {
	            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
	            imageUrl = uploadResult.get("secure_url").toString();
	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(500).body(new ApiResponse("Image upload failed"));
	        }
	    }


	    // Create DTO
	    MenuItemDto dto = new MenuItemDto();
	    dto.setName(name);
	    dto.setDescription(description);
	    dto.setPrice(price);
	    dto.setCategory(category);
	    dto.setImageUrl(imageUrl);
	    dto.setSpecial(isSpecial);
	    dto.setAvailable(available);
	    dto.setItemType(itemType);

	    return ResponseEntity.status(200).body(menuItemService.addFoodItem(dto));
	}

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuItemDto dto) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, dto));
    }

    @GetMapping("/getItems")
    public ResponseEntity<List<MenuItem>> getAllItems() {
        return ResponseEntity.ok(menuItemService.getMenuItems());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteMenuItem(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.deleteMenuItem(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getItemsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(menuItemService.getItemsByCategory(category));
    }

    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableMenuItems() {
        return ResponseEntity.ok(menuItemService.getAvailableMenuItems());
    }
}
