import { Module } from "@nestjs/common";
import { PdfService } from './pdf.service';
import { PdfResolver } from './pdf.resolver';

@Module({
    providers: [PdfService, PdfResolver],
    exports: [PdfService],
})
export class PdfModule {
    // This module can be expanded with providers, controllers, and other features as needed.
}