import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";

// This would typically come from a database or API
const getAlbum = async (id) => {
  const albums = {
    1: {
      id: "1",
      title: "Summer Vacation 2023",
      photos: [
        {
          id: "1",
          src: "/placeholder.webp",
          alt: "Beach sunset",
          date: "2023-07-15",
          location: "Malibu, CA",
        },
        {
          id: "2",
          src: "/placeholder.webp",
          alt: "Mountain hike",
          date: "2023-07-16",
          location: "Yosemite, CA",
        },
        {
          id: "3",
          src: "/placeholder.webp",
          alt: "City skyline",
          date: "2023-07-17",
          location: "San Francisco, CA",
        },
      ],
    },
    2: { id: "2", title: "City Tour", photos: [] },
    3: { id: "3", title: "Romantic Date Night", photos: [] },
  };
  return albums[id] || null;
};

export default async function AlbumPage({ params }) {
  const id = (await params).id
  const album = await getAlbum(id);

  if (!album) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className=" h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{album.title}</h1>
        <Button>
          <Upload className=" h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {album.photos.map((photo) => (
          <Link href={`/photo/${photo.id}`} key={photo.id}>
            <div className="relative group">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-md transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm">{photo.date}</p>
                <p className="text-xs">{photo.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
