var PropertiesReader = require('properties-reader');
var request = require('request');
exports.addindex = function(entrydata) {
  console.log('Creating index');
  var url = entrydata['indexname'];
  var postmethod = 'PUT';
  return elkstack(url, postmethod, entrydata);
}
exports.addmappingtoindex = function(entrydata) {
  console.log('creating mapping');
  var url = entrydata['indexname']+'/'+entrydata['map']+'/'+entrydata['type'];
  var postmethod = 'PUT';
  return elkstack(url, postmethod, entrydata);
}
exports.adddocumentindex = function(entrydata) {
  console.log('Creating document');
  var url = entrydata['indexname']+'/'+entrydata['type'];
  var postmethod = 'POST';
  return elkstack(url, postmethod,entrydata);
}
exports.getdocumentindex = function(entrydata) {
  console.log('getting document');
  var url = entrydata['indexname']+'/'+entrydata['type']+'/'+entrydata['unique_number'];
  var postmethod = 'GET';
  return elkstack(url, postmethod,entrydata);
}
exports.deletedocumentindex = function(entrydata) {
  console.log('Deleting an index');
  var url = entrydata['indexname'];
  var postmethod = 'DELETE';
  return elkstack(url, postmethod,entrydata);
}
exports.adddocumententry = function(entrydata) {
  console.log('Adding record');
  var url = entrydata['indexname']+'/'+entrydata['type']+'/'+entrydata['unique_number'];
  var postmethod = 'PUT';
  return elkstack(url, postmethod,entrydata);
}
exports.deletedocumententry = function(entrydata) {
  console.log('Deleting a document');
  var url = entrydata['indexname']+'/'+entrydata['type']+'/'+entrydata['unique_number'];
  var postmethod ='DELETE';
  return elkstack(url, postmethod,entrydata);
}
exports.listallindices = function(entrydata) {
  console.log('list all indices');
  var url = '_cat/indices?v';
  var postmethod ='GET';
  return elkstack(url, postmethod,entrydata);
}
exports.clusterhealth = function(entrydata) {
  console.log('check cluster health');
  var url = '_cat/health?v';
  var postmethod ='GET';
  return elkstack(url, postmethod,entrydata);
}
function readconfig(){
 var properties = PropertiesReader('resources/configuration.properties');
  var elkstack_config=[];
  elkstack_config['elkstack_api_endpoint']  = properties.get('elkstack.elkstack.api_endpoint');
  elkstack_config['elkstack_api_username'] = properties.get('elkstack.elkstack.username');
  elkstack_config['elkstack_api_password'] = properties.get('elkstack.elkstack.password');
  return elkstack_config;
}
function elkstack(url, postmethod,entrydata){
  var data = entrydata['entry'];
  var config = readconfig();
  var username = config['elkstack_api_username'];
  var password = config['elkstack_api_password'];
  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
  var options = { 
  method: postmethod,
  url: config['elkstack_api_endpoint'] + "/" + url,
  qs: { pretty: '' },
  headers: 
   { 
     'Cache-Control': 'no-cache',
      Authorization: auth,
     'Content-Type': 'application/json' 
   },
  body: {
    data
  },
  json: true 
  };
  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  return body;
  });
  return '..';
}