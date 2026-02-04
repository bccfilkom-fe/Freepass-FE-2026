import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import '../../../data/models/product_model.dart';
import '../../../app/utils/image_utils.dart';

class ProductImageGallery extends StatelessWidget {
  final ProductModel product;

  const ProductImageGallery({Key? key, required this.product})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: 'product_${product.id}',
      child: Container(
        height: 350.h,
        width: double.infinity,
        margin: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.15),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30.r),
          child: CachedNetworkImage(
            imageUrl: ImageUtils.getValidImageUrl(
              product.images.isNotEmpty ? product.images.first : null,
            ),
            fit: BoxFit.cover,
            placeholder: (context, url) => Container(
              color: Colors.grey[200],
              child: Center(
                child: LoadingAnimationWidget.staggeredDotsWave(
                  color: const Color(0xFFFF7043),
                  size: 40.sp,
                ),
              ),
            ),
            errorWidget: (context, url, error) {
              return Container(
                color: Colors.grey[200],
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.broken_image_outlined,
                      size: 50,
                      color: Colors.grey,
                    ),
                    SizedBox(height: 8.h),
                    Text(
                      'Image not available',
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 12.sp,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
