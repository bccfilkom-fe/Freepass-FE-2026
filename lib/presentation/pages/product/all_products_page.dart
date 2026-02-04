import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../controllers/all_products_controller.dart';
import '../../widgets/product_card.dart';
import '../../../app/routes/app_routes.dart';

class AllProductsPage extends StatelessWidget {
  const AllProductsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(AllProductsController());

    return Scaffold(
      appBar: AppBar(
        title: Container(
          height: 40.h,
          decoration: BoxDecoration(
            color: Get.isDarkMode ? Colors.grey[800] : Colors.grey[200],
            borderRadius: BorderRadius.circular(20.r),
          ),
          child: TextField(
            onChanged: controller.onSearchChanged,
            decoration: InputDecoration(
              hintText: 'Search products...',
              prefixIcon: const Icon(Icons.search, color: Colors.grey),
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 8.h),
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          // Categories
          SizedBox(height: 10.h),
          SizedBox(
            height: 40.h,
            child: Obx(() {
               if (controller.categories.isEmpty) return const SizedBox();
               return ListView.separated(
                padding: EdgeInsets.symmetric(horizontal: 16.w),
                scrollDirection: Axis.horizontal,
                itemCount: controller.categories.length,
                separatorBuilder: (_, __) => SizedBox(width: 12.w),
                itemBuilder: (context, index) {
                  final category = controller.categories[index];
                  return Obx(
                    () => ChoiceChip(
                      label: Text(category.name),
                      selected: controller.selectedCategoryIndex.value == index,
                      onSelected: (selected) => controller.filterByCategory(index),
                      selectedColor: Colors.black,
                      backgroundColor: Colors.white,
                      labelStyle: TextStyle(
                        color: controller.selectedCategoryIndex.value == index
                            ? Colors.white
                            : Colors.black,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                    ),
                  );
                },
              );
            }),
          ),
          SizedBox(height: 10.h),
          
          Expanded(
            child: Obx(() {
              if (controller.isLoading.value) {
                return const Center(child: CircularProgressIndicator());
              }
              
              if (controller.products.isEmpty) {
                 return const Center(child: Text('No products found'));
              }

              return NotificationListener<ScrollNotification>(
                onNotification: (ScrollNotification scrollInfo) {
                  if (!controller.isMoreLoading.value &&
                      scrollInfo.metrics.pixels ==
                          scrollInfo.metrics.maxScrollExtent) {
                    controller.loadMore();
                  }
                  return false;
                },
                child: RefreshIndicator(
                  onRefresh: () async {
                    await controller.fetchInitialData();
                  },
                  child: GridView.builder(
                    padding: EdgeInsets.all(16.w),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75,
                      crossAxisSpacing: 16.w,
                      mainAxisSpacing: 16.h,
                    ),
                    itemCount: controller.products.length + (controller.isMoreLoading.value ? 1 : 0),
                    itemBuilder: (context, index) {
                      if (index == controller.products.length) {
                         return const Center(child: CircularProgressIndicator());
                      }
                      
                      final product = controller.products[index];
                      return AnimationConfiguration.staggeredGrid(
                        position: index,
                        duration: const Duration(milliseconds: 375),
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
                                // Optional: refresh if updated
                              },
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}
