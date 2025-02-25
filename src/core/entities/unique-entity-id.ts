import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()

    if (process.env?.NODE_ENV === 'test') this.value = 'teste2e' + this.value
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
