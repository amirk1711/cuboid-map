import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import RenderMap from "./Babylon";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
const MapContainer = styled.div`
    width: 500px;
    height: 350px;
`;

const sampleUrl = "https://amirk1711.github.io/SampleImages/sample.jpg";
function Map() {
    const [isCapturing, setIsCapturing] = useState(false);
    const [initial, setInitial] = useState(true);
    const [showCuboid, setShowCuboid] = useState(false);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [zoom, setZoom] = useState(0);
    const mapContainer = useRef();

    const width = 500;
    const height = 350;

    useEffect(() => {
        let map;
        if (mapContainer.current) {
            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10",
                center: [78, 35],
                zoom: 2,
            });

            setLongitude(map.getCenter().lng.toFixed(3));
            setLatitude(map.getCenter().lat.toFixed(3));
            setZoom(map.getZoom().toFixed(3));

            map.on("move", () => {
                setLongitude(map.getCenter().lng.toFixed(3));
                setLatitude(map.getCenter().lat.toFixed(3));
                setZoom(map.getZoom().toFixed(3));
            });
        }
        return () => map.remove();
    }, []);

    useEffect(() => {
        if (isCapturing) {
            setImageUrl(
                `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${longitude},${latitude},${zoom},0/${width}x${height}?access_token=${mapboxgl.accessToken}`
            );
            setIsCapturing(!isCapturing);
        }
    }, [isCapturing, longitude, latitude, zoom]);

    return (
        <div>
            <div className="map-img-container">
                <MapContainer id="map" ref={mapContainer}></MapContainer>

                <div className="btns-container">
                    <button
                        className="capture-btn btn"
                        onClick={() => {
                            setInitial(false);
                            setIsCapturing(true);
                            setShowCuboid(false);
                        }}
                    >
                        Capture
                    </button>

                    {showCuboid ? (
                        <button
                            className="hide-btn btn"
                            onClick={() => {
                                setShowCuboid(false);
                            }}
                        >
                            Hide Cuboid
                        </button>
                    ) : (
                        <button
                            className="show-btn btn"
                            onClick={() => {
                                setShowCuboid(true);
                            }}
                        >
                            Show Cuboid
                        </button>
                    )}
                </div>

                <div
                    className="captured-map-image"
                    style={{
                        backgroundSize: "contain",
                        backgroundImage: `url(${
                            initial ? sampleUrl : imageUrl
                        })`,
                    }}
                ></div>
            </div>

            {showCuboid && imageUrl && <RenderMap texture={imageUrl} />}
        </div>
    );
}

export default Map;
