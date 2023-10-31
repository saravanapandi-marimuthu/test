// types/mapbox__togeojson.d.ts
declare module "@mapbox/togeojson" {
    import { Document } from "xmldom";
    import { GeoJSON } from "geojson";

    export function kml(doc: Document, options?: object): GeoJSON;
    export function gpx(doc: Document, options?: object): GeoJSON;
}
