import React from "react";
import {
  Avatar,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  Hidden,
} from "@material-ui/core";

import { timeAgo } from "../../utils/humanizetime";

const AuthorTable = ({ data, classes }) => {
  return (
    <Box mt={2}>
      <Hidden xsDown>
        <Divider style={{ marginBottom: "0.5em" }} />
        <Grid item>
          <Box>
            <Typography className={classes.typographyStyles}>
              Created By
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Display Picture</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt={data.user.full_name}
                        src={"https://thispersondoesnotexist.com/image"}
                      />
                    </TableCell>
                    <TableCell>{data.user.full_name}</TableCell>
                    <TableCell>{timeAgo(data.created_at)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Hidden>
    </Box>
  );
};

export default AuthorTable;
