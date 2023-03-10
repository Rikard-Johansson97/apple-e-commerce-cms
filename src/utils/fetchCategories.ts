interface FetchCategoriesOptions {
  baseUrl?: string;
}

const defaultOptions: FetchCategoriesOptions = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
};

const fetchCategories = async (
  options: FetchCategoriesOptions = {}
): Promise<Category[]> => {
  const mergedOptions = { ...defaultOptions, ...options };
  const url = `${mergedOptions.baseUrl}/api/getCategories`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.categories;
};

export default fetchCategories;
