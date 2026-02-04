import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Ensure screenutil is imported
import '../../controllers/auth_controller.dart';
import '../../widgets/common/custom_button.dart';
import '../../widgets/common/custom_text_field.dart';

class LoginPage extends GetView<AuthController> {
  final TextEditingController emailController = TextEditingController(text: 'john@mail.com');
  final TextEditingController passwordController = TextEditingController(text: 'changeme');

  LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Welcome Back',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              SizedBox(height: 8.h),
              Text(
                'Sign in to continue',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey,
                    ),
              ),
              SizedBox(height: 40.h),
              CustomTextField(
                hintText: 'Email',
                controller: emailController,
                prefixIcon: Icons.email_outlined,
              ),
              SizedBox(height: 16.h),
              CustomTextField(
                hintText: 'Password',
                controller: passwordController,
                isPassword: true,
                prefixIcon: Icons.lock_outline,
              ),
              SizedBox(height: 24.h),
              Obx(() {
                 if (controller.isLoading.value) {
                   return Center(
                     child: LoadingAnimationWidget.staggeredDotsWave(
                       color: Colors.black, // Or primary color
                       size: 40.sp,
                     ),
                   );
                 }
                 return CustomButton(
                    text: 'Login',
                    isLoading: false, // Handled above
                    onPressed: () {
                      controller.login(
                        emailController.text,
                        passwordController.text,
                      );
                    },
                  );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
