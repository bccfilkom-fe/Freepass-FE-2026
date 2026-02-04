import 'package:get/get.dart';
import '../../domain/repositories/category_repository.dart';
import '../../data/models/category_model.dart';

class CategoryController extends GetxController {
  final CategoryRepository _repository;

  CategoryController(this._repository);

  final RxList<CategoryModel> categories = <CategoryModel>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchCategories();
  }

  Future<void> fetchCategories() async {
    try {
      isLoading.value = true;
      final result = await _repository.getCategories();
      categories.assignAll(result);
    } catch (e) {
      Get.snackbar('Error', 'Failed to load categories: $e');
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> deleteCategory(int id) async {
    try {
      final success = await _repository.deleteCategory(id);
      if (success) {
        categories.removeWhere((c) => c.id == id);
        Get.snackbar('Success', 'Category deleted');
      } else {
        Get.snackbar('Error', 'Failed to delete category. It might be in use.');
      }
    } catch (e) {
      print('Delete Category Error: $e');
      // Often categories cannot be deleted if they have products
      // Checking for 400 status code which Platzi API uses for integrity constraints
      if (e.toString().contains('400') || e.toString().contains('foreign key constraint') || e.toString().contains('integrity constraint')) {
        Get.snackbar('Error', 'Cannot delete category because it is being used by existing products.');
      } else {
        Get.snackbar('Error', 'Failed to delete category: $e');
      }
    }
  }
}
