import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/sendContactEmail";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactBody;

  const requiredFields: (keyof ContactBody)[] = [
    "name",
    "phone",
    "email",
    "area",
    "message",
  ];
  const missingField = requiredFields.find((field) => !body[field]);

  if (missingField) {
    return NextResponse.json(
      { ok: false, error: `Campo obrigatório ausente: ${missingField}` },
      { status: 400 }
    );
  }

  if (!body.consent) {
    return NextResponse.json(
      {
        ok: false,
        error: "É necessário aceitar a Política de Privacidade.",
      },
      { status: 400 }
    );
  }

  await sendContactEmail({
    name: body.name!,
    phone: body.phone!,
    email: body.email!,
    area: body.area!,
    message: body.message!,
  });

  return NextResponse.json({ ok: true });
}
