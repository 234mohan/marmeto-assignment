import "./index.css";

const Product = (props) => {
  const { eachDetails } = props;
  const { compareAtPrice, image, price, title, vendor } = eachDetails;

  return (
    <div className="container-row">
      <img src={image} alt="men" className="men-image" />
      <div className="con">
        <p className="heading">{title}</p>
        <ul>
          <li> {vendor}</li>
        </ul>
      </div>
      <div className="con">
        <p className="p">{price}</p>
        <p className="p"> {compareAtPrice}</p>
        <p className="p"> 50% </p>
      </div>
      <button type="button" className="button">
        Add to Cart{" "}
      </button>
    </div>
  );
};

export default Product;
