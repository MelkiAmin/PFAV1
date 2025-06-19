import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PdfService } from './pdf.service';
import { GraphQLString } from 'graphql';

@Resolver()
export class PdfResolver {
  constructor(private readonly pdfService: PdfService) {}

  @Mutation(() => GraphQLString)
  generatePdf(
    @Args('title', { type: () => GraphQLString }) title: string,
    @Args('content', { type: () => GraphQLString }) content: string,
  ): string {
    return this.pdfService.generatePdf(title, content);
  }
}
