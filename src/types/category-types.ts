export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  imageUrl?: string;
  type?: string;
  subCategories?: ICategory[]
}