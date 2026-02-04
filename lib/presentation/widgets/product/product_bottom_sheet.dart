import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../data/models/product_model.dart';
import '../../controllers/product_form_controller.dart';
import '../../widgets/common/custom_button.dart';
import '../../widgets/common/custom_text_field.dart';
import '../../widgets/product/product_image_picker.dart';
import '../../widgets/product/product_category_dropdown.dart';

class ProductBottomSheet extends StatefulWidget {
  final ProductModel? productToEdit;

  const ProductBottomSheet({Key? key, this.productToEdit}) : super(key: key);

  @override
  State<ProductBottomSheet> createState() => _ProductBottomSheetState();
}

class _ProductBottomSheetState extends State<ProductBottomSheet> {
  late final ProductFormController controller;

  @override
  void initState() {
    super.initState();

    controller = Get.find<ProductFormController>();

    if (widget.productToEdit != null) {
      controller.setEditProduct(widget.productToEdit!);
    } else {
      controller.clearForm();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEdit = widget.productToEdit != null;

    return Container(
      constraints: BoxConstraints(maxHeight: 0.9.sh),
      child: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.h),
          child: Form(
            key: controller.formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
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

                Text(
                  isEdit ? 'Edit Product' : 'Add New Product',
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 24.h),

                ProductImagePicker(controller: controller),
                SizedBox(height: 24.h),

                CustomTextField(
                  hintText: 'Product Title',
                  controller: controller.titleController,
                  prefixIcon: Icons.title,
                ),
                SizedBox(height: 16.h),

                CustomTextField(
                  hintText: 'Price',
                  controller: controller.priceController,
                  prefixIcon: Icons.attach_money,
                  keyboardType: TextInputType.number,
                ),
                SizedBox(height: 16.h),

                CustomTextField(
                  hintText: 'Description',
                  controller: controller.descController,
                  prefixIcon: Icons.description,
                ),
                SizedBox(height: 16.h),

                ProductCategoryDropdown(controller: controller),
                SizedBox(height: 24.h),

                Obx(
                  () => CustomButton(
                    text: isEdit ? 'Update Product' : 'Create Product',
                    isLoading: controller.isLoading.value,
                    onPressed: controller.saveProduct,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
