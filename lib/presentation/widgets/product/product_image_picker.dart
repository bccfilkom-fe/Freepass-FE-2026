import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/product_form_controller.dart';

class ProductImagePicker extends StatelessWidget {
  final ProductFormController controller;

  const ProductImagePicker({Key? key, required this.controller}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: controller.pickImage,
      child: Obx(() {
        return Container(
          width: double.infinity,
          height: 200.h,
          decoration: BoxDecoration(
            color: Get.isDarkMode ? Colors.grey[800] : Colors.grey[200],
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
                        controller.productToEdit!.images.first.startsWith('[')
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
    );
  }
}
