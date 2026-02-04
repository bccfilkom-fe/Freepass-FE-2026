import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/product_detail_controller.dart';
import '../../widgets/product/product_image_gallery.dart';
import '../../widgets/product/product_info_section.dart';

class ProductDetailPage extends StatelessWidget {
  const ProductDetailPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ProductDetailController());

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Product Details',
          style: Theme.of(
            context,
          ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: Container(
            padding: EdgeInsets.all(8.w),
            decoration: BoxDecoration(
              color: Theme.of(context).cardColor,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 8),
              ],
            ),
            child: const Icon(Icons.arrow_back_ios_new, size: 18),
          ),
          onPressed: () => Get.back(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit_outlined),
            onPressed: () => controller.editProduct(),
          ),
          IconButton(
            icon: const Icon(Icons.delete_outline, color: Colors.red),
            onPressed: () {
              Get.defaultDialog(
                title: 'Delete Product',
                middleText: 'Are you sure?',
                textConfirm: 'Yes',
                textCancel: 'No',
                confirmTextColor: Colors.white,
                buttonColor: Colors.red,
                onConfirm: () {
                  controller.deleteProduct();
                  Get.back(); // Close dialog
                },
              );
            },
          ),
          SizedBox(width: 10.w),
        ],
      ),
      extendBodyBehindAppBar: false,
      body: Obx(() {
        final product = controller.product.value;

        // Handle null product/loading state gracefully if needed
        // For now, assuming product is available as per controller logic

        return Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ProductImageGallery(product: product),
                    SizedBox(height: 16.h),
                    ProductInfoSection(product: product),
                  ],
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}
