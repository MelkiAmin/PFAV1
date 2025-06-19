import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  generatePdf(title: string, content: string): string {
    const doc = new PDFDocument();
    const fileName = `report-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../reports', fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Titre : ${title}`, { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Contenu : ${content}`);

    doc.end();
    return filePath;
  }
}
