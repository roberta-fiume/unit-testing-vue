import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue";
import App from '@/App.vue'
import Home from "@/views/Home.vue"
import sinon from 'sinon';

describe("App component", () => {
    let wrapper;
    const localVue = createLocalVue();

    describe("test events", () => {
        beforeEach(() => {
            wrapper = shallowMount(App, {
                stubs: ['router-view']
            });
        }); 

        fit("should receive emit event", () => {
            const emittedFromHome = sinon.stub();
            wrapper.setMethods({ updateFirstName: emittedFromHome });
            console.log("THIS IS STUBEDD", emittedFromHome)

            // wrapper.find(Home).vm.$emit('updateFirstName');

            // expect(emittedFromHome.called).toBeTruthy();
        })
    })

})