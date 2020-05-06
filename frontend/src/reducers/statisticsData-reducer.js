const initialState = {
    dialogData: [
        {name: 'Misha', id: '1'},
        {name: 'Armen', id: '2'},
        {name: 'Stiven', id: '3'},
        {name: 'Jamal', id: '4'},
        {name: 'Ben', id: '5'}
    ],
    messageData: [
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hello'}
    ],
    updateTextArea:''
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE-MESSAGE': {
            let stateCopy = {...state};
            stateCopy.updateTextArea = action.newText;
            return stateCopy;
        }
        case 'ADD-MESSAGE': {
            let stateCopy = {...state};
            let message = {
                message: stateCopy.updateTextArea,
            }
            stateCopy.messageData = [...state.messageData]
            stateCopy.messageData.push(message)
            stateCopy.updateTextArea = '';
            return stateCopy;
        }
        default:
            return state;
    }
}

export const updateMessageActionCreator = (text) => ({type: 'UPDATE-MESSAGE', newText: text});
export const newMessageActionCreator = () => ({type: 'ADD-MESSAGE'});

export default dialogReducer;