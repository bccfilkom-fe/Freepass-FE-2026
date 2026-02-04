import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/auth_controller.dart';

class HomeDrawer extends StatelessWidget {
  const HomeDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return Drawer(
      child: Column(
        children: [
          Obx(() {
            final user = authController.user.value;
            return UserAccountsDrawerHeader(
              decoration: const BoxDecoration(color: Colors.white),
              accountName: Text(
                user?.name ?? 'Guest',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 18.sp,
                ),
              ),
              accountEmail: Text(
                user?.email ?? '',
                style: TextStyle(color: Colors.grey[600]),
              ),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.grey[200],
                backgroundImage:
                    (user?.avatar.isNotEmpty == true &&
                        Uri.tryParse(user!.avatar)?.hasAbsolutePath == true)
                    ? NetworkImage(user.avatar)
                    : null,
                child: (user?.avatar.isEmpty ?? true)
                    ? const Icon(Icons.person, color: Colors.grey)
                    : null,
              ),
            );
          }),
          Obx(() {
            final user = authController.user.value;
            return Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                children: [
                  if (user != null) ...[
                    ListTile(
                      leading: const Icon(Icons.email_outlined),
                      title: const Text('Email'),
                      subtitle: Text(user.email),
                    ),
                    ListTile(
                      leading: const Icon(Icons.admin_panel_settings_outlined),
                      title: const Text('Role'),
                      subtitle: Text("ADMIN"),
                    ),
                  ],
                ],
              ),
            );
          }),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.brightness_6_outlined),
            title: const Text('Dark Mode'),
            trailing: Switch(
              value: Get.isDarkMode,
              onChanged: (value) {
                Get.changeThemeMode(value ? ThemeMode.dark : ThemeMode.light);
              },
            ),
          ),
          const Spacer(),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Logout', style: TextStyle(color: Colors.red)),
            onTap: () {
              Get.back();
              authController.logout();
            },
          ),
          SizedBox(height: 20.h),
        ],
      ),
    );
  }
}
