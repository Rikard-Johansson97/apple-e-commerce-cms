interface FetchProductsOptions {
  baseUrl?: string;
}

const defaultOptions: FetchProductsOptions = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
};

const fetchProducts = async (
  options: FetchProductsOptions = {}
): Promise<Category[]> => {
  const mergedOptions = { ...defaultOptions, ...options };
  const url = `${mergedOptions.baseUrl}/api/getProducts`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Products (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.products;
};

export default fetchProducts;
