import React, { useEffect, useState } from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

type AreaIconProps = React.ComponentProps<typeof SvgIcon>

const AreaIcon: React.FC<AreaIconProps> = props => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <g display="inline">
        <g
          fill="none"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="15.119"
        >
          <path d="M75.592 68l-.032 372"></path>
          <path d="M440.007 437.56l-371.998.423"></path>
        </g>
        <g fill="#ff0" stroke="#2c4100" strokeDasharray="none" strokeWidth="12">
          <ellipse cx="75" cy="75" rx="18.789" ry="18.789"></ellipse>
          <ellipse cx="75" cy="437" rx="18.789" ry="18.789"></ellipse>
          <ellipse
            cx="437"
            cy="437"
            display="inline"
            rx="18.789"
            ry="18.789"
          ></ellipse>
        </g>
        <g
          fill="none"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="13.113"
        >
          <path d="M107.817 167.63l-39.84.282"></path>
          <path d="M107.817 249.63l-39.84.282"></path>
          <path d="M107.817 335.63l-39.84.282"></path>
        </g>
        <g
          fill="#2c4100"
          fillOpacity="1"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="13.113"
          transform="rotate(90 88.228 424.536)"
        >
          <path d="M107.817 167.63l-39.84.282"></path>
          <path d="M107.817 249.63l-39.84.282"></path>
          <path d="M107.817 335.63l-39.84.282"></path>
        </g>
        <g fill="#03c2ec" fillOpacity="1" stroke="none" display="inline">
          <path
            fill="#03c2ec"
            strokeDasharray="none"
            strokeWidth="15.118"
            d="M132.559 42.559H462.55899999999997V372.55899999999997H132.559z"
            display="none"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M124.488 60.87h120.665s-4.307 35.12-13.005 57.93c-12.045 31.59-38.765 75.58-52.687 94.238-15.916 21.331-54.973 71.605-54.973 71.605z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M360.825 60.87h-92.518s-2.032 30.285-11.358 60.568c-7.247 23.532-15.24 37.55-15.24 37.55s36.46 9.57 63.658 21.41c24.402 10.622 69.046 34.598 69.046 34.598l-3.765-68.586z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M455.153 60.87h-71.408s10.762 85.246 12.88 116.862c3.66 54.626 2.47 120.113 2.47 120.113s21.829-4.099 56.058-7.73z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M455.153 391.757h-71.408s1.012-2.168 7.407-33.204c2.878-13.969 7.162-34.89 7.162-34.89s22.61-4.502 56.839-8.69z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M363.17 390.975h-90.954s3.321 2.59-5.885-27.73c-10.413-34.298-7.693-23.945-7.693-23.945s2.634 1.37 59.098-5.107c26.285-3.016 57.162-4.552 57.162-4.552l-5.814 34.433z"
            display="inline"
          ></path>
          <path
            fill="#03c2ec"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M374.304 298.677L122.1 319.044s28.692-25.17 48.845-49.622c26.334-31.952 62.876-88.9 62.876-88.9s14.537 3.252 70.177 28.255c22.76 10.227 69.821 29.81 69.821 29.81.002-.015 1.598 28.656.485 60.09z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M124.488 392.539h120.665s.355-29.714-12.223-54.803c-30.028 2.813-31.799 3.598-55.032 5.057-21.39 1.344-53.41 5.018-53.41 5.018z"
            display="inline"
          ></path>
        </g>
      </g>
    </SvgIcon>
  )
}

export default AreaIcon

function Icon() {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    // Replace with the actual path to your SVG file
    fetch('./area-icon.svg')
      .then(response => response.text())
      .then(text => setSvgContent(text))
  }, [])
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g display="inline">
        <g
          fill="none"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="15.119"
        >
          <path d="M75.592 68l-.032 372"></path>
          <path d="M440.007 437.56l-371.998.423"></path>
        </g>
        <g fill="#ff0" stroke="#2c4100" strokeDasharray="none" strokeWidth="12">
          <ellipse cx="75" cy="75" rx="18.789" ry="18.789"></ellipse>
          <ellipse cx="75" cy="437" rx="18.789" ry="18.789"></ellipse>
          <ellipse
            cx="437"
            cy="437"
            display="inline"
            rx="18.789"
            ry="18.789"
          ></ellipse>
        </g>
        <g
          fill="none"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="13.113"
        >
          <path d="M107.817 167.63l-39.84.282"></path>
          <path d="M107.817 249.63l-39.84.282"></path>
          <path d="M107.817 335.63l-39.84.282"></path>
        </g>
        <g
          fill="#2c4100"
          fillOpacity="1"
          stroke="#2c4100"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="13.113"
          transform="rotate(90 88.228 424.536)"
        >
          <path d="M107.817 167.63l-39.84.282"></path>
          <path d="M107.817 249.63l-39.84.282"></path>
          <path d="M107.817 335.63l-39.84.282"></path>
        </g>
        <g fill="#03c2ec" fillOpacity="1" stroke="none" display="inline">
          <path
            fill="#03c2ec"
            strokeDasharray="none"
            strokeWidth="15.118"
            d="M132.559 42.559H462.55899999999997V372.55899999999997H132.559z"
            display="none"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M124.488 60.87h120.665s-4.307 35.12-13.005 57.93c-12.045 31.59-38.765 75.58-52.687 94.238-15.916 21.331-54.973 71.605-54.973 71.605z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M360.825 60.87h-92.518s-2.032 30.285-11.358 60.568c-7.247 23.532-15.24 37.55-15.24 37.55s36.46 9.57 63.658 21.41c24.402 10.622 69.046 34.598 69.046 34.598l-3.765-68.586z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M455.153 60.87h-71.408s10.762 85.246 12.88 116.862c3.66 54.626 2.47 120.113 2.47 120.113s21.829-4.099 56.058-7.73z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M455.153 391.757h-71.408s1.012-2.168 7.407-33.204c2.878-13.969 7.162-34.89 7.162-34.89s22.61-4.502 56.839-8.69z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M363.17 390.975h-90.954s3.321 2.59-5.885-27.73c-10.413-34.298-7.693-23.945-7.693-23.945s2.634 1.37 59.098-5.107c26.285-3.016 57.162-4.552 57.162-4.552l-5.814 34.433z"
            display="inline"
          ></path>
          <path
            fill="#03c2ec"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M374.304 298.677L122.1 319.044s28.692-25.17 48.845-49.622c26.334-31.952 62.876-88.9 62.876-88.9s14.537 3.252 70.177 28.255c22.76 10.227 69.821 29.81 69.821 29.81.002-.015 1.598 28.656.485 60.09z"
            display="inline"
          ></path>
          <path
            fill="#9ac02d"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M124.488 392.539h120.665s.355-29.714-12.223-54.803c-30.028 2.813-31.799 3.598-55.032 5.057-21.39 1.344-53.41 5.018-53.41 5.018z"
            display="inline"
          ></path>
        </g>
      </g>
    </svg>
  )
}
