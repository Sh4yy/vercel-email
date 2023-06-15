export type IContact = string | {
  email: string;
  name?: string;
};

export interface IEmail {
  to: IContact | IContact[];
  replyTo?: IContact | IContact[];
  cc?: IContact | IContact[];
  bcc?: IContact | IContact[];
  from: IContact;
  subject: string;
  text?: string;
  html?: string;
}