import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import ImageGallery from "react-image-gallery";
import axios from 'axios';
import { useParams } from "react-router-dom";

const images = [
  // array holding item images
  {
    original:
      "https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/iot1dbjmzr7z6kfkoxrb.png",
    thumbnail:
      "https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/iot1dbjmzr7z6kfkoxrb.png",
  },
  {
    original:
      "https://cache.mrporter.com/variants/images/666467151993137/fr/w2000_q80.jpg",
    thumbnail:
      "https://cache.mrporter.com/variants/images/666467151993137/fr/w2000_q80.jpg",
  },
  {
    original:
      "https://www.snipesusa.com/media/catalog/product/cache/1/thumbnail/2000x/040ec09b1e35df139433887a97daa66f/n/i/nike_315115-112_03.jpg",
    thumbnail:
      "https://www.snipesusa.com/media/catalog/product/cache/1/thumbnail/2000x/040ec09b1e35df139433887a97daa66f/n/i/nike_315115-112_03.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  title: {
    // title of product
    display: "flex",
    justifyContent: "center",
  },
  rLayout: {
    // custom portion for entire product
    display: "flex",
  },
  c1Layout: {
    // custom portion for images
    lg: 12,
    xs: 24,
    width: "40%",
    height: 550,
  },
  c2Layout: {
    // custom portion for details
    lg: 12,
    xs: 24,
    width: "60%",
    height: 550,
  },
  footer: {
    // custom footer
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Listing(){
const [listing, setListing] = useState({});

  let { id } = useParams(); //url 
  useEffect(() => {
    axios.get('http://localhost:4000/listings/' + id)
      .then(response => {
        setListing(response.data)
      })
    console.log(listing)
  }, [])
  

    const classes = useStyles();
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.title}>
          <h1>{listing.name}</h1>
        </div>
        <Grid>
          <Row className={classes.rLayout}>
            <Col className={classes.c1Layout}>
              {/* column for item images */}
              <ImageGallery showPlayButton={false} items={images} />
            </Col>
            <Col className={classes.c2Layout}>
              {/* column for item details */}
              <div style={{ padding: 5 }}>
                {/* rating section */}
                Rating: COMING SOON
              </div>
              <hr />
              <div style={{ padding: 10 }}>
                {/* description section */}
                LEGENDARY STYLE
                <br />
                {listing.description}
                <br />
              </div>
              <hr />
              <div>
                {/* price section */}
                <Row style={{ padding: 10 }}>
                  <Col>{"Price: $" + listing.price}</Col>
                  <br />
                  <Col>
                    <form>
                      <label>
                        Shoe Size: 
                        <select>
                          <option>{listing.size}</option>
                        </select>
                      </label>
                    </form>
                    <br />
                  </Col>
                  <Col>
                    <form>
                      <label>{"Shoe Quantity: "}</label>
                      <select>
                        <option>{listing.condition}</option>
                      </select>
                    </form>
                  </Col>
                </Row>
                <Row>
                  <Button>BuyNow</Button>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
};
