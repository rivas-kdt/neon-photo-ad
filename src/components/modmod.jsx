"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import UploadModal from "./uploadModal";

async function uploadPhoto(formData, albumId) {
  try {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('_vercel_jwt='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    if (!token) {
      throw new Error("No token found in cookies");
    }
    console.log(token)
    const response = await fetch(`/api/albums/${albumId}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      throw new Error("Failed to upload photo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
}

const ModMod = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [album, setAlbum] = useState({ photos: [] });
  const handleUpload = async (formData) => {
    try {
      const uploadedPhoto = await uploadPhoto(formData, id);
      setAlbum((prev) => ({
        ...prev,
        photos: [...prev.photos, uploadedPhoto],
      }));
    } catch (error) {
      alert("Error uploading photo");
    }
  };
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <Upload className=" h-4 w-4" />
      </Button>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

export default ModMod;
