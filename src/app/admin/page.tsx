"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LogOut, Save, Upload, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import type { MenuCategory } from "@/data/menu";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [venueImages, setVenueImages] = useState<{ hero?: string; gallery: string[] }>({ gallery: [] });
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [itemPreviews, setItemPreviews] = useState<Record<string, string | null>>({});
  const [itemUploading, setItemUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then(({ authenticated: value }) => {
        setAuthenticated(value);
        if (value) loadMenu();
        if (value) loadVenueImages();
      });
  }, []);

  async function loadMenu() {
    const response = await fetch("/api/admin/menu");
    if (response.ok) setCategories(await response.json());
  }

  async function loadVenueImages() {
    const response = await fetch("/api/venue-images", { cache: "no-store" });
    if (response.ok) setVenueImages(await response.json());
  }

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setMessage("Şifrə yanlışdır");
      return;
    }
    setAuthenticated(true);
    setPassword("");
    await loadMenu();
  }

  function updateItem(categoryIndex: number, itemIndex: number, field: "name" | "price" | "image", value: string) {
    setCategories((current) => current.map((category, index) => index !== categoryIndex ? category : {
      ...category,
      items: category.items.map((item, index) => index !== itemIndex ? item : {
        ...item,
        [field]: field === "price" ? Number(value) : value,
      }),
    }));
  }

  async function compressImage(file: File): Promise<File> {
    return await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/webp",
    });
  }

  async function uploadVenueImage(type: "hero" | "gallery", file: File) {
    if (type === "hero") {
      setHeroUploading(true);
      setHeroPreview(URL.createObjectURL(file));
    }

    try {
      setMessage("Şəkil hazırlanır...");
      const compressedFile = await compressImage(file);
      setMessage("Yüklənir...");

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("type", type);
      if (type === "hero" && venueImages.hero) {
        formData.append("oldUrl", venueImages.hero);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Yükləmə zamanı xəta baş verdi");
      }

      if (type === "hero") {
        setVenueImages((current) => ({ ...current, hero: result.url }));
        setHeroPreview(null);
        setMessage("✓ Hero şəkli uğurla yükləndi");
      } else {
        setVenueImages((current) => ({ ...current, gallery: [...current.gallery, result.url] }));
        setMessage("✓ Qalereya şəkli uğurla yükləndi");
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setHeroPreview(null);
      setMessage(error instanceof Error ? error.message : "Yükləmə zamanı xəta baş verdi, yenidən cəhd edin");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setHeroUploading(false);
    }
  }

  async function uploadItemImage(categoryIndex: number, itemIndex: number, file: File) {
    const itemKey = `${categoryIndex}-${itemIndex}`;
    setItemUploading((prev) => ({ ...prev, [itemKey]: true }));
    setItemPreviews((prev) => ({ ...prev, [itemKey]: URL.createObjectURL(file) }));

    try {
      setMessage("Şəkil hazırlanır...");
      const compressedFile = await compressImage(file);
      setMessage("Yüklənir...");

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("type", "menu-item");
      const oldUrl = categories[categoryIndex].items[itemIndex].image;
      if (oldUrl) {
        formData.append("oldUrl", oldUrl);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Yükləmə zamanı xəta baş verdi");
      }

      const updatedCategories = categories.map((category, catIndex) =>
        catIndex !== categoryIndex
          ? category
          : {
              ...category,
              items: category.items.map((item, itmIndex) =>
                itmIndex !== itemIndex ? item : { ...item, image: result.url }
              ),
            }
      );

      setCategories(updatedCategories);
      setItemPreviews((prev) => ({ ...prev, [itemKey]: result.url }));
      setMessage("✓ Şəkil uğurla yükləndi");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setItemPreviews((prev) => ({ ...prev, [itemKey]: null }));
      setMessage(error instanceof Error ? error.message : "Yükləmə zamanı xəta baş verdi, yenidən cəhd edin");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setItemUploading((prev) => ({ ...prev, [itemKey]: false }));
    }
  }

  async function save(nextCategories = categories): Promise<boolean> {
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextCategories),
    });
    const result = await response.json().catch(() => null);
    setSaving(false);
    if (!response.ok) {
      setMessage(result?.error ?? "Yadda saxlamaq alınmadı");
      return false;
    }
    if (Array.isArray(result)) setCategories(result);
    setMessage("Dəyişikliklər yadda saxlanıldı");
    return true;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setCategories([]);
  }

  const visibleCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categories;
    return categories
      .map((category) => ({ ...category, items: category.items.filter((item) => item.name.toLowerCase().includes(query)) }))
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery]);

  if (authenticated === null) return <main className="grid min-h-screen place-items-center bg-[#f4efe5] text-[#33261f] dark:bg-dark-bg dark:text-dark-text">Yüklənir...</main>;
  if (!authenticated) return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe5] px-4 text-[#33261f] dark:bg-dark-bg dark:text-dark-text">
      <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-[#d9cbbb] bg-white p-7 shadow-xl dark:border-dark-border dark:bg-dark-card">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9a6b3f] dark:text-gold">Kitab Evin</p>
        <h1 className="mb-6 font-display text-3xl font-bold">Admin giriş</h1>
        <label className="mb-2 block text-sm font-semibold" htmlFor="password">Admin şifrəsi</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mb-4 w-full rounded-lg border border-[#d9cbbb] px-3 py-3 outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:bg-dark-bg dark:text-dark-text" autoFocus />
        <button className="w-full rounded-lg bg-[#3f3026] px-4 py-3 font-semibold text-white dark:bg-gold dark:text-dark-bg">Daxil ol</button>
        {message && <p className="mt-3 text-sm text-red-700">{message}</p>}
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 py-6 text-[#33261f] dark:bg-dark-bg dark:text-dark-text sm:px-8">
      <header className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6b3f] dark:text-gold">Kitab Evin</p><h1 className="font-display text-3xl font-bold">Menyu idarəetməsi</h1></div>
        <div className="flex flex-wrap gap-2"><button onClick={() => save()} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#3f3026] px-4 py-2 text-sm font-semibold text-white dark:bg-gold dark:text-dark-bg"><Save size={16} />{saving ? "Yadda saxlanır" : "Yadda saxla"}</button><a href="/" className="rounded-lg border border-[#cbb9a6] px-4 py-2 text-sm font-semibold dark:border-dark-border dark:text-dark-text">Menüyə bax</a><button onClick={logout} className="flex items-center gap-2 rounded-lg border border-[#cbb9a6] px-4 py-2 text-sm font-semibold dark:border-dark-border dark:text-dark-text"><LogOut size={16} />Çıxış</button></div>
      </header>
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl border border-[#d9cbbb] bg-[#fffaf3] p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
          <h2 className="mb-4 font-display text-2xl font-bold">Məkan şəkilləri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-dashed border-[#cbb9a6] p-4 dark:border-dark-border">
              <p className="mb-3 text-sm font-semibold">Hero fon şəkli</p>
              {(heroPreview || venueImages.hero) && (
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg">
                  <Image src={heroPreview || venueImages.hero!} alt="Hero" fill sizes="500px" className="object-cover" unoptimized />
                </div>
              )}
              <label className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${heroUploading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#3f3026] text-white dark:bg-gold dark:text-dark-bg"}`}>
                {heroUploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                {heroUploading ? "Yüklənir..." : "Şəkli dəyiş"}
                <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" disabled={heroUploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadVenueImage("hero", file); }} />
              </label>
              <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBP, GIF dəstəklənir</p>
            </div>
            <div className="rounded-xl border border-dashed border-[#cbb9a6] p-4 dark:border-dark-border">
              <p className="mb-3 text-sm font-semibold">Qalereya şəkilləri</p>
              <div className="mb-3 grid grid-cols-4 gap-2">{venueImages.gallery.map((image) => <div key={image} className="relative aspect-square overflow-hidden rounded-md"><Image src={image} alt="Məkan" fill sizes="120px" className="object-cover" unoptimized /></div>)}</div>
              <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#cbb9a6] px-4 py-2 text-sm font-semibold dark:border-dark-border dark:text-dark-text"><Upload size={15} />Şəkil əlavə et<input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadVenueImage("gallery", file); }} /></label>
            </div>
          </div>
        </section>
        <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Məhsul axtar..." className="w-full rounded-xl border border-[#d9cbbb] bg-white px-4 py-3 outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:bg-dark-card dark:text-dark-text" />
        {visibleCategories.map((category) => {
          const categoryIndex = categories.findIndex((item) => item.id === category.id);
          return (
          <section key={category.id} className="rounded-2xl border border-[#d9cbbb] bg-white p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
            <input value={category.title} onChange={(event) => setCategories((current) => current.map((item, index) => index === categoryIndex ? { ...item, title: event.target.value } : item))} className="mb-4 w-full border-b border-[#d9cbbb] bg-transparent pb-2 font-display text-2xl font-bold outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:text-dark-text" />
            <div className="grid gap-3 lg:grid-cols-2">
              {category.items.map((item) => {
                const itemIndex = categories[categoryIndex].items.findIndex((currentItem) => currentItem.name === item.name);
                const itemKey = `${categoryIndex}-${itemIndex}`;
                const isUploading = itemUploading[itemKey];
                const previewUrl = itemPreviews[itemKey] || item.image;
                return (
                <div key={`${category.id}-${itemIndex}`} className="grid gap-2 rounded-xl border border-[#eadfd2] p-3 sm:grid-cols-[1fr_110px] dark:border-dark-border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-[#f4efe5] dark:bg-dark-bg">
                        <Image src={previewUrl || "/logo.png"} alt="" fill sizes="64px" unoptimized className="object-cover" />
                      </div>
                      <input value={item.name} onChange={(event) => updateItem(categoryIndex, itemIndex, "name", event.target.value)} className="w-full rounded-md border border-[#d9cbbb] px-3 py-2 text-sm font-semibold outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:bg-dark-bg dark:text-dark-text" />
                    </div>
                    <input value={item.image ?? ""} onChange={(event) => updateItem(categoryIndex, itemIndex, "image", event.target.value)} placeholder="Şəkil yolu və ya URL" className="w-full rounded-md border border-[#d9cbbb] px-3 py-2 text-xs outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:bg-dark-bg dark:text-dark-text" />
                    <label className={`flex w-fit cursor-pointer items-center gap-2 text-xs font-semibold ${isUploading ? "text-gray-400 cursor-not-allowed" : "text-[#9a6b3f] dark:text-gold"}`}>
                      {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {isUploading ? "Yüklənir..." : "Şəkli dəyiş"}
                      <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" disabled={isUploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadItemImage(categoryIndex, itemIndex, file); }} />
                    </label>
                  </div>
                  <label className="text-xs font-semibold text-[#765b49] dark:text-dark-text-muted">Qiymət (AZN)<input type="number" min="0" step="0.1" value={item.price} onChange={(event) => updateItem(categoryIndex, itemIndex, "price", event.target.value)} className="mt-2 w-full rounded-md border border-[#d9cbbb] px-3 py-2 text-sm outline-none focus:border-[#9a6b3f] dark:border-dark-border dark:bg-dark-bg dark:text-dark-text" /></label>
                </div>
                );
              })}
            </div>
          </section>
          );
        })}
      </div>
      {message && <p className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#3f3026] px-5 py-3 text-sm font-semibold text-white shadow-lg dark:bg-gold dark:text-dark-bg">{message}</p>}
    </main>
  );
}
