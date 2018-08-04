const FieldType = require('../Type')
const { mongoose } = require('keystone')
const util = require('util')
const utils = require('keystone-utils')

function productFeatureList(list, path, options) {
    this.seperator = options.seperator || ' | ';
    productFeatureList.super_.call(this, list, path, options)
}

productFeatureList.properName = 'ProductFeatureList'
util.inherits(productFeatureList, FieldType)

productFeatureList.prototype.addToSchema = function(schema){
    var ItemSchema = new mongoose.Schema({
        title: { type: String, required: true },
        text: { type: String },
        image: { type: Object }
    });

    schema.add(this._path.addTo({}, [ItemSchema]))
    this.bindUnderscoreMethods()
}

productFeatureList.prototype.format = function(item){
    return item.get(this.path).map(feature => feature.title).join(this.seperator)
}

productFeatureList.prototype.validateInput = function(data, callback){
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

    data["keyFeatures.futureFeatures"] = Object.values(data["keyFeatures.futureFeatures"])
    data["keyFeatures.features"] = Object.values(data["keyFeatures.features"])
    
    utils.defer(callback, result)
}

productFeatureList.prototype.validateRequiredInput = function(item, data, callback){
    const value = this.getValueFromData(data)
    let result = Array.isArray(value)
    
    if (result) {
        for (const feature of value) {
            if(!(typeof feauture === object && 
                'title' in feature && typeof feature.title === 'string' && feature.title.length &&
                'text' in feature && typeof feature.text === 'string')){
                result = false;
                break;
            }
        }
    }

    utils.defer(callback, result)
}

module.exports = productFeatureList