import '../../data/models/user_model.dart';

abstract class UserRepository {
  Future<List<UserModel>> getUsers();
  Future<UserModel> createUser(Map<String, dynamic> data);
  Future<UserModel> updateUser(int id, Map<String, dynamic> data);
  Future<bool> deleteUser(int id);
  Future<bool> checkEmailAvailable(String email);
}
