import '../../data/models/category_model.dart';
import 'dart:io';

abstract class CategoryRepository {
  Future<List<CategoryModel>> getCategories();
  Future<CategoryModel> getCategory(int id);
  Future<CategoryModel> createCategory(Map<String, dynamic> data);
  Future<CategoryModel> updateCategory(int id, Map<String, dynamic> data);
  Future<bool> deleteCategory(int id);
  Future<String> uploadFile(File file);
}
