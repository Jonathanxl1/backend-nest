import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDelegationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  city_id: number;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsOptional()
  telephone: number;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
