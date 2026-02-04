import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/product_detail_controller.dart';
import '../../widgets/custom_button.dart';
import '../../../app/utils/image_utils.dart';

class ProductDetailPage extends StatelessWidget {
  const ProductDetailPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ProductDetailController());

    return Scaffold(
      appBar: AppBar(
        title: const Text('Product Details'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () => controller.editProduct(),
          ),
          IconButton(
            icon: const Icon(Icons.delete, color: Colors.red),
            onPressed: () {
               Get.defaultDialog(
                title: 'Delete Product',
                middleText: 'Are you sure?',
                textConfirm: 'Yes',
                textCancel: 'No',
                confirmTextColor: Colors.white,
                onConfirm: () {
                  controller.deleteProduct();
                  Get.back(); // Close dialog
                },
              );
            },
          ),
        ],
      ),
      body: Obx(() { // Wrap with Obx
        final product = controller.product.value;
        
        return Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Image
                    Hero(
                      tag: 'product_${product.id}',
                      child: Container(
                        height: 300.h,
                        width: double.infinity,
                        margin: EdgeInsets.all(16.w),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(20.r),
                          child: CachedNetworkImage(
                            imageUrl: ImageUtils.getValidImageUrl(product.images.isNotEmpty ? product.images.first : null),
                            fit: BoxFit.cover,
                            placeholder: (context, url) => Container(
                              color: Colors.grey[200],
                              child: const Center(child: CircularProgressIndicator()),
                            ),
                            errorWidget: (context, url, error) {
                              try {
                                CachedNetworkImage.evictFromCache(url);
                              } catch (e) {
                                // ignore
                              }
                              return Container(
                                color: Colors.grey[200],
                                child: const Icon(Icons.broken_image, size: 50, color: Colors.grey),
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                    
                    // Thumbnails (Mocked using same image if only one)
                    if (product.images.length > 1)
                      SizedBox(
                        height: 60.h,
                        child: ListView.separated(
                          padding: EdgeInsets.symmetric(horizontal: 16.w),
                          scrollDirection: Axis.horizontal,
                          itemCount: product.images.length,
                          separatorBuilder: (_, __) => SizedBox(width: 12.w),
                          itemBuilder: (context, index) {
                            final imgUrl = ImageUtils.getValidImageUrl(product.images[index]);
                             
                            return Container(
                              width: 60.w,
                              decoration: BoxDecoration(
                                border: Border.all(color: Colors.grey.shade300),
                                borderRadius: BorderRadius.circular(10.r),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10.r),
                                child: CachedNetworkImage(
                                  imageUrl: imgUrl,
                                  fit: BoxFit.cover,
                                  placeholder: (context, url) => Container(
                                    color: Colors.grey[200],
                                  ),
                                  errorWidget: (context, url, error) {
                                    try {
                                      CachedNetworkImage.evictFromCache(url);
                                    } catch (e) {
                                      // ignore
                                    }
                                    return const Icon(Icons.broken_image, size: 20, color: Colors.grey);
                                  },
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    
                    SizedBox(height: 24.h),
                    
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.w),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Category
                          Text(
                            product.category?.name ?? 'Category',
                            style: TextStyle(color: const Color(0xFFFF7043), fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            product.title,
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 16.h),
                          Text(
                            'Product Information',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 8.h),
                          Text(
                            product.description,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey),
                          ),
                          
                          SizedBox(height: 24.h),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            // Footer
            Container(
              padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 20.h),
              decoration: BoxDecoration(
                color: Theme.of(context).scaffoldBackgroundColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(13), // 0.05 * 255 ~= 13
                    blurRadius: 10,
                    offset: const Offset(0, -5),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Price',
                        style: TextStyle(color: Colors.grey, fontSize: 12.sp),
                      ),
                      Text(
                        '\$${product.price.toStringAsFixed(2)}',
                        style: TextStyle(
                          fontSize: 24.sp,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(width: 24.w),
                  Expanded(
                    child: CustomButton(
                      text: 'Add to Cart',
                      onPressed: () {
                        // TODO: Implement Add to Cart
                        Get.snackbar('Cart', 'Added to cart');
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      }),
    );
  }

  Widget _buildColorDot(Color color, bool isSelected) {
    return Container(
      width: 24.w,
      height: 24.w,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        border: isSelected ? Border.all(color: Colors.grey, width: 2) : null,
      ),
    );
  }

  Widget _buildSizeChip(String size, bool isSelected) {
    return Container(
      width: 32.w,
      height: 32.w,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: isSelected ? Colors.black : Colors.white,
        shape: BoxShape.circle,
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Text(
        size,
        style: TextStyle(
          color: isSelected ? Colors.white : Colors.black,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
