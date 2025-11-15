// import React, { useEffect } from "react";

// const Googletranslate = () => {
//   useEffect(() => {
//     // Save selected language on change
//     const observer = new MutationObserver(() => {
//       const select = document.querySelector(".goog-te-combo");
//       if (select && select.value) {
//         localStorage.setItem("preferredLanguage", select.value);
//       }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });

//     // Load script only once
//     if (!document.querySelector("#google-translate-script")) {
//       const script = document.createElement("script");
//       script.id = "google-translate-script";
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       document.body.appendChild(script);
//     }

//     // Define init function globally
//     window.googleTranslateElementInit = () => {
//       const oldContainer = document.getElementById("google_translate_element");
//       if (oldContainer) {
//         oldContainer.innerHTML = "";
//       }

//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi,gu,es,fr,de,zh-CN",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );

//       // Restore previously selected language
//       setTimeout(() => {
//         const savedLang = localStorage.getItem("preferredLanguage");
//         if (savedLang) {
//           const select = document.querySelector(".goog-te-combo");
//           if (select) {
//             select.value = savedLang;
//             select.dispatchEvent(new Event("change"));
//           }
//         }
//       }, 1000);
//     };

//     return () => observer.disconnect();
//   }, []);

//   return <div id="google_translate_element" className="translate-box"></div>;
// };

// export default Googletranslate;


import React, { useEffect } from "react";

const Googletranslate = () => {
  useEffect(() => {
    // Define the init function globally (must be done before script loads)
    window.googleTranslateElementInit = () => {
      const container = document.getElementById("google_translate_element");
      if (container) container.innerHTML = "";

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,gu,es,fr,de,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      // Restore saved language
      setTimeout(() => {
        const savedLang = localStorage.getItem("preferredLanguage");
        const select = document.querySelector(".goog-te-combo");
        if (savedLang && select) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));
        }
      }, 1000);
    };

    // Load the Google Translate script only once
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If script already loaded, initialize immediately
      window.googleTranslateElementInit();
    }

    // Watch for language changes
    const observer = new MutationObserver(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select && select.value) {
        localStorage.setItem("preferredLanguage", select.value);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div id="google_translate_element" className="translate-box"></div>;
};

export default Googletranslate;
