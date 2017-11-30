import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { 
  APP_INITIALIZER,
  ModuleWithProviders 
} from '@angular/core';

import styles from './SearchWebPart.module.scss';
import * as strings from 'SearchWebPartStrings';
import { BaseAngularWebPart } from './../../core/webparts/base-angular.webpart';
import pnp from "sp-pnp-js";

export interface ISearchWebPartProps {
  description: string;
  listName: string;  
}

//import { ConfigurationService, ItemsService, MockItemsService } from "./app/shared/services";
import { ItemsService } from "./app/shared/services/items.service";
import { MockItemsService } from "./app/shared/services/mock/items.service";
import { ConfigurationService } from "./app/shared/services/configuration.service";

import { AppRoutes } from './app/app.routes';
import { HomeComponent } from './app/home/home.component';
import { ListComponent } from './app/list/list.component';

//export default class SearchWebPartWebPart extends BaseClientSideWebPart<ISearchWebPartProps> {
export default class SearchWebPartWebPart extends BaseAngularWebPart<ISearchWebPartProps> {
    
  protected importDeclarationTypes: any = [];

  protected get appDeclarationTypes(): any[] {
    return [
      HomeComponent,
      ListComponent
    ];
  }

  protected get routes(): ModuleWithProviders {
    return AppRoutes;
  }

  protected get providers(): any[] {
    if (Environment.type === EnvironmentType.Local) {
      return [
        // Provides the Configuration Service
        ConfigurationService,

        // Provides the ItemsService with its Mocked instance
        { provide: ItemsService, useClass: MockItemsService },

        // Initialized the ConfigurationService data based on the ClientWebPart configuration
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: true,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      return [
        // Provides the Configuration Service
        ConfigurationService,

        // Provides the ItemsService with its Real instance
        { provide: ItemsService, useClass: ItemsService },

        // Initialized the ConfigurationService data based on the ClientWebPart configuration
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: false,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    }    
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {  
      pnp.setup({
        spfxContext: this.context
      });      
    });
  }

  //public render(): void {
  //  this.domElement.innerHTML = `
  //    <div class="${ styles.search }">
  //      <div class="${ styles.container }">
  //        <div class="${ styles.row }">
  //          <div class="${ styles.column }">
  //            <span class="${ styles.title }">Welcome to SharePoint!</span>
  //            <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
  //            <p class="${ styles.description }">${escape(this.properties.description)}</p>
  //            <a href="https://aka.ms/spfx" class="${ styles.button }">
  //              <span class="${ styles.label }">Learn more</span>
  //            </a>
  //          </div>
  //        </div>
  //      </div>
  //    </div>`;
  //}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //  return {
  //    pages: [
  //      {
  //        header: {
  //          description: strings.PropertyPaneDescription
  //        },
  //        groups: [
  //          {
  //            groupName: strings.BasicGroupName,
  //            groupFields: [
  //              PropertyPaneTextField('description', {
  //                label: strings.DescriptionFieldLabel
  //              })
  //            ]
  //          }
  //        ]
  //      }
  //    ]
  //  };
  //}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Angular Basic Webpart"
          },
          groups: [
            {
              groupName: "General Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Title"
                })
              ]
            },
            {
              groupName: "List Configuration",
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: "List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
