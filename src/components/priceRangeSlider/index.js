import { Grid, Slider } from "@mui/material";
import React, { useState } from "react";
import "./index.scss";

function PriceRangeSlider({ data, ...props }) {
  const formatRupiah = (angka) => {
    let number_string = angka.toString().replace(/\D/g, "");
    let split = number_string.split("");
    let sisa = split.length % 3;
    let rupiah = split.slice(0, sisa).join("");
    let ribuan = split.slice(sisa).join("").match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
  };

  return (
    <div className="price-filter">
      <div className="title">Harga</div>
      <div className="range">
        <Slider
          value={data}
          onChange={props.handleChangeRange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={2250000}
          sx={{
            "& .MuiSlider-thumb": {
              color: "#EB3F36", // Ubah warna thumb menjadi warna EB3F36
            },
            "& .MuiSlider-track": {
              color: "#EB3F36", // Ubah warna track menjadi warna EB3F36
            },
            "& .MuiSlider-rail": {
              color: "#757575", // Ubah warna rail menjadi warna EB3F36
            },
          }}
        />
      </div>
      <div className="nominal">
        <Grid container spacing={2}>
          <Grid item display={"flex"} alignItems={"center"} gap={"10px"}>
            <div>Rp. </div>
            <input
              type="text"
              value={formatRupiah(data[0])}
              onChange={props.handleMinPriceChange}
              className="price-input"
            />
          </Grid>
          <Grid item display={"flex"} alignItems={"center"} gap={"10px"}>
            <div>Rp. </div>
            <input
              type="text"
              value={formatRupiah(data[1])}
              onChange={props.handleMaxPriceChange}
              className="price-input"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
