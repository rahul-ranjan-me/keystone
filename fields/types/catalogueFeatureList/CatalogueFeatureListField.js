import Field from '../Field';
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Button, FormField, FormInput, FormLabel, FormRow } from 'element'
import HtmlField from '../html/HtmlField'
import _ from 'lodash'

function newItem() {
    return {
        title: '',
        slug: '',
        text: '',
        lifecyclestatus: '',
        internalexternal: ''
    }
}

module.exports = Field.create({
    displayName: 'CatalogueFeatureListField',

    statics: {
        type: 'CatalogueFeatureList'
    },

    getInitialState: function() {
        return {
            values: Array.isArray(this.props.value) ? this.props.value : []
        };
    },

    addItem: function() {
        const values = this.state.values.concat(newItem())

        this.setState({ values }, () => {
            findDOMNode(this.refs['title_' + this.state.values.length]).focus();
        })

        this.valueChanged(values)
    },

    updateItem: function(event, item, index, itemKey) {
        var inputRef = itemKey + "_" + (index + 1)
        var inputName = this.getInputName(`${this.props.path}[${index}][${itemKey}]`)
        var nodeByRefValue = findDOMNode(this.refs[inputRef]).value
        var isDebug = false;
        if(isDebug){
            document.write("<pre>");
            document.write("--- Before change --- \n")
            document.write("item                :" + JSON.stringify(item) + "\n")
            document.write("index               :" + JSON.stringify(index) + "\n")
            document.write("itemKey             :" + JSON.stringify(itemKey) + "\n")
            document.write("this.state.values   :" + JSON.stringify(this.state.values) + "\n")
            document.write("Form input name     :" + inputName + "\n")
            document.write("Form input ref      :" + inputRef + "\n")
            document.write("nodeByRefValue      :" + nodeByRefValue + "\n")
            document.write("this.props          :" + JSON.stringify(this.props) + "\n")
        }
        var values = this.state.values

        values[index][itemKey] = this.cleanInput ? this.cleanInput(nodeByRefValue) : nodeByRefValue
        this.setState({
            value: values
        })
        this.valueChanged(values)

        if(isDebug){
            document.write("--- After change --- \n")
            document.write("this.state.values   :" + JSON.stringify(this.state.values) + "\n")
            document.write("this.props          :" + JSON.stringify(this.props) + "\n")
        }
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

    renderField: function() {
        return (
            <div>
                {this.state.values.map(this.renderItem)}
                <Button ref="button" onClick={this.addItem}>Add item</Button>
            </div>
        )
    },

    renderItem: function(item, index) {
        const title = this.processInputValue ? this.processInputValue(item.title) : item.title,;
        const text = this.processInputValue ? this.processInputValue(item.text) : item.text;
        const slug = this.processInputValue ? this.processInputValue(item.slug) : item.slug; 
        const internalexternal = this.processInputValue ? this.processInputValue(item.internalexternal) : item.internalexternal;
        const lifecyclestatus = this.processInputValue ? this.processInputValue(item.lifecyclestatus) : item.lifecyclestatus;
        return(
            <div style={{position: 'relative', marginBottom: '2em', borderBottom: '1px solid #b5b5b5'}}>
                <FormRow>
                    <FormField>
                        <FormLabel>{'Item '+ (index + 1)}</FormLabel>
                        <FormInput
                            ref={'title_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][title]`)}
                            path={`${this.props.path}[${index}][title]`}
                            value={title}
                            onChange={this.updateItem.bind(this, this, item, index, 'title')}
                            placeholder="Title"
                            autoComplete="off"
                            style={{marginBottom: '1em'}}
                        />
                    </FormField>
                    <FormField style={{width: '100%'}}>
                        <FormLabel>{'Description'}</FormLabel>
                        <FormInput
                            ref={'text_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][text]`)}
                            path={`${this.props.path}[${index}][text]`}
                            value={text}
                            onChange={this.updateItem.bind(this, this, item, index, 'text')}
                        />
                    </FormField>
                    <FormField style={{width: '100%'}}>
                        <FormLabel>{'Slug'}</FormLabel>
                        <FormInput
                            ref={'slug_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][slug]`)}
                            path={`${this.props.path}[${index}][slug]`}
                            value={slug}
                            onChange={this.updateItem.bind(this, this, item, index, 'slug')}
                        />
                    </FormField>
                    <FormField style={{width: '50%'}}>
                        <FormLabel>{'Direction Facing'}</FormLabel>
                        <select
                            style={{display: 'inherit'}}
                            ref={'internalexternal_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][internalexternal]`)}
                            path={`${this.props.path}[${index}][internalexternal]`}
                            value={internalexternal_}
                            onChange={this.updateItem.bind(this, this, item, index, 'internalexternal')}>>
                            <option value="None">None</option>
                            <option value="Internal">Internal</option>
                            <option value="External">External</option>
                        </select>
                    </FormField>
                    <FormField style={{width: '50%'}}>
                        <FormLabel>{'Lifecycle Status'}</FormLabel>
                        <select
                            style={{display: 'inherit'}}
                            ref={'lifecyclestatus_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][lifecyclestatus]`)}
                            path={`${this.props.path}[${index}][lifecyclestatus]`}
                            value={lifecyclestatus}
                            onChange={this.updateItem.bind(this, this, item, index, 'lifecyclestatus')}>>
                            <option value="None">None</option>
                            <option value="Idea">Idea</option>
                            <option value="Dev">Dev</option>
                            <option value="Live">Live</option>
                        </select>
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
                        <FormField>
                            <FormInput value={item.slug} noedit multiline />
                        </FormField> 
                        <FormField>
                            <FormInput value={item.internalexternal} noedit multiline />
                        </FormField> 
                        <FormField>
                            <FormInput value={item.lifecyclestatus} noedit multiline />
                        </FormField> 
                    </FormRow>
                })}
            </div>
        )
    }
})