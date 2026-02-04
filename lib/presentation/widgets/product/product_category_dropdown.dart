import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/product_form_controller.dart';
import '../../../data/models/category_model.dart';

class ProductCategoryDropdown extends StatelessWidget {
  final ProductFormController controller;

  const ProductCategoryDropdown({Key? key, required this.controller}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (controller.categories.isEmpty) return const SizedBox();
      return Container(
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        decoration: BoxDecoration(
          color: Get.isDarkMode ? Colors.grey[800] : Colors.grey[200],
          borderRadius: BorderRadius.circular(12.r),
        ),
        child: DropdownButtonHideUnderline(
          child: DropdownButton<CategoryModel>(
            value: controller.selectedCategory.value,
            hint: const Text("Select Category"),
            isExpanded: true,
            items: controller.categories.map((CategoryModel value) {
              return DropdownMenuItem<CategoryModel>(
                value: value,
                child: Text(value.name),
              );
            }).toList(),
            onChanged: (newValue) {
              controller.selectedCategory.value = newValue;
            },
          ),
        ),
      );
    });
  }
}
