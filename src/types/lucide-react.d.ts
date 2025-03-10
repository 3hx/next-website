declare module "lucide-react" {
  import { ComponentType } from "react";

  export interface IconProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
    color?: string;
    stroke?: string | number;
  }

  export type Icon = ComponentType<IconProps>;

  export const Check: Icon;
  export const Mic: Icon;
  export const MicOff: Icon;
  export const Volume2: Icon;
  export const VolumeX: Icon;
  // Add other icons as needed
}
