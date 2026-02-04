import 'package:get/get.dart';
import 'app_routes.dart';

import '../../presentation/pages/auth/login_page.dart';
import '../../presentation/pages/dashboard/dashboard_page.dart';
import '../../presentation/pages/home/home_page.dart';
import '../../presentation/pages/home/home_binding.dart';
import '../../presentation/pages/dashboard/dashboard_binding.dart';
import '../../presentation/pages/product/product_detail_page.dart';
import '../../presentation/pages/product/product_form_page.dart';
import '../../presentation/pages/category/category_page.dart';
import '../../presentation/pages/category/category_form_page.dart';
import '../../presentation/pages/user/user_page.dart';
import '../../presentation/pages/user/user_form_page.dart';
import '../../presentation/pages/profile/profile_page.dart';
import '../../presentation/pages/product/all_products_page.dart';

class AppPages {
  static const INITIAL = Routes.SPLASH;

  static final routes = [
    GetPage(name: Routes.LOGIN, page: () => LoginPage()),
    GetPage(
      name: Routes.DASHBOARD,
      page: () => const DashboardPage(),
      binding: DashboardBinding(),
    ),
    GetPage(
      name: Routes.HOME,
      page: () => const HomePage(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: Routes.PRODUCT_DETAILS,
      page: () => const ProductDetailPage(),
      // Binding can be done inside page with Get.put or here
    ),
    GetPage(name: Routes.PRODUCT_FORM, page: () => ProductFormPage()),
    GetPage(name: Routes.CATEGORIES, page: () => const CategoryPage()),
    GetPage(name: Routes.CATEGORY_FORM, page: () => CategoryFormPage()),
    GetPage(name: Routes.USERS, page: () => const UserPage()),
    GetPage(name: Routes.USER_FORM, page: () => UserFormPage()),
    GetPage(name: Routes.PROFILE, page: () => const ProfilePage()),
    GetPage(name: Routes.ALL_PRODUCTS, page: () => const AllProductsPage()),
  ];
}
