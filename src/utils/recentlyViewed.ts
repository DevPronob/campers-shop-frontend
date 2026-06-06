
export const addToRecentlyViewed = (product: any) => {
  const existing = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
  const filtered = existing.filter((item: any) => item.id !== product.id);
  const updated = [product, ...filtered];
  localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(updated.slice(0, 6))
  );
};