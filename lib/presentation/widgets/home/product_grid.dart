import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../controllers/home_controller.dart';
import '../product/product_card.dart';
import '../common/custom_loading_widget.dart';
import '../../../app/routes/app_routes.dart';

class ProductGrid extends StatelessWidget {
  const ProductGrid({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HomeController>();

    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 16.w),
      sliver: Obx(() {
        if (controller.isLoading.value) {
          return SliverToBoxAdapter(
            child: const CustomLoadingWidget(),
          );
        }

        if (controller.products.isEmpty) {
          return SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.only(top: 50.h),
              child: const Center(child: Text('No products found')),
            ),
          );
        }

        return SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 0.75,
            crossAxisSpacing: 16.w,
            mainAxisSpacing: 16.h,
          ),
          delegate: SliverChildBuilderDelegate((context, index) {
            final product = controller.products[index];
            return AnimationConfiguration.staggeredGrid(
              position: index,
              duration: const Duration(milliseconds: 200),
              columnCount: 2,
              child: ScaleAnimation(
                child: FadeInAnimation(
                  child: ProductCard(
                    product: product,
                    onTap: () async {
                      final result = await Get.toNamed(
                        Routes.PRODUCT_DETAILS,
                        arguments: product,
                      );
                      if (result == true) {
                        controller.offset = 0;
                        controller.fetchInitialData();
                      }
                    },
                  ),
                ),
              ),
            );
          }, childCount: controller.products.length),
        );
      }),
    );
  }
}
