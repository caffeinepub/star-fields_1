import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';

interface NakshatraImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageData: Uint8Array | null) => void;
  onError?: (error: string) => void;
}

export default function NakshatraImageUpload({
  currentImageUrl,
  onImageChange,
  onError,
}: NakshatraImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAspectRatio = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetRatio = 4 / 5;
        const tolerance = 0.05;
        const isValid = Math.abs(aspectRatio - targetRatio) < tolerance;
        
        if (!isValid && onError) {
          onError(`Image aspect ratio should be 4:5 (0.8). Current ratio: ${aspectRatio.toFixed(2)}`);
        }
        
        resolve(isValid);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError?.('Please select an image file');
      return;
    }

    const isValidRatio = await validateAspectRatio(file);
    if (!isValidRatio) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Convert file to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create preview URL
      const previewBlobUrl = URL.createObjectURL(file);
      
      setUploadProgress(100);
      clearInterval(progressInterval);
      setPreviewUrl(previewBlobUrl);
      onImageChange(uint8Array);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      onError?.('Failed to process image file');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label>Nakshatra Image (4:5 aspect ratio)</Label>
      
      {previewUrl ? (
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-sm rounded-lg overflow-hidden border border-border">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      ) : (
        <div
          className="aspect-[4/5] w-full max-w-sm rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center bg-accent/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center p-6">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Click to upload image
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended: 4:5 aspect ratio (e.g., 800x1000px)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isUploading}
      />

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} />
          <p className="text-xs text-muted-foreground text-center">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
