// phone-validation.service.ts
import { Injectable } from '@nestjs/common';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Injectable()
export class PhoneValidationService {
  validatePhoneNumber(phoneNumber: string): boolean {
    try {
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
        return parsedPhoneNumber?.isValid() || false;
      } catch (error) {
        return false; // Handle parsing errors (invalid format, etc.)
      }
  }
}
