import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly userId: number;
  
  @IsNotEmpty()
  readonly user: string;
}
