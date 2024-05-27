import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export const revalidate = 0;

async function getData(id: number) {
  const res = await fetch(`http://localhost:4000/articles/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// meta data
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const article = await getData(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.titre,
    description: article.contenu,
    authors: [
      {
        name: article.auteur,
      },
    ],
    openGraph: {
      images: [article.lienImage, ...previousImages],
    },
  };
}

export default async function page({ params }: Props) {
  const data = await getData(params.id);

  return (
    <div className="container">
      <h1 className="titre">{data.titre}</h1>
      <p>{data.contenu}</p>
    </div>
  );
}
