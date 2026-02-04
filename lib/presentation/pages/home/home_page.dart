import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../controllers/home_controller.dart';
import '../../controllers/auth_controller.dart';
import '../../widgets/product_card.dart';
import '../../../app/routes/app_routes.dart';

class HomePage extends GetView<HomeController> {
  const HomePage({Key? key}) : super(key: key);

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  }

  void _showFilterDialog(BuildContext context) {
    final minController = TextEditingController(
      text: controller.minPrice?.toString(),
    );
    final maxController = TextEditingController(
      text: controller.maxPrice?.toString(),
    );

    Get.defaultDialog(
      title: 'Filter by Price',
      content: Column(
        children: [
          TextField(
            controller: minController,
            decoration: const InputDecoration(labelText: 'Min Price'),
            keyboardType: TextInputType.number,
          ),
          TextField(
            controller: maxController,
            decoration: const InputDecoration(labelText: 'Max Price'),
            keyboardType: TextInputType.number,
          ),
        ],
      ),
      onConfirm: () {
        final min = double.tryParse(minController.text);
        final max = double.tryParse(maxController.text);
        controller.applyPriceFilter(min, max);
        Get.back();
      },
      textConfirm: 'Apply',
      textCancel: 'Cancel',
      confirmTextColor: Colors.white,
    );
  }

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(_getGreeting(), style: Theme.of(context).textTheme.bodyMedium),
            Obx(
              () => Text(
                authController.user.value?.name ?? 'Guest',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: () {
              if (Get.isDarkMode) {
                Get.changeThemeMode(ThemeMode.light);
              } else {
                Get.changeThemeMode(ThemeMode.dark);
              }
            },
          ),
        ],
      ),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }

        return RefreshIndicator(
          onRefresh: () async {
            controller.offset = 0;
            await controller.fetchInitialData();
          },
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Search Bar
                  Container(
                    margin: EdgeInsets.symmetric(vertical: 16.h),
                    padding: EdgeInsets.symmetric(horizontal: 16.w),
                    height: 50.h,
                    decoration: BoxDecoration(
                      color: Get.isDarkMode
                          ? Colors.grey[800]
                          : Colors.grey[200],
                      borderRadius: BorderRadius.circular(25.r),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.search, color: Colors.grey),
                        SizedBox(width: 8.w),
                        Expanded(
                          child: TextField(
                            onChanged: controller.onSearchChanged,
                            decoration: InputDecoration(
                              hintText: 'Search',
                              hintStyle: TextStyle(
                                color: Colors.grey,
                                fontSize: 16.sp,
                              ),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.tune, color: Colors.grey),
                          onPressed: () => _showFilterDialog(context),
                        ),
                      ],
                    ),
                  ),

                  // Categories
                  SizedBox(
                    height: 40.h,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: controller.categories.length,
                      separatorBuilder: (_, __) => SizedBox(width: 12.w),
                      itemBuilder: (context, index) {
                        final category = controller.categories[index];
                        return Obx(
                          () => ChoiceChip(
                            label: Text(category.name),
                            selected:
                                controller.selectedCategoryIndex.value == index,
                            onSelected: (selected) =>
                                controller.filterByCategory(index),
                            selectedColor: Colors.black,
                            backgroundColor: Colors.white,
                            labelStyle: TextStyle(
                              color:
                                  controller.selectedCategoryIndex.value ==
                                      index
                                  ? Colors.white
                                  : Colors.black,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20.r),
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  SizedBox(height: 24.h),

                  // Banner
                  Container(
                    width: double.infinity,
                    height: 150.h,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFF7043),
                      borderRadius: BorderRadius.circular(20.r),
                    ),
                    padding: EdgeInsets.all(20.w),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Get your special\nsale up to 50%',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18.sp,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 12.h),
                              Container(
                                padding: EdgeInsets.symmetric(
                                  horizontal: 12.w,
                                  vertical: 6.h,
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(20.r),
                                ),
                                child: Text(
                                  'Shop Now',
                                  style: TextStyle(
                                    color: const Color(0xFFFF7043),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12.sp,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Image placeholder for banner
                        Container(
                          width: 100.w,
                          height: 100.h,
                          decoration: BoxDecoration(
                            color: Colors.white.withAlpha(
                              51,
                            ), // 0.2 * 255 ~= 51
                            shape: BoxShape.circle,
                          ),
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 24.h),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Trending Product',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Get.toNamed(Routes.ALL_PRODUCTS);
                        },
                        child: Text(
                          'See all',
                          style: Theme.of(
                            context,
                          ).textTheme.bodyMedium?.copyWith(color: Colors.grey),
                        ),
                      ),
                    ],
                  ),

                  SizedBox(height: 16.h),

                  // Product Grid
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75,
                      crossAxisSpacing: 16.w,
                      mainAxisSpacing: 16.h,
                    ),
                    itemCount: controller.products.length,
                    itemBuilder: (context, index) {
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
                                if (result == true) {
                                  controller.offset = 0;
                                  controller.fetchInitialData();
                                }
                              },
                            ),
                          ),
                        ),
                      );
                    },
                  ),

                  if (controller.isMoreLoading.value)
                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Center(child: CircularProgressIndicator()),
                    ),
                ],
              ),
            ),
          ),
        );
      }),
      bottomNavigationBar: null,
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Get.toNamed(Routes.PRODUCT_FORM);
          if (result == true) {
            controller.offset = 0;
            controller.fetchInitialData();
          }
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
