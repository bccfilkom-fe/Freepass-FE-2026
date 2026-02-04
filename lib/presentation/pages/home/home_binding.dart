import 'package:get/get.dart';
import '../../../domain/repositories/product_repository.dart';
import '../../controllers/home_controller.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HomeController>(
      () => HomeController(Get.find<ProductRepository>()),
    );
  }
}
