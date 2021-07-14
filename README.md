## 🔥️ Vue I18n Lite

A super lightweight and minimal plugin that introduces internationalization into your Vue.js app with a simple API

## 🚀 Usage
### Plugin

```ts
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n-lite';
import App from './App.vue';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        'en': {
            home: 'Home'
        }
    }
})

const app = createApp(App);
app.use(i18n);

```
### Composition API

```ts
import { useI18n } from 'vue-i18n-lite';

export default {
    setup() {
        const i18n = useI18n()
        i18n.createI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: {
                'en': {
                    home: 'Home'
                }
            }
        })

        const { current, changeLocale } = i18n

        return {
            current,
            changeLocale
        }
    }
}
```

## 📦 Install

```bash
yarn add vue-i18n-lite
```

### CDN

```html
<script src="https://unpkg.com/vue-i18n-lite"></script>
```

It will be exposed to global as `window.VueI18nLite`

## Changelog

Detail changes for each release are documented in the [`CHANGELOG.md file`](https://github.com/FrontLabsOfficial/vue-i18n-lite/blob/master/CHANGELOG.md).

## ❤️ Thanks

This project is inspired by the following awesome projects.
- [dot-prop](https://github.com/sindresorhus/dot-prop)
- [vue-i18n](https://github.com/kazupon/vue-i18n)

## 📄 License

MIT License © 2021 [Erik Pham](https://github.com/erikpham)
