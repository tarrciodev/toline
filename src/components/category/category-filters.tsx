import { getCategories } from "@/actions/categories/get-categories";
import { CategoryItem } from "./category-item";

export async function CategoryFilters({ slug }: { slug: string }) {
    const categories = await getCategories();
    return (
        <div className='flex flex-col gap-1'>
            {categories.map((category) => {
                const parseCategory = {
                    name: category.name,
                    slug: category.slug,
                };
                return (
                    <CategoryItem
                        key={category.id}
                        currentSlug={slug}
                        category={parseCategory}
                    />
                );
            })}
        </div>
    );
}
