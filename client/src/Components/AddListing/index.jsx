import React from 'react'
import { useForm } from './useForm'

const AddListing = () => {

    const [values, handleChange] = useForm({ item: "", description: "", price: "", category: "", location: "" })

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "/api/listings/new"
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item: values.item, description: values.description, price: values.price, category: values.category, location: values.location })
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }


    return (
        <div>
            <div className="addListing">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Item:</label>
                        <input type="text"
                            name="item"
                            value={values.item}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label >Description:</label>
                        <input type="text"
                            name="description"
                            value={values.description}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label >Price:</label>
                        <input type="text"
                            name="price"
                            value={values.price}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label >Category:</label>
                        <select name="category" onChange={handleChange}>
                            <option value="">Please select the category</option>
                            <option value="ingredient">Ingredient</option>
                            <option value="equipment">Equipment</option>
                        </select>
                    </div>
                    <div>
                        <label >Location:</label>
                        <select name="location" onChange={handleChange}>
                            <option value="">Please select the location</option>
                            <option value="north">North</option>
                            <option value="east">East</option>
                            <option value="south">South</option>
                            <option value="west">West</option>
                        </select>
                    </div>
                    <div>Upload photo area</div>
                    <button type="submit">Add Listing</button>
                </form>
            </div >
        </div>
    )
}

export default AddListing;

