import { existsSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

import {
  commissionPdfSections,
  type CommissionBrief,
} from "@/lib/commission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TEXT_LENGTH = 4000;

function asText(value: unknown, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().slice(0, MAX_TEXT_LENGTH);
}

function asList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function parseBrief(payload: unknown): CommissionBrief {
  const source =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  return {
    name: asText(source.name),
    email: asText(source.email).toLowerCase(),
    location: asText(source.location),
    wearer: asText(source.wearer),
    model: asText(source.model, "No preference"),
    wrist: asText(source.wrist),
    timeline: asText(source.timeline, "Flexible"),
    occasion: asText(source.occasion),
    metal: asText(source.metal, "Undecided"),
    dialMood: asText(source.dialMood),
    strap: asText(source.strap),
    references: asText(source.references),
    engraving: asText(source.engraving),
    notes: asText(source.notes),
    complications: asList(source.complications),
  };
}

function validateBrief(brief: CommissionBrief) {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email);

  if (!brief.name || !emailValid) {
    return "Please provide a valid name and email address.";
  }

  return null;
}

function getMissingEnv() {
  return [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
  ].filter((key) => !process.env[key]);
}

function valueForPdf(brief: CommissionBrief, key: keyof CommissionBrief) {
  const value = brief[key];

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Atelier to guide";
  }

  if (key === "model" && value === "No preference") {
    return "Open brief";
  }

  if (key === "metal" && value === "Undecided") {
    return "Open to guidance";
  }

  return value || "Open to guidance";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "commission"
  );
}

function resolvePdfFont() {
  const candidates = [
    path.join(process.cwd(), "public", "fonts", "AurumPdf-Regular.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
    "/Library/Fonts/Arial.ttf",
  ];

  return candidates.find((fontPath) => existsSync(fontPath));
}

function createCommissionPdf(brief: CommissionBrief) {
  return new Promise<Buffer>((resolve, reject) => {
    const fontPath = resolvePdfFont();
    const doc = new PDFDocument({
      autoFirstPage: false,
      size: "A4",
      margin: 0,
      info: {
        Title: "AURUM Commission Brief",
        Author: "Aurum Atelier",
        Subject: `Private commission brief for ${brief.name || "Aurum client"}`,
        CreationDate: new Date(),
      },
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    if (fontPath) {
      doc.font(fontPath);
    }

    const page = { width: 595.28, height: 841.89 };
    const marginX = 54;
    const topY = 64;
    const bottomY = page.height - 74;
    const contentWidth = page.width - marginX * 2;
    const gutter = 14;
    const columnWidth = (contentWidth - gutter) / 2;
    const gold = "#B9975B";
    const ink = "#1D1A16";
    const muted = "#6D675B";
    const line = "#D8C6A8";
    const paper = "#F6F0E5";
    const black = "#080707";
    const card = "#EFE5D3";
    const cardSoft = "#F8F1E6";
    let cursorY = topY;
    let pageNumber = 0;

    const useFont = (size: number, color = ink) => {
      if (fontPath) {
        doc.font(fontPath);
      } else {
        doc.font("Helvetica");
      }

      doc.fontSize(size).fillColor(color);
    };

    const pdfText = (value: string) => {
      if (fontPath) {
        return value;
      }

      const replacements: Record<string, string> = {
        Ç: "C",
        ç: "c",
        Ğ: "G",
        ğ: "g",
        İ: "I",
        ı: "i",
        Ö: "O",
        ö: "o",
        Ş: "S",
        ş: "s",
        Ü: "U",
        ü: "u",
      };

      return value.replace(
        /[^\x00-\x7F]/g,
        (character) => replacements[character] || "?",
      );
    };

    const writeText = (
      value: string,
      x: number,
      y: number,
      options: PDFKit.Mixins.TextOptions = {},
    ) => {
      doc.text(pdfText(value), x, y, options);
    };

    const heightOf = (
      value: string,
      width: number,
      size: number,
      lineGap = 2,
    ) => {
      useFont(size);

      return doc.heightOfString(pdfText(value), { width, lineGap });
    };

    const paintPage = () => {
      doc.rect(0, 0, page.width, page.height).fill(paper);
      doc
        .strokeColor("#D7C8AA")
        .lineWidth(0.6)
        .rect(34, 34, page.width - 68, page.height - 68)
        .stroke();
      doc
        .strokeColor(gold)
        .lineWidth(1)
        .moveTo(marginX, page.height - 42)
        .lineTo(page.width - marginX, page.height - 42)
        .stroke();
      useFont(7, muted);
      writeText("AURUM PRIVATE COMMISSION DOSSIER", marginX, page.height - 35, {
        width: contentWidth / 2,
      });
      writeText(`PAGE ${pageNumber}`, page.width - marginX - 80, page.height - 35, {
        align: "right",
        width: 80,
      });
    };

    const addPage = (withChapterHeader = true) => {
      pageNumber += 1;
      doc.addPage({ size: "A4", margin: 0 });
      paintPage();

      if (withChapterHeader) {
        useFont(8, gold);
        writeText("AURUM", marginX, 49, { width: 100 });
        useFont(7, muted);
        writeText("PRIVATE COMMISSION BRIEF", page.width - marginX - 170, 49, {
          align: "right",
          width: 170,
        });
        doc
          .strokeColor(line)
          .lineWidth(0.6)
          .moveTo(marginX, 76)
          .lineTo(page.width - marginX, 76)
          .stroke();
        cursorY = 102;
      } else {
        cursorY = topY;
      }
    };

    const ensureSpace = (height: number) => {
      if (cursorY + height > bottomY) {
        addPage();
      }
    };

    const writeSectionTitle = (title: string) => {
      ensureSpace(48);
      doc
        .strokeColor(gold)
        .lineWidth(0.8)
        .moveTo(marginX, cursorY)
        .lineTo(page.width - marginX, cursorY)
        .stroke();
      useFont(15, ink);
      writeText(title, marginX, cursorY + 13, { width: contentWidth });
      cursorY += 48;
    };

    const measureField = (value: string, width: number, compact = false) => {
      const innerWidth = width - 24;
      const valueHeight = heightOf(value, innerWidth, compact ? 10 : 10.5, 3);

      return Math.max(compact ? 58 : 70, valueHeight + 35);
    };

    const writeField = ({
      label,
      value,
      x,
      y,
      width,
      height,
      compact = false,
    }: {
      label: string;
      value: string;
      x: number;
      y: number;
      width: number;
      height: number;
      compact?: boolean;
    }) => {
      doc
        .roundedRect(x, y, width, height, 3)
        .fillAndStroke(compact ? cardSoft : card, "#D7C6A8");
      doc.rect(x, y, 3, height).fill(gold);
      useFont(7, gold);
      writeText(label.toUpperCase(), x + 14, y + 13, {
        width: width - 28,
      });
      useFont(compact ? 10 : 10.5, ink);
      writeText(value, x + 14, y + 28, {
        width: width - 28,
        lineGap: 3,
      });
    };

    const writeRowPair = (
      left: { label: string; value: string },
      right?: { label: string; value: string },
    ) => {
      const leftHeight = measureField(left.value, columnWidth, true);
      const rightHeight = right
        ? measureField(right.value, columnWidth, true)
        : leftHeight;
      const rowHeight = Math.max(leftHeight, rightHeight);

      ensureSpace(rowHeight + 10);
      writeField({
        ...left,
        x: marginX,
        y: cursorY,
        width: columnWidth,
        height: rowHeight,
        compact: true,
      });

      if (right) {
        writeField({
          ...right,
          x: marginX + columnWidth + gutter,
          y: cursorY,
          width: columnWidth,
          height: rowHeight,
          compact: true,
        });
      }

      cursorY += rowHeight + 10;
    };

    const writeFullField = (label: string, value: string) => {
      const height = measureField(value, contentWidth);

      ensureSpace(height + 10);
      writeField({
        label,
        value,
        x: marginX,
        y: cursorY,
        width: contentWidth,
        height,
      });
      cursorY += height + 10;
    };

    addPage(false);

    doc.rect(0, 0, page.width, 166).fill(black);
    doc.polygon([60, 43], [72, 55], [60, 67], [48, 55]).fill(gold);
    useFont(18, "#F2E9D8");
    writeText("AURUM", 82, 45, { width: 170 });
    useFont(7.5, gold);
    writeText("PRIVATE COMMISSION BRIEF", marginX, 88, { width: 260 });
    useFont(31, "#F2E9D8");
    writeText(brief.name || "Unnamed Patron", marginX, 112, {
      width: 350,
      lineGap: 1,
    });
    useFont(8, "#918773");
    writeText(new Date().toLocaleString("en-GB"), 397, 58, {
      align: "right",
      width: 144,
    });
    useFont(8, "#918773");
    writeText("PDF DOSSIER ATTACHED TO EMAIL", 330, 88, {
      align: "right",
      width: 211,
    });

    cursorY = 198;

    const summary = [
      { label: "Email", value: valueForPdf(brief, "email") },
      { label: "Location", value: valueForPdf(brief, "location") },
      { label: "Model", value: valueForPdf(brief, "model") },
      { label: "Material", value: valueForPdf(brief, "metal") },
    ];

    writeSectionTitle("Dossier Summary");
    for (let index = 0; index < summary.length; index += 2) {
      writeRowPair(summary[index], summary[index + 1]);
    }

    commissionPdfSections.forEach((section) => {
      writeSectionTitle(section.title);

      const rows = section.rows.map((row) => ({
        label: row.label,
        value: valueForPdf(brief, row.key),
      }));
      const useFullWidth = section.title === "Signature Notes";

      if (useFullWidth) {
        rows.forEach((row) => writeFullField(row.label, row.value));
        return;
      }

      for (let index = 0; index < rows.length; index += 2) {
        writeRowPair(rows[index], rows[index + 1]);
      }
    });

    ensureSpace(76);
    const noteY = cursorY + 8;
    doc
      .roundedRect(marginX, noteY, contentWidth, 58, 3)
      .fillAndStroke("#EFE5D3", "#D8C6A8");
    useFont(8, gold);
    writeText("NEXT STEP", marginX + 18, noteY + 14, {
      width: contentWidth - 36,
    });
    useFont(10.5, muted);
    writeText(
      "Aurum reviews the dossier, clarifies the brief, and prepares private model guidance before any formal commission terms are discussed.",
      marginX + 18,
      noteY + 30,
      { width: contentWidth - 36, lineGap: 2 },
    );

    doc.end();
  });
}

function buildEmailHtml(brief: CommissionBrief) {
  const rows = commissionPdfSections.flatMap((section) =>
    section.rows.map((row) => ({
      section: section.title,
      label: row.label,
      value: valueForPdf(brief, row.key),
    })),
  );

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; background:#080707; color:#f4ead8; padding:32px;">
      <p style="font-size:11px; letter-spacing:4px; color:#b9975b; margin:0 0 12px;">AURUM COMMISSION BRIEF</p>
      <h1 style="font-size:34px; font-weight:400; margin:0 0 8px;">${escapeHtml(brief.name)}</h1>
      <p style="margin:0 0 28px; color:#9d927f;">${escapeHtml(brief.email)}</p>
      <table style="width:100%; border-collapse:collapse;">
        ${rows
          .map(
            (row) => `
              <tr>
                <td style="width:180px; padding:12px 0; border-top:1px solid rgba(185,151,91,0.22); color:#b9975b; font-size:11px; letter-spacing:2px; text-transform:uppercase; vertical-align:top;">
                  ${escapeHtml(row.label)}
                </td>
                <td style="padding:12px 0; border-top:1px solid rgba(185,151,91,0.22); color:#f4ead8; font-size:15px; line-height:1.55;">
                  ${escapeHtml(row.value).replaceAll("\n", "<br />")}
                </td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <p style="margin:28px 0 0; color:#8e846f; font-size:13px;">A PDF version of the commission dossier is attached.</p>
    </div>
  `;
}

function buildEmailText(brief: CommissionBrief) {
  const lines = ["AURUM COMMISSION BRIEF", "", `Name: ${brief.name}`];

  commissionPdfSections.forEach((section) => {
    lines.push("", section.title);
    section.rows.forEach((row) => {
      lines.push(`${row.label}: ${valueForPdf(brief, row.key)}`);
    });
  });

  return lines.join("\n");
}

export async function POST(request: Request) {
  try {
    const missingEnv = getMissingEnv();

    if (missingEnv.length) {
      return NextResponse.json(
        {
          message: `SMTP configuration is missing: ${missingEnv.join(", ")}`,
        },
        { status: 500 },
      );
    }

    const brief = parseBrief(await request.json());
    const validationError = validateBrief(brief);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const pdf = await createCommissionPdf(brief);
    const port = Number(process.env.SMTP_PORT);

    if (!Number.isFinite(port)) {
      return NextResponse.json(
        { message: "SMTP_PORT must be a valid number." },
        { status: 500 },
      );
    }

    const recipient =
      process.env.SMTP_TO || process.env.SMTP_FROM || process.env.SMTP_USER;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Aurum Commission Desk" <${process.env.SMTP_FROM}>`,
      to: recipient,
      replyTo: brief.email,
      subject: `AURUM commission brief - ${brief.name}`,
      text: buildEmailText(brief),
      html: buildEmailHtml(brief),
      attachments: [
        {
          filename: `aurum-commission-${slugify(brief.name)}.pdf`,
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Commission email failed", error);

    return NextResponse.json(
      {
        message:
          "The commission brief could not be sent. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
