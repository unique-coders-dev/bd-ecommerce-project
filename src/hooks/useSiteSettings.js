import { useState, useEffect } from 'react';

const DEFAULT_LOGO = "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png";
const DEFAULT_SITE_NAME = "KC Bazar";
const DEFAULT_SITE_TITLE = "KC Bazar | Premium Beauty & Wellness";

let cachedSettings = null;

export function useSiteSettings() {
    const [settings, setSettings] = useState(cachedSettings);

    useEffect(() => {
        if (cachedSettings) {
            setSettings(cachedSettings);
            return;
        }
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                cachedSettings = data;
                setSettings(data);
            })
            .catch(() => {});
    }, []);

    return {
        settings,
        logoUrl: settings?.logoUrl || DEFAULT_LOGO,
        siteName: settings?.siteName || DEFAULT_SITE_NAME,
        siteTitle: settings?.siteTitle || DEFAULT_SITE_TITLE,
    };
}
