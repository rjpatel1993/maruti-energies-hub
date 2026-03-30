import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageUploader({ value, onChange, bucket = "site-images", folder = "uploads", className = "", aspectRatio = "16/9" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Only image files are allowed", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
    toast({ title: "Image uploaded!" });
  }, [bucket, folder, onChange, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  return (
    <div className={className}>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img src={value} alt="" className="w-full object-cover" style={{ aspectRatio }} />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button onClick={() => fileRef.current?.click()} className="bg-white text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
              Replace
            </button>
            <button onClick={() => onChange("")} className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
              <X size={14} />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors py-8 ${
            dragOver ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
          }`}
          style={{ aspectRatio }}
        >
          {uploading ? (
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                {dragOver ? <Upload size={18} className="text-accent" /> : <ImageIcon size={18} className="text-muted-foreground" />}
              </div>
              <p className="text-xs text-muted-foreground font-medium">Drop image or click to upload</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
