import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";

export interface VenueImages {
  hero?: string;
  gallery: string[];
}

const venuePath = path.join(process.cwd(), ".data", "venue-images.json");
const emptyVenue: VenueImages = { gallery: [] };

export async function getVenueImages(): Promise<VenueImages> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const result = await list({ prefix: "venue-images.json", limit: 1 });
      const blob = result.blobs[0];
      if (!blob) return emptyVenue;
      return (await fetch(blob.url, { cache: "no-store" }).then((response) => response.json())) as VenueImages;
    }
    return { ...emptyVenue, ...(JSON.parse(await fs.readFile(venuePath, "utf8")) as VenueImages) };
  } catch {
    return emptyVenue;
  }
}

export async function saveVenueImages(images: VenueImages) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put("venue-images.json", JSON.stringify(images, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }
  await fs.mkdir(path.dirname(venuePath), { recursive: true });
  await fs.writeFile(venuePath, JSON.stringify(images, null, 2), "utf8");
}