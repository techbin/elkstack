##Node JS Wrapper for ELK Stack

##Abstract

ELKStack is a wrapper for ELK Stack APIs. Hence invoking a ELK Stack API from your Node application is just a function call which provide the most appropriate response.

##Registering a ELK Stack Client

Since ELK Stack APIs are authenticated, you should register your client app with ELK Stack. To register your app:

  - Visit this page https://cloud.elastic.co.

  - Register and get below details from your account for api authorization

  - api_endpoint

  - userName

  - password

##Installation of ELK Stack NodeJs Wrapper

Node JS SDK will be installed and a package named 'elkstack' will be created in the installation directory.

>npm install elkstack

Once installed it can be used in the code as below,

>var ElkStack = require('elkstack')

##API Usage

##Configurations

Your Authorization Client details should be given to the Wrapper as a property file. You need to create a folder resources and configure a file named configuration.properties.


ElkStack Wrapper will try reading file from **'resources/configuration.properties'** 


Please fill the values for the following keys alone.

```

[elkstack]
elkstack.api_endpoint=
elkstack.username=
elkstack.password=                                  

```

##Initialize 

Below snippet helps to create an index without mapping

```
var ElkStack = require('elkstack');

var entrydata = [];
entrydata['indexname'] = 'your-index-name';
entrydata['type'] = 'your-doc-type';
console.log(ElkStack.addindex(entrydata));


```

##create an index with mapping

```

var entrydata = [];
entrydata['indexname'] = 'your-index-name';
entrydata['type'] = 'your-doc-type';
entrydata['map'] = 'your-mapping';
entrydata['entry'] ={
  "properties": {
    "field1": {
      "type": "text"
    },
    "field2": {
      "type": "text"
    },
    "field3": {
      "type": "keyword"
    },
    "field4": {
      "type": "date"
    },
    "field5": {
      "type": "text"
    }
  }
}
console.log(ElkStack.addmappingtoindex(entrydata));

```

##Add a document

```

var entrydata = [];
entrydata['indexname'] = 'your-index-name';
entrydata['type'] = 'your-doc-type';
entrydata['map'] = 'your-mapping';
entrydata['unique_number'] = '1'; #version number
entrydata['entry'] = {
    "field1": "layout2",
    ...
};
console.log(ElkStack.adddocumententry(entrydata));

```

##Get a document

```

var entrydata = [];
entrydata['indexname'] = 'your-index-name';
entrydata['type'] = 'your-doc-type';
entrydata['unique_number'] = '1'; #version number
console.log(ElkStack.getdocumentindex(entrydata));

```
##Delete a document

```

var entrydata = [];
entrydata['indexname'] = 'your-index-name';
console.log(ElkStack.deleteindex(entrydata));

```
##list all indices

```

var entrydata = [];
console.log(ElkStack.listallindices(entrydata));

```
##Check cluster health

```

var entrydata = [];
console.log(ElkStack.clusterhealth(entrydata));

```

##Error Handling:
All errors will be thrown explicitly and care should be taken in catching the same.
