type RegisteredUserAsJSON = {
  id: string;
  name: string;
  surname: string;
  mail: string;
};

class RegisteredUser {
  private readonly _id: string;
  private _name: string;
  private _surname: string;
  private _mail: string;

  constructor(id: string, name: string, surname: string, mail: string) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._mail = mail;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get surname() {
    return this._surname;
  }
  set surname(surname: string) {
    this._surname = surname;
  }

  get mail() {
    return this._mail;
  }
  set mail(mail: string) {
    this._mail = mail;
  }

  get json() {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      mail: this.mail,
    };
  }
}

export { RegisteredUserAsJSON };
export default RegisteredUser;
