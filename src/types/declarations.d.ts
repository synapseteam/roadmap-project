declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.jpg";
declare module "*.svg";
declare module "*.png";
