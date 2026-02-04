import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../controllers/category_controller.dart';
import '../../widgets/category/category_shimmer.dart';
import '../../widgets/common/empty_state_widget.dart';
import '../../widgets/category/category_bottom_sheet.dart';
import '../../widgets/category/category_item.dart';

class CategoryPage extends StatelessWidget {
  const CategoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(CategoryController(Get.find()));

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Categories',
          style: TextStyle(
            color: Get.isDarkMode ? Colors.white : Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 24.sp,
          ),
        ),
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 0,
        centerTitle: false,
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await controller.fetchCategories();
        },
        color: const Color(0xFFFF7043),
        child: Obx(() {
          if (controller.isLoading.value) {
            return const CategoryShimmer();
          }

          if (controller.categories.isEmpty) {
            return const EmptyStateWidget(
              message: 'No categories found',
              icon: Icons.category_outlined,
            );
          }

          return AnimationLimiter(
            child: ListView.builder(
              padding: EdgeInsets.fromLTRB(16.w, 16.h, 16.w, 100.h),
              physics: const BouncingScrollPhysics(
                parent: AlwaysScrollableScrollPhysics(),
              ),
              itemCount: controller.categories.length,
              itemBuilder: (context, index) {
                if (index == 0) {
                  return Column(
                    children: [
                      Container(
                        margin: EdgeInsets.only(bottom: 16.h),
                        padding: EdgeInsets.symmetric(
                          horizontal: 16.w,
                          vertical: 12.h,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFF7043).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12.r),
                          border: Border.all(
                            color: const Color(0xFFFF7043).withOpacity(0.3),
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.swipe_left_rounded,
                              color: const Color(0xFFFF7043),
                              size: 20.sp,
                            ),
                            SizedBox(width: 8.w),
                            Text(
                              'Swipe left to delete',
                              style: TextStyle(
                                color: const Color(0xFFFF7043),
                                fontWeight: FontWeight.w600,
                                fontSize: 14.sp,
                              ),
                            ),
                          ],
                        ),
                      ),
                      CategoryItem(
                        controller: controller,
                        category: controller.categories[index],
                        index: index,
                      ),
                    ],
                  );
                }

                final category = controller.categories[index];
                return CategoryItem(
                  controller: controller,
                  category: category,
                  index: index,
                );
              },
            ),
          );
        }),
      ),
    );
  }
}
