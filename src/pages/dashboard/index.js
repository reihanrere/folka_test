import React, { useEffect, useState } from "react";
import AppbarCustom from "../../components/appbar";
import { Collapse, Container, Grid } from "@mui/material";
import BreadcrumbsCustom from "../../components/breadcrumbs";

import "./index.scss";
import Select from "react-select";
import ProductCard from "../../components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, getProductList } from "../../redux/actions/product";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PriceRangeSlider from "../../components/priceRangeSlider";
import ProductCategory from "../../components/productCategory";
import dataJson from "./productCategory.json";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const dummyData = dataJson;
  const authState = useSelector((state) => state.auth);
  const productState = useSelector((state) => state.product);
  const [productsPerPage, setProductsPerPage] = useState("10");
  const [open, setOpen] = useState(true);
  const [orderPerPage, setOrderPerPage] = useState({
    value: "product_name,ASC",
    label: "Nama Product ASC",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [valueRange, setValueRange] = useState([100000, 1000000]);

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const optionsProduct = [
    { value: "product_name,ASC", label: "Nama Product ASC" },
    { value: "product_name,DESC", label: "Nama Product DESC" },
    { value: "price,ASC", label: "Price ASC" },
    { value: "price,DESC", label: "Price DESC" },
    { value: "date,ASC", label: "Date ASC" },
    { value: "date,DESC", label: "Date DESC" },
  ];

  const apiGetListProduct = () => {
    try {
      dispatch(
        getProductList({
          page: currentPage,
          limit: productsPerPage,
          order: orderPerPage.value,
          price:
            valueRange.join(",") === "100000,1000000"
              ? ""
              : valueRange.join(","),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk mengubah halaman
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // Hitung jumlah halaman total
  const totalPages = Math.ceil(
    productState?.data?.data?.total / parseInt(productsPerPage)
  );

  const handleMinPriceChange = (event) => {
    const minPrice = parseInt(
      event.target.value.replace(/[Rp. ]/g, "").replace(/\./g, "")
    );
    setValueRange([minPrice, valueRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const maxPrice = parseInt(
      event.target.value.replace(/[Rp. ]/g, "").replace(/\./g, "")
    );
    setValueRange([valueRange[0], maxPrice]);
  };

  const handleChangeRange = (e, newValue) => setValueRange(newValue);

  const handleDetailPage = (e) => {
    const originalString = e;
    if (originalString.includes("\\")) {
      const modifiedString = originalString.replace(/"/g, '\\\\"');
      dispatch(getProductDetail(modifiedString));
      localStorage.setItem("productDetail", modifiedString);
    } else {
      dispatch(getProductDetail(originalString));
      localStorage.setItem("productDetail", originalString);
    }
    navigator("/detail");
  };

  useEffect(() => {
    apiGetListProduct();
  }, [orderPerPage, valueRange]);

  return (
    <div>
      <AppbarCustom />
      <Container style={{ maxWidth: "1300px", paddingTop: "24px" }}>
        <BreadcrumbsCustom data={["Home", "Produk", "Roasted Ban"]} />
        <Grid container spacing={1} paddingTop={"38px"}>
          <Grid className="filter-content" item xs={6} md={3}>
            <div className="filter-wrapper">
              <div className="header" onClick={() => setOpen(!open)}>
                <div>URUTKAN BERDASARKAN</div>
                {open ? <ExpandLess /> : <ExpandMore />}
              </div>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <PriceRangeSlider
                  data={valueRange}
                  handleChangeRange={handleChangeRange}
                  handleMaxPriceChange={handleMaxPriceChange}
                  handleMinPriceChange={handleMinPriceChange}
                />
                <ProductCategory title={"Origin"} data={dataJson.origin} />
                <ProductCategory title={"Spesies"} data={dataJson.spesies} />
                <ProductCategory
                  title={"Roast Level"}
                  data={dataJson.roastLevel}
                />
                <ProductCategory title={"Tested"} data={dataJson.tasted} />
                <ProductCategory
                  title={"Processing"}
                  data={dataJson.processing}
                />
              </Collapse>
            </div>
          </Grid>
          <Grid className="product-content" item xs={6} md={9}>
            <div className="header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>Menampilkan</div>
                <Select
                  options={options}
                  value={options.find(
                    (option) => option.value === parseInt(productsPerPage)
                  )}
                  defaultValue={options[0]}
                  onChange={(selectedOption) =>
                    setProductsPerPage(selectedOption.value.toString())
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: "1px solid #F2F2F2",
                      background: "rgba(248, 248, 248, 0.75)",
                      width: "100px",
                      height: "30px",
                      boxShadow: "none",
                      borderRadius: "0",
                      "&:hover": {
                        border: "1px solid #F2F2F2",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      marginRight: "10px",
                      color: "#696969",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "50px", // Ubah ukuran dropdown ketika dibuka
                    }),
                  }}
                />
                <div style={{ marginLeft: "10px" }}>
                  dari {productState?.data?.data?.total}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>Urutkan</div>
                <Select
                  options={optionsProduct}
                  value={orderPerPage}
                  onChange={(e) => setOrderPerPage(e)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: "1px solid #F2F2F2",
                      background: "rgba(248, 248, 248, 0.75)",
                      width: "200px",
                      height: "30px",
                      boxShadow: "none",
                      borderRadius: "0",
                      "&:hover": {
                        border: "1px solid #F2F2F2",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      marginRight: "10px",
                      color: "#696969",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "200px", // Ubah ukuran dropdown ketika dibuka
                    }),
                  }}
                />
              </div>
            </div>
            <div className="list-product">
              {productState?.data?.data?.list?.map((data, index) => {
                return (
                  <ProductCard
                    key={index}
                    title={data?.name.replace(/\\/g, "").replace(/"/g, "")}
                    subTitle={data?.slug.replace(/-/g, " ")}
                    price={data?.price}
                    images={data?.images[0]?.image_url}
                    handleDetailPage={() => handleDetailPage(data?.name)}
                  />
                );
              })}
            </div>
            {/* Pagination */}
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`pagination-button ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handleChangePage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="pagination-button"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DashboardPage;
