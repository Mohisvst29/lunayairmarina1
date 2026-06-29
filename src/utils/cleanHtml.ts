export const cleanHTML = (html: string) => {
  if (!html) return "";

  return html
    .replace(/background-color:\s*rgb\(255,\s*255,\s*255\);?/gi, "")
    .replace(/background-color:\s*#fff;?/gi, "")
    .replace(/&nbsp;/g, " ");
};