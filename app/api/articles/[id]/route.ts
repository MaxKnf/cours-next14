import { NextResponse } from "next/server";

type RouteParams = {
  params: {
    id: string;
  };
};

//GET
const getOneArticle = async (id: string) => {
  const res = await fetch(`http://localhost:4000/articles/${id}`);
  const data = await res.json();
  return data;
};

export async function GET(req: Request, { params }: RouteParams) {
  const data = await getOneArticle(params.id);
  if (Object.keys(data).length === 0) {
    return NextResponse.error();
  }
  return NextResponse.json({
    message: "Data fetched successfully",
    data,
  });
}

//PUT

export async function PUT(req: Request, { params }: RouteParams) {
  const { titre, contenu, auteur } = await req.json();

  const article = await getOneArticle(params.id);

  const newArticle = {
    ...article,
    titre: titre || article.titre,
    contenu: contenu || article.contenu,
    auteur: auteur || article.auteur,
  };
  await fetch(`http://localhost:4000/articles/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(newArticle),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return NextResponse.json({
    message: "article updated",
    data: newArticle,
  });
}

//DELETE
export async function DELETE(req: Request, { params }: RouteParams) {
  await fetch(`http://localhost:4000/articles/${params.id}`, {
    method: "DELETE",
  });
  return NextResponse.json({
    message: `article ${params.id} deleted`,
  });
}
