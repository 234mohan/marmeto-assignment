import { Component } from "react";

import Loader from "react-loader-spinner";
import Product from "../Product";
import "./index.css";

class ShoppingApp extends Component {
  state = {
    categoryList: [],
    isShown: false,
    categoryItem: "Men",
  };

  componentDidMount() {
    this.getProduct();
  }

  onButton = (type) => {
    this.setState({ categoryItem: type });
  };

  getProduct = async () => {
    this.setState({ isShown: true });
    const url =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const updatedData = data.categories.map((eachItem) => ({
      categoryName: eachItem.category_name,
      categoryProducts: eachItem.category_products.map((eachProduct) => ({
        badgeText: eachProduct.badge_text,
        compareAtPrice: eachProduct.compare_at_price,
        id: eachProduct.id,
        image: eachProduct.image,
        price: eachProduct.price,
        title: eachProduct.title,
        vendor: eachProduct.vendor,
      })),
    }));
    this.setState({ categoryList: updatedData, isShown: false });
  };

  render() {
    const { categoryList, isShown, categoryItem } = this.state;
    const filteredList = categoryList.filter(
      (eachCategory) => eachCategory.categoryName === categoryItem
    );
    return (
      <>
        {isShown ? (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        ) : (
          <div>
            <h1 className="hea"> SELECT YOUR CHOICE </h1>
            <div className="container-button">
              {categoryList.map((eachCategory) => (
                <button
                  type="button"
                  className="buttons"
                  onClick={() => this.onButton(eachCategory.categoryName)}
                  key={eachCategory.categoryName}
                >
                  {eachCategory.categoryName}
                </button>
              ))}
            </div>
            {filteredList.map((category) => (
              <div key={category.categoryName}>
                <ul className="lists">
                  {category.categoryProducts.map((product) => (
                    <Product
                      key={`${category.categoryName}-${product.id}`}
                      eachDetails={product}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        ;
      </>
    );
  }
}

export default ShoppingApp;
