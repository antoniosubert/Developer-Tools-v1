import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("pdfFiles");

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "Please upload at least two PDF files." },
        { status: 400 }
      );
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = await (file as File).arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    return new NextResponse(mergedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to merge PDFs." },
      { status: 500 }
    );
  }
}
