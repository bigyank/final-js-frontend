import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Box,
  MenuItem,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select } from "formik-material-ui";

import PlaceMap from "./PlaceMap";
import PlacesSearch from "./PlaceSearch";
import UploadButton from "./UploadButton";

import { app } from "../../firebase";
// import { addPlace } from "../../services/place";

import { usePost } from "../../hooks/usePostService";
import { useHistory } from "react-router-dom";

const validator = yup.object({
  title: yup.string().required(),
  body: yup.string().required(),
});

const useStyles = makeStyles({
  textFeildStyles: {
    width: "100%",
  },
});

const PlaceForm = ({ placeData = {}, placeEdit }) => {
  const history = useHistory();
  const { mutate: postMutate } = usePost("postPlace");
  const [location, setLocation] = useState(
    () => placeData.location || [27.7172, 85.324]
  );
  const classes = useStyles();

  const uploadImage = async (img) => {
    try {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(img.name);
      await fileRef.put(img);
      return fileRef.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // while adding values.image will be null
    if (!values.image) {
      if (values.img) {
        const uploadedImg = await uploadImage(values.img);
        values.img = uploadedImg;
        // img is compulsory while adding place
      } else {
        toast.error("image is required");
        return;
      }
      // while editing it should not be null because image is compulsory
      // but image can be reuploaded so value.img can have value
    } else if (values.img) {
      const uploadedImg = await uploadImage(values.img);
      values.img = uploadedImg;
      // if image is not reuploaded then just provide the old url
    } else {
      values.img = values.image;
    }

    postMutate(
      {
        path: "/posts",
        credentials: {
          ...(placeEdit && { id: placeData.id }),
          title: values.title,
          body: values.body,
          image: values.img,
          lat: values.location[0],
          lon: values.location[1],
          type: values.type,
        },
      },
      {
        onSuccess: (data) => {
          history.push(`place/${data.id}`);
        },
        onError: (error) => {
          const errMessage =
            error.response && error.response.data.error
              ? error.response.data.error.message
              : error.message;
          toast.error(errMessage);
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{
        title: placeData.title || "",
        body: placeData.body || "",
        type: placeData.type || "Indoors",
        location: placeData.location || [27.7172, 85.324],
        img: null,
        image: placeData.image || null,
      }}
      validationSchema={validator}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, setValues, values }) => (
        <Form>
          <Box mb={3}>
            <Field
              className={classes.textFeildStyles}
              component={TextField}
              variant="outlined"
              name="title"
              type="text"
              label="Title"
            />
          </Box>

          <Box mb={3}>
            <Field
              component={TextField}
              variant="outlined"
              multiline
              name="body"
              type="text"
              label="Body"
              fullWidth
            />
          </Box>
          <Box mb={4}>
            <Box mb={1}>
              <InputLabel htmlFor="type">Type</InputLabel>
            </Box>
            <Field
              style={{ height: "2rem" }}
              component={Select}
              name="type"
              inputProps={{
                id: "place-type",
              }}
              fullWidth
            >
              <MenuItem value="Indoors">Indoors</MenuItem>
              <MenuItem value="Outdoors">Outdoors</MenuItem>
            </Field>
          </Box>

          <Box mb={4}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item md={4}>
                <UploadButton setValues={setValues} values={values} />
              </Grid>
              <Grid item md={4}>
                <PlacesSearch setLocation={setLocation} />
              </Grid>
            </Grid>
          </Box>

          <Box mb={4}>
            <PlaceMap
              setValues={setValues}
              values={values}
              location={location}
              setLocation={setLocation}
            />
          </Box>

          {isSubmitting && <LinearProgress />}
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              onClick={submitForm}
            >
              {placeEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceForm;
