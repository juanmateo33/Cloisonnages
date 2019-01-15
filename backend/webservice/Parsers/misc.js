const xml2json = require("xml2json");

/* Miscellaneous functions needed by multiple files */

function convertToArray(obj) {
  /*
  obj should look like the following:
  {
    key1: value1,
    key2: value2,
    ...
  }
  This function will return the following array:
  [{ name: key1, content: value1 }, { name: key2, content: value2 }, ... ]
  */

  const array = [];
  Object.keys(obj).forEach(key => {
    array.push({ name: key, content: obj[key] });
  });
  return array;
}

function getPropertyRawValue(object, CodPro) {
  /*
  After being converted to JSON, GEODE response format is:
    {
      ...
      Pro: [{
        CodPro: 1234,   // field ID
        ValPro: 5678    // value
      }, {
        CodPro: ...
        ValPro: ...
      }, ...]
    }
  This function finds the attributeObject {CodPro: ... , ValPro: ...}
  corresponding to CodPro and returns ValPro.
  object can be a room or an event.
  */

  const attributeObject = object.PRO.filter(
    property => property.CodPro === CodPro,
  )[0];

  // Check if attribute exists for this room
  if (!attributeObject) {
    return null;
  }

  return attributeObject.ValPro;
}

function getPropertyRawValueMultiple(object, CodPro) {
  /*
  same as previous function but for multiple attributes. Ex:
  Events that as a resource RES have several rooms:
  Pro: [{
        CodPro: RES,   // field ID
        ValPro: 569    // value
      }, {
        CodPro: RES
        ValPro: 570
      },{
        CodPro: RES
        ValPro: 860
      }, ...]
  */
  
  const attributeObject = object.PRO.filter(
    property => property.CodPro === CodPro,
  );

  console.log(attributeObject);

  // Check if attribute exists for this room
  if (!attributeObject) {
    return null;
  }

  return attributeObject;
}

function readXML(xml) {
  return JSON.parse(xml2json.toJson(xml));
}

module.exports = { convertToArray, getPropertyRawValue, getPropertyRawValueMultiple, readXML };