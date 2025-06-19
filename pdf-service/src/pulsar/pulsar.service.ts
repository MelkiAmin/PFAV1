import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, Consumer } from 'pulsar-client';
import { PdfService } from '../pdf/pdf.service';

@Injectable()
export class PulsarService implements OnModuleInit {
  private readonly logger = new Logger(PulsarService.name);

  constructor(private readonly pdfService: PdfService) {}

  async onModuleInit() {
    const client = new Client({
      serviceUrl: 'pulsar://localhost:6650',
    });

    const consumer: Consumer = await client.subscribe({
      topic: 'pdf-jobs',
      subscription: 'pdf-subscription',
      subscriptionType: 'Shared',
    });

    this.logger.log('🟢 Pulsar consumer connected. Waiting for messages...');

    const listen = async () => {
      while (true) {
        const msg = await consumer.receive();
        const data = msg.getData().toString('utf-8');

        try {
          const payload = JSON.parse(data);
          const filePath = this.pdfService.generatePdf(payload.title, payload.content);
          this.logger.log(`✅ PDF généré : ${filePath}`);
        } catch (error) {
          this.logger.error('❌ Erreur lors de la génération PDF', error);
        }

        consumer.acknowledge(msg);
      }
    };

    listen();
  }
}
