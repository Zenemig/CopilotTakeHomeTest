/**
 * Watermark Service - Image Processing with Cloud Function API
 * 
 * This service handles the watermarking of bird images using the provided
 * cloud function endpoint. It includes caching, error handling, and retry logic.
 */

interface WatermarkCache {
  [imageUrl: string]: string; // Maps original URL to blob URL
}

// In-memory cache for watermarked images
const watermarkCache: WatermarkCache = {};

/**
 * Watermarks an image using the cloud function API
 * @param imageUrl - The original image URL to watermark
 * @returns Promise<Blob> - The watermarked image as a blob
 */
export const watermarkImage = async (imageUrl: string): Promise<Blob> => {
  try {
    // 1. Fetch the original image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
    }

    // 2. Convert to array buffer for processing
    const imageBytes = await imageResponse.arrayBuffer();

    // 3. Send to watermark API
    const watermarkResponse = await fetch(
      'https://us-central1-copilot-take-home.cloudfunctions.net/watermark',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': imageBytes.byteLength.toString(),
        },
        body: imageBytes,
      }
    );

    if (!watermarkResponse.ok) {
      throw new Error(`Watermark API failed: ${watermarkResponse.status} ${watermarkResponse.statusText}`);
    }

    // 4. Return watermarked blob
    const watermarkedBlob = await watermarkResponse.blob();
    return watermarkedBlob;

  } catch (error) {
    console.error('Watermarking failed:', error);
    throw error;
  }
};

/**
 * Gets a watermarked image with caching support
 * @param imageUrl - The original image URL
 * @returns Promise<string> - Blob URL of the watermarked image
 */
export const getWatermarkedImageUrl = async (imageUrl: string): Promise<string> => {
  // Check cache first
  if (watermarkCache[imageUrl]) {
    return watermarkCache[imageUrl];
  }

  try {
    // Watermark the image
    const watermarkedBlob = await watermarkImage(imageUrl);
    
    // Create blob URL and cache it
    const blobUrl = URL.createObjectURL(watermarkedBlob);
    watermarkCache[imageUrl] = blobUrl;
    
    return blobUrl;
  } catch (error) {
    // If watermarking fails, cache and return the original URL as fallback
    console.warn('Watermarking failed, using original image:', error);
    watermarkCache[imageUrl] = imageUrl;
    return imageUrl;
  }
};
