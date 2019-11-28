module.exports = {
    get: jest.fn((url) => {
        return Promise.resolve({ 
            data: {} 
        })
    }),

    post: jest.fn((url, data) => {
        if (url === 'http://apicreation-260015.appspot.com/document/') {
            
            return Promise.resolve({
                data: { documentId: "KtEQnnAj7Zsiuiiov8bX"}
            })
        }
    })
}