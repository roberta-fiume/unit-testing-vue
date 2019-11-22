import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from "vue";
import Form from '@/components/Form.vue'
import YesNoComponent from '@/components/YesNoComponent.vue'
import flushPromises from 'flush-promises';
import sinon from 'sinon';
jest.mock('axios')


describe('Form Component', () => {
 
  let wrapper;
  
  describe('Initial state', () => {

    beforeEach(() => {
      wrapper = shallowMount(Form);
    })

    it('should test that component exists', () => {
      expect(wrapper.exists()).toBe(true);
    }),
  
    it('should test that TITLE exists', () => {
      let title = wrapper.find('h1');
      expect(title.exists()).toBe(true);
    }),

    it('should test that LABEL exists and HAS TEXT IN IT', () => {
      expect(wrapper.contains('label')).toBe(true);
      expect(wrapper.find('.labelField').text()).toBe('Enter value:');
    }),
  
    it('should test that BUTTON exists', () => {
      let button = wrapper.find('.butt');
      expect(button.exists()).toBe(true);
    }),
  
    it('should test that ERROE MESSAGE DOES NOT exist yet', () => {
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(false);
    }),
  
    it('should test that SPAN element with the value from input exists', () => {
      let spanElement = wrapper.find('span');
      expect(spanElement.exists()).toBe(false);
    })
  
    it('should test that input field is empty', () => {
      const firstName = wrapper.find('.inputField');
      firstName.setValue('');
      expect(wrapper.vm.firstName).toBe('');
    })
  }),
 
  describe('User inputs data', () => {

    beforeEach(() => {
      wrapper = shallowMount(Form);
    });

    it('should store input field as firstName', () => {
      const firstName = wrapper.find('.inputField');
      firstName.setValue('hello');
      expect(wrapper.vm.firstName).toBe('hello');
    }),
  
  
    it('should store input value in isFirstNameDisplayed on form submit', async() => {
      //GIVEN
      const firstName = wrapper.find('.inputField');
      firstName.setValue('hello');
    
      let spanElement = wrapper.find('.spanElem');
      expect(spanElement.exists()).toBe(false);
  
      //WHEN
      wrapper.find('.butt').trigger('click');

      await Vue.nextTick();

      //THEN
      let spanElementAfter = wrapper.find('.spanElem');
      expect(spanElementAfter.exists()).toBe(true);
      expect(spanElementAfter.text()).toEqual("hello");
    }),

    it('should make sure that ShowValue function has been called', () => {
      const showValue = jest.fn();
      wrapper.setMethods({showValue});

      wrapper.find('.butt').trigger('click');
      expect(showValue).toHaveBeenCalledTimes(1);
    }),
  
    it('should NOT show error message when submitting a valid form', () => {
      //GIVEN
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
      const button = wrapper.find('.butt');
      //WHEN
      button.trigger('click'); 
      //THEN
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(false);
    }),
      
    it('should display error message when submitting the form with empty input field', async() => {
      //GIVEN
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(false);
  
      //WHEN
      wrapper.find('.butt').trigger('click');

      // await flushPromises(); I can use this as well

      await Vue.nextTick();

      let errorMessageAfter = wrapper.find('.errorMessage');
      expect(errorMessageAfter.exists()).toBe(true);
      expect(errorMessageAfter.text()).toEqual("Error! Please enter a value!");
    }),


    // it('blabla', async () => {
    //   const spy = sinon.spy()
    //   const wrapper = mount(YesNoComponent, {
    //     propsData: {
    //       callMe: spy
    //     }
    //   })
    //   wrapper.find('button.yes').trigger('click')
    //   // await Vue.nextTick()
    //   await Vue.nextTick();

    //   let hello = wrapper.find('.hello');
    //   expect(spy.calledWith('yes')).toBe(true);
    //   expect(hello.exists()).toBe(true);
    //   expect(hello.text()).toBe("Hello123");
    // });

    it('should NOT display clear button when error message occurs',  async() => {  
      //WHEN
      wrapper.find('.butt').trigger('click');

      await Vue.nextTick();

      //THEN
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(true);
      const clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
    }),

    it('should NOT display clear button when the input has not been used', () => {
      const clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
    }),
  
    it('should display CLEAR BUTTON when submitting the form', async() => {
      //GIVEN
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');

      //WHEN
      wrapper.find('.butt').trigger('click');
    
      await Vue.nextTick();
      
      //THEN
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(true);

    })
  
    it('should clear FirstName when clicking on clear button', async() => { //preguntar al respecto: forzar clera button a ser true con setdata o recrear la situacion en que en verdad el boton existe?
      // let clearButton = wrapper.find('.clearButt');
      // wrapper.setData({clearButton: true});
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
    
      wrapper.find('.butt').trigger('click');
     
      await Vue.nextTick();
       
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(true);

      clearButton.trigger('click');

      await Vue.nextTick();

      expect(wrapper.vm.firstName).toBe('');
    }),
  
    it('should NOT display "isFirstNameDisplayed" when clicking on clear button', async() => { //preguntar lo mismo que arriba
      // wrapper.setData({clearButton: true});
      // expect(wrapper.vm.clearButton).toBe(true);
  
      // let spanElement = wrapper.find('.spanElem');
      // expect(spanElement.exists()).toBe(false);
      // wrapper.setData({isFirstNameDisplayed: true});
      // expect(wrapper.vm.isFirstNameDisplayed).toBe(true);

      // wrapper.find('.clearButt').trigger('click');

      // expect(spanElement.exists()).toBe(false);


      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
    
      wrapper.find('.butt').trigger('click');
     
      await Vue.nextTick();
       
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(true);

      clearButton.trigger('click');

      await Vue.nextTick();
      
      let spanElement = wrapper.find('.spanElem');
      expect(spanElement.exists()).toBe(false);
      
    }),

    it('should NOT display clear button when clicking on itself', async() => { //lo mismo que arriba
      // let clearButton = wrapper.find('.clearButt');
      // expect(clearButton.exists()).toBe(false);
      // wrapper.setData({clearButton: true});
      // expect(wrapper.vm.clearButton).toBe(true);
  
      // wrapper.find('.clearButt').trigger('click');
  
      // expect(clearButton.exists()).toBe(false);
      // console.log(wrapper.html());
      // console.log("show me the clear button state",wrapper.vm.clearButton);


      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
    
      wrapper.find('.butt').trigger('click');
     
      await Vue.nextTick();
       
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(true);

      clearButton.trigger('click');

      await Vue.nextTick();
      
      let clearButtonAfter = wrapper.find('.clearButt');
      expect(clearButtonAfter.exists()).toBe(false);
    })
  })

  describe('Radio Buttons', () => {

    beforeEach(() => {
      wrapper = shallowMount(Form);
    }); 

    it('should confirm that radioYes exists', () => {
        let radioYes = wrapper.find('.radioYes');
        expect(radioYes.exists()).toBe(true);
    }),

    it('should confirm that radioNo exists', () => {
      let radioYes = wrapper.find('.radioNo');
      expect(radioYes.exists()).toBe(true);
    }),

    it('should change value according to selected radio button Yes', () => {
      wrapper.setData({radios:''});

      wrapper.find('.radioYes').trigger('change');

      expect(wrapper.find('.selected').text()).toBe('You chose: Yes');
    })

    it('should change value according to selected radio button No', () => {
      wrapper.setData({radios:''});

      wrapper.find('.radioNo').trigger('change');

      expect(wrapper.find('.selected').text()).toBe('You chose: No');
    })
  }),

  describe('render prop', () => {
   
    it('renders props when passed', () => {
      let expectedProp = "I am the prop!";

      const wrapper = shallowMount(Form, { //si lo pongo en describe el test falla y no me da que encuentra el prop en el paragraph. Porque?
        propsData: {
          stringPassedProp: expectedProp 
        }
      })

      let paragr = wrapper.find('.prop-parag');

      expect(paragr.text()).toContain(expectedProp);
    })
  }),

  describe('emit event', () => {
    beforeEach(() => {
      wrapper = shallowMount(Form);
    }); 
    
    it('should emit event from child', () => {
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');

      wrapper.vm.showValue();

      expect(wrapper.emitted()['first-name'][0]).toEqual(['someValue']);
    })
  })

  describe('get data from api',() => {
    beforeEach(() => {
      wrapper = shallowMount(Form);
    }); 
    
    fit('shoud test Api call', async() => {

      // let name = wrapper.find('.apiResult'); //with async()

      // wrapper.find('.getData').trigger('click');

      // await Vue.nextTick();

      // await Vue.nextTick();

      // expect(name.text()).toBe('Abhi2')




      // let name = wrapper.find('.apiResult'); with done =>
      // wrapper.find('.getData').trigger('click')
   
      // wrapper.vm.$nextTick(() => {
      //   expect(wrapper.vm.result).toBe('Abhi2')
      //   done()
      // })


      wrapper.find('.getData').trigger('click');
      
      await flushPromises()
      expect(wrapper.vm.result).toBe('Abhi2')
    })
  })
})
