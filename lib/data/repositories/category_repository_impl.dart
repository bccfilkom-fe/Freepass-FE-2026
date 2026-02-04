import '../../domain/repositories/category_repository.dart';
import '../datasources/remote/api_service.dart';
import '../models/category_model.dart';
import 'dart:io';

class CategoryRepositoryImpl implements CategoryRepository {
  final ApiService _apiService;

  CategoryRepositoryImpl(this._apiService);

  @override
  Future<List<CategoryModel>> getCategories() async {
    return await _apiService.getCategories();
  }

  @override
  Future<CategoryModel> getCategory(int id) async {
    return await _apiService.getCategory(id);
  }

  @override
  Future<CategoryModel> createCategory(Map<String, dynamic> data) async {
    return await _apiService.createCategory(data);
  }

  @override
  Future<CategoryModel> updateCategory(int id, Map<String, dynamic> data) async {
    return await _apiService.updateCategory(id, data);
  }

  @override
  Future<bool> deleteCategory(int id) async {
    return await _apiService.deleteCategory(id);
  }

  @override
  Future<String> uploadFile(File file) async {
    return await _apiService.uploadFile(file);
  }
}
