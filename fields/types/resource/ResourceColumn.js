import React from 'react'
import ItemsTableCell from '../../components/ItemsTableCell'
import ItemsTableValue from '../../components/ItemsTableValue'

var ResourceColumn = React.createClass({
    displayName: 'ResourceColumn',

    propTypes: {
        col: React.PropTypes.object,
        data: React.PropTypes.object,
        linkTo: React.PropTypes.string
    },

    renderValue() {
        var value = this.props.data.fields[this.props.col.path];

        return value.length + ' enteries';
    },

    render() {
        return (
            <ItemsTableCell>
                <ItemsTableValue to={this.props.linkTo} padded interior field={this.props.col.types}>
                    {this.renderValue()}
                </ItemsTableValue>
            </ItemsTableCell>
        )
    }
});

module.exports = ResourceColumn