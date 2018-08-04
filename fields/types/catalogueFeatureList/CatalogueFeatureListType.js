const FieldType = require('../Type');
const { mongoose } = require('keystone');
const util = require('util');
const utils = require('keystone-utils');

/**
 * CatalogueFeatureList FieldType constructor.
 *
 * @extends Field
 * @api public
 */
function catalogueFeatureList(list, path, options) {
    this.separator = options.separator || ' | ';
    catalogueFeatureList.super_.call(this, list, path, options);
}

catalogueFeatureList.properName = 'CatalogueFeatureList';
util.inherits(catalogueFeatureList, FieldType);

/**
 * Register the field in the database schema.
 *
 * @api public
 */
catalogueFeatureList.prototype.addToSchema = function(schema) {
    var ItemSchema = new mongoose.Schema({
      title: { type: String, required: true },
      text: { type: String },
      slug: { type: String },
      internalexternal: { type: String },
      lifecyclestatus: { type: String }
    });

    schema.add(this._path.addTo({}, [ItemSchema]));
    this.bindUnderscoreMethods();
};

/**
 * Format the field value.
 */
//catalogueFeatureList.prototype.format = function(item) {
//    //return 'formattedValue';
//    return item.get(this.path).map(feature => feature.slug).join(this.separator);
//};

/**
 * Validate that a field value has been provided.
 */
catalogueFeatureList.prototype.validateInput = function(data, callback) {

  if (data['keyFeatures.features'] === undefined) {
    const value = this.getValueFromData(data);
  } else {
    const value = Object.values(this.getValueFromData(data));
  }
  let result = true;

  if (data["catalogue.features"] === undefined) {
    data["catalogue.features"] = [];
  }

  if (data['keyFeatures.futureFeatures'] === undefined) {
    data['keyFeatures.futureFeatures'] = [];
  }

  if (data['keyFeatures.features'] === undefined) {
    data['keyFeatures.features'] = [];
  }

  data["catalogue.features"] = Object.values(data["catalogue.features"]);
  data['keyFeatures.features'] = Object.values(data['keyFeatures.features']);
  result = true;
  utils.defer(callback, result);
};

/**
 * Validate that a non-empty field value has been provided.
 */
catalogueFeatureList.prototype.validateRequiredInput = function(item, data, callback) {
    const value = this.getValueFromData(data);
    let result = Array.isArray(value);
    result = true;
    utils.defer(callback, result);
};

module.exports = catalogueFeatureList;
