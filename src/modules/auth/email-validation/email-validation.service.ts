import { Injectable } from '@nestjs/common';
import validater from "validator"

@Injectable()
export class EmailValidationService {
  validateEmail(email: any): boolean {
    return validater.isEmail(email);
  }
}