import { Font } from "@react-email/components";

export const Fonts = () => {
  return (
    <>
      {/* Articulat CF (Typekit) */}
      <Font
        fontFamily="articulat-cf"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://use.typekit.net/af/dfb334/000000000000000077524f49/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="articulat-cf"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://use.typekit.net/af/47b487/000000000000000077524f50/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3",
          format: "woff2",
        }}
        fontWeight={500}
        fontStyle="normal"
      />
      
      {/* Rajdhani (Google Fonts) */}
      <Font
        fontFamily="Rajdhani"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.gstatic.com/s/rajdhani/v15/LDIxapCSOBg7S-QT7p4HM-aGW-rO.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Rajdhani"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EPOreefkkbIx.woff2",
          format: "woff2",
        }}
        fontWeight={500}
        fontStyle="normal"
      />
    </>
  );
}; 