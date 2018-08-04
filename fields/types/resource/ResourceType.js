const FieldType = require('../Type')
const { mongoose } = require('keystone')
const util = require('util')
const utils = require('keystone-utils')

function resource(list, path, options) {
    this.seperator = options.seperator || ' | ';

    this.relationshipRef = options.relationshipRef || ''

    this._nativeType = keystone.mongoose.Schema.Types.ObjectId
    this._properties = ['relationshipRef', 'manyAssets']
    resource.super_.call(this, list, path, options)
}

resource.properName = 'resource'
util.inherits(resource, FieldType)

resource.prototype.addToSchema = function(schema){
    const assetDef = {
        type: this._nativeType
    }

    var ItemSchema = new mongoose.Schema({
        type: this._nativeType,
        label: String,
        type: Number,
        url: String,
        assets: [assetDef]
    });

    schema.add(this._path.addTo({}, [ItemSchema]))
    this.bindUnderscoreMethods()
}

resource.prototype.format = function(item){
    return 'formattedValue'
}

resource.prototype.validateInput = function(data, callback){
    const values = this.getValueFromData(data)
    
    if(value === undefined){
        data['developerResource.resources'] = []
    }

    utils.defer(callback, result)
}

resource.prototype.validateRequiredInput = function(item, data, callback){
    utils.defer(callback, true)
}

module.exports = resource