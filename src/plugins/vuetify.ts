import Vue from 'vue';
import Vuetify, {colors} from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.base,
        secondary: colors.teal.lighten4,
        background: colors.grey.lighten4
      },
      dark: {
        primary: colors.teal.base,
        secondary: colors.teal.lighten4,
        background: colors.grey.lighten4
      }
    }
  }
});
