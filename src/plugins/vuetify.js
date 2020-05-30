import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal,
        secondary: colors.teal.lighten4,
        background: colors.teal.lighten5
      },
      dark: {
        primary: colors.teal,
        secondary: colors.teal.lighten4,
        background: colors.teal.lighten5
      }
    }
  }
});
