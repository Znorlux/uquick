import { Loader2, Plus, Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SelectedImages from "./SelectedImages";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imagePromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result?.toString() || "");
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prev) => [...prev, ...base64Strings]);
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  return (
    <>
      {images.length > 0 && (
        <SelectedImages images={images} setImages={setImages} />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, { data: { images: JSON.stringify(images) } });
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-500" />
        </button>

        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          onChange={handleImageSelection}
          className="hidden"
        />

        <div className="flex-grow relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={
              isLoading ? "Generando respuesta..." : "Escribe un mensaje..."
            }
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none disabled:bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading && !input.trim()}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors disabled:bg-gray-300"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" onClick={stop} />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </>
  );
};
export default InputForm;
