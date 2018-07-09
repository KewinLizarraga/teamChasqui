/* eslint-disable */
import React from 'react';

// Thrid party library used by this component.
import { Field, reduxForm } from 'redux-form';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { Select, Input, MenuItem, InputLabel, FormControl, Chip } from '@material-ui/core';
import SelectHours from '../../components/SelectHours/SelectHours';
import ListSelectHours from '../../components/SelectHours/ListSelectHours';
import CustomDialogForm from '../../components/CustomDialog/CustomDialogForm';
import Review from '../Dashboard/Notifies/Sections/Review';
import ListReviews from '../Dashboard/Notifies/Sections/ListReviews';
import ListChats from '../Dashboard/Chat/ListChats';
import Message from '../Dashboard/Chat/Message';
import ListMessages from '../Dashboard/Chat/ListMessages';
// Materias-ui components and functions used by this component.

// Components used by this component

// Styles for this component

// Sections for this component
// Component class
const chats = [{
  _id: 'chat1',
  user_id: {
    _id: 'user1',
    first_name: 'Joshua',
    last_name: 'Navarro'
  },
  business_id: 'business1',
  last_message: 'Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',
  count: 10,
  updatedAt: '2018-06-13T00:43:46.118Z',
  createdAt: '2018-06-13T00:43:46.118Z'
}, {
  _id: 'chat2',
  user_id: {
    _id: 'user1',
    first_name: 'Joshua',
    last_name: 'Navarro'
  },
  business_id: 'business1',
  last_message: 'Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',
  count: 10,
  updatedAt: '2018-06-13T00:43:46.118Z',
  createdAt: '2018-06-13T00:43:46.118Z'
}]

const messages = [
  {
    "_id": "5b42aee7cf5ee7f4af574947",
    "message": "Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',Hola!! como estas de verdad me canse de estar estudiando todo el dia quiero ir de vacaciones a la playaaas',",
    "from": "5b1790d79b30ad0345a92bbc",
    "to": "5b141b0e501c8e435964c802",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T00:40:07.911Z"
  },
  {
    "_id": "5b42c1f28620b4f774cd598f",
    "message": "estas? :v",
    "from": "5b1790d79b30ad0345a92bbc",
    "to": "5b141b0e501c8e435964c802",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T02:01:22.512Z"
  },
  {
    "_id": "5b42c20ed59491f784d32ed9",
    "message": "estas? :v",
    "from": "5b1790d79b30ad0345a92bbc",
    "to": "5b141b0e501c8e435964c802",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T02:01:50.895Z"
  },
  {
    "_id": "5b42eb1d1dff63fc98ef4b4b",
    "message": "estas? :v",
    "from": "5b141b0e501c8e435964c802",
    "to": "5b1790d79b30ad0345a92bbc",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T04:57:01.606Z"
  },
  {
    "_id": "5b42c2500cf0e3f797e658ba",
    "message": "estas? :v",
    "from": "5b1790d79b30ad0345a92bbc",
    "to": "5b141b0e501c8e435964c802",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T02:02:56.745Z"
  },
  {
    "_id": "5b42eb1d1dff63fc98ef4b4c",
    "message": "estas? :v",
    "from": "5b141b0e501c8e435964c802",
    "to": "5b1790d79b30ad0345a92bbc",
    "chat_id": "5b42a68b93c0c1f2cfbc7d8e",
    "createdAt": "2018-07-09T04:57:01.606Z"
  }
  
]
class NotFound extends React.Component {
  render() {
    return (
      <div
        style={{
          marginTop: '100px',
          marginLeft: '30px'
        }}
      >
        {/* <h1 style={{ fontSize: 100}}>Page not found!</h1>}*/}
        <ListChats chats={chats} />
        <ListMessages messages={messages} />
      </div>
    )
  }
}

// ProtTypes for this component
// Export component
export default NotFound;
