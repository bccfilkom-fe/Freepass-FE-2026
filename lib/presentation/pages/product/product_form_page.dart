import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/product_form_controller.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../../../data/models/category_model.dart';

class ProductFormPage extends StatelessWidget {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController priceController = TextEditingController();
  final TextEditingController descController = TextEditingController();

  ProductFormPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ProductFormController(Get.find()));

    if (controller.productToEdit != null) {
      titleController.text = controller.productToEdit!.title;
      priceController.text = controller.productToEdit!.price.toString();
      descController.text = controller.productToEdit!.description;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(
          controller.productToEdit != null ? 'Edit Product' : 'New Product',
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Column(
          children: [
            GestureDetector(
              onTap: controller.pickImage,
              child: Obx(() {
                return Container(
                  width: double.infinity,
                  height: 200.h,
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
                      : (controller.productToEdit != null &&
                                controller.productToEdit!.images.isNotEmpty
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(12.r),
                                child: Image.network(
                                  controller.productToEdit!.images.first
                                          .startsWith('[')
                                      ? controller.productToEdit!.images.first
                                            .replaceAll(RegExp(r'[\[\]"]'), '')
                                      : controller.productToEdit!.images.first,
                                  fit: BoxFit.cover,
                                  errorBuilder: (_, __, ___) => const Center(
                                    child: Icon(Icons.add_a_photo, size: 50),
                                  ),
                                ),
                              )
                            : const Center(
                                child: Icon(
                                  Icons.add_a_photo,
                                  size: 50,
                                  color: Colors.grey,
                                ),
                              )),
                );
              }),
            ),
            SizedBox(height: 24.h),
            CustomTextField(
              hintText: 'Product Title',
              controller: titleController,
              prefixIcon: Icons.title,
            ),
            SizedBox(height: 16.h),
            CustomTextField(
              hintText: 'Price',
              controller: priceController,
              prefixIcon: Icons.attach_money,
              // keyboardType: TextInputType.number, // Need to update CustomTextField to support this
            ),
            SizedBox(height: 16.h),
            CustomTextField(
              hintText: 'Description',
              controller: descController,
              prefixIcon: Icons.description,
            ),
            SizedBox(height: 16.h),
            // Category Dropdown
            Obx(() {
              if (controller.categories.isEmpty) return const SizedBox();
              return Container(
                padding: EdgeInsets.symmetric(horizontal: 16.w),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
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
            }),
            SizedBox(height: 24.h),
            Obx(
              () => CustomButton(
                text: 'Save',
                isLoading: controller.isLoading.value,
                onPressed: () {
                  controller.saveProduct(
                    titleController.text,
                    priceController.text,
                    descController.text,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
