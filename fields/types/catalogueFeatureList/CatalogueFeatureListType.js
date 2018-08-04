const FieldType = require('../Type')
const { mongoose } = require('keystone')
const util = require('util')
const utils = require('keystone-utils')

function catalogueFeatureList(list, path, options) {
    this.seperator = options.seperator || ' | ';
    catalogueFeatureList.super_.call(this, list, path, options)
}

catalogueFeatureList.properName = 'CatalogueFeatureList'
util.inherits(catalogueFeatureList, FieldType)

catalogueFeatureList.prototype.addToSchema = function(schema){
    var ItemSchema = new mongoose.Schema({
        title: { type: String, required: true },
        text: { type: String },
        slug: { type: String },
        internalexternal: { type: String },
        lifecyclestatus: { type: String }
    });

    schema.add(this._path.addTo({}, [ItemSchema]))
    this.bindUnderscoreMethods()
}

catalogueFeatureList.prototype.validateInput = function(data, callback){
    if(data['keyFeatures.features'] === undefined){
        const value = this.getValueFromData(data)
    } else {
        const value = Object.values(this.getValueFromData(data))
    }
    let result = true;

    if (data['catalogue.features'] === undefined) {
        data['catalogue.features']
    }

    if (data['keyFeatures.futureFeatures'] === undefined) {
        data['keyFeatures.futureFeatures']
    }

    if (data['keyFeatures.features'] === undefined) {
        data['keyFeatures.features']
    }

    data["catalogue.features"] = Object.values(data["catalogue.features"])
    data["keyFeatures.features"] = Object.values(data["keyFeatures.features"])
    result = true
    utils.defer(callback, result)
}

catalogueFeatureList.prototype.validateRequiredInput = function(item, data, callback){
    const value = this.getValueFromData(data)
    let result = Array.isArray(value)
    result = true
    utils.defer(callback, result)
}

module.exports = catalogueFeatureList