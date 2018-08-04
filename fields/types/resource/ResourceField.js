import Field from '../Field';
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Button, FormField, FormSelect, FormInput, FormLabel, FormRow, Card } from 'element'
import RelationshipField from '../relationship/relationshipField'
import _ from 'lodash'

function newItem() {
    return {
        label: '',
        url: '',
        type: '',
        assets: null
    }
}

module.exports = Field.create({
    displayName: 'ResourceField',

    statics: {
        type: 'Resource',
        type: {
            'ASSET' : 1,
            'LINK': 2
        }
    },

    getInitialState: function() {
        console.log("Initial props: %o", this.props)
        return {
            values: Array.isArray(this.props.value) ? this.props.value : []
        };
    },

    valueChanged: function(values) {
        this.props.onChange({
            path: this.props.path,
            value: values
        })
    },

    relationshipFieldChanged(path, properties) {
        this.updateItem({
            path,
            value: properties.values
        })
    },

    itemUrlChanged(path, event){
        console.log(`changed: ${path}`)

        this.updateItem({
            path,
            value: event.target.value
        })
    },

    itemLabelChanged(path, event){
        console.log(`changed: ${path}`)

        this.updateItem({
            path,
            value: event.target.value
        })
    },

    handleSelect(path, value) {
        console.log('change select')
        const values = this.state.values
        const [propert, index] = _.toPath(path).reverse()

        console.log(event)
        values[index][property] = value
        this.setState( { values })
        this.valueChanged(values)
    },

    addItem: function() {
        const values = this.state.values.concat(newItem())

        this.setState({ values }, () => {
            findDOMNode(this.refs['item_' + this.state.values.length]).focus();
        })

        this.valueChanged(values)

        setTimeout( () => {
            console.log("STATE")
            console.log(values)
            console.log(this.state)
        }, 500)
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

    itemTitleChanged(path, event){
        this.updateItem({
            path,
            value: event.target.value
        })
    },

    selectOptions() {
        return [
            {
                label: 'External link',
                value: 1
            },
            {
                label: 'Asset',
                value: 2
            }
        ]
    },

    renderResourceSelect(item, index){
        const refList = {
            key: 'Asset',
            path: 'assets',
            plural: 'Assets',
            singular: 'Asset'
        }

        return (
            <div>
                <FormLabel>Asset:</FormLabel>
                <RelationshipField
                    name={this.getInputName(`${this.props.path}[${index}][assets]`)}
                    value={item.assets}
                    many={this.props.manyAssets ? 'true' : ''}
                    refList={refList}
                    onChange={this.relationshipFieldChanged.bind(this, `${this.props.path}[${index}][assets]`)}
                    path={`${this.props.path}[${index}][assets]`}
                />
            </div>
        )
    },

    renderExternalLink(item, index){
        return(
            <div>
                <FormLabel>URL:</FormLabel>
                <FormInput
                    ref={'item_'+ (index + 1)}
                    name={this.getInputName(`${this.props.path}[${index}][url]`)}
                    value={item.url}
                    onChange={this.itemUrlChanged.bind(this, `${this.props.path}[${index}][url]`)}
                    placeholder="External URL"
                />
            </div>
        )
    },

    renderValueFallback: function() {
        return (
            <div>Please select the type of resource.</div>
        )
    },

    renderItem: function(item, index) {
        let valueSelect;
        if(item.type === '1'){
            valueSelect = this.renderExternalLink(item, index)
        } elseif(item.type === '2'){
            valueSelect = this.renderResourceSelect(item, index)
        }
        return(
            <Card style={{position: 'relative'}}>
                <FormRow>
                    <FormField>
                        <FormLabel>Label:</FormLabel>
                        <FormInput
                            ref={'item_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][label]`)}
                            value={item.label}
                            onChange={this.itemLabelChanged.bind(this, `${this.props.path}[${index}][label]`)}
                            placeholder="Resource Label"
                        />
                    </FormField>
                    <FormField width="one-third">
                        <FormLabel>Type of resources:</FormLabel>
                        <FormSelect options={this.selectOptions()}
                            ref={'item_'+ (index + 1)}
                            name={this.getInputName(`${this.props.path}[${index}][label]`)}
                            value={item.type}
                            onChange={this.handleSelect.bind(this, `${this.props.path}[${index}][label]`)}
                        />
                    </FormField>
                    <FormField width="two-thirds">
                        { valueSelect }
                    </FormField>

                    <Button type="link-cancel" onClick={this.removeItem.bind(this, item, index)} className="keystone-relational-button" style={{top:'0', right:'0'}}>
                        <span classNam="octicon octicon-x" />
                    </Button>
                </FormRow>
            </Card>
        )
    },

    renderField: function(){
        return(
            <div>
                {this.state.values.map(this.renderItem)}
                <Button ref="button-add" onClick={this.addItem}>Add resources</Button>
            </div>
        )
    }
})