import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, title = "Home" }) {
  return (
    <>
      <Head>
        <title>Winbiz - {title}</title>
      </Head>
      {/* The Header Fall in */}
      <Header />
      <section id="breadcrumb">
        <div className="container">
          <ol className="breadcrumb">
            <li className="active text-danger font-weight-bold">{title}</li>
          </ol>
        </div>
      </section>
      {/* The Children (Page rendered) */}
      <section id="main">
        <div className="container">{children}</div>
      </section>

      {/* The footer */}
      {/* <Footer /> */}
    </>
  );
}
