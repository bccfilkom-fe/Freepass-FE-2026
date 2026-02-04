import 'package:get/get.dart';
import '../../domain/repositories/category_repository.dart';
import '../../data/models/category_model.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class CategoryFormController extends GetxController {
  final CategoryRepository _repository;

  CategoryFormController(this._repository);

  final RxBool isLoading = false.obs;
  final Rx<File?> selectedImage = Rx<File?>(null);
  CategoryModel? categoryToEdit;

  @override
  void onInit() {
    super.onInit();
    if (Get.arguments is CategoryModel) {
      categoryToEdit = Get.arguments;
    }
  }

  Future<void> pickImage() async {
    try {
      final picker = ImagePicker();
      final pickedFile = await picker.pickImage(source: ImageSource.gallery);
      if (pickedFile != null) {
        selectedImage.value = File(pickedFile.path);
      }
    } catch (e) {
      if (e.toString().contains('already_active')) {
        return;
      }
      print('Error picking image: $e');
      Get.snackbar('Error', 'Failed to pick image');
    }
  }

  void setCategoryToEdit(CategoryModel? category) {
    categoryToEdit = category;
    selectedImage.value = null; // Reset image when setting category
  }

  void clearForm() {
    categoryToEdit = null;
    selectedImage.value = null;
  }

  Future<void> saveCategory(String name) async {
    if (name.isEmpty) {
      Get.snackbar('Error', 'Name is required');
      return;
    }

    try {
      isLoading.value = true;
      String imageUrl = 'https://placehold.co/600x400';

      if (selectedImage.value != null) {
        imageUrl = await _repository.uploadFile(selectedImage.value!);
      } else if (categoryToEdit != null) {
        imageUrl = categoryToEdit!.image;
      }

      final data = {
        'name': name,
        'image': imageUrl,
      };

      if (categoryToEdit != null) {
        await _repository.updateCategory(categoryToEdit!.id, data);
        Get.snackbar('Success', 'Category updated');
      } else {
        await _repository.createCategory(data);
        Get.snackbar('Success', 'Category created');
      }
      
      // Delay closing slightly to allow snackbar to start showing, 
      // avoiding race conditions with bottomsheet disposal
      Future.delayed(const Duration(milliseconds: 500), () {
         Get.back(result: true);
      });
      
    } catch (e) {
      Get.snackbar('Error', 'Failed to save category: $e');
    } finally {
      isLoading.value = false;
    }
  }
}
