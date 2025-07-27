import { type SVGProps } from "react"
interface KeyboardSVGProps extends SVGProps<SVGSVGElement> {
  onKeyClick?: (keyId: string) => void;
  labels?: Record<string, string>;
  showOled?: boolean;
}
const KeyboardSVG = ({ onKeyClick, showOled = false, ...props }: KeyboardSVGProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    id="svg16"
    //width={366.913}
    //height={465.214}
    viewBox="4010 2864.4 382.2 484.6"
    preserveAspectRatio="xMidYMid meet"
  >
    <title id="title1" />
    <style id="style1" type="text/css" />
    <path
      id="rect1"
      fill="#000"
      stroke="none"
      d="M4010 2864.4h382.2V3349H4010z"
      style={{
        display: "inline",
        fill: "#555",
        fillOpacity: 1,
        stroke: "none",
        shapeRendering: "crispEdges",
      }}
    />
    <g
      id="sw1"
      onClick={() => onKeyClick?.("sw1")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4022.5"
        y="2904.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4060}
        y={2942.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw1 || "SW1"}
      </text>
      <path
        id="gge45631"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4022.5 2904.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45634"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4040.315 2914.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45637"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4040.315 2970.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45640"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4087.56 2962.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45643"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4087.56 2922.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw2"
      onClick={() => onKeyClick?.("sw2")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4122.5"
        y="2894.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4160}
        y={2932.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw2 || "SW2"}
      </text>
      <path
        id="gge45736"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4122.5 2894.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45739"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4140.315 2904.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45742"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4140.315 2960.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45745"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4187.56 2952.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45748"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4187.56 2912.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw3"
      onClick={() => onKeyClick?.("sw3")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4217.5"
        y="2919.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4255}
        y={2957.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw3 || "SW3"}
      </text>
      <path
        id="gge45841"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4217.5 2919.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45844"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4235.315 2929.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45847"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4235.315 2985.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45850"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4282.56 2977.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45853"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4282.56 2937.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw4"
      onClick={() => onKeyClick?.("sw4")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4042.5"
        y="2984.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4080}
        y={3022.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw4 || "SW4"}
      </text>
      <path
        id="gge45946"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4042.5 2984.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45949"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4060.315 2994.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45952"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4060.315 3050.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45955"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4107.56 3042.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge45958"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4107.56 3002.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw5"
      onClick={() => onKeyClick?.("sw5")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4122.5"
        y="2974.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4160}
        y={3012.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw5 || "SW5"}
      </text>
      <path
        id="gge46051"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4122.5 2974.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46054"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4140.315 2984.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46057"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4140.315 3040.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46060"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4187.56 3032.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46063"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4187.56 2992.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw6"
      onClick={() => onKeyClick?.("sw6")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4202.5"
        y="2999.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4240}
        y={3037.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw6 || "SW6"}
      </text>
      <path
        id="gge46156"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4202.5 2999.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46159"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4220.315 3009.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46162"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4220.315 3065.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46165"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4267.56 3057.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46168"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4267.56 3017.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw7"
      onClick={() => onKeyClick?.("sw7")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4302.5"
        y="3229.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4340}
        y={3267.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw7 || "SW7"}
      </text>
      <path
        id="gge46264"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4302.5 3229.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46267"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4320.315 3239.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46270"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4320.315 3295.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46273"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4367.56 3287.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46276"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4367.56 3247.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    <g
      id="sw8"
      onClick={() => onKeyClick?.("sw8")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4302.5"
        y="3149.96"
        width="75"
        height="75"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4340}
        y={3187.46}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.sw8 || "SW8"}
      </text>
      <path
        id="gge46369"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4302.5 3149.96v75h75v-75h-75"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46372"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4320.315 3159.902h-7.874v7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46375"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4320.315 3215.02h-7.874v-7.874"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46378"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4367.56 3207.146v7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
      <path
        id="gge46381"
        fill="none"
        strokeLinecap="round"
        strokeWidth={0.591}
        d="M4367.56 3167.776v-7.874h-7.875"
        style={{
          stroke: "#fff",
          strokeWidth: 1.39371,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
      />
    </g>
    {showOled && (
      <g
      id="oled"
      onClick={() => onKeyClick?.("oled")}
      style={{
        stroke: "#fff",
        strokeWidth: 1.39371,
        strokeDasharray: "none",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <rect
        x="4283.881"
        y="3031.5"
        width="95"
        height="58"
        fill="rgba(0,0,0,0)"
      />
      <text
        x={4331.381}
        y={3060.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {"OLED"}
      </text>
    </g>)}
    <g
      id="encoder"
      onClick={() => onKeyClick?.("encoder")}
      style={{
        stroke: "#fff",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <path
        id="textPathUp"
        d="M 4027.874 3225 A 98.425 98.425 0 1 1 4224.724 3225"
        fill="none"
        stroke="none"
      />
      <path
        id="textPathDown"
        d="M 4067.713 3159.965 A 98.425 98.425 0 1 1 4206.905 3299.157"
        fill="none"
        stroke="none"
      />
      <text
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        <textPath
          href="#textPathUp"
          startOffset="50%"
        >
          {props.labels?.up || "UP"}
        </textPath>
      </text>
      <text
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        <textPath
          href="#textPathDown"
          startOffset="50%"
        >
          {props.labels?.down || "DOWN"}
        </textPath>
      </text>
      <text
        x={4126.299}
        y={3240.571}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff0"
        fontSize="12"
        stroke="none"
        strokeWidth={0}
      >
        {props.labels?.click || "CLICK"}
      </text>
      <circle
        id="gge3882"
        cx={4126.299}
        cy={3240.571}
        r={98.425}
        fill="rgba(0,0,0,0)"
        strokeWidth={1}
        style={{
          stroke: "#fff",
          strokeOpacity: 1,
          shapeRendering: "crispEdges",
        }}
      />
    </g>
    <g
      id="settings"
      onClick={() => onKeyClick?.("settings")}
      style={{
        stroke: "rgba(0,0,0,0)",
        strokeOpacity: 1,
        cursor: "pointer",
      }}
    >
      <circle
        id="gge3882"
        cx={4348}
        cy={2968}
        r={18}
        fill="rgba(0,0,0,0)"
        strokeWidth={0}
      />
      <path
        id="path2"
        d="M256 157.272c-54.448 0-98.736 44.288-98.736 98.736 0 54.44 44.288 98.728 98.736 98.728 54.448 0 98.736-44.296 98.736-98.736 0-54.44-44.288-98.728-98.736-98.728zm0 165.456c-36.8 0-66.736-29.928-66.736-66.728S219.2 189.272 256 189.272c36.8 0 66.736 29.936 66.736 66.736 0 36.8-29.936 66.72-66.736 66.72z"
        style={{
          fill: "#ff0",
          stroke: "#ff0",
          strokeWidth: 0,
          strokeDasharray: "none",
        }}
        transform="translate(4330 2950) scale(.07045)"
      />
      <path
        id="path1"
        d="m483.184 190.536-28.04-2.808a208.471 208.471 0 0 0-10.072-24.248l17.888-21.872 18.328-22.408-20.464-20.472-47.488-47.52-20.488-20.496-22.424 18.36-21.792 17.84a208.443 208.443 0 0 0-24.272-10.104l-2.8-27.992L318.688 0H193.328l-2.888 28.816-2.8 27.984a208.726 208.726 0 0 0-24.288 10.112L141.576 49.08l-22.424-18.36-20.488 20.496-47.488 47.52-20.456 20.48 18.328 22.408 17.88 21.856a210.159 210.159 0 0 0-10.08 24.264l-28.032 2.808L0 193.432v125.12l28.816 2.88 28.024 2.808a207.766 207.766 0 0 0 10.088 24.288l-17.872 21.856-18.336 22.4 20.464 20.472 47.488 47.52 20.488 20.496 22.424-18.36 21.776-17.824a209.01 209.01 0 0 0 24.304 10.12l2.8 27.984 2.88 28.808h125.368l2.888-28.816 2.8-27.992a208.199 208.199 0 0 0 24.288-10.12l21.784 17.84 22.424 18.36 20.488-20.496 47.488-47.52 20.456-20.472-18.32-22.408-17.896-21.888a209.823 209.823 0 0 0 10.064-24.248l28.04-2.824L512 318.52V193.416zM480 289.576l-49.696 5c-4.552 20.68-12.712 39.976-23.76 57.304l31.688 38.752-47.488 47.52-38.688-31.672c-17.328 11.096-36.64 19.296-57.336 23.88L289.744 480H222.296l-4.968-49.64c-20.712-4.568-40.024-12.768-57.352-23.864l-38.672 31.664-47.488-47.52 31.672-38.72c-11.056-17.336-19.24-36.632-23.792-57.344L32 289.592v-67.2l49.696-4.976c4.568-20.696 12.744-40.008 23.792-57.328l-31.672-38.72 47.488-47.52 38.672 31.656c17.312-11.08 36.624-19.28 57.336-23.864L222.288 32h67.44l4.968 49.64c20.704 4.584 40.016 12.784 57.328 23.864l38.688-31.672 47.488 47.52-31.688 38.736c11.04 17.32 19.224 36.616 23.776 57.32L480 222.376Z"
        style={{
          fill: "#ff0",
          stroke: "#ff0",
          strokeWidth: 0,
          strokeDasharray: "none",
        }}
        transform="translate(4330 2950) scale(.07045)"
      />
    </g>
  </svg>
)
export default KeyboardSVG