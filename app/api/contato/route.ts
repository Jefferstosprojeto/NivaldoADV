import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/sendContactEmail";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
  consent?: boolean;
  website?: string;
};

const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 200;

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  // Honeypot: real users never see or fill this field. Bots that fill every
  // field will trip it — respond as if successful without sending an email.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

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

  if (body.message && body.message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "Mensagem excede o tamanho máximo permitido." },
      { status: 400 }
    );
  }

  const cappedFields: (keyof ContactBody)[] = ["name", "phone", "email", "area"];
  const oversizedField = cappedFields.find(
    (field) =>
      ((body[field] as string | undefined)?.length ?? 0) > MAX_FIELD_LENGTH
  );
  if (oversizedField) {
    return NextResponse.json(
      { ok: false, error: `Campo excede o tamanho máximo: ${oversizedField}` },
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

  try {
    await sendContactEmail({
      name: body.name!,
      phone: body.phone!,
      email: body.email!,
      area: body.area!,
      message: body.message!,
    });
  } catch (error) {
    console.error(
      "Falha ao enviar e-mail de contato. Lead perdido — siga manualmente:",
      {
        name: body.name,
        phone: body.phone,
        email: body.email,
        area: body.area,
      },
      error
    );
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar a mensagem." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
