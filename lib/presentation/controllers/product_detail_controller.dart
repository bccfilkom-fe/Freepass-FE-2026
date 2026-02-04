import 'package:dio/dio.dart';
import 'package:get/get.dart';
import '../../data/models/product_model.dart';
import '../../domain/repositories/product_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../widgets/product/product_bottom_sheet.dart';

class ProductDetailController extends GetxController {
  late Rx<ProductModel> product;
  final ProductRepository _repository = Get.find();
  
  @override
  void onInit() {
    super.onInit();
    if (Get.arguments is ProductModel) {
      product = (Get.arguments as ProductModel).obs;
    } else {
      // Handle error or fetch by ID
    }
  }

  Future<void> deleteProduct() async {
    try {
      final success = await _repository.deleteProduct(product.value.id);
      if (success) {
         Get.back(result: true); 
        Get.snackbar('Success', 'Product deleted');
       
      } else {
         Get.snackbar('Error', 'Failed to delete product. Please try again.');
      }
    } catch (e) {
      print('Delete Error: $e');
      if (e is DioException) {
         Get.snackbar('Error', 'Network error: ${e.message}');
      } else {
         Get.snackbar('Error', 'Failed to delete product: $e');
      }
    }
  }

  Future<void> editProduct() async {
    final result = await Get.bottomSheet(
      ProductBottomSheet(productToEdit: product.value),
      isScrollControlled: true,
      backgroundColor: Get.theme.scaffoldBackgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
      ),
    );
    if (result == true) {
      await fetchProductDetails();
      Get.snackbar('Success', 'Product details updated');
    }
  }

  Future<void> fetchProductDetails() async {
    try {
      final updatedProduct = await _repository.getProduct(product.value.id);
      product.value = updatedProduct;
    } catch (e) {
      print('Error fetching updated product: $e');
    }
  }
}
