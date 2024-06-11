import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Dashboard(props) {
  const [getProductsData, setGetProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const [cart, setCart] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((response) => {
      console.log(response.data)
      const categories = response.data.map(cate => (cate.category))
      const uniqCategories = [...new Set(categories)]; // Remove Duplicate values 
      console.log(uniqCategories);
      setCategories(uniqCategories)
      setGetProductsData(response.data)
    })
  }, []);

  const handleCategoryClick = (category) => () => {
    console.log(category);
    const filterCategory = getProductsData.filter((product) => {
      return (
        product.category === category
      )
    })
    console.log(filterCategory);
    setFilterByCategory(filterCategory);
  }
  // Search Bar Functionality
  const handleSearchCategory = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  }
  const searchQuerycategory = categories.filter((search) => {
    return search.toLowerCase().includes(searchQuery.toLowerCase());
  })

  // Add to Cart Functionality

  const handleAddToCart = (product) => () => {
    setCart((prevProducts => {
      const existingProducts = [...prevProducts, product]
      console.log(existingProducts);
      return existingProducts;
    }));
    console.log(product);
  }


  return (
    <>
      <div className={styles.freeDeleviry}><h5>Free Home Delivery !</h5></div>
      <div className={styles.logo}>
        <div className={styles.row}>
          <div className={styles.logo_container}><span className={styles.logo1}>Grocery</span><span className={styles.logo2}>Mart <span>.</span></span></div>
          <div className={styles.searchbar_container}>
            <i className="fa-solid fa-magnifying-glass" id={styles.search}></i>
            <input type='text' className={styles.search_input} placeholder="What Are You Looking For?"
              onChange={handleSearchCategory}
              value={searchQuery} />
            <Link to={'/login'}> <i className={'fa-solid fa-user'} id={styles.user} title='My account'></i></Link>
          </div>
        </div>
      </div>
      {/* NavBar Section  */}
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <div class="container ">
            <div class="row justify-content-left">
              <div class="col-md-4">
                <div class="input-group">
                  <select class="form-select" aria-label="Default select example">
                    <option value="" selected disabled>All Categories</option>
                    <option value="option1" onChange={handleCategoryClick}>Fruits</option>
                    <option value="option2">Vegetables</option>
                    <option value="option3">Flour</option>
                    <option value="option4">Cookies</option>
                    <option value="option5">Meat</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <form class="d-flex col-md-7" >
            <div className={styles.navbar}>
              <a href="#home" className={styles.nav_hover}>Home</a>
              <a href="#shop" className={styles.nav_hover}>Shop</a>
              <div className={styles.dropdown_page}>
                <button href="#pages" className={styles.dropbtn}>Pages
                  <i className="fa fa-caret-down"></i>
                </button>
                <div class={styles.dropdown_content}>
                  <a href="#" className={styles.nav_hover}>About us</a>
                  <a href="#" className={styles.nav_hover}>Blog</a>
                  <a href="#" className={styles.nav_hover}>Faq</a>
                </div>
              </div>
              <a href="#news" className={styles.nav_hover}>BestSeller</a>
              <a href="#news" className={styles.nav_hover}>Deal Of The Day</a>
              <a href="#news" className={styles.nav_hover}>Contact Us</a>
              <a href="#news" className={styles.nav_hover}><i className='fa fa-cart-shopping'></i><sup>{ }</sup></a>

            </div>
          </form>
        </div>
      </nav>

      <div className={styles.body}>
        <h2 className="mb-4 pt-3 text-center text-primary">Products Dashboard</h2>
        <p className="text-muted mb-4 text-center text-suceess">View detailed information about your products below</p>

        <h2 className={styles.ms_3}>Market Category</h2>
        <div className='row container-fluid'>
          {searchQuerycategory.map((category) => {
            return (<div className="col-md-2">
              <div class="card mb-3">
                <div class="card-body">
                  <img src={`https://source.unsplash.com/1600x900/?${category}`} class="card-img" alt={category} />
                  <h5><a href="##" class={styles.categoryAnchorTag}
                    onClick={handleCategoryClick(category)}>{category}</a>
                  </h5>
                </div>
              </div>
            </div>)
          })}
        </div>
        <hr />


        {filterByCategory.length > 0 && <div className='container container-fluid'>
          <div className="row">
            <div className='col-md-12'><h2>Products</h2></div>

            <div className='col-md-9'>
              <div className="row">
                {filterByCategory.map((product) => (
                  <div className="col-md-4">
                    <div className="card mb-3">
                      <img src={`https://source.unsplash.com/1600x900/?${product.image.split('.')[0]}`} class="card-img-top" alt={product.name} />
                      <div class="card-body">
                        <h5 class="card-title">{product.name}</h5>
                        <p class="card-text">{product.discription}</p>
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <td>Price</td>
                              <td>${product.price}</td>
                            </tr>
                            <tr>
                              <td>Category</td>
                              <td>{product.category}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>{product.city}</td>
                            </tr>
                            <tr>
                              <td>Available</td>
                              <td><span class="text-danger">{product.available ? "Yes" : "No"}</span></td>
                            </tr>
                          </tbody>
                        </table>

                        {/* <p class="card-text"><small class="text-muted">Updated on 2024-05-04</small></p> */}
                        <div className='text-center mt-3'>
                          <button className='btn btn-primary btn-sm'
                            onClick={handleAddToCart(product)} value={product.id}><i className='fa fa-cart-shopping'></i> Add cart</button>
                        </div>
                      </div>
                    </div>
                  </div>


                ))}
              </div>
            </div>
            <div className='col-md-3'>
              <h2 class="text">Cart Items</h2>
              {cart.length > 0 && <div className="card">
                <div className="card-body">
                  <div className='d-flex justify-content-between mb-3'>
                    <strong>Product Name</strong>
                    <strong>Price</strong></div>
                  {cart.map((product) => {
                    return (<div className='d-flex justify-content-between'>
                      <div className='mb-1'>{product.name}</div>
                      <div className='text-primary mb-1'>$ {product.price}</div>
                    </div>);
                  })}
                </div>
                <div className='card-footer d-flex justify-content-between'>
                  <div>Total</div>
                  <div className='text-primary'>$ {cart.reduce((acc, cur) => acc + cur.price, 0).toFixed(2)}</div>
                </div>
                <button type="button" class="btn btn-outline-success">Book Your Order</button>
              </div>
              }
            </div>

          </div>
        </div>}

      </div>





    </>
  )
}

export default Dashboard
