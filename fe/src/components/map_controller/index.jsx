import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";
import LoadingBar from "../loadding/loading_bar";

const MapController = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDb5xOZiLOJAtKJWj4spvQf3UEQvE-3sc4",
  });

  if (!isLoaded) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <LoadingBar />
      </Box>
    );
  }

  return children;
};

export default React.memo(MapController);
