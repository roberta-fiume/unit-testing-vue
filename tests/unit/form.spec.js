import { shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import Vue from "vue";
import flushPromises from 'flush-promises'

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

describe('Testing Form Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Form);
  })

  beforeEach(async () => {
    jest.setTimeout(210);
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
  }),

  it('should test that input field HAS A VALUE', () => {
    const firstName = wrapper.find('.inputField');
    firstName.setValue('hello');
    expect(wrapper.vm.firstName).toBe('hello');
  })


  it('should display input value when clicking on submit button', async() => {
      const showValue = jest.fn();
      wrapper.setMethods({showValue});
      const button = wrapper.find('.butt');
      let spanElem = wrapper.find('.span');
      expect(spanElem.exists()).toBe(false);
      

      button.trigger('click');

      wrapper.vm.$emit('functionThatDisplayValue');

      expect(showValue).toHaveBeenCalledTimes(1);

      await wrapper.vm.$nextTick(() => {
        wrapper.setData({valueFromInput: true});
        setTimeout(() => {
        expect(wrapper.vm.valueFromInput).toBe(true);

      }, 10000);

        expect(console.log("THAT'S MY FUCKING VALUE111",wrapper.vm.valueFromInput));
        expect(console.log("THAT'S MY FUCKING VALUE",spanElem));
        expect(console.log(wrapper.html()));
    })
  })
})
