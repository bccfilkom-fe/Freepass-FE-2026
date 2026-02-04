import 'package:get/get.dart';
import '../../domain/repositories/user_repository.dart';
import '../../data/models/user_model.dart';

class UserController extends GetxController {
  final UserRepository _repository;

  UserController(this._repository);

  final RxList<UserModel> users = <UserModel>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchUsers();
  }

  Future<void> fetchUsers() async {
    try {
      isLoading.value = true;
      final result = await _repository.getUsers();
      users.assignAll(result);
    } catch (e) {
      Get.snackbar('Error', 'Failed to load users: $e');
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> deleteUser(int id) async {
    try {
      final success = await _repository.deleteUser(id);
      if (success) {
        users.removeWhere((u) => u.id == id);
        Get.snackbar('Success', 'User deleted');
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to delete user: $e');
    }
  }
}
