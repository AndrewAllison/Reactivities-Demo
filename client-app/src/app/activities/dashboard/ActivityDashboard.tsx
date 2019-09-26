import React, { SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity;
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
  handleDeleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleCreateActivity,
  handleEditActivity,
  handleDeleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity ? selectedActivity.id : 0}
            selectedActivity={selectedActivity}
            setEditMode={setEditMode}
            handleCreateActivity={handleCreateActivity}
            handleEditActivity={handleEditActivity}
            submitting={submitting}
            target={target}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
