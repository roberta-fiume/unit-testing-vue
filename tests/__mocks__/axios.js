module.exports = {
    get: jest.fn(() => Promise.resolve({ data: [  //Jest automatically applies the mock in all our tests
        { id: "1", employee_name: "Cool"}
    ]}))
}