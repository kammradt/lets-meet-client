import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as store from './../../../store';
import { Event } from '@/modules/events/interfaces/event.interface';
import { http } from '@/plugins/axios';
import { EventPaginationOptions } from '@/modules/events/interfaces/event-pagination.options.interface';
import { EventModalParams } from '@/modules/events/interfaces/event-modal-params.interface';
import { emptyEvent } from '@/modules/events/helpers/event-helper';

const EVENTS = '/events';

// @ts-ignore
@Module({ namespaced: true, name: 'EventStore', store })
export default class EventStore extends VuexModule {
  private events: Event[] = [];
  private showEventModal?: boolean = false;
  private showEventDetailsModal?: boolean = false;
  private currentEvent?: Event = emptyEvent();

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
  private updateEventModalVisibility(showEventModal: boolean): void {
    this.context.commit('setEventModalVisibility', showEventModal);
  }

  @Mutation
  private setEventDetailsModalVisibility(showEventDetailsModal: boolean): void {
    this.showEventDetailsModal = showEventDetailsModal;
  }

  @Action
  private async updateEventDetailModalVisibility(
    params: EventModalParams
  ): Promise<void> {
    if (params.id) {
      await this.context.dispatch('updateCurrentEvent', params.id);
    } else {
      this.context.commit('setCurrentEvent', emptyEvent());
    }
    this.context.commit('setEventDetailsModalVisibility', params.show);
  }

  @Mutation
  private setCurrentEvent(event: Event): void {
    this.currentEvent = event;
  }

  @Action
  private async updateCurrentEvent(id: string): Promise<void> {
    const response = await http.get(`${EVENTS}/${id}`);
    this.context.commit('setCurrentEvent', response.data);
  }
}
