export class User {
    id: number;
    username: string;
    enabled: boolean;
    authorities: string[];

deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}