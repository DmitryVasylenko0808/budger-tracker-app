import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseNumberArrayPipe implements PipeTransform<string, number[]> {
  transform(value: string, metadata: ArgumentMetadata): number[] {
    if (!value) {
      return [];
    }

    try {
      const numbers = value.split(',').map(Number);

      if (numbers.some(isNaN)) {
        throw new BadRequestException('Invalid number format in array');
      }

      return numbers;
    } catch {
      throw new BadRequestException('Array parsing failed');
    }
  }
}
