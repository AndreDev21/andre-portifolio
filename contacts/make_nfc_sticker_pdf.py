#!/usr/bin/env python3
"""CR80 sticker sheet: two 85.5 × 54 mm faces (front + back) on A4."""

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

CARD_W = 85.5 * mm
CARD_H = 54 * mm
BG = HexColor("#0b0814")
ACCENT = HexColor("#b78cff")
TEXT = HexColor("#f4f2f8")
MUTED = HexColor("#a89fc0")
BODY = HexColor("#cdc7dd")
DIM = HexColor("#8b82a6")
MARK = HexColor("#666666")

pdfmetrics.registerFont(TTFont("LibSans", "/usr/share/fonts/liberation/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("LibSansBold", "/usr/share/fonts/liberation/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("LibMono", "/usr/share/fonts/liberation/LiberationMono-Regular.ttf"))


def crop_marks(c, x, y, w, h, length=4 * mm, gap=1.2 * mm):
    c.saveState()
    c.setStrokeColor(MARK)
    c.setLineWidth(0.25)
    pairs = [
        (x, y + h, 0, 1, -1, 0),
        (x + w, y + h, 0, 1, 1, 0),
        (x, y, 0, -1, -1, 0),
        (x + w, y, 0, -1, 1, 0),
    ]
    for cx, cy, vdx, vdy, hdx, hdy in pairs:
        c.line(cx, cy + vdy * gap, cx, cy + vdy * (gap + length))
        c.line(cx + hdx * gap, cy, cx + hdx * (gap + length), cy)
    c.restoreState()


def draw_card(c, x, y, qr):
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, CARD_W, CARD_H)
    c.clipPath(p, stroke=0, fill=0)

    c.setFillColor(BG)
    c.rect(x, y, CARD_W, CARD_H, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.rect(x, y + CARD_H - 0.7 * mm, CARD_W, 0.7 * mm, stroke=0, fill=1)

    pad = 3.2 * mm
    qr_box = 32 * mm
    qr_x = x + CARD_W - pad - qr_box
    qr_y = y + (CARD_H - qr_box) / 2
    c.setFillColor(white)
    c.rect(qr_x, qr_y, qr_box, qr_box, stroke=0, fill=1)
    inset = 1.6 * mm
    c.drawImage(
        qr,
        qr_x + inset,
        qr_y + inset,
        qr_box - 2 * inset,
        qr_box - 2 * inset,
        preserveAspectRatio=True,
        mask="auto",
    )

    tx = x + pad
    top = y + CARD_H - 6.2 * mm
    c.setFillColor(ACCENT)
    c.setFont("LibMono", 6.5)
    c.drawString(tx, top, "~/andre")

    c.setFillColor(TEXT)
    c.setFont("LibSansBold", 10)
    c.drawString(tx, top - 5.2 * mm, "André M. Martins")

    c.setFillColor(MUTED)
    c.setFont("LibMono", 5)
    c.drawString(tx, top - 9.4 * mm, "Full-Stack  ·  cartão de contato")

    c.setFillColor(BODY)
    c.setFont("LibSans", 6.5)
    c.drawString(tx, y + 8.4 * mm, "Aponte a câmera aqui")

    c.setFillColor(DIM)
    c.setFont("LibMono", 4.4)
    c.drawString(tx, y + 5.4 * mm, "andredev21.github.io")
    c.drawString(tx, y + 3.4 * mm, "/andre-portifolio/contacts/")

    c.restoreState()
    c.setStrokeColor(HexColor("#2a2145"))
    c.setLineWidth(0.2)
    c.rect(x, y, CARD_W, CARD_H, stroke=1, fill=0)


def draw_exact_page(c, qr):
    c.setFillColor(BG)
    c.rect(0, 0, CARD_W, CARD_H, stroke=0, fill=1)
    draw_card(c, 0, 0, qr)
    c.showPage()


def main():
    qr = ImageReader("/home/andre/projects/personal/andre-portfolio/contacts/qr-print.png")
    out_a4 = "/home/andre/projects/personal/andre-portfolio/contacts/nfc-adesivo.pdf"
    out_card = "/home/andre/projects/personal/andre-portfolio/contacts/nfc-adesivo-cartao.pdf"

    c = canvas.Canvas(out_a4, pagesize=A4)
    c.setTitle("André Martins — adesivo NFC 85,5 × 54 mm")
    c.setAuthor("André M. Martins")
    page_w, page_h = A4

    c.setFillColor(white)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)

    c.setFillColor(HexColor("#222222"))
    c.setFont("LibSans", 9)
    c.drawCentredString(page_w / 2, page_h - 14 * mm, "Imprimir em tamanho real (100%). Recortar nas marcas.")
    c.setFont("LibSans", 8)
    c.setFillColor(HexColor("#555555"))
    c.drawCentredString(
        page_w / 2,
        page_h - 18.5 * mm,
        "Duas faces 85,5 × 54 mm — colar frente e verso no cartão NFC.",
    )

    gap = 18 * mm
    total_h = CARD_H * 2 + gap
    x = (page_w - CARD_W) / 2
    y_top = (page_h - total_h) / 2 + CARD_H + gap
    y_bot = (page_h - total_h) / 2

    c.setFillColor(ACCENT)
    c.setFont("LibMono", 8)
    c.drawString(x, y_top + CARD_H + 3 * mm, "FRENTE")
    c.drawString(x, y_bot + CARD_H + 3 * mm, "VERSO")

    draw_card(c, x, y_top, qr)
    crop_marks(c, x, y_top, CARD_W, CARD_H)
    draw_card(c, x, y_bot, qr)
    crop_marks(c, x, y_bot, CARD_W, CARD_H)
    c.save()

    d = canvas.Canvas(out_card, pagesize=(CARD_W, CARD_H))
    d.setTitle("André Martins — cartão NFC frente e verso")
    d.setAuthor("André M. Martins")
    draw_exact_page(d, qr)
    draw_exact_page(d, qr)
    d.save()
    print(out_a4)
    print(out_card)


if __name__ == "__main__":
    main()
