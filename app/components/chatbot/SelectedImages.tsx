import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
};

const SelectedImages = ({ images, setImages }: Props) => {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto py-2">
      {images.map((img, idx) => (
        <div key={idx} className="relative group">
          <Image
            src={img}
            alt=""
            width={60}
            height={60}
            className="rounded-lg shadow-md object-cover w-15 h-15 transition-transform group-hover:scale-105"
          />
          <button
            onClick={() => setImages(images.filter((_, i) => i !== idx))}
            className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedImages;
