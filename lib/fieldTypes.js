const FieldType = require('../fields/types/Type');
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


var fields = {
	get AzureFile () { return require('../fields/types/azurefile/AzureFileType'); },
	get Boolean () { return require('../fields/types/boolean/BooleanType'); },
	get CatalogueFeatureList () { return catalogueFeatureList },
	get CloudinaryImage () { return require('../fields/types/cloudinaryimage/CloudinaryImageType'); },
	get CloudinaryImages () { return require('../fields/types/cloudinaryimages/CloudinaryImagesType'); },
	get Code () { return require('../fields/types/code/CodeType'); },
	get Color () { return require('../fields/types/color/ColorType'); },
	get Date () { return require('../fields/types/date/DateType'); },
	get DateArray () { return require('../fields/types/datearray/DateArrayType'); },
	get Datetime () { return require('../fields/types/datetime/DatetimeType'); },
	get Email () { return require('../fields/types/email/EmailType'); },
	get Embedly () { return require('../fields/types/embedly/EmbedlyType'); },
	get File () { return require('../fields/types/file/FileType'); },
	get GeoPoint () { return require('../fields/types/geopoint/GeoPointType'); },
	get Html () { return require('../fields/types/html/HtmlType'); },
	get Key () { return require('../fields/types/key/KeyType'); },
	get LocalFile () { return require('../fields/types/localfile/LocalFileType'); },
	get LocalFiles () { return require('../fields/types/localfiles/LocalFilesType'); },
	get Location () { return require('../fields/types/location/LocationType'); },
	get Markdown () { return require('../fields/types/markdown/MarkdownType'); },
	get Money () { return require('../fields/types/money/MoneyType'); },
	get Name () { return require('../fields/types/name/NameType'); },
	get Number () { return require('../fields/types/number/NumberType'); },
	get NumberArray () { return require('../fields/types/numberarray/NumberArrayType'); },
	get Password () { return require('../fields/types/password/PasswordType'); },
	get ProductFeatureList () { return require('../fields/types/productFeatureList/productFeatureListType'); },
	get Relationship () { return require('../fields/types/relationship/RelationshipType'); },
	get Resource () { return require('../fields/types/resource/resourceType'); },
	get S3File () { return require('../fields/types/s3file/S3FileType'); },
	get Select () { return require('../fields/types/select/SelectType'); },
	get Text () { return require('../fields/types/text/TextType'); },
	get TextArray () { return require('../fields/types/textarray/TextArrayType'); },
	get Textarea () { return require('../fields/types/textarea/TextareaType'); },
	get Url () { return require('../fields/types/url/UrlType'); },
};

module.exports = fields;
