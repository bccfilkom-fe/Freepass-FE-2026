import '../../domain/repositories/product_repository.dart';
import '../datasources/local/local_storage.dart';
import '../datasources/remote/api_service.dart';
import '../models/category_model.dart';
import '../models/product_model.dart';
import 'dart:io';

class ProductRepositoryImpl implements ProductRepository {
  final ApiService _apiService;
  final LocalStorage _localStorage;

  ProductRepositoryImpl(this._apiService, this._localStorage);

  @override
  Future<List<ProductModel>> getProducts({
    int offset = 0,
    int limit = 10,
    String? title,
    double? priceMin,
    double? priceMax,
    int? categoryId,
  }) async {
    try {
      final products = await _apiService.getProducts(
        offset: offset,
        limit: limit,
        title: title,
        priceMin: priceMin,
        priceMax: priceMax,
        categoryId: categoryId,
      );
      if (offset == 0 &&
          title == null &&
          priceMin == null &&
          priceMax == null &&
          categoryId == null) {
        await _localStorage.saveProducts(products);
      }
      return products;
    } catch (e) {
      if (offset == 0 &&
          title == null &&
          priceMin == null &&
          priceMax == null &&
          categoryId == null) {
        final cached = _localStorage.getCachedProducts();
        if (cached.isNotEmpty) {
          return cached;
        }
      }
      throw e;
    }
  }

  @override
  Future<ProductModel> getProduct(int id) async {
    return await _apiService.getProduct(id);
  }

  @override
  Future<List<CategoryModel>> getCategories() async {
    return await _apiService.getCategories();
  }

  @override
  Future<ProductModel> createProduct(Map<String, dynamic> data) async {
    return await _apiService.createProduct(data);
  }

  @override
  Future<ProductModel> updateProduct(int id, Map<String, dynamic> data) async {
    return await _apiService.updateProduct(id, data);
  }

  @override
  Future<bool> deleteProduct(int id) async {
    return await _apiService.deleteProduct(id);
  }

  @override
  Future<String> uploadFile(File file) async {
    return await _apiService.uploadFile(file);
  }
}
