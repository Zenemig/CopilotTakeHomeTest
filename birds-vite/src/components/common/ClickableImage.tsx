import { Expand } from "lucide-react";
import { WatermarkedImage } from "./WatermarkedImage";

import type { Bird } from "../../types";
import { ImageModal } from "./ImageModal";
import { useState } from "react";

interface ClickableImageProps {
  imageLoaded: boolean;
  setImageLoaded: (value: boolean) => void;
  bird: Bird;
}

export const ClickableImage = ({ imageLoaded, setImageLoaded, bird }: ClickableImageProps) => {
  const [viewFullImage, setViewFullImage] = useState(false);

  return (
    <>
      <div
        className={`relative w-full max-w-80 aspect-[7/4] group overflow-hidden ${imageLoaded ? 'cursor-pointer' : ''}`}
        onClick={() => setViewFullImage(true)}
      >
        {imageLoaded ? (
          <div className="absolute inset-0 rounded-lg bg-black/20 transition-all duration-300 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
            <Expand className="w-6 h-6 text-white transform transition-transform duration-300 ease-in-out scale-75 group-hover:scale-100" />
            <span className="text-white text-sm font-medium transform transition-all duration-300 ease-in-out translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100">View full image</span>
          </div>
        ) : null}
        <WatermarkedImage
          src={bird.image_url}
          alt={bird.english_name}
          className="w-full aspect-[7/4] object-cover rounded-lg"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <ImageModal
        isOpen={viewFullImage}
        onClose={() => setViewFullImage(false)}
        imageUrl={bird.image_url}
        alt={bird.english_name}
      />
    </>
  );
};