import { ItemModel } from "./../../models/item";

export interface IItemsService {
  getItems(listName: string): Promise<ItemModel[]>;
}