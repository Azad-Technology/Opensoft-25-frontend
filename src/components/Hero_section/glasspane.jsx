import React from "react";

function Box() {
    return (
      <>
        <svg
          width={600}
          height={350}
          viewBox="0 0 790 444"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <foreignObject x={-12} y={-16} width={800} height={300}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: "blur(20px)",
                clipPath: "url(#bgblur_0_1205_9_clip_path)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g filter="url(#filter0_d_1205_9)" data-figma-bg-blur-radius={40}>
            <rect
              x={28}
              y={24}
              width={734}
              height={388}
              rx={38}
              fill="url(#paint0_linear_1205_9)"
              shapeRendering="crispEdges"
            />
            <rect
              x="28.5"
              y="24.5"
              width={733}
              height={387}
              rx="37.5"
              stroke="url(#paint1_linear_1205_9)"
              shapeRendering="crispEdges"
            />
          </g>
          <g opacity="0.15" filter="url(#filter1_d_1205_9)">
            <rect
              x={28}
              y={24}
              width={734}
              height={388}
              rx={38}
              fill="url(#pattern0_1205_9)"
              shapeRendering="crispEdges"
            />
            <rect
              x="28.5"
              y="24.5"
              width={733}
              height={387}
              rx="37.5"
              stroke="url(#paint2_linear_1205_9)"
              shapeRendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1205_9"
              x={-12}
              y={-16}
              width={814}
              height={468}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius={4}
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_1205_9"
              />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={12} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1205_9"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1205_9"
                result="shape"
              />
            </filter>
            <clipPath id="bgblur_0_1205_9_clip_path" transform="translate(12 16)">
              <rect x={28} y={24} width={734} height={388} rx={38} />
            </clipPath>
            <filter
              id="filter1_d_1205_9"
              x={24}
              y={24}
              width={742}
              height={396}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1205_9"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1205_9"
                result="shape"
              />
            </filter>
            <pattern
              id="pattern0_1205_9"
              patternContentUnits="objectBoundingBox"
              width="0.292234"
              height="0.37268"
            >
              <use
                xlinkHref="#image0_1205_9"
                transform="scale(0.000408719 0.000773196)"
              />
            </pattern>
            <linearGradient
              id="paint0_linear_1205_9"
              x1={28}
              y1="25.6382"
              x2="643.036"
              y2="549.919"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0180667" stopColor="#00FF6F" stopOpacity="0.1" />
              <stop offset={1} stopColor="#19B205" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1205_9"
              x1="526.24"
              y1={24}
              x2="349.936"
              y2="447.846"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#19AB2A" />
              <stop offset="0.229284" stopColor="#1B8908" />
              <stop offset="0.607853" stopColor="#5CB200" />
              <stop offset={1} stopColor="#507E17" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1205_9"
              x1="526.24"
              y1={24}
              x2="349.936"
              y2="447.846"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#19AB2A" />
              <stop offset="0.229284" stopColor="#0F3B07" />
              <stop offset="0.607853" stopColor="#294F00" />
              <stop offset={1} stopColor="#507E17" />
            </linearGradient>
            
          </defs>
        </svg>
      </>
    );
  }
  
  export default Box
  