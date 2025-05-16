import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface Recipe {
  slug: string;
  title: string;
  image: string;
}

interface Props {
  recipes: Recipe[];
}

export default function HomePage({ recipes }: Props) {
  return (
    <main className="homepage">
      <div className="homepage__content">
        <h1 className="homepage__title">🍽️ Recipe Viewer</h1>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="recipe-card">
              <div className="recipe-card__image-wrapper">
                <Image
                  src={`/images/${recipe.image}`}
                  alt={recipe.title}
                  fill
                  className="recipe-card__image"
                />
              </div>
              <div className="recipe-card__info">
                <h2 className="recipe-card__title">{recipe.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes = JSON.parse(jsonData);

  return {
    props: {
      recipes,
    },
  };
}
