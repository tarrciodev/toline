import { getCategories } from "@/actions/categories/get-categories";
import { MobileProjectCategoryFilter } from "../mobile/dash/project-category-filter";
import { CategoryItem } from "./category-item";

export async function CategoryFilters({ slug }: { slug: string }) {
    const categories = await getCategories();
    return (
        <div>
            <div className='hidden sm:flex flex-col'>
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
            <MobileProjectCategoryFilter categories={categories} />
        </div>
    );
}
