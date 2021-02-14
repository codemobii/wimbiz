import { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const WebUtils = () => {
  const router = useRouter();

  //   Get
  function makeRef(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // State managers

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // Get products

  const getProducts = async () => {
    await Axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        host: "104.236.174.88",
        port: 3128,
      },
      method: "GET",
      url: `${process.env.apiUrl}getProducts`,
    })
      .then((res) => {
        setProducts({
          title: res.data[0].title,
          preview: res.data[0].previews[0],
          desc: res.data[0].desc,
          price: res.data[0].price,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Handle Register user and start flutter pay
  const handleAddUser = async (data) => {
    await Axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        host: "104.236.174.88",
        port: 3128,
      },
      method: "POST",
      url: `${process.env.apiUrl}adduser`,
      data,
    })
      .then((res) => {
        makePayment(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makePayment = async (data, product) => {
    const formRef = makeRef(20);

    // eslint-disable-next-line no-undef
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-c4c676322706278c4e45b09eb8ac0e4b-X",
      tx_ref: formRef,
      amount: data.amount,
      currency: "NGN",
      country: "NG",
      payment_options: "card",
      customer: {
        email: data.email,
        name: data.firstName + " " + data.lastName,
      },
      callback: async (d) => {
        console.log(d);
        const tnxData = {
          user: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            address: data.address,
            country: data.country,
            state: data.state,
            zipCode: data.zipCode,
          },
          product: {
            title: products.title,
            preview: products.preview,
            desc: products.desc,
            price: products.price,
          },
          flutterRef: d.flw_ref,
          transactionId: d.transaction_id,
        };

        await Axios({
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          proxy: {
            host: "104.236.174.88",
            port: 3128,
          },
          method: "POST",
          url: `${process.env.apiUrl}verifyTxn`,
          data: tnxData,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      customizations: {
        title: "Winbiz",
        description: "Payment gateway",
        logo: "http://wimbiz.org/wp-content/uploads/2017/03/logo-1.png",
      },
    });
  };

  return {
    loading,
    error,
    products,
    getProducts,
    makePayment,
    handleAddUser,
  };
};

export default WebUtils;
