import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  readonly description: string;
  readonly date: string;
  readonly isDone: string;
}
