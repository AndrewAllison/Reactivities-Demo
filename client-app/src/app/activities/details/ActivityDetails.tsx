import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../stores/activityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { cancelSelectedActivity, selectedActivity: activity, openEditForm } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>Description</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(activity!.id)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => cancelSelectedActivity()}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
