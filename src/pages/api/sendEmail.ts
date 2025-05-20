// src/pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, pn, subject, message } = req.body;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS env vars");
    return res
      .status(500)
      .json({ success: false, message: "Email credentials not configured." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "aspasoftwaredevelopment@gmail.com",
      subject,
      text: `Phone Number: ${pn}\n\n${message}`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error sending email" });
  }
}
