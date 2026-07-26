import type { Locale } from "@/lib/i18n";

export type ContactEmailRequest = {
  name: string;
  email: string;
  businessName: string;
  phone: string;
  businessType: string;
  teamSize: string;
  message: string;
  locale: Locale;
  submittedAt: Date;
  sourceUrl: string;
};

type ContactEmailTemplateOptions = {
  logoUrl: string;
  emailIconUrl: string;
  whatsappIconUrl: string;
  supportEmail: string;
  whatsappUrl: string;
};

const colors = {
  black: "#1E1E1E",
  panel: "#16161B",
  panelSoft: "#242229",
  purple: "#9759EF",
  purpleSoft: "#D6B8FF",
  yellow: "#FFE633",
  text: "#F7F7F8",
  muted: "#B8B3BE",
  dim: "#807A87",
  line: "#3A3740",
  success: "#48E5A0",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(value: string, locale: Locale): string {
  const fallback = locale === "es" ? "No indicado" : "Not provided";
  return escapeHtml(value.trim().length > 0 ? value : fallback);
}

function formatSubmittedAt(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(date);
}

function brandedShell({
  lang,
  title,
  preheader,
  children,
  logoUrl,
  supportEmail,
}: {
  lang: Locale;
  title: string;
  preheader: string;
  children: string;
  logoUrl: string;
  supportEmail: string;
}) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:${colors.black};font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:${colors.text};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${colors.black};padding:34px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border-collapse:separate;border-spacing:0;">
            <tr>
              <td align="center" style="padding:0 0 22px;">
                <img src="${escapeHtml(logoUrl)}" width="192" alt="Bukky" style="display:block;width:192px;max-width:192px;height:auto;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="overflow:hidden;border:1px solid ${colors.line};border-radius:26px;background:linear-gradient(145deg,#242229 0%,#17171D 58%,#111115 100%);box-shadow:0 28px 80px rgba(0,0,0,0.36);">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 4px 0;color:${colors.dim};font-size:12px;line-height:1.7;">
                Bukky · Wegox · <a href="mailto:${escapeHtml(supportEmail)}" style="color:${colors.purpleSoft};text-decoration:none;">${escapeHtml(supportEmail)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:${colors.dim};font-size:13px;line-height:1.4;">${escapeHtml(label)}</td>
    <td align="right" style="padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:${colors.text};font-size:14px;line-height:1.4;font-weight:600;">${value}</td>
  </tr>`;
}

function actionButton({
  label,
  href,
  variant,
  iconUrl,
}: {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  iconUrl: string;
}) {
  const isPrimary = variant === "primary";

  return `<a href="${escapeHtml(href)}" style="display:inline-block;border-radius:14px;${
    isPrimary
      ? `background:${colors.yellow};color:${colors.black};`
      : `background:rgba(151,89,239,0.16);color:${colors.text};border:1px solid rgba(151,89,239,0.44);`
  }font-size:14px;font-weight:700;line-height:1;text-decoration:none;padding:14px 18px;white-space:nowrap;">
    <img src="${escapeHtml(iconUrl)}" width="18" height="18" alt="" style="display:inline-block;width:18px;height:18px;margin:0 8px 0 0;border:0;outline:none;text-decoration:none;vertical-align:-4px;" />
    <span style="display:inline-block;vertical-align:middle;">${escapeHtml(label)}</span>
  </a>`;
}

export function renderCustomerContactEmail(
  request: ContactEmailRequest,
  options: ContactEmailTemplateOptions,
) {
  const isSpanish = request.locale === "es";
  const subject = isSpanish
    ? "Hemos recibido tu solicitud en Bukky"
    : "We received your Bukky request";
  const preheader = isSpanish
    ? "Gracias por escribirnos. Revisaremos tu solicitud y te contactaremos pronto."
    : "Thanks for reaching out. We will review your request and contact you soon.";

  const children = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:34px 28px 8px;">
          <h1 style="margin:18px 0 0;color:${colors.text};font-size:34px;line-height:1.05;letter-spacing:-0.02em;font-weight:760;">
            ${isSpanish ? `Hola, ${escapeHtml(request.name)}.` : `Hi, ${escapeHtml(request.name)}.`}
          </h1>
          <p style="margin:16px auto 0;max-width:540px;color:${colors.muted};font-size:16px;line-height:1.7;">
            ${
              isSpanish
                ? "Hemos recibido tu solicitud para conocer Bukky. Revisaremos el contexto de tu negocio y estaremos en contacto próximamente para coordinar los siguientes pasos."
                : "We received your request to learn more about Bukky. We will review your business context and contact you soon to coordinate next steps."
            }
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 28px 6px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid rgba(255,255,255,0.09);border-radius:20px;background:rgba(0,0,0,0.18);padding:0 18px;">
            ${infoRow(isSpanish ? "Negocio" : "Business", formatValue(request.businessName, request.locale))}
            ${infoRow(isSpanish ? "Tipo de negocio" : "Business type", formatValue(request.businessType, request.locale))}
            ${infoRow(isSpanish ? "Equipo" : "Team", formatValue(request.teamSize, request.locale))}
            <tr>
              <td style="padding:13px 0;color:${colors.dim};font-size:13px;line-height:1.4;">${isSpanish ? "Contacto" : "Contact"}</td>
              <td align="right" style="padding:13px 0;color:${colors.text};font-size:14px;line-height:1.4;font-weight:600;">${escapeHtml(request.email)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 28px 34px;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-right:10px;padding-bottom:10px;">${actionButton({
                label: isSpanish ? "Escribir a soporte" : "Email support",
                href: `mailto:${options.supportEmail}`,
                variant: "primary",
                iconUrl: options.emailIconUrl,
              })}</td>
              <td style="padding-bottom:10px;">${actionButton({
                label: "WhatsApp",
                href: options.whatsappUrl,
                variant: "secondary",
                iconUrl: options.whatsappIconUrl,
              })}</td>
            </tr>
          </table>
          <p style="margin:10px 0 0;color:${colors.dim};font-size:12px;line-height:1.6;">
            ${isSpanish ? "Este correo confirma que la solicitud llegó correctamente a nuestro equipo." : "This email confirms your request reached our team."}
          </p>
        </td>
      </tr>
    </table>`;

  return {
    subject,
    html: brandedShell({
      lang: request.locale,
      title: subject,
      preheader,
      children,
      logoUrl: options.logoUrl,
      supportEmail: options.supportEmail,
    }),
  };
}

export function renderInternalContactEmail(
  request: ContactEmailRequest,
  options: ContactEmailTemplateOptions,
) {
  const subject = `Nueva solicitud de demo - ${request.businessName || request.name}`;
  const submittedAt = formatSubmittedAt(request.submittedAt, "es");
  const message = escapeHtml(request.message).replace(/\n/g, "<br />");

  const children = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:34px 28px 8px;">
          <span style="display:inline-block;border:1px solid rgba(151,89,239,0.42);border-radius:999px;background:rgba(151,89,239,0.14);color:${colors.purpleSoft};font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;padding:6px 10px;">
            Nuevo lead
          </span>
          <h1 style="margin:18px 0 0;color:${colors.text};font-size:34px;line-height:1.05;letter-spacing:-0.02em;font-weight:760;">
            ${escapeHtml(request.businessName || request.name)}
          </h1>
          <p style="margin:16px auto 0;max-width:540px;color:${colors.muted};font-size:16px;line-height:1.7;">
            Una nueva solicitud entró desde la página de contacto de Bukky. Responde directamente a este correo para contactar al lead.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 6px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid rgba(255,255,255,0.09);border-radius:20px;background:rgba(0,0,0,0.18);padding:0 18px;">
            ${infoRow("Nombre", escapeHtml(request.name))}
            ${infoRow("Email", `<a href="mailto:${escapeHtml(request.email)}" style="color:${colors.yellow};text-decoration:none;">${escapeHtml(request.email)}</a>`)}
            ${infoRow("Telefono", formatValue(request.phone, "es"))}
            ${infoRow("Negocio", formatValue(request.businessName, "es"))}
            ${infoRow("Tipo", formatValue(request.businessType, "es"))}
            ${infoRow("Equipo", formatValue(request.teamSize, "es"))}
            ${infoRow("Origen", `<a href="${escapeHtml(request.sourceUrl)}" style="color:${colors.purpleSoft};text-decoration:none;">${escapeHtml(request.sourceUrl)}</a>`)}
            <tr>
              <td style="padding:13px 0;color:${colors.dim};font-size:13px;line-height:1.4;">Fecha</td>
              <td align="right" style="padding:13px 0;color:${colors.text};font-size:14px;line-height:1.4;font-weight:600;">${escapeHtml(submittedAt)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 6px;">
          <div style="border:1px solid rgba(255,230,51,0.16);border-radius:20px;background:linear-gradient(135deg,rgba(255,230,51,0.1),rgba(151,89,239,0.08));padding:20px;">
            <p style="margin:0 0 10px;color:${colors.yellow};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Mensaje</p>
            <p style="margin:0;color:${colors.text};font-size:15px;line-height:1.75;">${message}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 28px 34px;">
          ${actionButton({
            label: "Responder al lead",
            href: `mailto:${request.email}`,
            variant: "primary",
            iconUrl: options.emailIconUrl,
          })}
        </td>
      </tr>
    </table>`;

  return {
    subject,
    html: brandedShell({
      lang: "es",
      title: subject,
      preheader: `Nueva solicitud de ${request.name}`,
      children,
      logoUrl: options.logoUrl,
      supportEmail: options.supportEmail,
    }),
  };
}

export function renderCustomerContactText(request: ContactEmailRequest) {
  if (request.locale === "es") {
    return `Hola, ${request.name}.

Hemos recibido tu solicitud para conocer Bukky. Revisaremos el contexto de tu negocio y estaremos en contacto próximamente.

Resumen:
- Negocio: ${request.businessName || "No indicado"}
- Tipo de negocio: ${request.businessType || "No indicado"}
- Equipo: ${request.teamSize || "No indicado"}

Bukky`;
  }

  return `Hi, ${request.name}.

We received your request to learn more about Bukky. We will review your business context and contact you soon.

Summary:
- Business: ${request.businessName || "Not provided"}
- Business type: ${request.businessType || "Not provided"}
- Team: ${request.teamSize || "Not provided"}

Bukky`;
}

export function renderInternalContactText(request: ContactEmailRequest) {
  return `Nueva solicitud de demo

Nombre: ${request.name}
Email: ${request.email}
Telefono: ${request.phone || "No indicado"}
Negocio: ${request.businessName || "No indicado"}
Tipo: ${request.businessType || "No indicado"}
Equipo: ${request.teamSize || "No indicado"}
Origen: ${request.sourceUrl}
Fecha: ${formatSubmittedAt(request.submittedAt, "es")}

Mensaje:
${request.message}`;
}
