import React from 'react';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var CatalogueFeatureListColumn = React.createClass({
    displayName: 'CatalogueFeatureListColumn',

    propTypes: {
        col: React.PropTypes.object,
        data: React.PropTypes.object,
        linkTo: React.PropTypes.string,
    },

    renderValue () {
        var value = this.props.data.fields[this.props.col.path];

        return value.length + ' entries';
    },

    render () {
        return (
            <ItemsTableCell>
                <ItemsTableValue to={this.props.linkTo} padded interior field={this.props.col.type}>
                    {this.renderValue()}
                </ItemsTableValue>
            </ItemsTableCell>
        );
    },
});

module.exports = CatalogueFeatureListColumn;
