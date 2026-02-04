import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/auth_controller.dart';

class HomeAppBar extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;

  const HomeAppBar({Key? key, required this.scaffoldKey}) : super(key: key);

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  }

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return SliverAppBar(
      floating: false,
      pinned: true,
      expandedHeight: 90.h,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      surfaceTintColor: Colors.transparent,
      scrolledUnderElevation: 0,
      elevation: 0,
      flexibleSpace: FlexibleSpaceBar(
        titlePadding: EdgeInsets.only(left: 16.w, bottom: 12.h),
        title: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              _getGreeting(),
              style: TextStyle(fontSize: 12.sp, color: Colors.grey),
            ),
            Obx(
              () => Text(
                authController.user.value?.name ?? 'Guest',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.bold,
                  color: Get.isDarkMode ? Colors.white : Colors.black,
                ),
              ),
            ),
          ],
        ),
      ),
      actions: [
        IconButton(
          icon: Container(
            width: 36.w,
            height: 36.w,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Get.isDarkMode
                  ? Colors.grey[800]
                  : Colors.grey[200],
            ),
            child: Icon(
              Icons.person,
              size: 20.sp,
              color: Get.isDarkMode ? Colors.white : Colors.grey[600],
            ),
          ),
          onPressed: () {
            scaffoldKey.currentState?.openEndDrawer();
          },
        ),
        SizedBox(width: 8.w),
      ],
    );
  }
}
