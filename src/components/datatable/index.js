import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Loading from "../loading";

const DataTable = (props) => {
  const { data, pageNumber, isLoading } = props;

  return (
    <Card className="card-datatable">
      <div>
        <Grid container mb={2}>
          <Grid item width={"100%"} height={"322px"}>
            {isLoading ? (
              <Loading />
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Avatar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>
                        <TableCell>{row.avatar}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={1}
        >
          <Grid item>
            <Button
              onClick={() => props.handlePrev()}
              size="small"
              variant="outlined"
            >
              Prev
            </Button>
          </Grid>
          <Grid item>
            <span>{pageNumber}</span>
          </Grid>
          <Grid item>
            <Button
              onClick={() => props.handleNext()}
              size="small"
              variant="outlined"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  pageNumber: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};

DataTable.defaultProps = {
  data: [],
  pageNumber: 1,
};

export default DataTable;
