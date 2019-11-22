import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue";
import App from '@/App.vue'
import Home from "@/views/Home.vue"
import sinon from 'sinon';

describe("App component", () => {
    let wrapper;

    describe("test events", () => {
    
      beforeEach(() => {
            wrapper = shallowMount(App, {
                stubs: ['router-link', 'router-view']
              
            })
        }); 

        it('should render App', () => {
            const emittedFromHome = sinon.stub();
            wrapper.setMethods({ updateFirstName: emittedFromHome });

            wrapper.find('router-view-stub').vm.$emit('updateFirstName');

            expect(emittedFromHome.called).toBeTruthy();
        })
    })
})