import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class selectDropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: 'productId'
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
                    <FormControl className="dropdown" componentClass="select" onChange={this.props.onDropdownChange}>
                        <option value="productId">ProductId</option>
                        <option value="category">Category</option>
                        <option value="description">Description</option>
                    </FormControl>
                </FormGroup>
            </Form>
        );
    }
}

export default selectDropDown;
