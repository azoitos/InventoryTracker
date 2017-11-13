import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class selectDropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: 'ProductId'
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            filter: event.target.value
        })
    }

    render() {
        
        return (
            <Form>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Filter Search By</ControlLabel>
                    <FormControl componentClass="select" onChange={this.props.onDropdownChange}>
                        <option value="ProductId">ProductId</option>
                        <option value="Category">Category</option>
                        <option value="Description">Description</option>
                    </FormControl>
                </FormGroup>
            </Form>
        );
    }
}

export default selectDropDown;
