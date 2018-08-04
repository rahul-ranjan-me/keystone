import Field from '../Field';
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Button, FormField, FormInput, FormLabel, FormRow } from 'element'
import HtmlField from '../html/HtmlField'
import _ from 'lodash'

function newItem() {
    return {
        title: '',
        text: '',
        image: {
            url: '',
            path: '',
            mimetype: '',
            size: 0,
            filename: ''
        }
    }
}

module.exports = Field.create({
    displayName: 'ProductFeatureListField',

    statics: {
        type: 'ProductFeatureList'
    },

    getInitialState: function() {
        return {
            values: Array.isArray(this.props.value) ? this.props.value : []
        };
    },

    addItem: function() {
        const values = this.state.values.concat(newItem())

        this.setState({ values }, () => {
            findDOMNode(this.refs['item_' + this.state.values.length]).focus();
        })

        this.valueChanged(values)
    },

    updateItem: function(event, item, index, itemKey) {
        const values = this.state.values
        const [property, index] = _.toPath(item.path).reverse()
        values[index][property] = item.value;
        this.setState({ values })
        this.valueChanged(values)
    },

    removeItem: function(item) {
        const values = _.without(this.state.values, item)

        this.setState( { values }, () => {
            findDOMNode(this.refs.button).focus()
        })

        this.valueChanged(values)
    },

    valueChanged: function(values) {
        this.props.onChange({
            path: this.props.path,
            value: values
        })
    },

    itemTitleChanged(path, event){
        this.updateItem({
            path,
            value: event.target.value
        })
    },

    renderField: function() {
        return (
            <div>
                {this.state.values.map(this.renderItem)}
                <Button ref="button" onClick={this.addItem}>Add item</Button>
            </div>
        )
    },

    renderItem: function(item, index) {
        return(
            <div style={{position: 'relative', marginBottom: '2em'}}>
                <FormRow>
                    <FormField>
                        <FormLabel>{'Item '+ (index + 1)}</FormLabel>
                        <FormInput
                            ref={'item_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][title]`)}
                            value={item.title}
                            onChange={this.itemTitleChanged.bind(this, `${this.props.path}[${index}][title]`)}
                            placeholder="Title"
                            autoComplete="off"
                            style={{marginBottom: '1em'}}
                        />
                    </FormField>
                    <FormField>
                        <HtmlField
                            path={`${this.props.path}[${index}][text]`}
                            value={item.text}
                            onChange={this.updateItem.bind(this)}
                            wysiwyg="true"
                        />
                    </FormField>

                    <Button type="link-cancel" onClick={this.removeItem.bind(this, item, index)} className="keystone-relational-button">
                        <span classNam="octicon octicon-x" />
                    </Button>
                </FormRow>
            </div>
        )
    },

    renderValue: function(){
        return(
            <div>
                {this.state.values.map((item, index) => {
                    <FormRow key={index} style={{ marginBottom: '1em'}}>
                        <FormField>
                            <FormInput value={item.title} noedit style={{marginBottom: '1em'}} />
                        </FormField> 
                        <FormField>
                            <FormInput value={item.text} noedit multiline />
                        </FormField> 
                    </FormRow>
                })}
            </div>
        )
    }
})