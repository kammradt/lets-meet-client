import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as store from './../../../store';
import { Event } from '@/modules/events/interfaces/event.interface';
import { http } from '@/plugins/axios';
import { EventPaginationOptions } from '@/modules/events/interfaces/event-pagination-options';

const EVENTS = '/events';

// @ts-ignore
@Module({ namespaced: true, name: 'EventStore', store })
export default class EventStore extends VuexModule {
  private events: Event[] = [];
  private showEventModal?: boolean = false;

  @Mutation
  public setEvents(newEvents: Event[]): void {
    this.events = newEvents;
  }

  @Action
  public async getEvents(params: EventPaginationOptions | void): Promise<void> {
    const response = await http.get(EVENTS, { params });
    this.context.commit('setEvents', response.data.items);
  }

  @Action
  public async createEvent(event: Event): Promise<void> {
    await http.post(EVENTS, event);
    this.context.commit('setEventModalVisibility', false);
    await this.context.dispatch('getEvents');
  }

  @Mutation
  private setEventModalVisibility(showEventModal: boolean): void {
    this.showEventModal = showEventModal;
  }

  @Action
  private updateLoginModalVisibility(showEventModal: boolean): void {
    this.context.commit('setEventModalVisibility', showEventModal);
  }
}
