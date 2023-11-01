export interface ICategoryPageInput {
  title: string;
  description: string;
  banners: IPageContent[];
  products: IPageContent[];
  category: string;
  createdBy: string;
}

export interface IPageContent {
  imgUrl: string;
  navigateTo: string
}

export interface ICategoryPage extends ICategoryPageInput {
  _id: string
}