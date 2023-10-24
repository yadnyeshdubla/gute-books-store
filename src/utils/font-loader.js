import React from "react";

const FontLoader = () => {
  const importAll = (r) => r.keys().map(r);
  const fontFiles = importAll(
    require.context("./../assets/fonts", false, /\.(woff|woff2|ttf)$/)
  );

  const fontStyles = fontFiles.map((font, index) => {
    const fontFileName = font.split("/").pop();
    const name = fontFileName.split(".")[0];

    return (
      <style key={name}>
        {`
          @font-face {
            font-family: '${name}';
            src: url('${font}') format('truetype');
          }
        `}
      </style>
    );
  });

  return <>{fontStyles}</>;
};

export default FontLoader;
