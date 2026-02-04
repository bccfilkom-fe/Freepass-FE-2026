import 'package:get/get.dart';
import '../../data/datasources/local/local_storage.dart';
import '../../data/datasources/remote/api_service.dart';
import '../../data/repositories/auth_repository_impl.dart';
import '../../data/repositories/category_repository_impl.dart';
import '../../data/repositories/product_repository_impl.dart';
import '../../domain/repositories/auth_repository.dart';
import '../../domain/repositories/category_repository.dart';
import '../../domain/repositories/product_repository.dart';
import '../../presentation/controllers/auth_controller.dart';
import '../../presentation/controllers/category_controller.dart';
import '../../presentation/controllers/home_controller.dart';

class InitialBinding extends Bindings {
  @override
  void dependencies() {
    // Services / Data Sources
    Get.put(ApiService());
    Get.put(LocalStorage());

    // Repositories
    Get.put<AuthRepository>(AuthRepositoryImpl(Get.find(), Get.find()));
    Get.put<CategoryRepository>(CategoryRepositoryImpl(Get.find()));
    Get.put<ProductRepository>(ProductRepositoryImpl(Get.find(), Get.find()));

    // Controllers
    Get.put(AuthController(Get.find()));
    Get.put(CategoryController(Get.find()));
    Get.put(HomeController(Get.find()));
  }
}
