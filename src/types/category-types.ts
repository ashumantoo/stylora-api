export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  subCategories?: ICategory[]
}