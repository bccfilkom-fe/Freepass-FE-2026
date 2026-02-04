import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../controllers/auth_controller.dart';
import '../../widgets/custom_button.dart';

class ProfilePage extends GetView<AuthController> {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: Obx(() {
        final user = controller.user.value;
        if (user == null) return const Center(child: Text('Not logged in'));

        return Padding(
          padding: EdgeInsets.all(24.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Center(
                child: Container(
                  width: 100.r,
                  height: 100.r,
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
                            placeholder: (context, url) => const Center(
                              child: CircularProgressIndicator(),
                            ),
                            errorWidget: (context, url, error) {
                              try {
                                CachedNetworkImage.evictFromCache(url);
                              } catch (e) {
                                print(e);
                              }
                              return const Icon(Icons.person, size: 50);
                            },
                          )
                        : const Icon(Icons.person, size: 50),
                  ),
                ),
              ),
              SizedBox(height: 16.h),
              Text(
                user.name,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8.h),
              Text(
                user.email,
                style: Theme.of(
                  context,
                ).textTheme.bodyLarge?.copyWith(color: Colors.grey),
              ),
              SizedBox(height: 8.h),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 4.h),
                decoration: BoxDecoration(
                  color: Colors.blue.withAlpha(25), // 0.1 * 255 ~= 25
                  borderRadius: BorderRadius.circular(20.r),
                ),
                child: Text(
                  user.role.toUpperCase(),
                  style: TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                    fontSize: 12.sp,
                  ),
                ),
              ),
              const Spacer(),
              CustomButton(
                text: 'Logout',
                onPressed: () {
                  controller.logout();
                },
              ),
            ],
          ),
        );
      }),
    );
  }
}
