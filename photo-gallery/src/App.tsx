import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "./App.css";
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
  const [images, setImages] = useState([
    "desert_final_compressed.avif",
    "IMG_0812.avif",
    "IMG_0985.avif",
    "IMG_1074.avif",
    "IMG_1740.avif",
    "IMG_2062.avif",
    "IMG_2123.avif",
    "IMG_2202.avif",
    "IMG_2374.avif",
    "IMG_2626.avif",
    "IMG_2641.avif",
    "IMG_2815.avif",
    "IMG_2889.avif",
    "IMG_2926.avif",
    "IMG_3038.avif",
    "IMG_3061.avif",
    "IMG_3235.avif",
    "IMG_3239.avif",
    "IMG_3272.avif",
    "IMG_3327.avif",
    "IMG_3334.avif",
    "IMG_3423.avif",
    "IMG_3424.avif",
  ].map((t) => ({ original: t, thumbnail: t })));
  return (
    <div className="App">
      <ImageGallery items={images} slideInterval={10000} showNav={false} />
    </div>
  );
}

export default App;
