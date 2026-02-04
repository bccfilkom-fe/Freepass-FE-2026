import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../home/home_page.dart';
import '../category/category_page.dart';

class DashboardController extends GetxController {
  final RxInt tabIndex = 0.obs;
  DateTime? lastBackPressTime;

  void changeTabIndex(int index) {
    tabIndex.value = index;
  }

  Future<bool> onWillPop() async {
    final now = DateTime.now();
    if (lastBackPressTime == null ||
        now.difference(lastBackPressTime!) > const Duration(seconds: 2)) {
      lastBackPressTime = now;
      Get.snackbar(
        'Exit',
        'Press back again to exit',
        snackPosition: SnackPosition.BOTTOM,
        duration: const Duration(seconds: 2),
        margin: const EdgeInsets.all(20),
        backgroundColor: Colors.black87,
        colorText: Colors.white,
      );
      return false;
    }
    return true;
  }
}

class DashboardPage extends StatelessWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(DashboardController());

    return WillPopScope(
      onWillPop: controller.onWillPop,
      child: Scaffold(
        body: Obx(
          () => IndexedStack(
            index: controller.tabIndex.value,
            children: [HomePage(), const CategoryPage()],
          ),
        ),
        bottomNavigationBar: Obx(
          () => BottomNavigationBar(
            onTap: controller.changeTabIndex,
            currentIndex: controller.tabIndex.value,
            type: BottomNavigationBarType.fixed,
            selectedItemColor: (Get.isDarkMode ? Colors.white : Colors.black),
            unselectedItemColor: (Get.isDarkMode
                ? Colors.grey[100]!
                : Colors.grey),
            showSelectedLabels: false,
            showUnselectedLabels: false,
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined),
                activeIcon: Icon(Icons.home_filled),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.category_outlined),
                activeIcon: Icon(Icons.category),
                label: 'Categories',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
