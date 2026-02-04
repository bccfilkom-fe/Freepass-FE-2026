import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../../domain/repositories/product_repository.dart';
import '../../data/models/product_model.dart';
import '../../data/models/category_model.dart';

class ProductFormController extends GetxController {
  final ProductRepository _repository;

  ProductFormController(this._repository);

  // ===== FORM =====
  final formKey = GlobalKey<FormState>();
  final titleController = TextEditingController();
  final priceController = TextEditingController();
  final descController = TextEditingController();

  // ===== STATE =====
  final isLoading = false.obs;
  final selectedImage = Rx<File?>(null);
  final selectedCategory = Rx<CategoryModel?>(null);
  final categories = <CategoryModel>[].obs;

  ProductModel? editingProduct;

  @override
  void onInit() {
    super.onInit();
    fetchCategories();
  }

  @override
  void onClose() {
    titleController.dispose();
    priceController.dispose();
    descController.dispose();
    super.onClose();
  }

  // ===== EDIT MODE =====
  void setEditProduct(ProductModel product) {
    editingProduct = product;

    titleController.text = product.title;
    priceController.text = product.price.toString();
    descController.text = product.description;

    selectedCategory.value = categories.firstWhereOrNull(
      (c) => c.id == product.category?.id,
    );
  }

  // ===== CREATE MODE =====
  void clearForm() {
    editingProduct = null;
    titleController.clear();
    priceController.clear();
    descController.clear();
    selectedImage.value = null;
    selectedCategory.value = null;
  }

  Future<void> fetchCategories() async {
    try {
      categories.value = await _repository.getCategories();
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  Future<void> pickImage() async {
    final image = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
    );

    if (image != null) {
      selectedImage.value = File(image.path);
    }
  }

  Future<void> saveProduct() async {
    if (!formKey.currentState!.validate()) return;

    final priceText = priceController.text.trim();
    debugPrint('PRICE RAW: "$priceText"');

    if (priceText.isEmpty) {
      Get.snackbar('Error', 'Price tidak boleh kosong');
      return;
    }

    final price = double.tryParse(priceText);
    if (price == null) {
      Get.snackbar('Error', 'Format price tidak valid');
      return;
    }

    if (selectedImage.value == null && editingProduct == null) {
      Get.snackbar('Error', 'Image wajib dipilih');
      return;
    }

    isLoading.value = true;
    try {
      String imageUrl;

      if (selectedImage.value != null) {
        imageUrl = await _repository.uploadFile(selectedImage.value!);
      } else {
        imageUrl = editingProduct!.images.first;
      }

      final data = {
        'title': titleController.text,
        'price': price,
        'description': descController.text,
        'categoryId': selectedCategory.value?.id ?? 1,
        'images': [imageUrl],
      };

      if (editingProduct != null) {
        await _repository.updateProduct(editingProduct!.id, data);
        Get.back(result: true);
        Get.snackbar('Success', 'Product updated');
      } else {
        print(data);
        Get.back();
        await _repository.createProduct(data);
        Get.snackbar('Success', 'Product created');
      }

      clearForm();
    } catch (e) {
      debugPrint(e.toString());
      Get.snackbar('Error', 'Failed to save product');
    } finally {
      isLoading.value = false;
    }
  }
}
