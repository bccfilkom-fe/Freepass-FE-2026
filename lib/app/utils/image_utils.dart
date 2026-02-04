class ImageUtils {
  static String getValidImageUrl(String? url) {
    if (url == null || url.isEmpty) return 'https://via.placeholder.com/300';
    String cleanUrl = url.trim(); // Remove leading/trailing whitespace
    if (cleanUrl.startsWith('[')) {
      cleanUrl = cleanUrl.replaceAll(RegExp(r'[\[\]"]'), '');
    }
    
    // Validate URI formatting
    final uri = Uri.tryParse(cleanUrl);
    if (uri == null || !uri.hasAbsolutePath) {
       return 'https://via.placeholder.com/300';
    }

    // Check for Lorem Space and other unreliable image providers
    if (cleanUrl.contains('lorem.space') || cleanUrl.contains('placeimg.com')) {
      return 'https://via.placeholder.com/300';
    }

    // Specific check for pravatar.cc root URL which causes crash
    // The crashing URL is typically "https://pravatar.cc/" or "https://pravatar.cc"
    if (cleanUrl.contains('pravatar.cc')) {
       // If it doesn't look like a specific image path (no query params like ?img= or ?u=, and path is empty or just /)
       if (uri.path.isEmpty || uri.path == '/') {
          // Check query parameters to be safe
          if (!cleanUrl.contains('?')) {
             return 'https://via.placeholder.com/300';
          }
       }
    }
    
    return cleanUrl;
  }
}
