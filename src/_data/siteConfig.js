import { fetchCollection } from "./lib/pocketbase.js";

export default async function () {
  const results = await fetchCollection("site_config", "?perPage=1");
  return results[0] ?? {};
}
