import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/category_controller.dart';
import '../../../app/routes/app_routes.dart';

class CategoryPage extends StatelessWidget {
  const CategoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(CategoryController(Get.find()));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Categories'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () async {
              final result = await Get.toNamed(Routes.CATEGORY_FORM);
              if (result == true) controller.fetchCategories();
            },
          ),
        ],
      ),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        return ListView.separated(
          padding: EdgeInsets.all(16.w),
          itemCount: controller.categories.length,
          separatorBuilder: (_, __) => SizedBox(height: 12.h),
          itemBuilder: (context, index) {
            final category = controller.categories[index];
            return Card(
              child: ListTile(
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(8.r),
                  child: CachedNetworkImage(
                    imageUrl: category.image.isNotEmpty
                        ? category.image
                        : 'https://via.placeholder.com/50',
                    width: 50.w,
                    height: 50.w,
                    fit: BoxFit.cover,
                    placeholder: (context, url) =>
                        const Center(child: CircularProgressIndicator()),
                    errorWidget: (_, __, ___) =>
                        const Icon(Icons.broken_image, color: Colors.grey),
                  ),
                ),
                title: Text(category.name),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit, color: Colors.blue),
                      onPressed: () async {
                        final result = await Get.toNamed(
                          Routes.CATEGORY_FORM,
                          arguments: category,
                        );
                        if (result == true) controller.fetchCategories();
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete, color: Colors.red),
                      onPressed: () {
                        Get.defaultDialog(
                          title: 'Delete Category',
                          middleText:
                              'Are you sure you want to delete this category?',
                          textConfirm: 'Yes',
                          textCancel: 'No',
                          confirmTextColor: Colors.white,
                          onConfirm: () {
                            controller.deleteCategory(category.id);
                            Get.back();
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
