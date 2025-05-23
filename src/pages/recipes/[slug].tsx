import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
    { name: "LARGE", price: "17$" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SignedIn>
        <div className="homepage__content">
          <div className="fixed top-4 right-4 z-50  shadow-md p-2 hover:shadow-lg transition-shadow duration-300">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className="flex justify-center items-center flex-1 p-4 md:p-8">
          <div className="border-0 rounded-lg p-6 md:p-8 max-w-3xl w-full shadow-xl relative backdrop-blur-sm">
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center uppercase">
                {recipe.title}
              </h1>
            </div>
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
            <div className="flex flex-col md:flex-row gap-8 mt-12">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 uppercase mb-3 border-b border-gray-400 pb-1">
                  Ingredients
                </h2>
                <ul className="text-gray-900 space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">-</span>
                      <span className="font-medium uppercase">
                        {ingredient}
                      </span>
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
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">-{size.name}</span>
                      <span className="font-medium">{size.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="mb-4">You need to be signed in to view this recipe.</p>
          <SignInButton>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
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
      recipe,
    },
  };
}
