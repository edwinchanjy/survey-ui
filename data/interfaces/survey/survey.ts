export interface Question {
  name?: string | null;
  title?: string | null;
  type?: string | null;
  validator?: Array<Validator> | null;
}

export interface Validator {
  type?: string | null;
  text?: string | null;
}
