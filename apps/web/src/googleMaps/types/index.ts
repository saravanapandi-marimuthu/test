export enum OverlayType {
  POLYGON = 'polygon',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  POLYLINE = 'polyline',
  MARKER = 'marker',
}

export type MouseLocation = {
  x: number
  y: number
}

export type OverlayItem = {
  overlayItemType: OverlayType
  overlayItem: google.maps.MVCObject
}

export enum PinType {
  DEFAULT = 'default',
  GATE = 'gate',
  GATE_WITH_LOCK = 'gate_with_lock',
}

export enum PolygonType {
  OUTER = 'outer',
  INNER = 'inner',
}

export enum PolylineType {
  DEFAULT = 'default',
  ROAD = 'road',
  DIRT_ROAD = 'dirt_road',
}

export type PolygonInfo = {
  name: string
  description: string
  //   color: string
  //   area: number
  //   center: google.maps.LatLng
}

export enum GeoJSONGeometryType {
  POINT = 'Point',
  LINE_STRING = 'LineString',
  POLYGON = 'Polygon',
}

export type PolygonSettings = {
  polygonType: PolygonType
  polygonOptions: google.maps.PolygonOptions
}

export type PolylineSettings = {
  polylineType: PolylineType
  polylineOptions: google.maps.PolylineOptions
}

export type MarkerSettings = {
  pinType: PinType
  markerOptions: google.maps.MarkerOptions
}
