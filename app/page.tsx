import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours Nextjs | Acceuil",
  description: "Cours Nextjs",
};

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/articles", {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data;
};

type Article = {
  id: number;
  titre: string;
  contenu: string;
  auteur: string;
  date: string;
  user_id: number;
  lienImage: string;
};

export default async function Home() {
  const { data: articles } = await getData();

  return (
    <main className="p-40">
      <h2 className="text-purple-400">Hello les gens !</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore veniam
        reprehenderit iste dolores animi consequuntur ab mollitia voluptatum est
        odio? Doloribus, nisi animi praesentium numquam rerum quae harum nihil
        sapiente.
      </p>
      <Link href="/connexion">Connectez vous</Link>
      <Button />

      <div className="flex gap-4 flex-wrap justify-center">
        {articles.map((article: Article) => (
          <div className="card w-96 bg-base-100 shadow-xl rounded-none">
            <figure>
              <img src={article.lienImage} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{article.titre}</h2>
              <div className="card-actions justify-end">
                <Link
                  href={`/articles/${article.id}`}
                  className="btn btn-primary"
                >
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/articles/create" className="btn btn-secondary mt-5">
        ajouter
      </Link>
    </main>
  );
}
