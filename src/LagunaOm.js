import React from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import adp from "./Data/LagunaOm/ADP.geojson";
import cv from "./Data/LagunaOm/Cobertura_Vegetal.geojson";
import ff from "./Data/LagunaOm/Flora_Fauna.geojson";
import lb from "./Data/LagunaOm/Localidades_Beneficiadas.geojson";
import tcc from "./Data/LagunaOm/Ton_CO2_carbono.geojson";
import Sidebar from "./SideBar";
export const layers = {
  type: "FeatureCollection",
  features: [
    {
      date: "geojson",
      data: adp,
      id: "adp",
      type: "fill",
      source: "ADP",
      layout: {},
      paint: {
        "fill-color": "#0080FF",
        "fill-opacity": 0.5,
      },
    },
    {
      date: "geojson",
      data: cv,
      id: "cv",
      type: "fill",
      source: "CV",
      layout: {},
      paint: {
        "fill-color": "#2E8B57",
        "fill-opacity": 0.5,
      },
    },
    {
      date: "geojson",
      data: ff,
      id: "ff",
      type: "circle",
      source: "FF",
      layout: {},
      paint: {
        "circle-radius": 1,
        "circle-color": "rgb(128, 0, 0)",
      },
    },
    {
      date: "geojson",
      data: lb,
      id: "lb",
      type: "circle",
      source: "LB",
      layout: {},
      paint: {
        "circle-radius": 1,
        "circle-color": "rgb(0, 0, 0)",
      },
    },
    {
      date: "geojson",
      data: tcc,
      id: "tcc",
      type: "fill",
      source: "TCC",
      layout: {},
      paint: {
        "fill-color": "#A52A2A",
        "fill-opacity": 0.5,
      },
    },
  ],
};
function LagunaOm() {
  var number = localStorage.getItem("number");
  const [layer, setLayer] = React.useState(number);
  const [viewport, setViewport] = React.useState({
    longitude: -89.15095099588774,
    latitude: 18.701800462540451,
    zoom: 9,
  });
  function renderLayer(item) {
    localStorage.setItem("number", item);
    window.location.reload();
  }
  function ShowLayer() {
    return <Layer {...layers.features[layer]} />;
  }
  return (
    <div className="container_sidebar_laguna">
      <Sidebar renderHijo={renderLayer} />
      <div className="container_mapa_laguna">
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          mapboxApiAccessToken="pk.eyJ1IjoiZWxpemFiZXRoZ2giLCJhIjoiY2twOHBkaHNvMDN1MjJvcDR6aGhpM2h2ayJ9.U3EK7VZc-urMFKxXy83cpQ"
          mapStyle="mapbox://styles/elizabethgh/ckp8r5cxj28lq18p5ud5gwhy4"
          onViewportChange={setViewport}
        >
          <Source id="my-data" type="geojson" data={(adp, cv, ff, lb, tcc)}>
            {layer ? <Layer {...layers.features[layer]} /> : null}
          </Source>
        </ReactMapGL>
      </div>
    </div>
  );
}
export default LagunaOm;
