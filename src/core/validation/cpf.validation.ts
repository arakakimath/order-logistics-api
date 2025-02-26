export class CpfValidation {
  constructor() {}

  static getCpfLastDigits(cpf: string): number {
    // Validate CPF format
    if (!/^\d{3}\.\d{3}\.\d{3}$/.test(cpf)) {
      throw new Error(
        'Invalid CPF format. It must be in the format xxx.xxx.xxx',
      )
    }

    // Remove dots and convert to an array of numbers
    const digits = cpf.split('.').join('').split('').map(Number)

    // Weight for the CPF check digits calculation
    const weight = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

    // Function to calculate the check digit
    const calculateCheckDigit = (
      digits: number[],
      weight: number[],
    ): number => {
      const sum = digits.reduce(
        (acc, digit, index) => acc + digit * weight[index],
        0,
      )

      const restOfDivisionBy11 = sum % 11
      return restOfDivisionBy11 < 2 ? 0 : 11 - restOfDivisionBy11
    }

    // Calculate the first check digit (d10)
    const d10 = calculateCheckDigit(digits, weight.slice(1)) // Skip the first weight (11)
    digits.push(d10) // Add the first check digit

    // Calculate the second check digit (d11)
    const d11 = calculateCheckDigit(digits, weight)
    digits.push(d11) // Add the second check digit

    // Return the calculated check digits as a number (e.g., 10 and 11)
    return d10 * 10 + d11
  }
}
