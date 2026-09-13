import { list, put } from "@vercel/blob";

export interface VenueImages {
  hero?: string;
  gallery: string[];
}

const VENUE_IMAGES_BLOB_KEY = "venue-images.json";
const emptyVenue: VenueImages = { gallery: [] };

export async function getVenueImages(): Promise<VenueImages> {
  try {
    const result = await list({ prefix: VENUE_IMAGES_BLOB_KEY, limit: 1, token: process.env.BLOB_READ_WRITE_TOKEN || undefined });
    const blob = result.blobs[0];
    if (!blob) return emptyVenue;
    const data = await fetch(blob.url, { cache: "no-store" }).then((response) => response.json());
    console.log("Venue images loaded from Blob:", VENUE_IMAGES_BLOB_KEY);
    return data as VenueImages;
  } catch (blobError) {
    console.error("Blob read error:", blobError);
    return emptyVenue;
  }
}

export async function saveVenueImages(images: VenueImages): Promise<void> {
  try {
    await put(VENUE_IMAGES_BLOB_KEY, JSON.stringify(images, null, 2), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      addRandomSuffix: false,
      contentType: "application/json",
      allowOverwrite: true,
    });
    console.log("Venue images saved to Blob:", VENUE_IMAGES_BLOB_KEY);
  } catch (error) {
    console.error("Failed to save venue images to Blob:", error);
    throw new Error(`Failed to save venue images to Blob: ${error instanceof Error ? error.message : String(error)}`);
  }
}