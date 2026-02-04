import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/home_controller.dart';
import 'filter_bottom_sheet.dart';

class SearchFilterHeader extends StatelessWidget {
  final TextEditingController searchController;

  const SearchFilterHeader({Key? key, required this.searchController})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HomeController>();

    return Container(
      color: Theme.of(context).scaffoldBackgroundColor,
      padding: EdgeInsets.symmetric(vertical: 10.h),
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.symmetric(horizontal: 16.w),
            height: 50.h,
            decoration: BoxDecoration(
              color: Get.isDarkMode ? const Color(0xFF2C2C2C) : Colors.white,
              borderRadius: BorderRadius.circular(16.r),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                Padding(
                  padding: EdgeInsets.only(left: 16.w),
                  child: Icon(
                    Icons.search_rounded,
                    color: Colors.grey,
                    size: 24.sp,
                  ),
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: TextField(
                    controller: searchController,
                    onChanged: (value) {
                      controller.onSearchChanged(value);
                    },
                    style: TextStyle(fontSize: 14.sp),
                    decoration: InputDecoration(
                      hintText: 'Search products...',
                      hintStyle: TextStyle(
                        color: Colors.grey[400],
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w400,
                      ),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(vertical: 10.h),
                      suffixIcon: Obx(
                        () => controller.searchQuery.value.isNotEmpty
                            ? IconButton(
                                icon: Icon(
                                  Icons.close,
                                  size: 18.sp,
                                  color: Colors.grey,
                                ),
                                onPressed: () {
                                  searchController.clear();
                                  controller.onSearchChanged('');
                                },
                              )
                            : const SizedBox.shrink(),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.all(5.w),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF7043),
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: IconButton(
                    icon: Icon(
                      Icons.tune_rounded,
                      color: Colors.white,
                      size: 20.sp,
                    ),
                    onPressed: () => Get.bottomSheet(
                      const FilterBottomSheet(),
                      isScrollControlled: true,
                    ),
                    constraints: const BoxConstraints(),
                    padding: EdgeInsets.all(8.w),
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 11.h),

          SizedBox(
            height: 39.h,
            child: Obx(
              () => ListView.separated(
                padding: EdgeInsets.symmetric(horizontal: 16.w),
                scrollDirection: Axis.horizontal,
                itemCount: controller.categories.length,
                separatorBuilder: (_, __) => SizedBox(width: 8.w),
                itemBuilder: (context, index) {
                  final category = controller.categories[index];
                  return Obx(() {
                    final isSelected =
                        controller.selectedCategoryIndex.value == index;
                    return GestureDetector(
                      onTap: () => controller.filterByCategory(index),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        padding: EdgeInsets.symmetric(
                          horizontal: 16.w,
                          vertical: 8.h,
                        ),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? const Color(0xFFFF7043)
                              : (Get.isDarkMode
                                    ? const Color(0xFF2C2C2C)
                                    : Colors.white),
                          borderRadius: BorderRadius.circular(25.r),
                          border: Border.all(
                            color: isSelected
                                ? Colors.transparent
                                : (Get.isDarkMode
                                      ? const Color(0xFF2C2C2C)
                                      : Colors.grey[300]!),
                            width: 1,
                          ),
                        ),
                        child: Center(
                          child: Text(
                            category.name,
                            style: TextStyle(
                              color: isSelected
                                  ? Colors.white
                                  : Colors.grey[700],
                              fontWeight: FontWeight.w600,
                              fontSize: 13.sp,
                            ),
                          ),
                        ),
                      ),
                    );
                  });
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
