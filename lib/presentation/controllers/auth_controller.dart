import 'package:get/get.dart';
import '../../domain/repositories/auth_repository.dart';
import '../../data/models/user_model.dart';
import '../../app/routes/app_routes.dart';

class AuthController extends GetxController {
  final AuthRepository _authRepository;

  AuthController(this._authRepository);

  final Rx<UserModel?> user = Rx<UserModel?>(null);
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    checkLoginStatus();
  }

  Future<void> checkLoginStatus() async {
    final isLoggedIn = await _authRepository.isLoggedIn();
    if (isLoggedIn) {
      final userData = await _authRepository.getCurrentUser();
      user.value = userData;
      Get.offAllNamed(Routes.DASHBOARD);
    } else {
      Get.offAllNamed(Routes.LOGIN);
    }
  }

  Future<void> login(String email, String password) async {
    try {
      isLoading.value = true;
      final userData = await _authRepository.login(email, password);
      user.value = userData;
      Get.offAllNamed(Routes.DASHBOARD);
    } catch (e) {
      Get.snackbar('Error', 'Login failed: ${e.toString()}');
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> logout() async {
    await _authRepository.logout();
    user.value = null;
    Get.offAllNamed(Routes.LOGIN);
  }
}
