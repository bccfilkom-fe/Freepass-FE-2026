import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/user_form_controller.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class UserFormPage extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  UserFormPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(UserFormController(Get.find()));

    if (controller.userToEdit != null) {
      nameController.text = controller.userToEdit!.name;
      emailController.text = controller.userToEdit!.email;
      // Password usually blank for edit unless changing
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(controller.userToEdit != null ? 'Edit User' : 'New User'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Column(
          children: [
             GestureDetector(
              onTap: controller.pickImage,
              child: Obx(() {
                return Container(
                  width: 100.w,
                  height: 100.w,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.grey),
                  ),
                  child: controller.selectedImage.value != null
                      ? ClipOval(
                          child: Image.file(
                            controller.selectedImage.value!,
                            fit: BoxFit.cover,
                          ),
                        )
                      : (controller.userToEdit != null
                          ? ClipOval(
                              child: Image.network(
                                controller.userToEdit!.avatar,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => const Icon(Icons.person, size: 40),
                              ),
                            )
                          : const Icon(Icons.person, size: 40, color: Colors.grey)),
                );
              }),
            ),
            SizedBox(height: 24.h),
            CustomTextField(
              hintText: 'Name',
              controller: nameController,
              prefixIcon: Icons.person,
            ),
            SizedBox(height: 16.h),
            CustomTextField(
              hintText: 'Email',
              controller: emailController,
              prefixIcon: Icons.email,
            ),
            SizedBox(height: 16.h),
            CustomTextField(
              hintText: 'Password',
              controller: passwordController,
              isPassword: true,
              prefixIcon: Icons.lock,
            ),
            SizedBox(height: 16.h),
            // Role Dropdown
            Obx(() => Container(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12.r),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: controller.role.value,
                  isExpanded: true,
                  items: ['admin', 'customer'].map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    if (newValue != null) controller.role.value = newValue;
                  },
                ),
              ),
            )),
            SizedBox(height: 24.h),
            Obx(() => CustomButton(
              text: 'Save',
              isLoading: controller.isLoading.value,
              onPressed: () {
                controller.saveUser(
                  nameController.text,
                  emailController.text,
                  passwordController.text,
                );
              },
            )),
          ],
        ),
      ),
    );
  }
}
