import { Module } from '@nestjs/common';
import { PulsarService } from './pulsar.service';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [PdfModule],
  providers: [PulsarService],
})
export class PulsarModule {}
