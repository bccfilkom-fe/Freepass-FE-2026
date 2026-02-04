import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/home_controller.dart';
import '../../widgets/home/home_drawer.dart';
import '../../widgets/home/home_app_bar.dart';
import '../../widgets/home/sticky_header_delegate.dart';
import '../../widgets/home/search_filter_header.dart';
import '../../widgets/home/product_grid.dart';
import '../../../app/routes/app_routes.dart';
import '../../widgets/common/custom_loading_widget.dart';
import '../../widgets/product/product_bottom_sheet.dart';

class HomePage extends GetView<HomeController> {
  HomePage({Key? key}) : super(key: key);

  final _scaffoldKey = GlobalKey<ScaffoldState>();
  final _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      endDrawer: const HomeDrawer(),
      body: RefreshIndicator(
        onRefresh: () async {
          await controller.fetchInitialData();
        },
        color: const Color(0xFFFF7043),
        child: NotificationListener<ScrollNotification>(
          onNotification: (ScrollNotification scrollInfo) {
            if (!controller.isMoreLoading.value &&
                scrollInfo.metrics.pixels >=
                    scrollInfo.metrics.maxScrollExtent - 200) {
              controller.loadMore();
            }
            return false;
          },
          child: CustomScrollView(
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            physics: const BouncingScrollPhysics(
              parent: AlwaysScrollableScrollPhysics(),
            ),
            slivers: [
              HomeAppBar(scaffoldKey: _scaffoldKey),

              // Sticky Header for Search & Filter
              SliverPersistentHeader(
                pinned: true,
                delegate: StickyHeaderDelegate(
                  minHeight: 120.h,
                  maxHeight: 120.h,
                  child: SearchFilterHeader(
                    searchController: _searchController,
                  ),
                ),
              ),

              // Product List Title
              SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.fromLTRB(16.w, 16.h, 16.w, 8.h),
                  child: Obx(() {
                    String title = 'All Products';
                    if (controller.selectedCategoryIndex.value > 0 &&
                        controller.selectedCategoryIndex.value <
                            controller.categories.length) {
                      title = controller
                          .categories[controller.selectedCategoryIndex.value]
                          .name;
                    }
                    // Show price range if active and not default (0 - 5000)
                    final isDefaultRange =
                        (controller.minPrice.value == null ||
                            controller.minPrice.value == 0) &&
                        (controller.maxPrice.value == null ||
                            controller.maxPrice.value == 5000);

                    if (!isDefaultRange &&
                        (controller.minPrice.value != null ||
                            controller.maxPrice.value != null)) {
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            title,
                            style: Theme.of(context).textTheme.titleLarge
                                ?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: 8.w,
                              vertical: 4.h,
                            ),
                            decoration: BoxDecoration(
                              color: const Color(0xFFFF7043).withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8.r),
                              border: Border.all(
                                color: const Color(0xFFFF7043),
                              ),
                            ),
                            child: Text(
                              '\$${controller.minPrice.value?.round() ?? 0} - \$${controller.maxPrice.value?.round() ?? 'Max'}',
                              style: TextStyle(
                                color: const Color(0xFFFF7043),
                                fontSize: 12.sp,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      );
                    }

                    return Text(
                      title,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    );
                  }),
                ),
              ),

              // Product Grid
              const ProductGrid(),

              // Pagination Loading
              SliverToBoxAdapter(
                child: Obx(
                  () => controller.isMoreLoading.value
                      ? const PaginationLoadingIndicator()
                      : SizedBox(height: 80.h),
                ), // Extra padding for FAB
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        heroTag: 'home_fab',
        onPressed: () async {
          final result = await Get.bottomSheet(
            const ProductBottomSheet(),
            isScrollControlled: true,
            backgroundColor: Get.theme.scaffoldBackgroundColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
            ),
          );
          if (result == true) {
            controller.offset = 0;
            controller.fetchInitialData();
          }
        },
        backgroundColor: const Color(0xFFFF7043),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
