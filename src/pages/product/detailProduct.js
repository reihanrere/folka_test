import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppbarCustom from "../../components/appbar";
import { Container, Grid, Tab, Tabs } from "@mui/material";
import BreadcrumbsCustom from "../../components/breadcrumbs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import starIcon from "../../assets/icon/star.svg";
import checkSquare from "../../assets/icon/check-square.svg";
import heart from "../../assets/icon/heart-red.svg";
import "./index.scss";
import { FormatRupiah } from "@arismun/format-rupiah";
import CustomButton from "../../components/button";
import ProductCard from "../../components/productCard";
import { getProductDetail } from "../../redux/actions/product";

function DetailProductPage() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const convertImages = () => {
    const data = productState?.productDetail?.data?.list[0].images;
    const arr = [];
    data?.map((d) => {
      arr.push({ original: d?.image_url, thumbnail: d?.image_url });
    });
    setImages(arr);
  };

  const stringTest = (d) => {
    const newText = d?.toString().replaceAll(/\\"|\\n/g, (match) => {
      if (match === '\\"') return '"';
      if (match === "\\n") return "\n";
      return match;
    });
    return `${newText}`;
  };

  useEffect(() => {
    if (productState?.productDetail.length === 0) {
      dispatch(getProductDetail(localStorage.getItem("productDetail")));
    }
    convertImages();
  }, [productState]);

  return (
    <div>
      <AppbarCustom />
      <Container
        style={{
          maxWidth: "1300px",
          paddingTop: "24px",
          paddingBottom: "100px",
        }}
      >
        <BreadcrumbsCustom
          data={[
            "Home",
            productState?.productDetail?.data?.list[0].name
              .replace(/\\/g, "")
              .replace(/"/g, "")
              .toUpperCase(),
          ]}
        />
        <Grid container spacing={1} paddingTop={"38px"}>
          <Grid item xs={6} md={6}>
            <div style={{ width: "530px", height: "700px" }}>
              <ImageGallery
                items={images}
                showNav={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets={false}
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6} className="detail-content">
            <div className="title">
              {productState?.productDetail?.data?.list[0].name
                .replace(/\\/g, "")
                .replace(/"/g, "")}
            </div>
            <div className="sub-title">
              {productState?.productDetail?.data?.list[0].slug.replace(
                /-/g,
                " "
              )}
            </div>
            <div className="rating">
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <span>{"(7)"}</span>
            </div>
            <div className="price">
              <span>
                <FormatRupiah
                  value={parseInt(
                    productState?.productDetail?.data?.list[0].price
                  )}
                />
              </span>
              <span>
                <img src={checkSquare} alt="check" />
                Tersedia
              </span>
            </div>
            <div className="add-cart">
              <div className="counter">
                <CustomButton
                  borderRadiusProp={"0px"}
                  boxShadowProp={"none"}
                  color={"#FFF"}
                  fontColorProp={"rgba(151, 151, 151, 1)"}
                  borderProp={"1px solid #F1F1F1"}
                >
                  +
                </CustomButton>
                <CustomButton
                  borderRadiusProp={"0px"}
                  boxShadowProp={"none"}
                  color={"#FFF"}
                  fontColorProp={"rgba(151, 151, 151, 1)"}
                  borderProp={"1px solid #F1F1F1"}
                >
                  1
                </CustomButton>
                <CustomButton
                  borderRadiusProp={"0px"}
                  boxShadowProp={"none"}
                  color={"#FFF"}
                  fontColorProp={"rgba(151, 151, 151, 1)"}
                  borderProp={"1px solid #F1F1F1"}
                >
                  -
                </CustomButton>
              </div>
              <div>
                <CustomButton borderRadiusProp={"0px"} boxShadowProp={"none"}>
                  TAMBAH KE KERANJANG
                </CustomButton>
              </div>
              <div className="like">
                <CustomButton
                  borderRadiusProp={"0px"}
                  boxShadowProp={"none"}
                  color={"#FFF"}
                  fontColorProp={"rgba(151, 151, 151, 1)"}
                  borderProp={"1px solid #F1F1F1"}
                >
                  <img
                    src={heart}
                    alt="check"
                    style={{ height: "30px", color: "red" }}
                  />
                </CustomButton>
              </div>
            </div>
            <div className="description">
              {stringTest(
                productState?.productDetail?.data?.list[0].short_description
              )}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          className="container-description"
          spacing={1}
          paddingTop={"38px"}
        >
          <Tabs
            value={activeTab}
            onChange={() => {}}
            indicatorColor="secondary"
            textColor="secondary"
            TabIndicatorProps={{
              style: { background: "#EB3F36", color: "#EB3F36" },
            }}
          >
            <Tab
              label="Deskripsi"
              style={{
                color: activeTab === 0 ? "#EB3F36" : "#000000",
                borderBottom: activeTab === 0 ? "2px solid #EB3F36" : "none",
              }}
            />
            <Tab
              label="Informasi"
              style={{
                color: activeTab === 1 ? "#EB3F36" : "#000000",
                borderBottom: activeTab === 1 ? "2px solid #EB3F36" : "none",
              }}
            />
          </Tabs>
          {activeTab === 0 && (
            <div className="description-text">
              {stringTest(
                productState?.productDetail?.data?.list[0].description
              )}
            </div>
          )}
        </Grid>
        <Grid
          container
          spacing={1}
          paddingTop={"38px"}
          className="recomendation"
        >
          <div className="recomendation-title">
            <div>REKOMENDASI UNTUK ANDA</div>
          </div>
          <div className="recomendation-content">
            {productState?.data?.data?.list?.map((d, i) => {
              if (i <= 2) {
                return (
                  <ProductCard
                    key={i}
                    title={d?.name.replace(/\\/g, "").replace(/"/g, "")}
                    subTitle={d?.slug.replace(/-/g, " ")}
                    price={d?.price}
                    images={d?.images[0]?.image_url}
                  />
                );
              }
            })}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default DetailProductPage;
