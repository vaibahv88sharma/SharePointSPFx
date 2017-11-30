import { Component, Inject, OnInit } from '@angular/core';
import { ConfigurationService } from "./../shared/services/configuration.service";
import { ItemsService } from "./../shared/services/items.service";
import { ItemModel } from "./../shared/models/item";

@Component({
  selector: "list",
  template: require("./list.template.html") as string
})
export class ListComponent implements OnInit {
  private listName: string = "";
  private items: ItemModel[] = [];

  constructor(private configurationService: ConfigurationService, private itemsService: ItemsService) {
    this.listName = configurationService.listName;
  }

  public ngOnInit() {
    this.itemsService.getItems(this.configurationService.listName).then((items: ItemModel[]) => {
      this.items = items;
    });
  }
}
