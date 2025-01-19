import RecentPhotos from "@/components/RecentPhotos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Album, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Adv</h1>
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Photos</h2>
          <Link href="/camera">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Capture
            </Button>
          </Link>
        </div>
        <RecentPhotos />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Albums</h2>
          <Link href="/albums/create">
            <Button variant="outline">
              <Album className="mr-2 h-4 w-4" /> Create Album
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <Link href={`/albums/${id}`} key={id}>
              <Card>
                <CardContent className="p-4">
                  <Image
                    src={`/placeholder.webp`}
                    alt={`Album ${id}`}
                    width={150}
                    height={150}
                    className="w-full object-cover rounded-md mb-2 h-32"
                  />
                  <h3 className="font-semibold">Album {id}</h3>
                  <p className="text-sm text-gray-500">12 photos</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
