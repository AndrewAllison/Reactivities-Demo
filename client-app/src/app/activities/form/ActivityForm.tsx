import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../stores/activityStore';

interface IProps {
  activity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
}) => {
  const activityContext = useContext(ActivityStore);
  const { createActivity, editActivity, submitting, setEditMode } = activityContext;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
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
      createActivity(newActivity);
    } else {
      editActivity(activity);
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

        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='SUBMIT'
        />
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

export default observer(ActivityForm);
