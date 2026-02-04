import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/category_form_controller.dart';
import '../../../data/models/category_model.dart';
import '../common/custom_button.dart';

class CategoryBottomSheet extends StatelessWidget {
  final CategoryModel? categoryToEdit;

  const CategoryBottomSheet({Key? key, this.categoryToEdit}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(CategoryFormController(Get.find()));
    final nameController = TextEditingController();

    if (categoryToEdit != null) {
      controller.setCategoryToEdit(categoryToEdit);
      nameController.text = categoryToEdit!.name;
    } else {
      controller.clearForm();
    }

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Handle Bar
              Center(
                child: Container(
                  width: 60.w,
                  height: 4.h,
                  decoration: BoxDecoration(
                    color: Colors.grey.withOpacity(0.5),
                    borderRadius: BorderRadius.circular(4.r),
                  ),
                ),
              ),
              SizedBox(height: 20.h),

              // Header
              Row(
                children: [
                  Container(
                    margin: EdgeInsets.only(right: 12.w),
                    width: 4.w,
                    height: 40.h,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFF7043),
                      borderRadius: BorderRadius.circular(4.r),
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        categoryToEdit != null
                            ? 'Edit Category'
                            : 'Add New Category',
                        style: TextStyle(
                          fontSize: 18.sp,
                          fontWeight: FontWeight.bold,
                          color: Get.isDarkMode ? Colors.white : Colors.black,
                        ),
                      ),
                      Text(
                        categoryToEdit != null
                            ? 'Update category details.'
                            : 'Create a new category.',
                        style: TextStyle(
                          fontSize: 14.sp,
                          color: Colors.grey,
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 24.h),

              // Form
              Text(
                'NAME',
                style: TextStyle(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey,
                ),
              ),
              SizedBox(height: 8.h),
              TextField(
                controller: nameController,
                decoration: InputDecoration(
                  hintText: 'Enter Category Name',
                  hintStyle: TextStyle(color: Colors.grey[400]),
                  filled: true,
                  fillColor: Get.isDarkMode
                      ? Colors.grey[800]
                      : Colors.grey[100],
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.r),
                    borderSide: BorderSide.none,
                  ),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 16.w,
                    vertical: 14.h,
                  ),
                ),
              ),

              SizedBox(height: 20.h),

              Text(
                'IMAGE',
                style: TextStyle(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey,
                ),
              ),
              SizedBox(height: 8.h),
              Obx(
                () => GestureDetector(
                  onTap: controller.pickImage,
                  child: Container(
                    width: double.infinity,
                    height: 150.h,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12.r),
                      color: Get.isDarkMode
                          ? Colors.grey[800]
                          : Colors.grey[100],
                      image: controller.selectedImage.value != null
                          ? DecorationImage(
                              image: FileImage(controller.selectedImage.value!),
                              fit: BoxFit.cover,
                            )
                          : (categoryToEdit != null &&
                                    categoryToEdit!.image.isNotEmpty
                                ? DecorationImage(
                                    image: NetworkImage(categoryToEdit!.image),
                                    fit: BoxFit.cover,
                                  )
                                : null),
                    ),
                    child:
                        controller.selectedImage.value == null &&
                            (categoryToEdit == null ||
                                categoryToEdit!.image.isEmpty)
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.add_photo_alternate_outlined,
                                  color: Colors.grey,
                                  size: 32.sp,
                                ),
                                SizedBox(height: 8.h),
                                Text(
                                  'Tap to select image',
                                  style: TextStyle(
                                    color: Colors.grey,
                                    fontSize: 14.sp,
                                  ),
                                ),
                              ],
                            ),
                          )
                        : null,
                  ),
                ),
              ),

              SizedBox(height: 30.h),

              Obx(
                () => CustomButton(
                  isLoading: controller.isLoading.value,
                  text: categoryToEdit != null
                      ? 'Update Category'
                      : 'Create Category',
                  // backgroundColor: const Color(0xFFFF7043), // Not supported in CustomButton
                  // textColor: Colors.white, // Not supported in CustomButton
                  onPressed: () async {
                    if (nameController.text.isEmpty) {
                      Get.snackbar('Error', 'Please enter a category name');
                      return;
                    }
                    await controller.saveCategory(nameController.text);
                    // Close bottom sheet if success (controller handles this usually, but to be safe)
                    if (!controller.isLoading.value) {
                      // Get.back(result: true); // Controller already handles closing
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
