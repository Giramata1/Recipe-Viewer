import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  slug: string;
  title: string;
  image: string;
  ingredients: string[];
  steps: string[];
  sizes?: {
    name: string;
    price: string;
  }[];
}

interface Props {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {
  
  const sizes = recipe.sizes || [
    { name: "SMALL", price: "9$" },
    { name: "MEDIUM", price: "13$" },
    { name: "LARGE", price: "17$" }
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen p-4 md:p-8"
    >
      <div className="border-0 rounded-lg p-6 md:p-8 max-w-3xl w-full shadow-xl relative backdrop-blur-sm">
        
        <div className="relative mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center uppercase">
            {recipe.title}
          </h1>
        </div>

        {/* Recipe Image */}
        <div className="relative mb-8 mx-auto w-4/5">
          <div className="rounded-full overflow-hidden aspect-square bg-gray-200">
            <Image
              src={`/images/${recipe.image}`}
              alt={recipe.title}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Ingredients & Sizes */}
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 uppercase mb-3 border-b border-gray-400 pb-1">
              Ingredients
            </h2>
            <ul className="text-gray-900 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">-</span>
                  <span className="font-medium uppercase">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 uppercase mb-3 border-b border-gray-400 pb-1">
              Sizes
            </h2>
            <ul className="text-gray-900 space-y-1">
              {sizes.map((size, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="font-medium">-{size.name}</span>
                  <span className="font-medium">{size.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase mb-3 border-b border-gray-400 pb-1">
            Preparation Steps
          </h2>
          <ol className="text-gray-900 list-decimal pl-5 space-y-2">
            {recipe.steps.map((step, index) => (
              <li key={index} className="font-medium">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-900 font-bold hover:text-gray-700 transition"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params.slug);

  return {
    props: {
      recipe
    }
  };
}
