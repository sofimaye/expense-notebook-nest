import { IsPositive, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  readonly category: string;
  @IsNotEmpty()
  readonly description: string;
  @IsPositive()
  readonly priceInUah: number;
  @IsNotEmpty()
  readonly userId: string;
}
