"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsConfig } from "@/lib/config";

const CONSENT_KEY = "phoenix-cookie-consent";

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(localStorage.getItem(CONSENT_KEY) === "accepted");
  }, []);

  useEffect(() => {
    const handler = () => setConsented(true);
    window.addEventListener("cookie-consent", handler);
    return () => window.removeEventListener("cookie-consent", handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      {analyticsConfig.yandexMetrikaId && (
        <>
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${analyticsConfig.yandexMetrikaId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${analyticsConfig.yandexMetrikaId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
      {analyticsConfig.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) !== "accepted") {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent"));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-[1400px] rounded-lg border border-gold/30 bg-green-dark/95 backdrop-blur-sm p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <p className="flex-1 text-sm text-cream/80 leading-relaxed">
            Мы используем файлы cookie и сервисы аналитики (Яндекс.Метрика, Google Analytics)
            для улучшения работы сайта. Продолжая использование сайта, вы соглашаетесь с{" "}
            <a href="/privacy" className="text-gold hover:underline">
              политикой обработки данных
            </a>{" "}
            в соответствии с 152-ФЗ.
          </p>
          <button
            onClick={accept}
            className="shrink-0 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-green-dark hover:bg-gold-light transition-colors"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
