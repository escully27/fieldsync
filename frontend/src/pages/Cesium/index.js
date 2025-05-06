import React, { useRef } from 'react';
import { Viewer, Entity, Cesium3DTileset } from 'resium';
import { Cartesian3, Color, Cartographic, Matrix4, Cesium3DTileStyle } from 'cesium';

const CesiumMap = () => {
    const tilesetUrl = "https://fieldsync-fullstack-twin.s3.amazonaws.com/Scene/Production_1cesium.json?q=1";
    const viewerRef = useRef(null);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Viewer full ref={viewerRef}>
                <Entity
                    name="Trackster HQ"
                    position={Cartesian3.fromDegrees(-85.98852777, 34.04988888)}
                    point={{ pixelSize: 10, color: Color.RED }}
                />
                <Cesium3DTileset
                    url={tilesetUrl}
                    onReady={(tileset) => { 

                        if (viewerRef.current && viewerRef.current.cesiumElement) {
                            viewerRef.current.cesiumElement.camera.flyToBoundingSphere(tileset.boundingSphere);
                        }

                        tileset.maximumScreenSpaceError = 8;

                        tileset.style = new Cesium3DTileStyle({
                            color: 'color("white")',
                            show: true
                        });
                        
                        // this will have the cesium element on the earth's surface, but it drifts slightly while panning and inspecting
                        
                        // const boundingSphere = tileset.boundingSphere;
                        // const cartographic = Cartographic.fromCartesian(boundingSphere.center);
                        // const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
                        // const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
                        // const translation = Cartesian3.subtract(surface, offset, new Cartesian3());
                        // tileset.modelMatrix = Matrix4.fromTranslation(translation);

                    }}
                    onError={(error) => {
                        console.error("Tileset failed to load:", error);
                    }}
                />
            </Viewer>
        </div>
    );
};

export default CesiumMap;