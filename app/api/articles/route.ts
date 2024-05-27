import { NextResponse } from "next/server";

const getData = async () => {
  const res = await fetch("http://localhost:4000/articles");
  const data = await res.json();
  return data;
};

export async function GET(req: Request) {
  const data = await getData();
  return NextResponse.json({
    message: "Data fetched successfully",
    data,
  });
}

export async function POST(req: Request) {
  const { titre, contenu, auteur } = await req.json();
  if (!titre || !contenu || !auteur)
    return NextResponse.json({ message: "please provide all fields" });
  const article = {
    id: Math.floor(Math.random() * 1000).toString(),
    titre,
    contenu,
    auteur,
    date: new Date(),
  };

  await fetch("http://localhost:4000/articles", {
    method: "POST",
    body: JSON.stringify(article),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({
    message: "article created",
    data: article,
  });
}
