// import VueRouter from 'vue-router'
// import router from "@/router/index.js"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import App from "@/App.vue"
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import sinon from 'sinon';

describe("Routes", () => {
    let wrapper;
    const localVue = createLocalVue();
 
    describe("Routing HOME", () => {

        const $route = {
            path: '/',
            name: 'home'
        };

        beforeEach(() => {
            wrapper = shallowMount(Home, {
                localVue,
                mocks: {
                    $route
                }
            })
        }); 

        it('should render route Home', () => {
            expect(wrapper.find(Home).exists()).toBe(true);    
        }),

        it('renders $router.name', () => {
          expect(wrapper.vm.$route.name).toBe($route.name);
        })
    }),

    describe("Routing ABOUT", () => {

        const $route = {
            path: '/about',
            name: 'about'
        };

        beforeEach(() => {
          wrapper = shallowMount(About, {
            localVue,
            mocks: {
                $route
            }
          })
        }); 
    
        it('should render route About', () => {
          expect(wrapper.find(About).exists()).toBe(true);
        })

        it('renders $router.name', () => {
            expect(wrapper.vm.$route.name).toBe($route.name);
        })
    }),

    describe("event in parent", () => {

        const $route = {
            path: '/',
            name: 'home'
        };

        beforeEach(() => {
            wrapper = shallowMount(Home, {
                localVue,
                mocks: {
                    $route
                }
            })
        }); 

        it('should receive event', () => {
            const emittedFromChild = sinon.stub();
            wrapper.setMethods({ firstName: emittedFromChild });

            wrapper.find(Form).vm.$emit('first-name');

            expect(emittedFromChild.called).toBeTruthy();
        }),

        it('should emit event', () => {

            wrapper.vm.firstName();

            expect(wrapper.emitted('updateFirstName')).toBeTruthy();
        })


    })
})






