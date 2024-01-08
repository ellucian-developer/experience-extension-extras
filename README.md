# Experience Extension Extras

This repository is a collection of Experience Components, Hooks, and Data Query functions to aid in the creation of Experience Extensions.

- [Install](#install)
- [Components and Hooks](#components-and-hooks)
- [Data Query Functions](#data-query-functions)

## Install

```
npm install git+https://github.com/ellucian-developer/experience-extension-extras.git
```
## Components and Hooks

- [Data Query Provider](#data-query-provider)
- [Multi Data Query Provider](#multi-data-query-provider)
- [useDataQuery Hook](#useDataQuery-hook)

### Data Query Provider

DataQueryProvider simplifies the pattern of fetching data from a data source and accessing the data through a React Context using React Hooks.
There are several helper query functions to assist with this pattern. They make it possible to fetch data from an Experience friendly microservice, a Banner Business API (Admin user), or using Ellucian Data Connection Serverless API by simply setting the options property on the DataQueryProvider.

Code snippet using DataQueryProvider to retrieve data from Data Connection Serverless API. Note you can see this example at https://github.com/ellucian-developer/experience-ethos-examples#account-details-dataconnect-example.
```
import { DataQueryProvider, useDataQuery, userTokenDataConnectQuery } from '@ellucian/experience-extension-extras';
...
function AccountDetails({classes}) {
    const { configuration: { pipelineApi } = {} } = useCardInfo();
    const { data } = useDataQuery(pipelineApi);
    ...
}

function AccountDetailsWithProviders() {
    const { configuration: { pipelineApi } = {} } = useCardInfo();
    const options = {
        queryFunction: userTokenDataConnectQuery,
        resource: pipelineApi
    }

    return (
        <DataQueryProvider options={options}>
            <AccountDetails/>
        </DataQueryProvider>
    )
}

export default withIntl(AccountDetailsWithProviders);
```

Code snippet using DataQueryProvider to retrieve data from a microservice API. Note you can see this example at https://github.com/ellucian-developer/experience-ethos-examples#account-details-example.
```
import { DataQueryProvider, experienceTokenQuery, useDataQuery } from '@ellucian/experience-extension-extras';
...
function AccountDetails({classes}) {
    const { data } = useDataQuery('account-detail-reviews');
    ...
}

function AccountDetailsWithProviders() {
    const {
        configuration: {
            serviceUrl
        } = {}
     } = useCardInfo();

    const options = {
        queryFunction: experienceTokenQuery,
        resource: 'account-detail-reviews'
    }

    return (
        <DataQueryProvider options={options}>
            <AccountDetails/>
        </DataQueryProvider>
    )
}

export default withIntl(AccountDetailsWithProviders);
```

DataQueryProvider uses react-query to manage the calls to your API. To use DataQueryProvider, you must wrap your card and page with this Provider component, passing it an options property.

The options:

**cacheEnabled**: optional. Boolean that is true by default. When enabled, any data fetched will be cached using the resource and query keys as keys to the data in the cache.

**enabled**: optional. Boolean that is true by default. If a query function is defined and enabled as true, the query function will be invoked. The reason to set enabled to false is when you need to supply the query keys later, for instance, after reading data from another resource.

**queryFunction**: The function to invoke to retrieve data. There are three ready to use query functions, namely, experienceTokenQuery, userTokenBusinessProcessQuery, and userTokenDataConnectQuery. The query function is passed an object with the queryKeys and queryParameters. You can view the source of the [Data Query Functions](https://github.com/ellucian-developer/experience-extension-extras/tree/main/src/data) for a examples

**queryKeys**: Passed to the query function. Query keys denote values used as keys in the cache which change the data fetched, such as a Banner ID. See the [Data Query Functions](#data-query-functions) for the expected keys.

**queryParameters**: Passed to the query function. Query parameters are passed without being part of the keys in the cache. Note: DataQuery Provider will always pass  authenticatedEthosFetch or getExtensionJwt to the queryFunction. See the [Data Query Functions](#data-query-functions).

**resource**: resource is a key, but more importantly, this can be used as the Ethos resource when using the provided query functions userTokenDataConnectQuery, userTokenBusinessProcessQuery or experienceTokenQuery.

### Multi Data Query Provider

When dealing with multiple API calls, the conventional approach involves nesting several Data Query Providers within one another. While suitable for a limited number of queries, this approach becomes cumbersome and leads to code complexity when dealing with numerous API calls. 

In order to mitigate this issue, we have introduced the Multi Data Query Provider. This  component accepts an array of Data Query Provider options, internally orchestrating the invocation of the same Data Query Provider logic. This streamlines the code structure, offering a cleaner and more scalable solution for managing multiple API calls within the application.

```
import { MultiDataQueryProvider, experienceTokenQuery, useDataQuery } from '@ellucian/experience-extension-extras';
...
function AccountDetails({classes}) {
    const { data } = useDataQuery('account-detail-reviews');
    ...
}

function AccountDetailsWithProviders() {
    const {
        configuration: {
            serviceUrl
        } = {}
     } = useCardInfo();

    const options = {
        queryFunction: experienceTokenQuery,
    };

    const config = [
        { ...options, resource: 'account-detail-reviews' },
        { ...options, resource: 'account-detail-deposits' },
        { ...options, resource: 'account-detail-memos' }
    ]

    return (
        <MultiDataQueryProvider options={config}>
            <AccountDetails/>
        </MultiDataQueryProvider>
    )
}

export default withIntl(AccountDetailsWithProviders);
```


### useDataQuery Hook

This hook provides the data and state values for the data query<br/>

**data**: The data returned by the query function. The default value is *undefined* prior to being fetched<br/>

**dataError**: The error returned by the query function. The default value is *undefined* prior to being fetched<br/>

**inPreviewMode**: Denotes the card is rendering in Experience Card configuration *preview*

**isError**: Denotes the query function returned an error that wasn't handled and returned as a dataError value to useDataQuery.

**isFetching**: Denotes the query function is currently fetching data

**isRefreshing**: Denotes the query function is currently re-fetching data.

**refresh**: Function the forces a refresh of the data.

**setEnabled**: This function expects a boolean value to turn the fetching of data on or off as described in the options for [DataQueryProvider](#data-query-provider)

**setQueryFunction**: This function expects a function reference as described in the options for [DataQueryProvider](#data-query-provider)

**setQueryKeys**: This function expects an object of keys as described in the options for [DataQueryProvider](#data-query-provider)

**setQueryParameters**: This function expects an object of parameters as described in the options for [DataQueryProvider](#data-query-provider)

## Data Query Functions

- [Experience Extension Extras](#experience-extension-extras)
  - [Install](#install)
  - [Components and Hooks](#components-and-hooks)
    - [Data Query Provider](#data-query-provider)
    - [Multi Data Query Provider](#multi-data-query-provider)
    - [useDataQuery Hook](#usedataquery-hook)
  - [Data Query Functions](#data-query-functions)
    - [Experience Token Query](#experience-token-query)
    - [User Token Business Process Query](#user-token-business-process-query)
    - [User Token Data Connect Query](#user-token-data-connect-query)

### Experience Token Query

[experienceTokenQuery](https://github.com/ellucian-developer/experience-extension-extras/blob/main/src/data/experience-token-query.js) function provides a ready to use query function that can fetch data from an endpoint that accepts the Experience Extension JWT token.

This function supports the following query keys:

**id**: optional. If included it will be appended to the URL after the resource.

**resource**: required. The resource will be appended to the serviceUrl (see query parameters).

**searchParameters**: optional. Search parameters are an object with name value pairs. They will be appended to the URL as Query String values. See: [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

This function supports the following query parameters:

**accept**: optional. If provided this will be sent as the accept header in the fetch request. The default Accept header will be sent as "application/json".

**serviceUrl**: required. This parameter is the URL base of your microservice/service. The resource will be appended to this URL. It should include a trailing '/' but will work either way.

### User Token Business Process Query

[userTokenBusinessProcessQuery](https://github.com/ellucian-developer/experience-extension-extras/blob/main/src/data/user-token-business-process-query.js) function provides a ready to use query function that can fetch data from a Banner Business Process API endpoint. The ability to call a Banner Business Process API will only work if the end user is a Banner Admin user. For details see [Invoke BP APIs through Ethos proxy service using OAuth tokens](https://resources.elluciancloud.com/bundle/ellucian_experience_acn_use/page/c_extension_bpapi_oauth.html)

This function supports the following query keys:

**resource**: required. The resource name to fetch. This is the Ethos Integration resource name as made available by the BP API.

**searchParameters**: optional. Search parameters are an object with name value pairs. They will be appended to the URL as Query String values. See: [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

This function supports the following query parameters:

**accept**: optional. The BP APIs require an Accept header with "hedtech" version, this query function will default to "application/vnd.hedtech.integration.v1.0.0+json". You can optionally send  the *acceptVersion*.

**acceptVersion**: optional. The BP APIs require and accept version, this query function will default to version 1.0.0. Note this is just the version such as "1+" or "1.0.0". The "application/vnd.hedtech.integration.v\<version>+json" will be added to the Accept header.

### User Token Data Connect Query

[userTokenDataConnectQuery](https://github.com/ellucian-developer/experience-extension-extras/blob/main/src/data/user-token-data-connect-query.js) function provides a ready to use query function that can fetch data from a Data Connect Serverless API endpoint.

This function supports the following query keys:

**id**: optional. If included it will be appended to the resource after a '/'.

**resource**: required. The resource name to fetch. This is the Data Connect Serverless API pipeline name. See: [Developing Serverless APIs](https://resources.elluciancloud.com/bundle/dev_res_data_connect_acn_use/page/md_developing_serverless_apis.html)

**searchParameters**: optional. Search parameters is an object with name values pairs. They will be appended to the URL as Query String values. See: [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

This function supports the following query parameters:

Note: either *accept* or *acceptVersion* is required for *userTokenDataConnectQuery*

**accept**: optional. The Data Connect Serverless APIs accept a "hedtech" version, this query function has no default accept value. You can optionally send the *acceptVersion*.

**acceptVersion**: optional. The Data Connect Serverless APIs accept a "hedtech" version, this query function has no default accept value. Note this is just the version such as "1+" or "1.0.0". The "application/vnd.hedtech.integration.v\<version>+json" will be added to the Accept header.
