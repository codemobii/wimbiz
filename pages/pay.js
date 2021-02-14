import React, { useEffect, useState } from "react";
import Axios from "axios";
import NumberFormat from "react-number-format";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Layout from "../components/layout";
import WebUtils from "../utils/web.utils";

export default function Pay() {
  const {
    loading,
    error,
    getProducts,
    products,
    handleAddUser,
    makePayment,
  } = WebUtils();

  useEffect(() => {
    getProducts();
  }, []);

  const getUser = async (email) => {
    await Axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        host: "104.236.174.88",
        port: 3128,
      },
      method: "GET",
      url: `${process.env.apiUrl}getUser`,
      params: {
        email: email,
      },
    })
      .then((res) => {
        if (res.data !== "") {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setCountry(res.data.country);
          setState(res.data.state);
          setZipCode(res.data.zipCode);
          setIsUser(true);
          setAddress(res.data.address[0] || "");
          set_address(res.data.address[1] || "");
          console.log(res.data);
        } else {
          setIsUser(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   State managers
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [_address, set_address] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    addresses: [address, _address],
    country: country,
    state: state,
    zipCode: zipCode,
    amount: parseFloat(products.price) * quantity,
  };

  return (
    <Layout title="Pay">
      <div className="row">
        <div className="col-md-12">
          <main role="main" className="pb-3">
            <div className="row">
              <div className="col-md-4 order-md-1 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-danger">Product / Programmes</span>
                </h4>
                <h6 className="d-flex justify-content-between  align-items-center mb-3">
                  <span className="text-muted">
                    Please selected the products you are paying for
                  </span>
                </h6>
                <ul className="list-group mb-3">
                  <li className="list-group-item  lh-condensed">
                    <div className=" d-flex justify-content-between">
                      <img src={products.preview} width={50} />
                      <div className="ml-3">
                        <h6 className="my-0">{products.title}</h6>
                        <small className="text-muted">{products.desc}</small>

                        <NumberFormat
                          value={products.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          renderText={(value) => (
                            <h4 className="text-muted">{value}</h4>
                          )}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      style={{ width: "50px" }}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                    <strong>
                      <span id="totVal">
                        Total:{" "}
                        <NumberFormat
                          value={products.price * parseFloat(quantity)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-2">
                <h4 className="mb-3 text-danger">Complete</h4>
                <h6 className="d-flex justify-content-between  align-items-center mb-3">
                  <span className="text-muted">
                    Enter your billing infomation
                  </span>
                </h6>
                <form className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => getUser(email)}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address2">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                      value={_address}
                      onChange={(e) => set_address(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="country">Country</label>
                      <CountryDropdown
                        value={country}
                        onChange={(e) => setCountry(e)}
                        classes="form-control"
                        id="state"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state">State</label>
                      <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(e) => setState(e)}
                        classes="form-control"
                        id="state"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg mt-5 btn-block"
                    type="button"
                    onClick={() => {
                      if (isUser) {
                        makePayment(data);
                      } else {
                        handleAddUser(data);
                      }
                    }}
                  >
                    Continue To Payment
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
