import 'package:dio/dio.dart';
import '../../models/product_model.dart';
import '../../models/category_model.dart';
import '../../models/user_model.dart';
import '../../../app/config/app_constants.dart';
import 'dart:io';

class ApiService {
  final Dio _dio;

  ApiService()
    : _dio = Dio(
        BaseOptions(
          baseUrl: AppConstants.baseUrl,
          connectTimeout: const Duration(seconds: 10),
          receiveTimeout: const Duration(seconds: 10),
        ),
      );

  // --- Products ---
  Future<List<ProductModel>> getProducts({
    int offset = 0,
    int limit = 10,
    String? title,
    double? priceMin,
    double? priceMax,
    int? categoryId,
  }) async {
    try {
      final Map<String, dynamic> queryParams = {
        'offset': offset,
        'limit': limit,
      };
      if (title != null && title.isNotEmpty) queryParams['title'] = title;
      if (priceMin != null) queryParams['price_min'] = priceMin;
      if (priceMax != null) queryParams['price_max'] = priceMax;
      if (categoryId != null) queryParams['categoryId'] = categoryId;

      final response = await _dio.get(
        AppConstants.productsEndpoint,
        queryParameters: queryParams,
      );
      return (response.data as List)
          .map((e) => ProductModel.fromJson(e))
          .toList();
    } catch (e) {
      throw Exception('Failed to load products: $e');
    }
  }

  Future<ProductModel> getProduct(int id) async {
    try {
      final response = await _dio.get('${AppConstants.productsEndpoint}/$id');
      return ProductModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to load product: $e');
    }
  }

  Future<ProductModel> createProduct(Map<String, dynamic> data) async {
    try {
      final response = await _dio.post(
        AppConstants.productsEndpoint,
        data: data,
      );
      return ProductModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to create product: $e');
    }
  }

  Future<ProductModel> updateProduct(int id, Map<String, dynamic> data) async {
    try {
      final response = await _dio.put(
        '${AppConstants.productsEndpoint}/$id',
        data: data,
      );
      return ProductModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to update product: $e');
    }
  }

  Future<bool> deleteProduct(int id) async {
    try {
      final response = await _dio.delete(
        '${AppConstants.productsEndpoint}/$id',
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      throw Exception('Failed to delete product: $e');
    }
  }

  // --- Categories ---
  Future<List<CategoryModel>> getCategories() async {
    try {
      final response = await _dio.get(AppConstants.categoriesEndpoint);
      return (response.data as List)
          .map((e) => CategoryModel.fromJson(e))
          .toList();
    } catch (e) {
      throw Exception('Failed to load categories: $e');
    }
  }

  Future<CategoryModel> getCategory(int id) async {
    try {
      final response = await _dio.get('${AppConstants.categoriesEndpoint}/$id');
      return CategoryModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to load category: $e');
    }
  }

  Future<CategoryModel> createCategory(Map<String, dynamic> data) async {
    try {
      final response = await _dio.post(
        AppConstants.categoriesEndpoint,
        data: data,
      );
      return CategoryModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to create category: $e');
    }
  }

  Future<CategoryModel> updateCategory(
    int id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.put(
        '${AppConstants.categoriesEndpoint}/$id',
        data: data,
      );
      return CategoryModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to update category: $e');
    }
  }

  Future<bool> deleteCategory(int id) async {
    try {
      final response = await _dio.delete(
        '${AppConstants.categoriesEndpoint}/$id',
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      throw Exception('Failed to delete category: $e');
    }
  }

  // --- Users ---
  Future<List<UserModel>> getUsers() async {
    try {
      final response = await _dio.get(AppConstants.usersEndpoint);
      return (response.data as List).map((e) => UserModel.fromJson(e)).toList();
    } catch (e) {
      throw Exception('Failed to load users: $e');
    }
  }

  Future<UserModel> createUser(Map<String, dynamic> data) async {
    try {
      final response = await _dio.post(AppConstants.usersEndpoint, data: data);
      return UserModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to create user: $e');
    }
  }

  Future<UserModel> updateUser(int id, Map<String, dynamic> data) async {
    try {
      final response = await _dio.put(
        '${AppConstants.usersEndpoint}/$id',
        data: data,
      );
      return UserModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to update user: $e');
    }
  }

  Future<bool> deleteUser(int id) async {
    try {
      final response = await _dio.delete('${AppConstants.usersEndpoint}/$id');
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      throw Exception('Failed to delete user: $e');
    }
  }

  Future<bool> checkEmailAvailable(String email) async {
    try {
      final response = await _dio.post(
        '${AppConstants.usersEndpoint}/is-available',
        data: {'email': email},
      );
      return response.data['isAvailable'] ?? false;
    } catch (e) {
      return false; // Default to false if error, or handle differently
    }
  }

  // --- Auth ---
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post(
        AppConstants.loginEndpoint,
        data: {'email': email, 'password': password},
      );
      return response.data;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<UserModel> getProfile(String token) async {
    try {
      final response = await _dio.get(
        AppConstants.profileEndpoint,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      return UserModel.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to load profile: $e');
    }
  }

  // --- Files ---
  Future<String> uploadFile(File file) async {
    try {
      String fileName = file.path.split('/').last;
      FormData formData = FormData.fromMap({
        "file": await MultipartFile.fromFile(file.path, filename: fileName),
      });

      final response = await _dio.post(
        '${AppConstants.baseUrl}/api/v1/files/upload',
        data: formData,
      );
      return response.data['location']; // Returns the URL of the uploaded image
    } catch (e) {
      throw Exception('Failed to upload file: $e');
    }
  }
}
