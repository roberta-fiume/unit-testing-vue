// import VueRouter from 'vue-router'
// import router from "@/router/index.js"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import App from "@/App.vue"
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'

describe("Routes", () => {
    let wrapper;
    const localVue = createLocalVue();
    // localVue.use(VueRouter);
    // const router = new VueRouter();

    describe("Routing HOME", () => {

        const $route = {
            path: '/',
            name: 'home'
        };

        beforeEach(() => {
            wrapper = shallowMount(Home, {
                localVue,
                // router,
                mocks: {
                    $route
                }
            })
        }); 

        fit('should render route Home', () => {
            expect(wrapper.find(Home).exists()).toBe(true);
            // console.log("HOMEEEE", Home);
            console.log(wrapper.html());
            console.log("THIS IS THE PATH HOME", wrapper.vm.$route.path);
           
        }),

        it('renders $router.name', () => {
          expect(wrapper.vm.$route.name).toBe($route.name);
          console.log("THIS IS THE NAME",wrapper.vm.$route.name);
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
            // router,
            mocks: {
                $route
            }
          })
        }); 
    
        fit('should render route About', () => {
         
          expect(wrapper.find(About).exists()).toBe(true);
          console.log("ABOUTTT", About);
          console.log(wrapper.html());
          console.log("THIS IS THE PATH ABOUT", wrapper.vm.$route.path);
        })

        it('renders $router.name', () => {
        expect(wrapper.vm.$route.name).toBe($route.name);
        // console.log(wrapper.html());
        console.log("THIS IS THE NAME ABOUT", wrapper.vm.$route.name);
        })
    })
})






