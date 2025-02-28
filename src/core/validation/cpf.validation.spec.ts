import { CpfValidation } from './cpf.validation'

describe('CPF Validation', () => {
  it('should be able to validate a valid CPF', () => {
    const cpf = '097.554.991-05'

    expect(CpfValidation.isCpfValid(cpf)).toBeTruthy()
  })

  it('should not be able to validate an invalid CPF', () => {
    const cpf = '097.554.921-05'

    expect(CpfValidation.isCpfValid(cpf)).toBeFalsy()
  })
})
