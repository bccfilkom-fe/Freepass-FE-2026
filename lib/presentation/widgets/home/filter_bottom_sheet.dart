import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controllers/home_controller.dart';

class FilterBottomSheet extends StatelessWidget {
  const FilterBottomSheet({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HomeController>();
    
    // Initial values
    var currentRange = RangeValues(
      controller.minPrice.value ?? 0,
      controller.maxPrice.value ?? 1000,
    );

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Container(
        padding: EdgeInsets.all(24.w),
        decoration: BoxDecoration(
          color: Theme.of(context).scaffoldBackgroundColor,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
        ),
        child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Filter by Price',
                style: Theme.of(
                  context,
                ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () {
                  controller.resetFilters();
                  Get.back();
                },
                child: const Text(
                  'Reset',
                  style: TextStyle(color: Colors.red),
                ),
              ),
            ],
          ),
          SizedBox(height: 24.h),
          StatefulBuilder(
            builder: (context, setState) {
              return Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$${currentRange.start.round()}',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '\$${currentRange.end.round()}',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  RangeSlider(
                    values: currentRange,
                    min: 0,
                    max: 5000,
                    divisions: 100,
                    activeColor: const Color(0xFFFF7043),
                    inactiveColor: Colors.grey[300],
                    labels: RangeLabels(
                      '\$${currentRange.start.round()}',
                      '\$${currentRange.end.round()}',
                    ),
                    onChanged: (RangeValues values) {
                      setState(() {
                        currentRange = values;
                      });
                    },
                  ),
                ],
              );
            },
          ),
          SizedBox(height: 24.h),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                controller.applyPriceFilter(
                  currentRange.start,
                  currentRange.end,
                );
                Get.back();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFFF7043),
                padding: EdgeInsets.symmetric(vertical: 16.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
              child: const Text(
                'Apply Filter',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
          SizedBox(height: 16.h),
        ],
      ),
    ),);
  }
}
