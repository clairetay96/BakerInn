import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './index.css'

const AddListing = () => {

    const [item, setItem] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [option, setOption] = useState("")
    const [location, setLocation] = useState("")
    const [success, setSuccess] = useState(false)

    const priceInput = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "/api/listings/new"
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item, description, price, category, option, location })
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        setItem("")
        setDescription("")
        setPrice("")
        setLocation("")
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }


    return (
        <div>
            <div className="addListing">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>Item:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                name="item"
                                type="text"
                                value={item}
                                onChange={(e) => { setItem(e.target.value) }}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>Description:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                name="description"
                                as="textarea"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>Price:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                name="price"
                                type="text"
                                value={price}
                                onChange={(e) => { priceInput(e) }}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>Category:</Form.Label>
                        <Col sm={10} style={{ display: "flex", justifyContent: "start", justifyItems: "center" }}>
                            <Form.Check
                                inline
                                label="Ingredient"
                                name="category"
                                type="radio"
                                value="ingredient"
                                onChange={(e) => { setCategory(e.target.value) }}
                                required />
                            <Form.Check
                                inline
                                label="Equipment"
                                name="category"
                                type="radio"
                                value="equipment"
                                onChange={(e) => { setCategory(e.target.value) }}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>For Loan/Sale:</Form.Label>
                        <Col sm={10} style={{ display: "flex", justifyContent: "start", justifyItems: "center" }}>
                            <Form.Check
                                inline
                                label="For Loan"
                                name="option"
                                type="radio"
                                value="loan"
                                onChange={(e) => { setOption(e.target.value) }}
                                required />
                            <Form.Check
                                inline
                                label="For Sale"
                                name="option"
                                type="radio"
                                value="sale"
                                onChange={(e) => { setOption(e.target.value) }}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ borderStyle: "none" }}>
                        <Form.Label column sm={2}>Location:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                name="location"
                                as="select"
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                                required>
                                <option value="">Please select a location</option>
                                <option value="north">North</option>
                                <option value="east">East</option>
                                <option value="south">South</option>
                                <option value="west">West</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <div>Upload photo area</div>
                    <Button type="submit" block>Add Listing</Button>
                    <div style={success
                        ? { visibility: 'visible', color: "green", marginTop: "10px", textAlign: "center" }
                        : { visibility: 'hidden', marginTop: "10px" }} >
                        {`Added Successfully!`}
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default AddListing;

