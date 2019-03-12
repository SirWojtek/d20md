
export class Miniature {
  header: string;
  redirectUrl: string;
  imageUrl: string;
  data: string;

  constructor(header: string, redirectUrl: string, imageUrl: string, data: string) {
    this.header = header;
    this.redirectUrl = redirectUrl;
    this.imageUrl = imageUrl;
    this.data = data;
  }
}
