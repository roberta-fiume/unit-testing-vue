import VueRouter from 'vue-router'
import router from "@/router/index.js"
import Home from "@/views/Home.vue"
import About from "@/views/Home.vue"
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'

describe("Routes", () => {
    let wrapper;
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();

    describe("Routing", () => {
        beforeEach(() => {
            wrapper = mount(Home, {
                localVue,
                router
            })
        }); 

        it('should render route Home', async() => {
            expect(wrapper.find(Home).exists()).toBe(true);
        })
    }),

    describe("Routing", () => {
        beforeEach(() => {
          wrapper = mount(About, {
            localVue,
            router
          })
        }); 
    
        fit('should render route About', () => {
          expect(wrapper.find(About).exists()).toBe(true);
        })
    })
})






