import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


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
      <SignedIn>
        <div className="homepage__content">
          <div className="fixed top-4 right-4 z-50  shadow-md p-2 hover:shadow-lg transition-shadow duration-300">
    <UserButton afterSignOutUrl="/" />
  </div>
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
      </SignedIn>
      <SignedOut>
  <div className="p-50">
    <div className="bg-gray-200 rounded-2xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center transform hover:scale-105 transition-transform duration-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
        Welcome to Recipe Viewer 🍳
      </h1>
      <p className="text-lg text-gray-600 mb-8 font-medium">
         Unlock Tasty Recipes: Sign In or Join Now
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SignInButton>
          <button className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-300">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    </div>
  </div>
</SignedOut>
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