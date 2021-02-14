import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Get the files from link sources */}
          <link
            rel="stylesheet"
            href="lib/bootstrap/dist/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="css/site.css" />
          <link href="lib/font-awesome/css/all.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Get the scripts */}
          <script src="https://checkout.flutterwave.com/v3.js"></script>
          <script src="lib/jquery/dist/jquery.min.js"></script>
          <script src="lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
          <script src="js/site95be.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
