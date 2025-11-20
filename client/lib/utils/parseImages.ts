export const parseImages = (images: string | null | undefined): string[] => {
  if (!images) return [];
  try {
    return JSON.parse(images);
  } catch {
    return [];
  }
};
