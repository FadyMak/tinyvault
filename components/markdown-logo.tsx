type IconProps = React.HTMLAttributes<SVGElement>

export function MarkdownLogo({ ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="800"
      width="1200"
      viewBox="-31.2 -32 270.4 192"
      {...props}
    >
      <rect
        fill="none"
        strokeWidth="10"
        stroke="#000"
        ry="10"
        y="5"
        x="5"
        height="118"
        width="198"
      />
      <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z" />
    </svg>
  )
}
