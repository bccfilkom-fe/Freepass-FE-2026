import '../../domain/repositories/auth_repository.dart';
import '../datasources/local/local_storage.dart';
import '../datasources/remote/api_service.dart';
import '../models/user_model.dart';

class AuthRepositoryImpl implements AuthRepository {
  final ApiService _apiService;
  final LocalStorage _localStorage;

  AuthRepositoryImpl(this._apiService, this._localStorage);

  @override
  Future<UserModel> login(String email, String password) async {
    try {
      final data = await _apiService.login(email, password);
      final token = data['access_token'];
      // final refreshToken = data['refresh_token'];
      await _localStorage.saveToken(token);
      
      // Fetch profile immediately after login to get user details
      final user = await _apiService.getProfile(token);
      await _localStorage.saveUser(user);
      return user;
    } catch (e) {
      throw e;
    }
  }

  @override
  Future<void> logout() async {
    await _localStorage.clearToken();
    // Maybe clear user data too, but keeping it might be okay. Let's clear for security.
    // await _localStorage.authBox.delete('user');
  }

  @override
  Future<UserModel?> getCurrentUser() async {
    // Try to get from local first
    final localUser = _localStorage.getUser();
    final token = _localStorage.getToken();
    
    if (token != null) {
      try {
        // Refresh from API
        final remoteUser = await _apiService.getProfile(token);
        await _localStorage.saveUser(remoteUser);
        return remoteUser;
      } catch (e) {
        // If API fails (offline), return local
        return localUser;
      }
    }
    return localUser;
  }

  @override
  Future<bool> isLoggedIn() async {
    return _localStorage.getToken() != null;
  }
}
