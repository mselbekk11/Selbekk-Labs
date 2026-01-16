import { ContactFormEmail } from "@/app/components/email-template-two";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, project, services, budget } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "morgan@selbekk.dev",
      to: ["mselbekk11@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactFormEmail({ name, email, project, services, budget }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
