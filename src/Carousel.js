import { Component } from "react/cjs/react.production.min";

class Carousel extends Component {
  state = { active: 0 };
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({ active: +event.target.dataset.index });
  };

  render() {
    const { active } = this.state;
    const { images, name } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt={name} />
        <div className="carousel-smaller">
          {images.map((img, index) => (
            <img
              key={img}
              src={img}
              data-index={index}
              onClick={this.handleIndexClick}
              className={index === active ? "active" : ""}
              alt={name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
