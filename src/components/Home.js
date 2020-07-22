import React, { Component } from 'react'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: "",
            name: "",
            price: "",
            updateId: 0,
            product: []
        }
    }
    componentDidMount() {
        fetch("http://localhost:3001/api/data", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(
            res => res.json()
        ).then(
            (result) => {
                this.setState({
                    product: result
                })
            }
        ).catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //function to add product
    saveProduct = () => {
        let data = JSON.stringify({ name: this.state.name, price: this.state.price })
        fetch("http://localhost:3001/api/addProduct", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        }).then(
            res => res.json()
        ).then(
            (result) => {
                console.log(result)
                let product = this.state.product
                product.push({
                    _id: result._id,
                    name: result.name,
                    price: result.price
                })
                this.setState({
                    product: product,
                    _id: "",
                    name: "",
                    price: ""
                })
            }
        ).catch(err => console.log(err))
    }

    EditProduct = (key) => {
        const product = this.state.product[key]
        this.setState({
            name: product.name,
            price: product.price,
            _id: product._id
        })
    }

    OnEditProduct = () => {
        let data = JSON.stringify({ _id: this.state._id, name: this.state.name, price: this.state.price })
        fetch(`http://localhost:3001/api/updatedata`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        }).then(
            res => {
                // if (res.ok) {
                //     const _product = this.state.product
                //     _product.splice(key, 1);
                //     this.setState({
                //         product: _product
                //     })
                // } else {
                //     throw new Error(res.json());
                // }
                res.json()
            }
        ).then(
            (result) => {
                console.log(result)
            }
        ).catch(err => console.log(err))
    }

    deleteProduct = (id, key) => {
        fetch(`http://localhost:3001/api/deletedata/?id=${id}`, {
            method: 'DELETE'
        }).then(
            res => {
                if (res.ok) {
                    const _product = this.state.product
                    _product.splice(key, 1);
                    this.setState({
                        product: _product
                    })
                } else {
                    throw new Error(res.json());
                }
            }
        ).catch(err => console.log(err))
    }
    logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <div className="row mx-5">
                    <div className="col-sm-6 col-lg-6 col-xl-6">
                        <h2>User:{localStorage.getItem('user')}</h2>
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
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <button className="btn btn-warning mx-3" onClick={() => { this.EditProduct(key) }}>Update</button>
                                        <button className="btn btn-danger" onClick={() => { this.deleteProduct(item._id, key) }}>Delete</button>
                                    </td>
                                    <td>{key + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
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
                        <input type="number" name="price" value={this.state.price} onChange={this.handleChange} className="form-control" placeholder="Enter quantity" />
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.saveProduct}>Submit</button>
                    <button className="btn btn-primary btn-block" onClick={this.OnEditProduct}>Edit</button>
                </div>
            </div>
        )
    }
}

export default Home
