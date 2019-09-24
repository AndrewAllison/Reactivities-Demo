import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import { v4 as uuid }  from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: IActivity;
  handleCreateActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  selectedActivity,
  handleCreateActivity,
  handleEditActivity
}) => {
  const initializeForm = () => {
    if (selectedActivity) {
      return selectedActivity;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      handleCreateActivity(newActivity);
    } else {
      handleEditActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Input
          onChange={event => handleInputChange(event)}
          name='title'
          placeholder='Title'
          value={activity.title}
        />
        <Form.TextArea
          onChange={event => handleInputChange(event)}
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input
          onChange={event => handleInputChange(event)}
          name='category'
          placeholder='Category'
          value={activity.category}
        />
        <Form.Input
          onChange={event => handleInputChange(event)}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input
          onChange={event => handleInputChange(event)}
          name='city'
          placeholder='City'
          value={activity.city}
        />
        <Form.Input
          onChange={event => handleInputChange(event)}
          name='venue'
          placeholder='Venue'
          value={activity.venue}
        />
        <Button floated='right' positive type='submit' content='SUBMIT' />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
