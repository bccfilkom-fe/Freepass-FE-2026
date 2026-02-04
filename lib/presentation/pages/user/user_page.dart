import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../controllers/user_controller.dart';
import '../../../app/routes/app_routes.dart';

class UserPage extends StatelessWidget {
  const UserPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(UserController(Get.find()));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Users'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () async {
              final result = await Get.toNamed(Routes.USER_FORM);
              if (result == true) controller.fetchUsers();
            },
          ),
        ],
      ),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        return ListView.separated(
          padding: EdgeInsets.all(16.w),
          itemCount: controller.users.length,
          separatorBuilder: (_, __) => SizedBox(height: 12.h),
          itemBuilder: (context, index) {
            final user = controller.users[index];
            return Card(
              child: ListTile(
                leading: Container(
                  width: 40.w,
                  height: 40.w,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    shape: BoxShape.circle,
                  ),
                  child: ClipOval(
                    child:
                        (user.avatar.isNotEmpty &&
                            Uri.tryParse(user.avatar)?.hasAbsolutePath ==
                                true &&
                            user.avatar != 'https://pravatar.cc/' &&
                            user.avatar != 'https://pravatar.cc')
                        ? CachedNetworkImage(
                            imageUrl: user.avatar,
                            fit: BoxFit.cover,
                            placeholder: (context, url) => const SizedBox(),
                            errorWidget: (context, url, error) {
                              try {
                                CachedNetworkImage.evictFromCache(url);
                              } catch (e) {
                                print(e);
                              }
                              return const Icon(Icons.person);
                            },
                          )
                        : const Icon(Icons.person),
                  ),
                ),
                title: Text(user.name),
                subtitle: Text(user.email),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit, color: Colors.blue),
                      onPressed: () async {
                        final result = await Get.toNamed(
                          Routes.USER_FORM,
                          arguments: user,
                        );
                        if (result == true) controller.fetchUsers();
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete, color: Colors.red),
                      onPressed: () {
                        Get.defaultDialog(
                          title: 'Delete User',
                          middleText:
                              'Are you sure you want to delete this user?',
                          textConfirm: 'Yes',
                          textCancel: 'No',
                          confirmTextColor: Colors.white,
                          onConfirm: () {
                            controller.deleteUser(user.id);
                            Get.back();
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
