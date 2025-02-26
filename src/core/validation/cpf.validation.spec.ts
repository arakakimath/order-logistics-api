import { CpfValidation } from './cpf.validation'

describe('CPF Validation', () => {
  it('should be able to get the last two digits from a CPF', () => {
    const cpf = '097.554.991-05'

    expect(CpfValidation.getCpfLastDigits(cpf.split('-')[0])).toEqual(
      Number(cpf.split('-')[1]),
    )
  })
})
