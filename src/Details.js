import { Component } from "react/cjs/react.production.min";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className="details">
            <Carousel images={images} name={name} />
            <div>
              <h1>{name}</h1>
              <h2>
                {animal} - {breed} - {city}, {state}
              </h2>
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
              <p>{description}</p>
              {showModal ? (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {name}?</h1>
                    <div className="buttons">
                      <button
                        onClick={this.adopt}
                        style={{ backgroundColor: theme }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={this.toggleModal}
                        style={{ backgroundColor: theme }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>
              ) : null}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default function DetailsWithRouterWithErrorBoundary() {
  const DetailsWithRouter = withRouter(Details);
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
