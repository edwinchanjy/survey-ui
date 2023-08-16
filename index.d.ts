declare module "vee-validate*";

declare module "crypto-js/sha256" {
  import { WordArray } from "crypto-js";

  const sha256: (data: string | WordArray) => WordArray;

  export = sha256;
}
