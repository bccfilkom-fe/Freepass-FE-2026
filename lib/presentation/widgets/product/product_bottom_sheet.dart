import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../data/models/product_model.dart';
import '../../controllers/product_form_controller.dart';
import '../../widgets/common/custom_button.dart';
import '../../widgets/common/custom_text_field.dart';
import '../../widgets/product/product_image_picker.dart';
import '../../widgets/product/product_category_dropdown.dart';

class ProductBottomSheet extends StatelessWidget {
  final ProductModel? productToEdit;

  const ProductBottomSheet({Key? key, this.productToEdit}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ProductFormController(Get.find()));
    final titleController = TextEditingController();
    final priceController = TextEditingController();
    final descController = TextEditingController();

    if (productToEdit != null) {
      controller.setProductToEdit(productToEdit!);
      titleController.text = productToEdit!.title;
      priceController.text = productToEdit!.price.toString();
      descController.text = productToEdit!.description;
    } else {
      controller.clearForm();
    }

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Container(
        constraints: BoxConstraints(maxHeight: 0.9.sh),
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
                          productToEdit != null
                              ? 'Edit Product'
                              : 'Add New Product',
                          style: TextStyle(
                            fontSize: 18.sp,
                            fontWeight: FontWeight.bold,
                            color: Get.isDarkMode ? Colors.white : Colors.black,
                          ),
                        ),
                        Text(
                          productToEdit != null
                              ? 'Update product details.'
                              : 'Create a new product.',
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
                ProductImagePicker(controller: controller),
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
                  keyboardType: TextInputType.number,
                ),
                SizedBox(height: 16.h),

                CustomTextField(
                  hintText: 'Description',
                  controller: descController,
                  prefixIcon: Icons.description,
                  maxLines: 3,
                ),
                SizedBox(height: 16.h),

                ProductCategoryDropdown(controller: controller),
                SizedBox(height: 24.h),

                Obx(
                  () => CustomButton(
                    text: productToEdit != null
                        ? 'Update Product'
                        : 'Create Product',
                    isLoading: controller.isLoading.value,
                    onPressed: () async {
                      if (titleController.text.isEmpty) {
                        Get.snackbar('Error', 'Please enter a product title');
                        return;
                      }

                      await controller.saveProduct(
                        titleController.text,
                        priceController.text,
                        descController.text,
                      );

                      if (!controller.isLoading.value) {
                        // The result is already returned in controller.saveProduct, but we need to ensure
                        // double back is avoided or handled correctly.
                        // Actually saveProduct calls Get.back(result: true)
                        // So we don't need to do anything here if successful.
                        // But if we want to be safe:
                        // Get.back(result: true); // This might close the page underneath if controller already closed BS
                      }
                    },
                  ),
                ),
                SizedBox(height: 10.h),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
