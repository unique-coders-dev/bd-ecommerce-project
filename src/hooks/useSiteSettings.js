import { useState, useEffect } from 'react';

const DEFAULT_LOGO = "";
const DEFAULT_SITE_NAME = "Mailbon";
const DEFAULT_SITE_TITLE = "Mailbon | Premium Beauty & Wellness";

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
