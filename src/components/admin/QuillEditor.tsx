import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div
      className="animate-pulse"
      style={{ height: "200px", background: "#f3f4f6", borderRadius: "8px" }}
    />
  ),
});

export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
    [{ direction: "rtl" }],
  ],
};

export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "color",
  "background",
  "link",
  "image",
  "video",
  "direction",
];

export default ReactQuill;
