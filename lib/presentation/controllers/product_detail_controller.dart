import 'package:get/get.dart';
import '../../data/models/product_model.dart';
import '../../domain/repositories/product_repository.dart';
import '../../app/routes/app_routes.dart';

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
        Get.snackbar('Success', 'Product deleted');
        Get.back(result: true); // Return result to calling page (Home)
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to delete product: $e');
    }
  }

  Future<void> editProduct() async {
    final result = await Get.toNamed(Routes.PRODUCT_FORM, arguments: product.value);
    if (result == true) {
      // Refresh details
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
