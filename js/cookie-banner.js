const cookieText = {
  en: {
    copy: 'We use cookies to improve your experience by collecting anonymous analytics data. These cookies help us understand how visitors interact with our website and make improvements. No personal data is stored or shared. You can choose to accept or reject analytics cookies. <a href="https://www.xseedgames.com/privacy-policy/" target="_blank" class="makeRed">Privacy Policy</a>',
    accept: "accept",
    reject: "reject",
  },
  ca: {
    copy: 'We use cookies to improve your experience by collecting anonymous analytics data. These cookies help us understand how visitors interact with our website and make improvements. No personal data is stored or shared. You can choose to accept or reject analytics cookies. <a href="https://www.xseedgames.com/privacy-policy/" target="_blank" class="makeRed">Privacy Policy</a>',
    accept: "accept",
    reject: "reject",
  },
};

class CookieBanner {
  constructor() {
    this.banner = document.querySelector(".cookie");
    this.acceptButton = document.querySelector(".cookie__accept");
    this.rejectButton = document.querySelector(".cookie__reject");
    this.bannerText = document.querySelector(".cookie__banner__copy");
    this.follow = document.querySelector(".btn__follow");
    this.language = "en";

    this.init();
  }

  init = () => {
    if (!this.banner) return;

    this.updateText();
    this.setStylesBanner();

    const gtmConsent = this.getCookie("gtmConsent");
    if (gtmConsent === "accepted") {
      this.loadGTM();
      this.hideBanner();
    } else if (!gtmConsent) {
      this.banner.classList.remove("cookie__hide");
      this.checkFollow();
    }

    this.acceptButton?.addEventListener("click", () => this.handleAccept());
    this.rejectButton?.addEventListener("click", () => this.handleReject());
  };

  checkFollow = () => {
    if (document.querySelector(".home")) {
      if (this.banner.classList.contains("cookie__hide")) {
        this.follow.classList.remove("btn__follow__spacing");
      } else {
        this.follow.classList.add("btn__follow__spacing");
      }
    }
  };

  updateText = () => {
    if (this.bannerText && this.acceptButton && this.rejectButton) {
      this.bannerText.innerHTML = cookieText[this.language].copy;
      this.acceptButton.textContent = cookieText[this.language].accept;
      this.rejectButton.textContent = cookieText[this.language].reject;
    }
    return;
  };

  handleAccept = () => {
    this.setCookie("gtmConsent", "accepted", 365);
    this.loadGTM();
    this.hideBanner();
    this.checkFollow();
  };

  handleReject = () => {
    this.setCookie("gtmConsent", "rejected", 1);
    this.removeGtmCookies();
    this.hideBanner();
    this.checkFollow();
  };

  hideBanner = () => {
    this.banner?.classList.add("cookie__hide");
    this.checkFollow();
  };

  setCookie = (cookieName, value, days) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${cookieName}=${value}; expires=${expires}; path=/`;
  };

  getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    return parts.length === 2 ? parts.pop()?.split(";")[0] || null : null;
  };

  setStylesBanner = () => {
    const wrapper = document.querySelector(".cookie__banner__wrapper");

    if (!wrapper) return;

    const firstChild = wrapper.firstElementChild;
    const lastChild = wrapper.lastElementChild;

    if (firstChild)
      firstChild.style.flex = this.language === "en" ? "2" : "unset";
    if (lastChild)
      lastChild.style.flex = this.language === "en" ? "1" : "unset";
  };

  removeGtmCookies = () => {
    const knownCookies = ["_ga", "_gid", "_gat", "_gcl_au", "_ga_RMCW9NLCC0"];
    const allCookies = document.cookie.split(";");

    allCookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      const trimmedName = name.trim();

      // Match known names and dynamic GA4 cookies like _ga_XXXX
      if (
        knownCookies.includes(trimmedName) ||
        trimmedName.startsWith("_ga_")
      ) {
        // Remove for both current domain and root domain
        [".", ""].forEach((domainPrefix) => {
          document.cookie = `${trimmedName}=; path=/; domain=${domainPrefix}${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        });

        // Also remove without specifying domain
        document.cookie = `${trimmedName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      }
    });
  };

  loadGTM = () => {
    const gtmID = "G-83LCSQ3CPQ";

    // Define dataLayer early
    window.dataLayer = window.dataLayer || [];

    // Define gtag before script loads
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Call initial gtag config before script loads
    window.gtag("js", new Date());
    window.gtag("config", gtmID);

    // Now dynamically load the gtag script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmID}`;
    script.async = true;
    script.onload = () => {
      // console.log('✅ GA4 gtag.js loaded');
    };

    document.head.appendChild(script);
  };

  checkAnalyticsOnOrOffAtStart = () => {
    // const instance = new CookieBanner();

    // if (instance.language !== 'en') {
    //   instance.removeGtmCookies();
    //   return;
    // }

    // const gtmConsent = instance.getCookie('gtmConsent');

    // if (gtmConsent !== 'rejected') {
    //   instance.loadGTM();
    // } else {
    //   instance.removeGtmCookies();
    // }

    const gtmConsent = this.getCookie("gtmConsent");

    if (this.language !== "en") {
      this.removeGtmCookies();
      return;
    }

    if (gtmConsent !== "rejected") {
      this.loadGTM();
    } else {
      this.removeGtmCookies();
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = new CookieBanner();
  cookieBanner.checkAnalyticsOnOrOffAtStart();
});
