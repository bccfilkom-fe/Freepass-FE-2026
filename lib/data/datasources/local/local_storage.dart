import 'package:hive/hive.dart';
import '../../models/user_model.dart';
import '../../models/product_model.dart';
import '../../../app/config/app_constants.dart';
import 'dart:convert';

class LocalStorage {
  final Box authBox = Hive.box(AppConstants.authBox);
  final Box productsBox = Hive.box(AppConstants.productsBox);

  // Auth
  Future<void> saveToken(String token) async {
    await authBox.put('token', token);
  }

  String? getToken() {
    return authBox.get('token');
  }

  Future<void> clearToken() async {
    await authBox.delete('token');
  }

  Future<void> saveUser(UserModel user) async {
    await authBox.put('user', jsonEncode(user.toJson()));
  }

  UserModel? getUser() {
    final userStr = authBox.get('user');
    if (userStr != null) {
      return UserModel.fromJson(jsonDecode(userStr));
    }
    return null;
  }

  // Products Caching (Simple JSON caching for offline view)
  Future<void> saveProducts(List<ProductModel> products) async {
    final List<Map<String, dynamic>> jsonList = products.map((p) => p.toJson()).toList();
    await productsBox.put('cached_products', jsonEncode(jsonList));
  }

  List<ProductModel> getCachedProducts() {
    final String? jsonStr = productsBox.get('cached_products');
    if (jsonStr != null) {
      final List<dynamic> jsonList = jsonDecode(jsonStr);
      return jsonList.map((e) => ProductModel.fromJson(e)).toList();
    }
    return [];
  }
}
