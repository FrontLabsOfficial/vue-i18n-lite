<template>
  <h2>{{ $t('button.add') }}</h2>
  <p>Current: {{ current }}</p>
  <p>Missing key: {{ $t('button.description') }}</p>
  <label>
    Select language
    <select :value="current" @change="(e) => changeLocale(e.target.value)">
      <option :value="lang.code" v-for="lang in languages">
        {{ lang.name }}
      </option>
    </select>
  </label>
  <br>
  <button @click="addNewMessages">Add new messages</button>
  <button @click="addNewLocale" v-if="!added">Add new locale</button>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from '../../src'

export default {
  name: 'App',
  setup() {
    const i18n = useI18n()
    const { changeLocale, current, setLocaleMessage } = i18n
    const added = ref(false)
    const languages = reactive(
        [
          {
            code: 'vi',
            name: 'Tiếng Việt'
          },
          {
            code: 'en',
            name: 'English'
          }
        ]
    )
    const addNewLocale = () => {
      setLocaleMessage('fr', {
        button: {
          add: 'ajouter',
        },
      })
      added.value = true
      languages.push({ code: 'fr', name: 'French' })
    }

    const addNewMessages = () => {
      setLocaleMessage(current.value, {
        button: {
          description: 'Description'
        }
      })
    }

    return {
      changeLocale,
      current,
      added,
      addNewLocale,
      languages,
      addNewMessages
    }
  },
}
</script>
