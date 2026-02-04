import '../../data/models/product_model.dart';
import '../../data/models/category_model.dart';
import 'dart:io';

abstract class ProductRepository {
  Future<List<ProductModel>> getProducts({
    int offset,
    int limit,
    String? title,
    double? priceMin,
    double? priceMax,
    int? categoryId,
  });
  Future<ProductModel> getProduct(int id);
  Future<ProductModel> createProduct(Map<String, dynamic> data);
  Future<ProductModel> updateProduct(int id, Map<String, dynamic> data);
  Future<bool> deleteProduct(int id);
  Future<List<CategoryModel>> getCategories();
  Future<String> uploadFile(File file);
}
