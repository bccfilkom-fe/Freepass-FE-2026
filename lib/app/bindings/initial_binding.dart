import 'package:get/get.dart';
import '../../data/datasources/local/local_storage.dart';
import '../../data/datasources/remote/api_service.dart';
import '../../data/repositories/auth_repository_impl.dart';
import '../../data/repositories/product_repository_impl.dart';
import '../../data/repositories/category_repository_impl.dart';
import '../../data/repositories/user_repository_impl.dart';
import '../../domain/repositories/auth_repository.dart';
import '../../domain/repositories/product_repository.dart';
import '../../domain/repositories/category_repository.dart';
import '../../domain/repositories/user_repository.dart';
import '../../presentation/controllers/auth_controller.dart';

class InitialBinding extends Bindings {
  @override
  void dependencies() {
    // Data Sources
    Get.lazyPut(() => ApiService());
    Get.lazyPut(() => LocalStorage());

    // Repositories
    Get.lazyPut<AuthRepository>(
      () => AuthRepositoryImpl(Get.find(), Get.find()),
    );
    Get.lazyPut<ProductRepository>(
      () => ProductRepositoryImpl(Get.find(), Get.find()),
    );
    Get.lazyPut<CategoryRepository>(() => CategoryRepositoryImpl(Get.find()));
    Get.lazyPut<UserRepository>(() => UserRepositoryImpl(Get.find()));

    // Controllers
    Get.put(AuthController(Get.find()), permanent: true);
  }
}
