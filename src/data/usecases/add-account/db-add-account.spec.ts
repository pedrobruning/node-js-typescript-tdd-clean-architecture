import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

describe('Db Add Account', () => {
  const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccount {
      async add (accountData: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'hashed_password'
        }
        return await new Promise(resolve => resolve(fakeAccount))
      }
    }

    return new AddAccountRepositoryStub()
  }

  const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }

    return new EncrypterStub()
  }

  interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
  }

  const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
      sut,
      encrypterStub,
      addAccountRepositoryStub
    }
  }

  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toBeCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addAccountRepositorySpy).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password'
    })
  })
})
