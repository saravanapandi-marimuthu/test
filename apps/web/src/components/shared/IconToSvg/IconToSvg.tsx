import ReactDOMServer from 'react-dom/server'
import {
  MapPin as MapPinIcon,
  Barricade as BarricadeIcon,
} from '@phosphor-icons/react'
import { JSX } from 'react/jsx-runtime'

export type PhosphorIconType = 'MapPin' | 'Gate'

type PhosphorIconInfo = {
  type: PhosphorIconType
  color: string
  size: number
}

type IconComponentProps = {
  color: string
  size: number
}

type IconDictionary = {
  [key in PhosphorIconType]: React.FC<IconComponentProps>
}

const icons: IconDictionary = {
  MapPin: MapPinIcon as unknown as React.FC<IconComponentProps>,
  Gate: BarricadeIcon as unknown as React.FC<IconComponentProps>,
}

const getSVGString = (iconComponent: JSX.Element): string => {
  return ReactDOMServer.renderToStaticMarkup(iconComponent)
}

const getCacheKey = (
  iconType: PhosphorIconType,
  color: string,
  size: number,
): string => {
  return `${iconType}_${color}_${size}`
}

const iconCache: { [key: string]: string } = {}

const getIconUrl = (iconInfo: PhosphorIconInfo): string => {
  const { type, color, size } = iconInfo
  const cacheKey = getCacheKey(type, color, size)

  if (!iconCache[cacheKey]) {
    const IconComponent = icons[type]
    iconCache[cacheKey] = `data:image/svg+xml;utf-8,${encodeURIComponent(
      getSVGString(<IconComponent size={size} color={color} />),
    )}`
  }

  return iconCache[cacheKey]
}

export default getIconUrl
