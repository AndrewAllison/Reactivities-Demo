import React from 'react';
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
  handleDeleteActivity: (id: string) => void;
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
  handleDeleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          handleDeleteActivity={handleDeleteActivity}
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
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
