import { useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";

function App() {
  const [pos, setPos] = useState<
    { latitude: null | number; longitude: null | number }
  >({ latitude: null, longitude: null });
  const [shareData, setShareData] = useState("");
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    // get location and generate share links
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (newpos) => {
          setPos({
            latitude: newpos.coords.latitude,
            longitude: newpos.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      console.log("not happening");
    }
  });

  useEffect(() => {
    setShareData(
      `My location\n\nGoogle Maps link: https://maps.google.com/?q=${pos.latitude},${pos.longitude}\n\nApple Maps link: https://maps.apple.com/?q=${pos.latitude},${pos.longitude}\n\nhttps://janie.page/share-location`,
    );
  }, [pos]);

  const createMap = useCallback((elt: HTMLElement) => {
    if (map === null && pos.latitude !== null && pos.longitude !== null) {
      console.log(map);
      console.log(pos);
      // generate map
      const view = new View({
        center: fromLonLat([pos.longitude, pos.latitude]), //pos.latitude, pos.longitude]),
        zoom: 18,
      });
      setMap(
        new Map(
          {
            target: elt,
            layers: [
              new Tile({
                source: new OSM({ attributions: "" }),
              }),
            ],
            view,
          },
        ),
      );
    }
  }, [pos]);

  return (
    <div className="App">
      <span className="title">
        <a href="https://janie.page">janie.page</a> - Share Location
      </span>
      <a href={`https://maps.google.com/?q=${pos.latitude},${pos.longitude}`}>
        Google Maps
      </a>
      <a href={`https://maps.apple.com/?q=${pos.latitude},${pos.longitude}`}>
        Apple Maps
      </a>
      <div>
        <input
          type="button"
          value="Share"
          onClick={(e) =>
            navigator.share({ text: shareData, title: "My location" })}
        />
      </div>

      <div
        id="demo-map"
        // @ts-ignore
        ref={createMap}
      >
      </div>
    </div>
  );
}

export default App;
