import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PdfModule } from './pdf/pdf.module';
import { PulsarModule } from './pulsar/pulsar.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true
    }),
    PdfModule, // Assuming PdfModule is defined in pdf.module.ts
    PulsarModule, // Assuming PulsarModule is defined in pulsar.module.ts
  ],
   controllers: [AppController], // <-- Add this
  providers: [AppService],  
})
export class AppModule {}
