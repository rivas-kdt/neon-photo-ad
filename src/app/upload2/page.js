"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin } from "lucide-react";

export default function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a photo to upload.",
        variant: "destructive",
      });
    }

    toast({
      title: "Uploading...",
      description: "Your photo is being uploaded.",
    });

    const file = selectedFile;
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = await response.json();
    setBlob(newBlob);

    toast({
      title: "Success",
      description: "Your photo has been uploaded successfully!",
    });

    router.push("/");
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Photo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Button type="button" onClick={handleSelectFile} className="mt-4">
            Select Photo
          </Button>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
              placeholder="Add location (optional)"
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Upload Photo
        </Button>
      </form>
    </div>
  );
}
