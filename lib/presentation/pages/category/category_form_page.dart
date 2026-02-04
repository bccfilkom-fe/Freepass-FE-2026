import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/category_form_controller.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class CategoryFormPage extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();

  CategoryFormPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(CategoryFormController(Get.find()));

    // Pre-fill if editing
    if (controller.categoryToEdit != null) {
      nameController.text = controller.categoryToEdit!.name;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(controller.categoryToEdit != null ? 'Edit Category' : 'New Category'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          children: [
            GestureDetector(
              onTap: controller.pickImage,
              child: Obx(() {
                return Container(
                  width: 150.w,
                  height: 150.w,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12.r),
                    border: Border.all(color: Colors.grey),
                  ),
                  child: controller.selectedImage.value != null
                      ? ClipRRect(
                          borderRadius: BorderRadius.circular(12.r),
                          child: Image.file(
                            controller.selectedImage.value!,
                            fit: BoxFit.cover,
                          ),
                        )
                      : (controller.categoryToEdit != null
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(12.r),
                              child: Image.network(
                                controller.categoryToEdit!.image,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => const Icon(Icons.add_a_photo, size: 40),
                              ),
                            )
                          : const Icon(Icons.add_a_photo, size: 40, color: Colors.grey)),
                );
              }),
            ),
            SizedBox(height: 24.h),
            CustomTextField(
              hintText: 'Category Name',
              controller: nameController,
              prefixIcon: Icons.category,
            ),
            SizedBox(height: 24.h),
            Obx(() => CustomButton(
              text: 'Save',
              isLoading: controller.isLoading.value,
              onPressed: () {
                controller.saveCategory(nameController.text);
              },
            )),
          ],
        ),
      ),
    );
  }
}
