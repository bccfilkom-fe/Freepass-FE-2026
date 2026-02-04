import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:platzi_admin_app/presentation/controllers/category_controller.dart';
import 'package:platzi_admin_app/presentation/widgets/category/category_bottom_sheet.dart';

class CategoryItem extends StatelessWidget {
  final CategoryController controller;
  final dynamic category;
  final int index;

  const CategoryItem({
    Key? key,
    required this.controller,
    required this.category,
    required this.index,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AnimationConfiguration.staggeredList(
      position: index,
      duration: const Duration(milliseconds: 375),
      child: SlideAnimation(
        verticalOffset: 50.0,
        child: FadeInAnimation(
          child: Padding(
            padding: EdgeInsets.only(bottom: 12.h),
            child: Slidable(
              key: Key(category.id.toString()),
              endActionPane: ActionPane(
                motion: const ScrollMotion(),
                children: [
                  SlidableAction(
                    onPressed: (context) async {
                      final result = await Get.bottomSheet(
                        CategoryBottomSheet(categoryToEdit: category),
                        isScrollControlled: true,
                        backgroundColor: Get.theme.scaffoldBackgroundColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.vertical(
                            top: Radius.circular(20.r),
                          ),
                        ),
                      );
                      if (result == true) {
                        controller.fetchCategories();
                      }
                    },
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                    icon: Icons.edit,
                    label: 'Edit',
                    borderRadius: BorderRadius.horizontal(
                      left: Radius.circular(12.r),
                    ),
                  ),
                  SlidableAction(
                    onPressed: (context) {
                      Get.defaultDialog(
                        title: 'Delete Category',
                        titleStyle: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18.sp,
                        ),
                        middleText:
                            'Are you sure you want to delete "${category.name}"?',
                        textConfirm: 'Delete',
                        textCancel: 'Cancel',
                        confirmTextColor: Colors.white,
                        buttonColor: Colors.red,
                        cancelTextColor: Colors.grey,
                        onConfirm: () {
                          controller.deleteCategory(category.id);
                          Get.back();
                        },
                      );
                    },
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                    icon: Icons.delete,
                    label: 'Delete',
                    borderRadius: BorderRadius.horizontal(
                      right: Radius.circular(12.r),
                    ),
                  ),
                ],
              ),
              child: Container(
                height: 70.h,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Get.isDarkMode ? const Color(0xFF2C2C2C) : Colors.white,
                  borderRadius: BorderRadius.circular(12.r),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 5,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    // Image
                    ClipRRect(
                      borderRadius: BorderRadius.horizontal(
                        left: Radius.circular(12.r),
                      ),
                      child: CachedNetworkImage(
                        imageUrl: category.image,
                        width: 70.h,
                        height: 70.h,
                        fit: BoxFit.cover,
                        placeholder: (context, url) => Container(
                          width: 70.h,
                          height: 70.h,
                          color: Colors.grey[200],
                          child: const Center(
                            child: CircularProgressIndicator(strokeWidth: 2),
                          ),
                        ),
                        errorWidget: (context, url, error) => Container(
                          width: 70.h,
                          height: 70.h,
                          color: Colors.grey[200],
                          child: Icon(
                            Icons.image_not_supported,
                            color: Colors.grey,
                            size: 24.sp,
                          ),
                        ),
                      ),
                    ),

                    // Content
                    Expanded(
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.w),
                        child: Text(
                          category.name,
                          style: TextStyle(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.bold,
                            color: Get.isDarkMode
                                ? Colors.white
                                : Colors.black87,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
