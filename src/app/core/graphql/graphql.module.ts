import { FactoryProvider, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApolloModule,
  ]
})
export class GraphqlModule {

  public static on(uri: string): ModuleWithProviders<GraphqlModule> {
    return { ngModule: GraphqlModule,  providers: [ GraphqlModule.initApolloProvider(uri) ] };
}

  private static initApolloProvider(uri: string): FactoryProvider{
    return {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpBatchLink) {
        return {
          cache: new InMemoryCache({addTypename: false}),
          link: httpLink.create({
            uri: uri,
          }),
          defaultOptions: {
            watchQuery: { fetchPolicy: 'no-cache',  errorPolicy: 'all', },
            query: { fetchPolicy: 'no-cache',  errorPolicy: 'all', },
          }
        };
      },
      deps: [HttpBatchLink],
    }
  }
}
