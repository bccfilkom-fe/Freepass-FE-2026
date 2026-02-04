import 'package:get/get.dart';
import '../../controllers/home_controller.dart';
import '../../controllers/category_controller.dart';
// import '../../controllers/user_controller.dart';
import '../../../domain/repositories/product_repository.dart';
import '../../../domain/repositories/category_repository.dart';
// import '../../../domain/repositories/user_repository.dart';

class DashboardBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HomeController>(
      () => HomeController(Get.find<ProductRepository>()),
    );
    Get.lazyPut<CategoryController>(
      () => CategoryController(Get.find<CategoryRepository>()),
    );
 
 
  }
}
