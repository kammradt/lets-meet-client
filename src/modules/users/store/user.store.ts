import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {Credentials} from "@/modules/users/interfaces/credentials";
import * as store from './../../../store'
import {clearToken, http, setToken} from "@/plugins/axios"
import {User} from "@/modules/users/interfaces/user.interface";
import {error, success} from "@/plugins/notification";

const USERS = "/users";
const ME = "/me";
const AUTH = "/auth";

@Module({namespaced: true, name: 'UserStore', store})
export default class UserStore extends VuexModule {
  private showLoginModal = false
  private showRegisterModal = false
  private user?: User
  private isLogged = false

  @Mutation
  private setUser(user: User) {
    this.user = user
  }

  @Mutation
  private setIsLogged(isLogged: boolean) {
    this.isLogged = isLogged
  }

  @Action
  private async me() {
    try {
      const response = await http.get(USERS + ME);
      this.context.commit("setUser", response.data)
      this.context.commit("setIsLogged", true)
    } catch (err) {
      clearToken();
      this.context.commit("setIsLogged", false)
      error("Your session expired. Sign in again.")
    }
  }

  @Action
  private logout() {
    clearToken()
    this.context.commit('setIsLogged', false)
  }

  @Mutation
  private setLoginModalVisibility(showLoginModal: boolean): void {
    this.showLoginModal = showLoginModal
  }

  @Action
  private updateLoginModalVisibility(showLoginModal: boolean): void {
    this.context.commit("setLoginModalVisibility", showLoginModal)
  }

  @Action
  private async login(loginRequest: Credentials) {
    try {
      const response = await http.post(AUTH, loginRequest);
      setToken(response.data.token);
      this.context.commit("setIsLogged", true)
      this.context.commit("setLoginModalVisibility", false)
      success("Welcome")
    } catch (err) {
      clearToken();
    }
  }

  @Mutation
  private setRegisterModalVisibility(showRegisterModal: boolean): void {
    this.showRegisterModal = showRegisterModal
  }

  @Action
  private updateRegisterModalVisibility(showRegisterModal: boolean): void {
    this.context.commit("setRegisterModalVisibility", showRegisterModal)
  }

  @Action
  private async register(registerRequest: Credentials) {
    try {
      await http.post(USERS, registerRequest);
      this.context.commit("setRegisterModalVisibility", false)
      await this.context.dispatch("login", registerRequest)
    } catch (err) {
      clearToken();
    }
  }

}
