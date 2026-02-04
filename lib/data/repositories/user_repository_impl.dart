import '../../domain/repositories/user_repository.dart';
import '../datasources/remote/api_service.dart';
import '../models/user_model.dart';

class UserRepositoryImpl implements UserRepository {
  final ApiService _apiService;

  UserRepositoryImpl(this._apiService);

  @override
  Future<List<UserModel>> getUsers() async {
    return await _apiService.getUsers();
  }

  @override
  Future<UserModel> createUser(Map<String, dynamic> data) async {
    return await _apiService.createUser(data);
  }

  @override
  Future<UserModel> updateUser(int id, Map<String, dynamic> data) async {
    return await _apiService.updateUser(id, data);
  }

  @override
  Future<bool> deleteUser(int id) async {
    return await _apiService.deleteUser(id);
  }

  @override
  Future<bool> checkEmailAvailable(String email) async {
    return await _apiService.checkEmailAvailable(email);
  }
}
