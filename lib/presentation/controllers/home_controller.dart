import 'package:get/get.dart';
import 'dart:async';
import '../../domain/repositories/product_repository.dart';
import '../../data/models/product_model.dart';
import '../../data/models/category_model.dart';

class HomeController extends GetxController {
  final ProductRepository _productRepository;

  HomeController(this._productRepository);

  final RxList<ProductModel> products = <ProductModel>[].obs;
  final RxList<CategoryModel> categories = <CategoryModel>[].obs;
  final RxBool isLoading = true.obs;
  final RxBool isMoreLoading = false.obs;
  final RxInt selectedCategoryIndex = 0.obs;
  
  // Search & Filter
  final RxString searchQuery = ''.obs;
  Timer? _debounce;
  final Rxn<double> minPrice = Rxn<double>();
  final Rxn<double> maxPrice = Rxn<double>();

  // Pagination
  int offset = 0;
  final int limit = 10;

  @override
  void onInit() {
    super.onInit();
    fetchInitialData();
  }

  @override
  void onClose() {
    _debounce?.cancel();
    super.onClose();
  }

  Future<void> fetchInitialData() async {
    try {
      isLoading.value = true;
      final categoryList = await _productRepository.getCategories();
      categories.assignAll([CategoryModel(id: 0, name: 'All', image: ''), ...categoryList]);
      
      await fetchProducts(refresh: true);
    } catch (e) {
      Get.snackbar('Error', 'Failed to load data: $e');
      isLoading.value = false; // Ensure loading is disabled on error
    }
  }

  Future<void> fetchProducts({bool refresh = false}) async {
    if (refresh) {
      offset = 0;
      // Show loading only if not initial load (handled by fetchInitialData)
      // or we can set it true here to cover all refresh cases
      if (!isLoading.value) isLoading.value = true;
    }
    
    try {
      int? categoryId;
      if (selectedCategoryIndex.value > 0 && selectedCategoryIndex.value < categories.length) {
        categoryId = categories[selectedCategoryIndex.value].id;
      }

      final newProducts = await _productRepository.getProducts(
        offset: offset, 
        limit: limit,
        title: searchQuery.value.isEmpty ? null : searchQuery.value,
        priceMin: minPrice.value,
        priceMax: maxPrice.value,
        categoryId: categoryId,
      );

      if (refresh) {
        products.assignAll(newProducts);
      } else {
        products.addAll(newProducts);
      }
      offset += limit;
    } catch (e) {
      print('Error fetching products: $e');
    } finally {
      if (refresh) isLoading.value = false;
    }
  }

  Future<void> loadMore() async {
    if (isMoreLoading.value) return;
    isMoreLoading.value = true;
    await fetchProducts();
    isMoreLoading.value = false;
  }

  void filterByCategory(int index) {
    if (selectedCategoryIndex.value == index) return;
    selectedCategoryIndex.value = index;
    fetchProducts(refresh: true);
  }

  void onSearchChanged(String query) {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      searchQuery.value = query;
      fetchProducts(refresh: true);
    });
  }

  void applyPriceFilter(double? min, double? max) {
    minPrice.value = min;
    maxPrice.value = max;
    fetchProducts(refresh: true);
  }
  
  void resetFilters() {
    minPrice.value = null;
    maxPrice.value = null;
    fetchProducts(refresh: true);
  }
}
