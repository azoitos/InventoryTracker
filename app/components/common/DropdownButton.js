import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

function selectDropDown(props) {
    return (
        <Form>
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Filter Search By</ControlLabel>
                <FormControl className="dropdown" componentClass="select" onChange={props.onDropdownChange}>
                    <option value="productId">ProductId</option>
                    <option value="category">Category</option>
                    <option value="description">Description</option>
                </FormControl>
            </FormGroup>
        </Form>
    );
}


export default selectDropDown;
