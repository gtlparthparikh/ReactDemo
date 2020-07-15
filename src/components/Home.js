import React, { Component } from 'react'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            name: "",
            quantity: "",
            updateId: 0,
            product: []
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    saveProduct = () => {
        let data = this.state.product;
        data.push({
            id: this.state.id,
            name: this.state.name,
            quantity: this.state.quantity
        })
        this.setState({
            product: data,
            id: this.state.id + 1,
            name: "",
            quantity: ""
        })
    }
    onEditProduct = (e) => {
        let data = this.state.product[e]
        this.setState({
            name: data.name,
            updateId: data.id,
            quantity: data.quantity
        })
    }
    saveEdit = () => {
        let updateData = this.state.product;
        updateData[this.state.updateId] = {
            id: this.state.updateId,
            name: this.state.name,
            quantity: this.state.quantity
        }
        this.setState({
            product: updateData,
            name: "",
            quantity: "",
            updateId: ''
        })
    }
    logout = () => {
        localStorage.removeItem('isLoggedIn')
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <div className="row mx-5">
                    <div className="col-sm-6 col-lg-6 col-xl-6">
                        <h3>Athena</h3>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-xl-6">
                        <button className="btn btn-primary float-right" onClick={this.logout}>Logout</button>
                    </div>
                </div>
                <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th scope="col">id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => { this.onEditProduct(key) }}>Update</button>
                                    </td>
                                    <td>{item.id + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="container">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="name" value={this.state.name} className="form-control" placeholder="Enter name" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Product Quantity</label>
                        <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} className="form-control" placeholder="Enter quantity" />
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.saveProduct}>Submit</button>
                    <button className="btn btn-primary btn-block" onClick={this.saveEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export default Home
