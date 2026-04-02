import "dotenv/config";

const PB = process.env.POCKETBASE_URL ?? "http://127.0.0.1:8090";

export async function fetchCollection(collection, params) {
  try {
    const res = await fetch(
      `${PB}/api/collections/${collection}/records${params}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
}

export const pbFileUrl = (collection, recordId, filename) => {
  return `${PB}/api/files/${collection}/${recordId}/${filename}`;
};
