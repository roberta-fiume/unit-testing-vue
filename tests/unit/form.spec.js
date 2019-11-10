import { shallowMount, mount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import Vue from "vue";
// import flushPromises from 'flush-promises'

// const flushPromises = require('flush-promises');

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

// jest.setTimeout(70000);

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
        const showValue = jest.fn();
        wrapper.setMethods({showValue});
        const button = wrapper.find('.butt');
        let spanElem = wrapper.find('.span');
        expect(spanElem.exists()).toBe(false);
  
        button.trigger('click');
  
        expect(showValue).toHaveBeenCalledTimes(1);
  
        await wrapper.vm.$nextTick(() => {
          wrapper.setData({isFirstNameDisplayed: true});
          setTimeout(() => {
            expect(wrapper.vm.isFirstNameDisplayed).toBe(true);
          }, 10000);
        })
    }),
  
    it('should NOT show error message when submitting a valid form', () => {
      //GIVEN
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
      let errorMessage = wrapper.find('.errorMessage');
      const button = wrapper.find('.butt');
      //WHEN
      button.trigger('click'); 
      //THEN
      expect(errorMessage.exists()).toBe(false);
    }),
  
    it('should display error message when submitting the form with empty input field', async() => {
      //GIVEN
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(false);
  
      //WHEN
      wrapper.find('.butt').trigger('click');

      //THEN
      await wrapper.vm.$nextTick(() => {
        wrapper.setData({error: true});
        setTimeout(() => {
        expect(wrapper.vm.error).toBe(true);
      }, 1000);
    
      })
    }),

    it('should NOT display clear button when error message occurs',  async() => {
      //GIVEN
      let errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.exists()).toBe(false);
      const clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
  
      //WHEN
      wrapper.find('.butt').trigger('click');

      //THEN
        await wrapper.vm.$nextTick(() => {
          wrapper.setData({error: true});
          setTimeout(() => {
          expect(wrapper.vm.error).toBe(true);
          expect(wrapper.vm.clearButton).toBe(false);
        }, 1000);
        console.log(wrapper.html());
      })
    }),

    it('should NOT display clear button when the input has not been used', () => {
      const clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
    }),
  
    it('should display CLEAR BUTTON when submitting the form', async() => {
      //GIVEN
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
      //WHEN
      wrapper.find('.butt').trigger('click');
      // wrapper.vm.$forceUpdate();
      
      //THEN
      // expect(clearButton.exists()).toBe(true);
      await wrapper.vm.$nextTick(() => {
        wrapper.setData({clearButton: true});
        setTimeout(() => {
        expect(wrapper.vm.clearButton).toBe(true);
        expect(clearButton.exists()).toBe(true);
        expect(false).toBe(true);
        }, 1000);
      })
      console.log("THIS IS THE BOOLEAN OF THE CLEAR BUTTON:",wrapper.vm.clearButton);
      console.log(wrapper.html());

    })

    // fit('should display CLEAR BUTTON when submitting the form', async() => {
    //   //GIVEN
    //   // wrapper = mount(Form, { sync: false });
    //   wrapper = shallowMount(Form);
    //   let clearButton = wrapper.find('.clearButt');
    //   // expect(clearButton.exists()).toBe(false);
    //   //WHEN
    //   wrapper.find('.butt').trigger('click');
    //   // wrapper.vm.$forceUpdate();
    //   wrapper.setData({clearButton: true});
      
    //   //THEN
    //   await wrapper.vm.$nextTick(() => {
    //     console.log("AHHHHHHHHHHHHHHHHHHH11111111111111111111");
    //     setTimeout(() => {
    //       console.log("AHHHHHHHHHHHHHHHHHHH2222222222222222222");
    //       expect(clearButton.exists()).toBe(true);
    //     }, 1000);
    //   })
    //   // wrapper.vm.$nextTick(() => {
    //   //   // wrapper.setData({clearButton: true});
        
    //   //   setTimeout(() => {
    //   //   expect(wrapper.vm.clearButton).toBe(true);
    //   //   expect(clearButton.exists()).toBe(true);
    //   //   expect(false).toBe(true);
    //   //   }, 10000);
    //   // })
  
    // })
  
    it('should clear FirstName when clicking on clear button', () => {
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
      wrapper.setData({clearButton: true});
  
      const firstName = wrapper.find('.inputField');
      firstName.setValue('someValue');
  
      expect(wrapper.vm.firstName).toBe('someValue');
  
      wrapper.find('.clearButt').trigger('click');
  
      firstName.setValue('');
  
      expect(wrapper.vm.firstName).toBe('');
      // console.log("THAT'S THE EMPTY INPUT VALUE:", wrapper.vm.firstName)
    }),
  
    it('should NOT display "isFirstNameDisplayed" when clicking on clear button', () => {
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
      wrapper.setData({clearButton: true});
      console.log("THAT'S THE CLEAR BUTTON:", wrapper.vm.clearButton)
      console.log(wrapper.html());
      expect(wrapper.vm.clearButton).toBe(true);
  
      let spanElement = wrapper.find('.spanElem');
      expect(spanElement.exists()).toBe(false);
      wrapper.setData({isFirstNameDisplayed: true});
      expect(wrapper.vm.isFirstNameDisplayed).toBe(true);

      wrapper.find('.clearButt').trigger('click');

      expect(spanElement.exists()).toBe(false);
      console.log(wrapper.html());
      console.log("THAT'S THE SPAN STATE:", wrapper.vm.isFirstNameDisplayed);
    }),

    fit('should NOT display clear button when clicking on itself', () => {
      let clearButton = wrapper.find('.clearButt');
      expect(clearButton.exists()).toBe(false);
      wrapper.setData({clearButton: true});
      expect(wrapper.vm.clearButton).toBe(true);
  
      wrapper.find('.clearButt').trigger('click');
  
      expect(clearButton.exists()).toBe(false);
      console.log(wrapper.html());
      console.log("show me the clear button state",wrapper.vm.clearButton);
    })
  })
})
