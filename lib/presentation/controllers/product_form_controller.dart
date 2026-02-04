import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../../domain/repositories/product_repository.dart';
import '../../data/models/product_model.dart';
import '../../data/models/category_model.dart';

class ProductFormController extends GetxController {
  final ProductRepository _repository;

  ProductFormController(this._repository);

  final RxBool isLoading = false.obs;
  final Rx<File?> selectedImage = Rx<File?>(null);
  final Rx<CategoryModel?> selectedCategory = Rx<CategoryModel?>(null);
  final RxList<CategoryModel> categories = <CategoryModel>[].obs;

  // For Edit Mode
  ProductModel? productToEdit;

  @override
  void onInit() {
    super.onInit();
    fetchCategories();
    if (Get.arguments is ProductModel) {
      setProductToEdit(Get.arguments);
    }
  }

  void setProductToEdit(ProductModel product) {
    productToEdit = product;
    // Set selected category when categories are loaded
    if (categories.isNotEmpty) {
      selectedCategory.value = categories.firstWhereOrNull(
        (c) => c.id == product.category?.id,
      );
    }
  }

  void clearForm() {
    productToEdit = null;
    selectedImage.value = null;
    selectedCategory.value = null;
  }

  Future<void> fetchCategories() async {
    try {
      categories.value = await _repository.getCategories();
      if (productToEdit != null) {
        // Find category
        selectedCategory.value = categories.firstWhereOrNull(
          (c) => c.id == productToEdit!.category?.id,
        );
      }
    } catch (e) {
      print(e);
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
        // Ignore if already active, or show a gentle message
        return;
      }
      print('Error picking image: $e');
      Get.snackbar('Error', 'Failed to pick image');
    }
  }

  Future<void> saveProduct(
    String title,
    String price,
    String description,
  ) async {
    if (title.isEmpty ||
        price.isEmpty ||
        description.isEmpty ||
        (selectedImage.value == null && productToEdit == null)) {
      Get.snackbar('Error', 'Please fill all fields');
      return;
    }

    try {
      isLoading.value = true;
      String? imageUrl;

      // Upload image if selected
      if (selectedImage.value != null) {
        imageUrl = await _repository.uploadFile(selectedImage.value!);
      } else {
        imageUrl =
            productToEdit?.images.firstOrNull ?? 'https://placehold.co/600x400';
      }

      final Map<String, dynamic> data = {
        'title': title,
        'price': double.tryParse(price) ?? 0,
        'description': description,
        'categoryId': selectedCategory.value?.id ?? 1,
        'images': [imageUrl],
      };

      if (productToEdit != null) {
        await _repository.updateProduct(productToEdit!.id, data);
        Get.snackbar('Success', 'Product updated');
      } else {
        await _repository.createProduct(data);
        Get.snackbar('Success', 'Product created');
      }
      // Get.back(result: true); // Move this inside try block to ensure it only closes on success
      Get.back(result: true);
    } catch (e) {
      Get.snackbar('Error', 'Failed to save product: $e');
    } finally {
      isLoading.value = false;
    }
  }
}
