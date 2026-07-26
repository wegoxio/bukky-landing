import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  renderCustomerContactEmail,
  renderCustomerContactText,
  renderInternalContactEmail,
  renderInternalContactText,
  type ContactEmailRequest,
} from "@/lib/email/contact-email-templates";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";

const supportEmail =
  process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || "support@wegox.io";
const fromEmail =
  process.env.RESEND_FROM_EMAIL?.trim() || "Bukky <support@wegox.io>";
const replyToEmail = process.env.CONTACT_REPLY_TO_EMAIL?.trim() || supportEmail;
const whatsappUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ||
  "https://wa.me/34635693747";
const configuredAppUrl =
  process.env.APP_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();

const fieldLimits = {
  name: 90,
  email: 140,
  businessName: 120,
  phone: 42,
  businessType: 90,
  teamSize: 80,
  message: 1500,
  sourceUrl: 500,
};

type ContactBody = Record<string, unknown>;

function isRecord(value: unknown): value is ContactBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  body: ContactBody,
  key: keyof typeof fieldLimits | "locale" | "company",
) {
  const value = body[key];

  if (typeof value !== "string") {
    return "";
  }

  const limit =
    key in fieldLimits
      ? fieldLimits[key as keyof typeof fieldLimits]
      : key === "company"
        ? 120
        : 8;

  return value.trim().slice(0, limit);
}

function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRequestOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (origin) {
    return origin;
  }

  return new URL(request.url).origin;
}

function getPublicAssetUrl(path: string, request: Request) {
  if (configuredAppUrl) {
    try {
      return new URL(path, configuredAppUrl).toString();
    } catch {
      console.warn("Invalid APP_URL for contact email assets.");
    }
  }

  return new URL(path, getRequestOrigin(request)).toString();
}

function normalizeContactRequest(
  body: ContactBody,
  request: Request,
): ContactEmailRequest {
  const localeValue = readString(body, "locale");
  const origin = getRequestOrigin(request);
  const sourceUrl = readString(body, "sourceUrl") || origin;

  return {
    name: readString(body, "name"),
    email: readString(body, "email").toLowerCase(),
    businessName: readString(body, "businessName"),
    phone: readString(body, "phone"),
    businessType: readString(body, "businessType"),
    teamSize: readString(body, "teamSize"),
    message: readString(body, "message"),
    locale: isLocale(localeValue) ? localeValue : "es",
    submittedAt: new Date(),
    sourceUrl,
  };
}

function validateContactRequest(payload: ContactEmailRequest) {
  const errors: Record<string, string> = {};

  if (payload.name.length < 2) {
    errors.name = "invalid";
  }

  if (!isValidEmail(payload.email)) {
    errors.email = "invalid";
  }

  if (payload.businessName.length < 2) {
    errors.businessName = "invalid";
  }

  if (payload.businessType.length < 2) {
    errors.businessType = "invalid";
  }

  if (payload.message.length < 12) {
    errors.message = "invalid";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "invalid_json" } },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { ok: false, errors: { form: "invalid_payload" } },
      { status: 400 },
    );
  }

  if (readString(body, "company")) {
    return NextResponse.json({ ok: true });
  }

  const payload = normalizeContactRequest(body, request);
  const errors = validateContactRequest(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY for contact form.");

    return NextResponse.json(
      { ok: false, errors: { form: "email_service_unavailable" } },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const logoUrl = getPublicAssetUrl("/bukky_logo_completo.svg", request);
  const emailIconUrl = getPublicAssetUrl("/email/icon-mail-dark.svg", request);
  const whatsappIconUrl = getPublicAssetUrl(
    "/email/whatsapp-icon.png",
    request,
  );
  const requestId = crypto.randomUUID();
  const customerEmail = renderCustomerContactEmail(payload, {
    logoUrl,
    emailIconUrl,
    whatsappIconUrl,
    supportEmail,
    whatsappUrl,
  });
  const internalEmail = renderInternalContactEmail(payload, {
    logoUrl,
    emailIconUrl,
    whatsappIconUrl,
    supportEmail,
    whatsappUrl,
  });

  try {
    const [customerResult, internalResult] = await Promise.all([
      resend.emails.send(
        {
          from: fromEmail,
          to: payload.email,
          replyTo: replyToEmail,
          subject: customerEmail.subject,
          html: customerEmail.html,
          text: renderCustomerContactText(payload),
          tags: [
            { name: "source", value: "contact_form" },
            { name: "locale", value: payload.locale },
          ],
        },
        { idempotencyKey: `contact-client-${requestId}` },
      ),
      resend.emails.send(
        {
          from: fromEmail,
          to: supportEmail,
          replyTo: payload.email,
          subject: internalEmail.subject,
          html: internalEmail.html,
          text: renderInternalContactText(payload),
          tags: [
            { name: "source", value: "contact_form" },
            { name: "locale", value: payload.locale },
          ],
        },
        { idempotencyKey: `contact-internal-${requestId}` },
      ),
    ]);

    const emailError = customerResult.error || internalResult.error;

    if (emailError) {
      throw new Error(emailError.message);
    }

    return NextResponse.json({
      ok: true,
      ids: {
        customer: customerResult.data?.id,
        internal: internalResult.data?.id,
      },
    });
  } catch (error) {
    console.error("Contact email failed", error);

    return NextResponse.json(
      { ok: false, errors: { form: "email_send_failed" } },
      { status: 502 },
    );
  }
}
